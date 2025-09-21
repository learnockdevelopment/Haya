# Haya Design System - Color Usage Guide

## Overview
This guide explains how to use the Haya color system in your components and styles.

## Color Structure

### 1. Primary Colors
The main brand colors used for primary actions and branding.

**Usage:**
```tsx
// In React components
<div className="bg-primary-500 text-white">Primary Button</div>
<div className="bg-primary-100 text-primary-900">Light Primary</div>

// In CSS
.my-element {
  background-color: var(--color-primary-500);
  color: var(--color-primary-100);
}
```

### 2. Secondary Colors
Supporting colors for secondary elements and backgrounds.

**Usage:**
```tsx
<div className="bg-secondary-100 text-secondary-900">Secondary Content</div>
<div className="border-secondary-300">Secondary Border</div>
```

### 3. Accent Colors
Highlight colors for special elements and call-to-actions.

**Usage:**
```tsx
<div className="bg-accent-500 text-white">Accent Button</div>
<div className="text-accent-600">Accent Text</div>
```

### 4. Status Colors
Colors for different states and feedback.

**Usage:**
```tsx
// Success
<div className="bg-success-100 text-success-800 border-success-300">Success Message</div>

// Warning
<div className="bg-warning-100 text-warning-800 border-warning-300">Warning Message</div>

// Error
<div className="bg-error-100 text-error-800 border-error-300">Error Message</div>

// Info
<div className="bg-info-100 text-info-800 border-info-300">Info Message</div>
```

### 5. Special Colors
Unique colors for specific design elements.

**Usage:**
```tsx
// Gold for highlights
<div className="bg-gold-500 text-white">Gold Element</div>

// Purple for special features
<div className="bg-purple-500 text-white">Purple Element</div>

// Teal for accents
<div className="bg-teal-500 text-white">Teal Element</div>
```

### 6. Semantic Colors
Context-specific colors for consistent UI patterns.

**Usage:**
```tsx
// Backgrounds
<div className="bg-background-primary">Main Background</div>
<div className="bg-background-secondary">Secondary Background</div>
<div className="bg-background-tertiary">Tertiary Background</div>
<div className="bg-background-dark">Dark Background</div>

// Text
<div className="text-text-primary">Primary Text</div>
<div className="text-text-secondary">Secondary Text</div>
<div className="text-text-tertiary">Tertiary Text</div>
<div className="text-text-inverse">Inverse Text</div>
<div className="text-text-muted">Muted Text</div>

// Borders
<div className="border-border-primary">Primary Border</div>
<div className="border-border-secondary">Secondary Border</div>
<div className="border-border-focus">Focus Border</div>
<div className="border-border-error">Error Border</div>
```

### 7. Status Colors
Colors for user status and system states.

**Usage:**
```tsx
<div className="text-status-online">Online</div>
<div className="text-status-offline">Offline</div>
<div className="text-status-away">Away</div>
<div className="text-status-busy">Busy</div>
```

## Color Shades

Each color palette includes 10 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950):

- **50-200**: Lightest shades, used for backgrounds and subtle elements
- **300-400**: Light shades, used for borders and secondary elements
- **500**: Base color, used for primary elements
- **600-700**: Dark shades, used for hover states and emphasis
- **800-950**: Darkest shades, used for text and high contrast elements

## Usage Examples

### Buttons
```tsx
// Primary Button
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
  Primary Action
</button>

// Secondary Button
<button className="bg-secondary-100 hover:bg-secondary-200 text-secondary-900 px-4 py-2 rounded">
  Secondary Action
</button>

// Accent Button
<button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded">
  Accent Action
</button>
```

### Cards
```tsx
<div className="bg-background-primary border border-border-primary rounded-lg p-6 shadow-sm">
  <h3 className="text-text-primary text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-text-secondary">Card content goes here.</p>
</div>
```

### Alerts
```tsx
// Success Alert
<div className="bg-success-100 border border-success-300 text-success-800 px-4 py-3 rounded">
  Success message
</div>

// Error Alert
<div className="bg-error-100 border border-error-300 text-error-800 px-4 py-3 rounded">
  Error message
</div>
```

### Forms
```tsx
<div className="space-y-4">
  <div>
    <label className="block text-text-primary text-sm font-medium mb-1">
      Email
    </label>
    <input 
      className="w-full px-3 py-2 border border-border-primary rounded-md focus:border-border-focus focus:ring-1 focus:ring-border-focus"
      type="email"
    />
  </div>
</div>
```

## Customizing Colors

To update colors to match your Figma design:

1. **Edit the color values** in `src/lib/colors.ts`
2. **Update CSS variables** in `src/app/globals.css`
3. **Restart the development server** to see changes

### Example: Updating Primary Colors
```typescript
// In src/lib/colors.ts
primary: {
  50: '#your-lightest-color',
  100: '#your-very-light-color',
  // ... continue for all shades
  950: '#your-darkest-color',
},
```

## Best Practices

1. **Use semantic colors** for consistent UI patterns
2. **Follow the shade hierarchy** (50-950) for proper contrast
3. **Test accessibility** with color contrast tools
4. **Use status colors** for user feedback
5. **Keep special colors** for unique design elements only

## Accessibility

- Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Use color as an enhancement, not the only way to convey information
- Test with colorblind users in mind
- Provide alternative indicators for status (icons, text, etc.)

