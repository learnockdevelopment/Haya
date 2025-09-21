const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix duplicate comment endings
  const pattern = /\*\/\s*\*\//g;
  
  if (pattern.test(content)) {
    content = content.replace(pattern, '*/');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function main() {
  console.log('🔧 Fixing duplicate comment endings...\n');
  
  const apiFiles = glob.sync('src/app/api/admin/**/*.ts');
  let fixedCount = 0;
  
  apiFiles.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} files`);
}

main();

