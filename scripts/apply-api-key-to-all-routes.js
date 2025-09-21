const fs = require('fs');
const path = require('path');

function findApiRoutes(dir, routes = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findApiRoutes(filePath, routes);
    } else if (file === 'route.ts') {
      routes.push(filePath);
    }
  }
  
  return routes;
}

function applyApiKeyMiddleware(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has API key middleware
    if (content.includes('withApiKey') || content.includes('apiKeyMiddleware')) {
      console.log(`⏭️  Skipping ${filePath} - already has API key middleware`);
      return false;
    }
    
    // Skip excluded routes
    const excludedRoutes = ['/api/auth/login', '/api/auth/register', '/api/payment/webhook'];
    const shouldSkip = excludedRoutes.some(route => filePath.includes(route.replace('/api/', '').replace('/', path.sep)));
    
    if (shouldSkip) {
      console.log(`⏭️  Skipping ${filePath} - excluded route`);
      return false;
    }
    
    // Add import for withApiKey
    if (!content.includes("import { withApiKey }")) {
      const importMatch = content.match(/import.*from.*['"];?\n/);
      if (importMatch) {
        const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
        content = content.slice(0, lastImportIndex) + 
          "import { withApiKey } from '@/lib/apiKeyMiddleware';\n" + 
          content.slice(lastImportIndex);
      } else {
        // If no imports found, add at the beginning
        content = "import { withApiKey } from '@/lib/apiKeyMiddleware';\n" + content;
      }
    }
    
    // Find all export functions and wrap them with withApiKey
    const exportRegex = /export\s+(async\s+)?function\s+(\w+)\s*\(/g;
    let match;
    const functions = [];
    
    while ((match = exportRegex.exec(content)) !== null) {
      functions.push({
        name: match[2],
        fullMatch: match[0],
        index: match.index
      });
    }
    
    if (functions.length === 0) {
      console.log(`⚠️  No export functions found in ${filePath}`);
      return false;
    }
    
    // Process functions in reverse order to maintain indices
    for (let i = functions.length - 1; i >= 0; i--) {
      const func = functions[i];
      const functionName = func.name;
      
      // Find the function body
      const functionStart = content.indexOf(func.fullMatch, func.index);
      const openParen = content.indexOf('(', functionStart);
      let braceCount = 0;
      let functionEnd = openParen;
      let inFunction = false;
      
      for (let j = openParen; j < content.length; j++) {
        if (content[j] === '{') {
          braceCount++;
          inFunction = true;
        } else if (content[j] === '}') {
          braceCount--;
          if (inFunction && braceCount === 0) {
            functionEnd = j + 1;
            break;
          }
        }
      }
      
      if (functionEnd > openParen) {
        // Extract function body
        const functionBody = content.slice(functionStart, functionEnd);
        
        // Create new function name
        const newFunctionName = functionName.charAt(0).toLowerCase() + functionName.slice(1);
        
        // Replace export function with internal function
        const internalFunction = functionBody.replace(
          `export ${func.fullMatch.includes('async') ? 'async ' : ''}function ${functionName}`,
          `async function ${newFunctionName}`
        );
        
        // Add export with withApiKey wrapper
        const exportWithWrapper = `export const ${functionName.toUpperCase()} = withApiKey(${newFunctionName});`;
        
        // Replace in content
        content = content.slice(0, functionStart) + 
          internalFunction + '\n\n' + exportWithWrapper + 
          content.slice(functionEnd);
      }
    }
    
    // Write updated content
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔐 Applying API Key Middleware to All API Routes\n');
  
  const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
  const routes = findApiRoutes(apiDir);
  
  console.log(`Found ${routes.length} API route files\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const route of routes) {
    const result = applyApiKeyMiddleware(route);
    if (result === true) {
      updated++;
    } else if (result === false) {
      skipped++;
    } else {
      errors++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Updated: ${updated} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`❌ Errors: ${errors} files`);
  
  if (updated > 0) {
    console.log('\n🎉 API Key middleware applied successfully!');
    console.log('🔑 All API routes now require the x-api-key header');
    console.log('📝 Excluded routes: /api/auth/login, /api/auth/register, /api/payment/webhook');
  }
}

main();

