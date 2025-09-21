const fs = require('fs');
const path = require('path');

// Mapping of old endpoints to new endpoints
const endpointMappings = {
  '/api/admin/tours/categories': '/api/admin/categories?entityType=tour',
  '/api/admin/tours/types': '/api/admin/types?entityType=tour',
  '/api/admin/tours/tags': '/api/admin/tags?entityType=tour',
  '/api/admin/visas/categories': '/api/admin/categories?entityType=visa',
  '/api/admin/visas/types': '/api/admin/types?entityType=visa',
  '/api/admin/visas/tags': '/api/admin/tags?entityType=visa',
  '/api/admin/flights/categories': '/api/admin/categories?entityType=flight',
  '/api/admin/flights/types': '/api/admin/types?entityType=flight',
  '/api/admin/flights/tags': '/api/admin/tags?entityType=flight',
  '/api/admin/hotels/categories': '/api/admin/categories?entityType=hotel',
  '/api/admin/hotels/types': '/api/admin/types?entityType=hotel',
  '/api/admin/hotels/tags': '/api/admin/tags?entityType=hotel',
};

// Entity type mappings for form data
const entityTypeMappings = {
  'tours': 'tour',
  'visas': 'visa',
  'flights': 'flight',
  'hotels': 'hotel',
  'packages': 'package'
};

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix fetch calls
    for (const [oldEndpoint, newEndpoint] of Object.entries(endpointMappings)) {
      const oldPattern = new RegExp(`fetch\\('${oldEndpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g');
      const newPattern = `apiClient.get('${newEndpoint}', { requireAuth: true, token })`;
      
      if (content.includes(oldEndpoint)) {
        content = content.replace(oldPattern, newPattern);
        modified = true;
      }
    }

    // Fix API client calls with old endpoints
    for (const [oldEndpoint, newEndpoint] of Object.entries(endpointMappings)) {
      const oldPattern = new RegExp(`apiClient\\.get\\('${oldEndpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g');
      const newPattern = `apiClient.get('${newEndpoint}'`;
      
      if (content.includes(oldEndpoint)) {
        content = content.replace(oldPattern, newPattern);
        modified = true;
      }
    }

    // Fix form submission endpoints
    for (const [oldEndpoint, newEndpoint] of Object.entries(endpointMappings)) {
      const baseEndpoint = oldEndpoint.split('/').slice(0, -1).join('/');
      const newBaseEndpoint = newEndpoint.split('?')[0];
      
      // Fix POST endpoints
      const postPattern = new RegExp(`'${oldEndpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g');
      if (content.includes(oldEndpoint)) {
        content = content.replace(postPattern, `'${newBaseEndpoint}'`);
        modified = true;
      }

      // Fix PUT/DELETE endpoints with IDs
      const idPattern = new RegExp(`'${baseEndpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/\\$\\{.*\\}'`, 'g');
      if (content.includes(baseEndpoint)) {
        content = content.replace(idPattern, `'${newBaseEndpoint}/' + $&`);
        modified = true;
      }
    }

    // Add entityType to form data
    const entityType = path.dirname(filePath).split('/').pop();
    if (entityTypeMappings[entityType]) {
      // Look for form submission and add entityType
      const formSubmitPattern = /(const.*=.*\{[^}]*)(\}[^}]*apiClient\.(post|put))/;
      if (formSubmitPattern.test(content)) {
        content = content.replace(
          formSubmitPattern,
          (match, formData, rest) => {
            if (!formData.includes('entityType')) {
              return formData + `,\n        entityType: '${entityTypeMappings[entityType]}'` + rest;
            }
            return match;
          }
        );
        modified = true;
      }
    }

    // Fix response handling for new API structure
    if (content.includes('response.ok')) {
      content = content.replace(
        /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setCategories\(data\);/g,
        'if (response.success) {\n        setCategories(response.data.categories || []);'
      );
      content = content.replace(
        /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setTypes\(data\);/g,
        'if (response.success) {\n        setTypes(response.data.types || []);'
      );
      content = content.replace(
        /if \(response\.ok\) \{\s*const data = await response\.json\(\);\s*setTags\(data\);/g,
        'if (response.success) {\n        setTags(response.data.tags || []);'
      );
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
  console.log('🔧 Fixing admin API endpoints...');
  
  const adminDir = path.join(__dirname, '..', 'src', 'app', 'admin');
  const adminPages = findAdminPages(adminDir);
  
  let fixedCount = 0;
  
  for (const filePath of adminPages) {
    if (fixFile(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} admin pages!`);
  console.log('\n📋 Summary of changes:');
  console.log('- Updated fetch calls to use apiClient');
  console.log('- Fixed API endpoints to use centralized routes');
  console.log('- Added entityType to form data');
  console.log('- Updated response handling for new API structure');
}

main();
