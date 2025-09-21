#!/bin/bash

echo "🔧 Fixing fetch calls in admin pages..."

# Find all admin tsx files and replace fetch calls
find src/app/admin -name "*.tsx" -type f | while read file; do
  echo "Processing: $file"
  
  # Replace GET requests with Authorization header
  sed -i 's/const response = await fetch('\''\([^'\'']*\)'\'', {[[:space:]]*headers: {[[:space:]]*'\''Authorization'\'': `Bearer ${token}`,[[:space:]]*}[[:space:]]*});[[:space:]]*const data = await response\.json();[[:space:]]*if (response\.ok) {[[:space:]]*set\([^}]*\)(data);[[:space:]]*}/const data = await apiClient.get('\''\1'\'', { requireAuth: true, token });\n      set\2(data);/g' "$file"
  
  # Replace GET requests with data.success check
  sed -i 's/const response = await fetch('\''\([^'\'']*\)'\'', {[[:space:]]*headers: {[[:space:]]*'\''Authorization'\'': `Bearer ${token}`,[[:space:]]*}[[:space:]]*});[[:space:]]*const data = await response\.json();[[:space:]]*if (data\.success) {[[:space:]]*set\([^}]*\)(data\.data);[[:space:]]*}/const data = await apiClient.get('\''\1'\'', { requireAuth: true, token });\n      if (data.success) {\n        set\2(data.data);\n      }/g' "$file"
  
  # Replace POST requests
  sed -i 's/const response = await fetch('\''\([^'\'']*\)'\'', {[[:space:]]*method: '\''POST'\'',[[:space:]]*headers: {[[:space:]]*'\''Content-Type'\'': '\''application\/json'\'',[[:space:]]*'\''Authorization'\'': `Bearer ${token}`[[:space:]]*},[[:space:]]*body: JSON\.stringify(\([^)]*\))[[:space:]]*});[[:space:]]*const data = await response\.json();[[:space:]]*if (response\.ok) {[[:space:]]*\([^}]*\)[[:space:]]*}/const data = await apiClient.post('\''\1'\'', \2, { requireAuth: true, token });\n      \3/g' "$file"
  
  # Replace DELETE requests
  sed -i 's/const response = await fetch('\''\([^'\'']*\)'\'', {[[:space:]]*method: '\''DELETE'\'',[[:space:]]*headers: {[[:space:]]*'\''Authorization'\'': `Bearer ${token}`,[[:space:]]*}[[:space:]]*});[[:space:]]*const data = await response\.json();[[:space:]]*if (response\.ok) {[[:space:]]*\([^}]*\)[[:space:]]*}/const data = await apiClient.delete('\''\1'\'', { requireAuth: true, token });\n      \2/g' "$file"
done

echo "✅ Fixed fetch calls in admin pages"

