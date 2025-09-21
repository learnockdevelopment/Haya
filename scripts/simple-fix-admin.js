const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixAdminPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Skip if already has apiClient import
  if (content.includes("import apiClient from '@/lib/apiClient'")) {
    return false;
  }

  // Add apiClient import
  const importMatch = content.match(/(import.*?from.*?;[\s\n]*)+/);
  if (importMatch) {
    content = content.replace(importMatch[0], importMatch[0] + "import apiClient from '@/lib/apiClient';\n");
    modified = true;
  }

  // Simple replacements
  const replacements = [
    // GET requests
    {
      from: /const response = await fetch\('([^']+)',\s*\{\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*set([^}]+)\s*\(data\);\s*\}/g,
      to: `const data = await apiClient.get('$1', { requireAuth: true, token });\n      set$2(data);`
    },
    {
      from: /const response = await fetch\('([^']+)',\s*\{\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(data\.success\)\s*\{\s*set([^}]+)\s*\(data\.data\);\s*\}/g,
      to: `const data = await apiClient.get('$1', { requireAuth: true, token });\n      if (data.success) {\n        set$2(data.data);\n      }`
    },
    // POST requests
    {
      from: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'POST',\s*headers:\s*\{\s*'Content-Type':\s*'application/json',\s*'Authorization':\s*`Bearer \$\{token\}`\s*\},\s*body:\s*JSON\.stringify\(([^)]+)\)\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      to: `const data = await apiClient.post('$1', $2, { requireAuth: true, token });\n      $3`
    },
    // DELETE requests
    {
      from: /const response = await fetch\('([^']+)',\s*\{\s*method:\s*'DELETE',\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*\}\s*\}\);\s*const data = await response\.json\(\);\s*if \(response\.ok\)\s*\{\s*([^}]+)\s*\}/g,
      to: `const data = await apiClient.delete('$1', { requireAuth: true, token });\n      $2`
    }
  ];

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
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
  console.log('🔧 Fixing admin pages to use apiClient...\n');
  
  const adminFiles = glob.sync('src/app/admin/**/*.tsx');
  let fixedCount = 0;
  
  adminFiles.forEach(file => {
    if (fixAdminPage(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} admin pages`);
}

main();

