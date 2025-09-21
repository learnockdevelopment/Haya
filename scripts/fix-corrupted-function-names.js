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

function fixCorruptedFunctionNames(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix corrupted function names like gET, pOST, etc.
    const functionNameRegex = /async function (gET|pOST|pUT|dELETE|pATCH)\(/g;
    const matches = content.match(functionNameRegex);
    
    if (matches) {
      matches.forEach(match => {
        const corruptedName = match.match(/async function (gET|pOST|pUT|dELETE|pATCH)\(/)[1];
        const correctName = corruptedName.toLowerCase();
        const newFunctionName = correctName + 'Handler';
        
        // Replace function definition
        content = content.replace(
          new RegExp(`async function ${corruptedName}\\(`, 'g'),
          `async function ${newFunctionName}(`
        );
        
        // Replace export statement
        content = content.replace(
          new RegExp(`export const ${corruptedName.toUpperCase()} = withApiKey\\(${corruptedName}\\);`, 'g'),
          `export const ${corruptedName.toUpperCase()} = withApiKey(${newFunctionName});`
        );
        
        modified = true;
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed corrupted function names in ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No corrupted function names found in ${filePath}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing Corrupted Function Names in API Routes\n');
  
  const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
  const routes = findApiRoutes(apiDir);
  
  console.log(`Found ${routes.length} API route files\n`);
  
  let fixed = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const route of routes) {
    const result = fixCorruptedFunctionNames(route);
    if (result === true) {
      fixed++;
    } else if (result === false) {
      skipped++;
    } else {
      errors++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Fixed: ${fixed} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`❌ Errors: ${errors} files`);
  
  if (fixed > 0) {
    console.log('\n🎉 Corrupted function names fixed successfully!');
    console.log('🔄 Restart your development server to apply changes');
  }
}

main();

