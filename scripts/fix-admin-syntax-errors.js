const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix syntax error: remove extra comma and object
    const syntaxErrorPattern = /apiClient\.get\([^)]+\)\s*,\s*\{\s*headers:\s*\{[^}]*\}\s*\}/g;
    if (syntaxErrorPattern.test(content)) {
      content = content.replace(syntaxErrorPattern, (match) => {
        // Extract just the apiClient.get part
        const apiCallMatch = match.match(/apiClient\.get\([^)]+\)/);
        return apiCallMatch ? apiCallMatch[0] : match;
      });
      modified = true;
    }

    // Fix response handling for different data types
    const responsePatterns = [
      // Categories
      {
        pattern: /if \(response\.success\) \{\s*setCategories\(response\.data\.categories \|\| \[\]\);/g,
        replacement: 'if (response.success) {\n        setCategories(response.data.categories || []);'
      },
      // Types  
      {
        pattern: /if \(response\.success\) \{\s*setTypes\(response\.data\.types \|\| \[\]\);/g,
        replacement: 'if (response.success) {\n        setTypes(response.data.types || []);'
      },
      // Tags
      {
        pattern: /if \(response\.success\) \{\s*setTags\(response\.data\.tags \|\| \[\]\);/g,
        replacement: 'if (response.success) {\n        setTags(response.data.tags || []);'
      }
    ];

    for (const { pattern, replacement } of responsePatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }

    // Fix old response handling patterns
    const oldPatterns = [
      // Old fetch response handling
      {
        pattern: /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setCategories\(data\);/g,
        replacement: 'if (response.success) {\n        setCategories(response.data.categories || []);'
      },
      {
        pattern: /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setTypes\(data\);/g,
        replacement: 'if (response.success) {\n        setTypes(response.data.types || []);'
      },
      {
        pattern: /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setTags\(data\);/g,
        replacement: 'if (response.success) {\n        setTags(response.data.tags || []);'
      }
    ];

    for (const { pattern, replacement } of oldPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }

    // Fix form submission endpoints
    const formSubmitPatterns = [
      // Fix POST endpoints
      {
        pattern: /apiClient\.post\('\/api\/admin\/(categories|types|tags)', formData/g,
        replacement: "apiClient.post('/api/admin/$1', formData"
      },
      // Fix PUT endpoints
      {
        pattern: /apiClient\.put\('\/api\/admin\/(categories|types|tags)\/\$\{.*?\}', formData/g,
        replacement: "apiClient.put(`/api/admin/$1/${editingCategory?._id || editingType?._id || editingTag?._id}`, formData"
      },
      // Fix DELETE endpoints
      {
        pattern: /apiClient\.delete\('\/api\/admin\/(categories|types|tags)\/\$\{.*?\}'/g,
        replacement: "apiClient.delete(`/api/admin/$1/${id}`"
      }
    ];

    for (const { pattern, replacement } of formSubmitPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }

    // Ensure proper response handling in form submissions
    const formResponsePattern = /if \(response\.success\) \{\s*await fetchCategories\(\);/g;
    if (formResponsePattern.test(content)) {
      content = content.replace(formResponsePattern, 'if (response.success) {\n        await fetchCategories();');
      modified = true;
    }

    const formResponsePattern2 = /if \(response\.success\) \{\s*await fetchTypes\(\);/g;
    if (formResponsePattern2.test(content)) {
      content = content.replace(formResponsePattern2, 'if (response.success) {\n        await fetchTypes();');
      modified = true;
    }

    const formResponsePattern3 = /if \(response\.success\) \{\s*await fetchTags\(\);/g;
    if (formResponsePattern3.test(content)) {
      content = content.replace(formResponsePattern3, 'if (response.success) {\n        await fetchTags();');
      modified = true;
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
  console.log('🔧 Fixing admin syntax errors and response handling...');
  
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
  console.log('- Removed syntax errors from API calls');
  console.log('- Fixed response handling for new API structure');
  console.log('- Updated form submission endpoints');
  console.log('- Ensured proper data extraction from responses');
}

main();
