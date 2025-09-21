const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixMalformedAPI(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix malformed JWT verification blocks
  const malformedPattern = /\/\*\s*const decoded = jwt\.verify\([^}]+}\s*\/\*/, { status: 403 }\);\s*}/g;
  
  if (malformedPattern.test(content)) {
    content = content.replace(malformedPattern, `/*
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    */`);
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
  console.log('🔧 Fixing malformed API routes...\n');
  
  const apiFiles = glob.sync('src/app/api/admin/**/*.ts');
  let fixedCount = 0;
  
  apiFiles.forEach(file => {
    if (fixMalformedAPI(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} malformed API routes`);
}

main();

