const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixMongoDBImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix incorrect import syntax
  if (content.includes("import { connectDB } from '@/lib/mongodb'")) {
    content = content.replace(
      "import { connectDB } from '@/lib/mongodb'",
      "import connectDB from '@/lib/mongodb'"
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed MongoDB import: ${filePath}`);
    return true;
  }
  return false;
}

function main() {
  console.log('🔧 Fixing MongoDB import issues...\n');
  
  const apiFiles = glob.sync('src/app/api/**/*.ts');
  let fixedCount = 0;
  
  apiFiles.forEach(file => {
    if (fixMongoDBImports(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} MongoDB import issues`);
}

main();

