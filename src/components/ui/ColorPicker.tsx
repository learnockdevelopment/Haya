'use client';

import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface ColorPickerProps {
  onColorSelect?: (color: string, palette: string, shade: string) => void;
  showAllPalettes?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  onColorSelect, 
  showAllPalettes = false 
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPalette, setSelectedPalette] = useState<string>('primary');
  const [selectedShade, setSelectedShade] = useState<string>('500');

  // Define the actual color palettes (not nested objects)
  const colorPalettes = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'];
  const specialPalettes = ['gold', 'purple', 'teal'];
  const allPalettes = [...colorPalettes, ...specialPalettes];
  
  const palettes = showAllPalettes ? allPalettes : ['primary', 'secondary', 'accent'];

  const handleColorClick = (color: string, palette: string, shade: string) => {
    setSelectedColor(color);
    setSelectedPalette(palette);
    setSelectedShade(shade);
    onColorSelect?.(color, palette, shade);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Selected Color Display */}
      {selectedColor && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Selected Color</h3>
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg border-2 border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
            <div>
              <p className="font-mono text-sm">
                {selectedPalette}-{selectedShade}: {selectedColor}
              </p>
              <p className="text-sm text-gray-600">
                Tailwind: bg-{selectedPalette}-{selectedShade}
              </p>
              <button
                onClick={() => copyToClipboard(selectedColor)}
                className="mt-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Copy Color
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Palettes */}
      <div className="space-y-4">
        {palettes.map((paletteName) => {
          // Handle special palettes that are nested under colors.special
          const palette = specialPalettes.includes(paletteName) 
            ? colors.special[paletteName as keyof typeof colors.special]
            : colors[paletteName as keyof typeof colors];
          
          if (typeof palette !== 'object' || !palette) return null;

          return (
            <div key={paletteName} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize">
                {paletteName} Colors
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(palette).map(([shade, color]) => (
                  <div
                    key={`${paletteName}-${shade}`}
                    className="group cursor-pointer"
                    onClick={() => handleColorClick(color, paletteName, shade)}
                  >
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                    />
                    <div className="mt-1 text-center">
                      <p className="text-xs font-mono">{shade}</p>
                      <p className="text-xs text-gray-600 truncate">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Buttons</h4>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600">
                Primary
              </button>
              <button className="px-4 py-2 bg-secondary-500 text-white rounded hover:bg-secondary-600">
                Secondary
              </button>
              <button className="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600">
                Accent
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="space-x-2">
              <span className="px-2 py-1 bg-success-100 text-success-800 rounded text-sm">
                Success
              </span>
              <span className="px-2 py-1 bg-warning-100 text-warning-800 rounded text-sm">
                Warning
              </span>
              <span className="px-2 py-1 bg-error-100 text-error-800 rounded text-sm">
                Error
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
