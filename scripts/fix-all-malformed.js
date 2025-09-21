const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix the malformed pattern
  const pattern = /\*\/, { status: 403 }\);\s*}/g;
  
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
  console.log('🔧 Fixing all malformed API routes...\n');
  
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

