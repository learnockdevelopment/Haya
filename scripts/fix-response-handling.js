const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix direct data assignment instead of response.data
    const patterns = [
      // Categories
      {
        pattern: /const data = await apiClient\.get\('\/api\/admin\/categories[^']*',[^}]*\}\);\s*setCategories\(data\);/g,
        replacement: `const response = await apiClient.get('/api/admin/categories?entityType=tour', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setCategories(response.data.categories || []);
      }`
      },
      // Types
      {
        pattern: /const data = await apiClient\.get\('\/api\/admin\/types[^']*',[^}]*\}\);\s*setTypes\(data\);/g,
        replacement: `const response = await apiClient.get('/api/admin/types?entityType=tour', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setTypes(response.data.types || []);
      }`
      },
      // Tags
      {
        pattern: /const data = await apiClient\.get\('\/api\/admin\/tags[^']*',[^}]*\}\);\s*setTags\(data\);/g,
        replacement: `const response = await apiClient.get('/api/admin/tags?entityType=tour', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setTags(response.data.tags || []);
      }`
      }
    ];

    for (const { pattern, replacement } of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }

    // Fix entity type specific patterns
    const entityTypes = ['tour', 'visa', 'flight', 'hotel', 'package'];
    
    for (const entityType of entityTypes) {
      // Categories
      const categoryPattern = new RegExp(`const data = await apiClient\\.get\\('/api/admin/categories\\?entityType=${entityType}',[^}]*\\}\\);\\s*setCategories\\(data\\);`, 'g');
      const categoryReplacement = `const response = await apiClient.get('/api/admin/categories?entityType=${entityType}', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setCategories(response.data.categories || []);
      }`;
      
      if (categoryPattern.test(content)) {
        content = content.replace(categoryPattern, categoryReplacement);
        modified = true;
      }

      // Types
      const typePattern = new RegExp(`const data = await apiClient\\.get\\('/api/admin/types\\?entityType=${entityType}',[^}]*\\}\\);\\s*setTypes\\(data\\);`, 'g');
      const typeReplacement = `const response = await apiClient.get('/api/admin/types?entityType=${entityType}', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setTypes(response.data.types || []);
      }`;
      
      if (typePattern.test(content)) {
        content = content.replace(typePattern, typeReplacement);
        modified = true;
      }

      // Tags
      const tagPattern = new RegExp(`const data = await apiClient\\.get\\('/api/admin/tags\\?entityType=${entityType}',[^}]*\\}\\);\\s*setTags\\(data\\);`, 'g');
      const tagReplacement = `const response = await apiClient.get('/api/admin/tags?entityType=${entityType}', {
        requireAuth: true,
        token,
      });
      if (response.success) {
        setTags(response.data.tags || []);
      }`;
      
      if (tagPattern.test(content)) {
        content = content.replace(tagPattern, tagReplacement);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findAdminPages(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findAdminPages(fullPath));
    } else if (item.endsWith('.tsx') && item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function main() {
  console.log('🔧 Fixing response handling in admin pages...');
  
  const adminDir = path.join(__dirname, '..', 'src', 'app', 'admin');
  const adminPages = findAdminPages(adminDir);
  
  let fixedCount = 0;
  
  for (const filePath of adminPages) {
    if (fixFile(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} admin pages!`);
  console.log('\n📋 Summary of fixes:');
  console.log('- Fixed direct data assignment to use response.data');
  console.log('- Added proper response.success checks');
  console.log('- Ensured correct data extraction from API responses');
}

main();
