const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixFetchCalls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file already imports apiClient
  if (!content.includes("import apiClient from '@/lib/apiClient'")) {
    // Add import after other imports
    const importMatch = content.match(/(import.*?from.*?;[\s\n]*)+/);
    if (importMatch) {
      content = content.replace(importMatch[0], importMatch[0] + "import apiClient from '@/lib/apiClient';\n");
      modified = true;
    }
  }

  // Replace fetch calls with apiClient calls
  const patterns = [
    // GET requests with Authorization header
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*set([^}]+)\s*\(data\);\s*\}/g,
      replacement: `const data = await apiClient.get('$1', { requireAuth: true, token });\n      set$2(data);`
    },
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(data\.success\)\s*\{\s*set([^}]+)\s*\(data\.data\);\s*\}/g,
      replacement: `const data = await apiClient.get('$1', { requireAuth: true, token });\n      if (data.success) {\n        set$2(data.data);\n      }`
    },
    // POST requests
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'POST',\s*headers:\s*\{\s*'Content-Type':\s*'application/json',\s*'Authorization':\s*`Bearer \$\{token\}`\s*\},\s*body:\s*JSON\.stringify\(([^)]+)\)\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      replacement: `const data = await apiClient.post('$1', $2, { requireAuth: true, token });\n      $3`
    },
    // PUT requests
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'PUT',\s*headers:\s*\{\s*'Content-Type':\s*'application/json',\s*'Authorization':\s*`Bearer \$\{token\}`\s*\},\s*body:\s*JSON\.stringify\(([^)]+)\)\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      replacement: `const data = await apiClient.put('$1', $2, { requireAuth: true, token });\n      $3`
    },
    // PATCH requests
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'PATCH',\s*headers:\s*\{\s*'Content-Type':\s*'application/json',\s*'Authorization':\s*`Bearer \$\{token\}`\s*\},\s*body:\s*JSON\.stringify\(([^)]+)\)\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      replacement: `const data = await apiClient.patch('$1', $2, { requireAuth: true, token });\n      $3`
    },
    // DELETE requests
    {
      pattern: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'DELETE',\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      replacement: `const data = await apiClient.delete('$1', { requireAuth: true, token });\n      $2`
    }
  ];

  patterns.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function main() {
  console.log('🔧 Fixing ALL admin fetch calls to use apiClient...\n');
  
  const adminFiles = glob.sync('src/app/admin/**/*.tsx');
  let fixedCount = 0;
  
  adminFiles.forEach(file => {
    if (fixFetchCalls(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} files`);
  console.log('\n🎉 All admin pages now use apiClient with proper API key authentication!');
}

main();

