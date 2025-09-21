# 🎨 Haya Color System

A comprehensive, easy-to-edit color system for the Haya design system built with Next.js and Tailwind CSS.

## 📁 File Structure

```
src/
├── lib/
│   ├── colors.ts              # Main color definitions
│   └── color-usage.md         # Usage documentation
├── app/
│   ├── globals.css            # CSS custom properties
│   └── colors/
│       └── page.tsx           # Color visualization page
├── components/
│   └── ui/
│       └── ColorPicker.tsx    # Interactive color picker
scripts/
└── update-colors.js           # Color update utility
```

## 🚀 Quick Start

### 1. View All Colors
Visit `/colors` in your browser to see all colors with interactive examples.

### 2. Use Colors in Components
```tsx
// Tailwind CSS classes
<div className="bg-primary-500 text-white">Primary Button</div>
<div className="bg-secondary-100 text-secondary-900">Secondary Content</div>

// CSS custom properties
<div style={{ backgroundColor: 'var(--color-primary-500)' }}>Styled Element</div>

// TypeScript imports
import { colors } from '@/lib/colors';
const primaryColor = colors.primary[500];
```

### 3. Update Colors from Figma
```bash
# Run the color update script
node scripts/update-colors.js

# Or manually edit the files:
# - src/lib/colors.ts
# - src/app/globals.css
```

## 🎯 Color Palettes

### Primary Colors
Main brand colors for primary actions and branding.
- **Usage**: Buttons, links, brand elements
- **Tailwind**: `bg-primary-500`, `text-primary-600`, etc.

### Secondary Colors
Supporting colors for secondary elements and backgrounds.
- **Usage**: Secondary buttons, backgrounds, borders
- **Tailwind**: `bg-secondary-100`, `text-secondary-700`, etc.

### Accent Colors
Highlight colors for special elements and call-to-actions.
- **Usage**: Accent buttons, highlights, special features
- **Tailwind**: `bg-accent-500`, `text-accent-600`, etc.

### Status Colors
Colors for different states and feedback.
- **Success**: `bg-success-100`, `text-success-800`
- **Warning**: `bg-warning-100`, `text-warning-800`
- **Error**: `bg-error-100`, `text-error-800`
- **Info**: `bg-info-100`, `text-info-800`

### Special Colors
Unique colors for specific design elements.
- **Gold**: `bg-gold-500`, `text-gold-600`
- **Purple**: `bg-purple-500`, `text-purple-600`
- **Teal**: `bg-teal-500`, `text-teal-600`

### Semantic Colors
Context-specific colors for consistent UI patterns.
- **Backgrounds**: `bg-background-primary`, `bg-background-secondary`
- **Text**: `text-text-primary`, `text-text-secondary`
- **Borders**: `border-border-primary`, `border-border-focus`

## 🔧 Customization

### Updating Colors from Figma

1. **Extract colors from Figma**:
   - Use Figma's "Inspect" panel
   - Copy hex values for each color shade

2. **Update the color files**:
   ```bash
   # Run the update script
   node scripts/update-colors.js
   
   # Or manually edit:
   # - src/lib/colors.ts (TypeScript definitions)
   # - src/app/globals.css (CSS custom properties)
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

### Adding New Color Palettes

1. **Add to TypeScript definitions** (`src/lib/colors.ts`):
   ```typescript
   export const colors = {
     // ... existing palettes
     newPalette: {
       50: '#f0f9ff',
       100: '#e0f2fe',
       // ... other shades
       950: '#0c4a6e',
     },
   };
   ```

2. **Add to Tailwind config** (`tailwind.config.js`):
   ```javascript
   colors: {
     // ... existing colors
     newPalette: colors.newPalette,
   }
   ```

3. **Add CSS custom properties** (`src/app/globals.css`):
   ```css
   :root {
     /* ... existing variables */
     --color-new-palette-50: #f0f9ff;
     --color-new-palette-100: #e0f2fe;
     /* ... other shades */
   }
   ```

## 📱 Usage Examples

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
<input 
  className="w-full px-3 py-2 border border-border-primary rounded-md focus:border-border-focus focus:ring-1 focus:ring-border-focus"
  type="email"
/>
```

## 🎨 Color Shade System

Each color palette includes 10 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950):

- **50-200**: Lightest shades, used for backgrounds and subtle elements
- **300-400**: Light shades, used for borders and secondary elements
- **500**: Base color, used for primary elements
- **600-700**: Dark shades, used for hover states and emphasis
- **800-950**: Darkest shades, used for text and high contrast elements

## ♿ Accessibility

- Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Use color as an enhancement, not the only way to convey information
- Test with colorblind users in mind
- Provide alternative indicators for status (icons, text, etc.)

## 🛠️ Tools & Resources

- **Color Visualization**: Visit `/colors` in your browser
- **Color Update Script**: `node scripts/update-colors.js`
- **Color Shade Generators**:
  - [Coolors](https://coolors.co/)
  - [UI Colors](https://uicolors.app/create)
  - [Tailwind Shades](https://www.tailwindshades.com/)

## 📝 Best Practices

1. **Use semantic colors** for consistent UI patterns
2. **Follow the shade hierarchy** (50-950) for proper contrast
3. **Test accessibility** with color contrast tools
4. **Use status colors** for user feedback
5. **Keep special colors** for unique design elements only
6. **Document color usage** in your component library

## 🔄 Updates

To update colors from your Figma design:

1. Copy the new color values from Figma
2. Run `node scripts/update-colors.js`
3. Follow the prompts to update colors
4. Restart your development server
5. Test the changes on the `/colors` page

---

**Need help?** Check the `/colors` page in your browser for interactive examples and testing tools.

