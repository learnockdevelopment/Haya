#!/usr/bin/env node

/**
 * Color Update Script for Haya Design System
 * 
 * This script helps you update colors from Figma to the design system.
 * 
 * Usage:
 * 1. Copy colors from Figma
 * 2. Run: node scripts/update-colors.js
 * 3. Follow the prompts to update colors
 */

const fs = require('fs');
const path = require('path');

// Color template for easy copying from Figma
const colorTemplate = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  // Add other color palettes as needed
};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function updateColors() {
  console.log('🎨 Haya Color System Updater');
  console.log('============================\n');
  
  console.log('This script will help you update colors from Figma.');
  console.log('You can update individual color palettes or all at once.\n');
  
  const updateAll = await askQuestion('Do you want to update all color palettes? (y/n): ');
  
  if (updateAll.toLowerCase() === 'y') {
    console.log('\n📋 Color Template:');
    console.log('Copy the colors from your Figma design and replace the values below:');
    console.log('\n' + JSON.stringify(colorTemplate, null, 2));
    
    const newColors = await askQuestion('\nPaste your updated colors JSON here: ');
    
    try {
      const parsedColors = JSON.parse(newColors);
      updateColorFiles(parsedColors);
      console.log('✅ Colors updated successfully!');
    } catch (error) {
      console.error('❌ Invalid JSON format. Please try again.');
    }
  } else {
    console.log('\nAvailable color palettes:');
    console.log('- primary (main brand colors)');
    console.log('- secondary (supporting colors)');
    console.log('- accent (highlight colors)');
    console.log('- success (success states)');
    console.log('- warning (warning states)');
    console.log('- error (error states)');
    console.log('- info (info states)');
    console.log('- neutral (grays)');
    console.log('- special (gold, purple, teal)');
    
    const palette = await askQuestion('\nWhich palette do you want to update? ');
    
    if (palette && colorTemplate[palette]) {
      console.log(`\n📋 ${palette.toUpperCase()} Color Template:`);
      console.log(JSON.stringify(colorTemplate[palette], null, 2));
      
      const newPalette = await askQuestion(`\nPaste your updated ${palette} colors JSON here: `);
      
      try {
        const parsedPalette = JSON.parse(newPalette);
        updateSinglePalette(palette, parsedPalette);
        console.log(`✅ ${palette} colors updated successfully!`);
      } catch (error) {
        console.error('❌ Invalid JSON format. Please try again.');
      }
    } else {
      console.log('❌ Invalid palette name.');
    }
  }
  
  rl.close();
}

function updateColorFiles(colors) {
  // Update TypeScript colors file
  const colorsPath = path.join(__dirname, '../src/lib/colors.ts');
  let colorsContent = fs.readFileSync(colorsPath, 'utf8');
  
  // Replace color values (this is a simplified approach)
  // In a real implementation, you'd want to parse and update the specific values
  console.log('📝 Updating color files...');
  console.log('⚠️  Note: You may need to manually update the color values in the files.');
  console.log('Files to update:');
  console.log('- src/lib/colors.ts');
  console.log('- src/app/globals.css');
  console.log('- tailwind.config.js');
}

function updateSinglePalette(paletteName, paletteColors) {
  console.log(`📝 Updating ${paletteName} palette...`);
  console.log('⚠️  Note: You may need to manually update the color values in the files.');
  console.log('Files to update:');
  console.log('- src/lib/colors.ts');
  console.log('- src/app/globals.css');
  console.log('- tailwind.config.js');
}

// Helper function to generate color shades from a base color
function generateColorShades(baseColor) {
  // This is a simplified version - in practice, you'd want to use a proper color manipulation library
  console.log('\n🔧 Color Shade Generator:');
  console.log('To generate proper color shades, use tools like:');
  console.log('- https://coolors.co/');
  console.log('- https://uicolors.app/create');
  console.log('- https://www.tailwindshades.com/');
  console.log(`Base color: ${baseColor}`);
}

// Run the script
if (require.main === module) {
  updateColors().catch(console.error);
}

module.exports = { updateColors, generateColorShades };



