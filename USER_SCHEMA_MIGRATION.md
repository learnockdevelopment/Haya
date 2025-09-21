# User Schema Migration Guide

## Overview
This migration updates the user schema to use `fullName` and `userName` instead of separate `firstName` and `lastName` fields, and replaces the generic `name` field.

## Changes Made

### 1. User Model Updates
- **Removed**: `firstName`, `lastName`, `name` fields
- **Added**: `fullName` (required), `userName` (required, unique)
- **Updated**: Validation rules and indexes

### 2. API Endpoints Updated
- **Registration**: Now requires `fullName` and `userName`
- **Login**: Returns `fullName` and `userName` in response
- **Profile Update**: Handles `fullName` and `userName` updates with validation

### 3. Frontend Components Updated
- **Registration Form**: Two separate fields for full name and username
- **Profile Page**: Updated to show and edit full name and username
- **Navigation**: Displays username instead of name
- **Dashboard**: Welcomes user with full name

### 4. Validation Rules
- **fullName**: Required, 2-100 characters
- **userName**: Required, unique, 3-30 characters, alphanumeric + underscores only

## Migration Script

### Running the Migration
```bash
# Make sure your .env.local has the correct MONGODB_URI
node scripts/migrate-user-schema.js
```

### What the Migration Does
1. Finds all users with old schema
2. Migrates `name` field to `fullName`
3. Generates `userName` from email prefix (cleaned and validated)
4. Ensures username uniqueness by adding numbers if needed
5. Updates all affected user records

### Example Migration
- **Before**: `name: "John Doe"`, `email: "john.doe@example.com"`
- **After**: `fullName: "John Doe"`, `userName: "johndoe"`

## Breaking Changes

### For Existing Users
- Users will need to log in again after migration
- Username will be auto-generated from email
- Users can change their username in profile settings

### For Developers
- Update any code that references `user.name` to use `user.fullName`
- Update any code that references `user.firstName` or `user.lastName`
- Use `user.userName` for display purposes where appropriate

## Testing the Migration

1. **Before Migration**:
   ```bash
   # Check current user count
   node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { const User = mongoose.model('User', new mongoose.Schema({})); User.countDocuments().then(count => console.log('Users:', count)); });"
   ```

2. **Run Migration**:
   ```bash
   node scripts/migrate-user-schema.js
   ```

3. **After Migration**:
   - Test user registration with new fields
   - Test user login and profile display
   - Verify username uniqueness validation

## Rollback Plan

If you need to rollback:

1. **Database Level**: Restore from backup before migration
2. **Code Level**: Revert to previous commit with old schema
3. **Manual Fix**: Update users manually if needed

## Notes

- The migration is safe and non-destructive
- Original data is preserved during migration
- Username generation is deterministic and repeatable
- All existing functionality continues to work after migration



