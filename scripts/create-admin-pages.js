const fs = require('fs');
const path = require('path');

// Define all entities and their sub-entities
const entities = [
  { name: 'tours', displayName: 'Tour' },
  { name: 'flights', displayName: 'Flight' },
  { name: 'hotels', displayName: 'Hotel' },
  { name: 'visas', displayName: 'Visa' }
];

const subEntities = [
  { name: 'categories', displayName: 'Category', model: 'Category' },
  { name: 'types', displayName: 'Type', model: 'Type' },
  { name: 'tags', displayName: 'Tag', model: 'Tag' }
];

// Template for admin pages
const pageTemplate = (entityName, subEntityName, displayName, subDisplayName, model) => `'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

interface ${subDisplayName} {
  _id: string;
  ${subEntityName === 'tags' ? 'name' : 'title'}: string;
  ${subEntityName === 'tags' ? '' : 'description: string;'}
  ${subEntityName === 'tags' ? '' : 'shortDescription: string;'}
  ${subEntityName === 'categories' ? 'image?: string;' : subEntityName === 'types' ? 'icon?: string;' : ''}
  slug: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const ${displayName}${subDisplayName}sPage: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [${subEntityName}s, set${subDisplayName}s] = useState<${subDisplayName}[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editing${subDisplayName}, setEditing${subDisplayName}] = useState<${subDisplayName} | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    ${subEntityName === 'tags' ? 'name' : 'title'}: '',
    ${subEntityName === 'tags' ? '' : 'description: \'\','}
    ${subEntityName === 'tags' ? '' : 'shortDescription: \'\','}
    ${subEntityName === 'categories' ? 'image: \'\',' : subEntityName === 'types' ? 'icon: \'\',' : ''}
    type: '${entityName}'
  });

  useEffect(() => {
    fetch${subDisplayName}s();
  }, []);

  const fetch${subDisplayName}s = async () => {
    try {
      const response = await fetch('/api/admin/${entityName}/${subEntityName}', {
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        set${subDisplayName}s(data);
      }
    } catch (error) {
      console.error('Error fetching ${subEntityName}:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing${subDisplayName} 
        ? \`/api/admin/${entityName}/${subEntityName}/\${editing${subDisplayName}._id}\`
        : '/api/admin/${entityName}/${subEntityName}';
      
      const method = editing${subDisplayName} ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetch${subDisplayName}s();
        setShowCreateForm(false);
        setEditing${subDisplayName}(null);
        setFormData({
          ${subEntityName === 'tags' ? 'name' : 'title'}: '',
          ${subEntityName === 'tags' ? '' : 'description: \'\','}
          ${subEntityName === 'tags' ? '' : 'shortDescription: \'\','}
          ${subEntityName === 'categories' ? 'image: \'\',' : subEntityName === 'types' ? 'icon: \'\',' : ''}
          type: '${entityName}'
        });
      }
    } catch (error) {
      console.error('Error saving ${subEntityName}:', error);
    }
  };

  const handleEdit = (${subEntityName}: ${subDisplayName}) => {
    setEditing${subDisplayName}(${subEntityName});
    setFormData({
      ${subEntityName === 'tags' ? 'name' : 'title'}: ${subEntityName}.${subEntityName === 'tags' ? 'name' : 'title'},
      ${subEntityName === 'tags' ? '' : 'description: ${subEntityName}.description,'}
      ${subEntityName === 'tags' ? '' : 'shortDescription: ${subEntityName}.shortDescription,'}
      ${subEntityName === 'categories' ? 'image: ${subEntityName}.image || \'\',' : subEntityName === 'types' ? 'icon: ${subEntityName}.icon || \'\',' : ''}
      type: ${subEntityName}.type
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this ${subEntityName}?')) {
      try {
        const response = await fetch(\`/api/admin/${entityName}/${subEntityName}/\${id}\`, {
          method: 'DELETE',
          headers: {
            'Authorization': \`Bearer \${token}\`
          }
        });

        if (response.ok) {
          await fetch${subDisplayName}s();
        }
      } catch (error) {
        console.error('Error deleting ${subEntityName}:', error);
      }
    }
  };

  const filtered${subDisplayName}s = ${subEntityName}s.filter(${subEntityName} =>
    ${subEntityName}.${subEntityName === 'tags' ? 'name' : 'title'}.toLowerCase().includes(searchTerm.toLowerCase())${subEntityName === 'tags' ? '' : ' ||\n    ' + subEntityName + '.description.toLowerCase().includes(searchTerm.toLowerCase())'}
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">${displayName} ${subDisplayName}s</h1>
          <p className="text-gray-600">Manage ${entityName} ${subEntityName} and classifications</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add ${subDisplayName}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search ${subEntityName}..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editing${subDisplayName} ? 'Edit ${subDisplayName}' : 'Create New ${subDisplayName}'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            ${subEntityName === 'tags' ? `
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ${subDisplayName} Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Adventure, Luxury, Family"
                required
              />
            </div>` : `
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            ${subEntityName === 'categories' ? `
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>` : subEntityName === 'types' ? `
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (CSS class or emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                placeholder="e.g., 🏔️ or mountain-icon"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>` : ''}`}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editing${subDisplayName} ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditing${subDisplayName}(null);
                  setFormData({
                    ${subEntityName === 'tags' ? 'name' : 'title'}: '',
                    ${subEntityName === 'tags' ? '' : 'description: \'\','}
                    ${subEntityName === 'tags' ? '' : 'shortDescription: \'\','}
                    ${subEntityName === 'categories' ? 'image: \'\',' : subEntityName === 'types' ? 'icon: \'\',' : ''}
                    type: '${entityName}'
                  });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ${subDisplayName}s List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ${subEntityName === 'tags' ? 'Name' : 'Title'}
                </th>
                ${subEntityName === 'tags' ? '' : '<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>'}
                ${subEntityName === 'types' ? '<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>' : ''}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered${subDisplayName}s.map((${subEntityName}) => (
                <tr key={${subEntityName}._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${subEntityName === 'categories' ? `
                    <div className="flex items-center">
                      {${subEntityName}.image && (
                        <img
                          src={${subEntityName}.image}
                          alt={${subEntityName}.title}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {${subEntityName}.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {${subEntityName}.shortDescription}
                        </div>
                      </div>
                    </div>` : subEntityName === 'types' ? `
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {${subEntityName}.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {${subEntityName}.shortDescription}
                      </div>
                    </div>` : `
                    <div className="text-sm font-medium text-gray-900">
                      {${subEntityName}.name}
                    </div>`}
                  </td>
                  ${subEntityName === 'tags' ? '' : `
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {${subEntityName}.description}
                    </div>
                  </td>`}
                  ${subEntityName === 'types' ? `
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-2xl">
                      {${subEntityName}.icon || '📋'}
                    </div>
                  </td>` : ''}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {${subEntityName}.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {${subEntityName}.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(${subEntityName})}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(${subEntityName}._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered${subDisplayName}s.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No ${subEntityName} found</p>
        </div>
      )}
    </div>
  );
};

export default ${displayName}${subDisplayName}sPage;`;

// API route template
const apiRouteTemplate = (entityName, subEntityName, displayName, subDisplayName, model) => `import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ${model} from '@/models/${model}';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ${subEntityName}s = await ${model}.find({ type: '${entityName}' }).sort({ createdAt: -1 });
    return NextResponse.json(${subEntityName}s);
  } catch (error) {
    console.error('Error fetching ${entityName} ${subEntityName}:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { ${subEntityName === 'tags' ? 'name' : 'title'}, ${subEntityName === 'tags' ? '' : 'description, shortDescription, '}${subEntityName === 'categories' ? 'image, ' : subEntityName === 'types' ? 'icon, ' : ''}type = '${entityName}' } = body;

    const slug = ${subEntityName === 'tags' ? 'name' : 'title'}.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const ${subEntityName} = new ${model}({
      ${subEntityName === 'tags' ? 'name' : 'title'},
      ${subEntityName === 'tags' ? '' : 'description, shortDescription, '}${subEntityName === 'categories' ? 'image, ' : subEntityName === 'types' ? 'icon, ' : ''}slug,
      type
    });

    await ${subEntityName}.save();
    return NextResponse.json(${subEntityName}, { status: 201 });
  } catch (error) {
    console.error('Error creating ${entityName} ${subEntityName}:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}`;

// Individual API route template
const individualApiRouteTemplate = (entityName, subEntityName, displayName, subDisplayName, model) => `import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ${model} from '@/models/${model}';
import jwt from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ${subEntityName} = await ${model}.findOne({ _id: params.id, type: '${entityName}' });
    if (!${subEntityName}) {
      return NextResponse.json({ error: '${subDisplayName} not found' }, { status: 404 });
    }

    return NextResponse.json(${subEntityName});
  } catch (error) {
    console.error('Error fetching ${entityName} ${subEntityName}:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { ${subEntityName === 'tags' ? 'name' : 'title'}, ${subEntityName === 'tags' ? '' : 'description, shortDescription, '}${subEntityName === 'categories' ? 'image' : subEntityName === 'types' ? 'icon' : ''} } = body;

    const slug = ${subEntityName === 'tags' ? 'name' : 'title'}.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const ${subEntityName} = await ${model}.findOneAndUpdate(
      { _id: params.id, type: '${entityName}' },
      {
        ${subEntityName === 'tags' ? 'name' : 'title'},
        ${subEntityName === 'tags' ? '' : 'description, shortDescription, '}${subEntityName === 'categories' ? 'image, ' : subEntityName === 'types' ? 'icon, ' : ''}slug
      },
      { new: true }
    );

    if (!${subEntityName}) {
      return NextResponse.json({ error: '${subDisplayName} not found' }, { status: 404 });
    }

    return NextResponse.json(${subEntityName});
  } catch (error) {
    console.error('Error updating ${entityName} ${subEntityName}:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ${subEntityName} = await ${model}.findOneAndDelete({ _id: params.id, type: '${entityName}' });
    if (!${subEntityName}) {
      return NextResponse.json({ error: '${subDisplayName} not found' }, { status: 404 });
    }

    return NextResponse.json({ message: '${subDisplayName} deleted successfully' });
  } catch (error) {
    console.error('Error deleting ${entityName} ${subEntityName}:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}`;

// Create directories and files
function createDirectoriesAndFiles() {
  entities.forEach(entity => {
    subEntities.forEach(subEntity => {
      // Create page directory
      const pageDir = path.join('src', 'app', 'admin', entity.name, subEntity.name);
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }

      // Create page file
      const pageFile = path.join(pageDir, 'page.tsx');
      if (!fs.existsSync(pageFile)) {
        const pageContent = pageTemplate(entity.name, subEntity.name, entity.displayName, subEntity.displayName, subEntity.model);
        fs.writeFileSync(pageFile, pageContent);
        console.log(`Created: ${pageFile}`);
      }

      // Create API directory
      const apiDir = path.join('src', 'app', 'api', 'admin', entity.name, subEntity.name);
      if (!fs.existsSync(apiDir)) {
        fs.mkdirSync(apiDir, { recursive: true });
      }

      // Create API route file
      const apiFile = path.join(apiDir, 'route.ts');
      if (!fs.existsSync(apiFile)) {
        const apiContent = apiRouteTemplate(entity.name, subEntity.name, entity.displayName, subEntity.displayName, subEntity.model);
        fs.writeFileSync(apiFile, apiContent);
        console.log(`Created: ${apiFile}`);
      }

      // Create individual API directory
      const individualApiDir = path.join(apiDir, '[id]');
      if (!fs.existsSync(individualApiDir)) {
        fs.mkdirSync(individualApiDir, { recursive: true });
      }

      // Create individual API route file
      const individualApiFile = path.join(individualApiDir, 'route.ts');
      if (!fs.existsSync(individualApiFile)) {
        const individualApiContent = individualApiRouteTemplate(entity.name, subEntity.name, entity.displayName, subEntity.displayName, subEntity.model);
        fs.writeFileSync(individualApiFile, individualApiContent);
        console.log(`Created: ${individualApiFile}`);
      }
    });
  });
}

// Run the script
createDirectoriesAndFiles();
console.log('All admin pages and API routes created successfully!');



