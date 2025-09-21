const fs = require('fs');
const path = require('path');
const glob = require('glob');

function addApiClientImport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has apiClient import
  if (content.includes("import apiClient from '@/lib/apiClient'")) {
    return false;
  }

  // Add apiClient import after other imports
  const importMatch = content.match(/(import.*?from.*?;[\s\n]*)+/);
  if (importMatch) {
    content = content.replace(importMatch[0], importMatch[0] + "import apiClient from '@/lib/apiClient';\n");
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added apiClient import: ${filePath}`);
    return true;
  }
  return false;
}

function main() {
  console.log('🔧 Adding apiClient import to admin pages...\n');
  
  const adminFiles = glob.sync('src/app/admin/**/*.tsx');
  let fixedCount = 0;
  
  adminFiles.forEach(file => {
    if (addApiClientImport(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Added apiClient import to ${fixedCount} files`);
}

main();

