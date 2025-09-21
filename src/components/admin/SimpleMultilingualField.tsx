'use client';

import React from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

interface MultilingualContent {
  [key: string]: string | string[];
}

interface SimpleMultilingualFieldProps {
  value: MultilingualContent;
  onChange: (value: MultilingualContent) => void;
  currentLanguage: Language;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  label?: string;
}

const SimpleMultilingualField: React.FC<SimpleMultilingualFieldProps> = ({
  value,
  onChange,
  currentLanguage,
  type = 'text',
  placeholder = '',
  required = false,
  rows = 3,
  className = '',
  label
}) => {
  const getCurrentValue = () => {
    if (!currentLanguage) {
      return type === 'array' ? [] : '';
    }
    if (type === 'array') {
      return (value[currentLanguage.code] as string[]) || [];
    }
    return (value[currentLanguage.code] as string) || '';
  };

  const handleValueChange = (newValue: string | string[]) => {
    if (!currentLanguage) return;
    
    const updatedValue = {
      ...value,
      [currentLanguage.code]: newValue
    };
    onChange(updatedValue);
  };

  const handleArrayItemChange = (index: number, newItem: string) => {
    if (type === 'array' && currentLanguage) {
      const currentArray = getCurrentValue() as string[];
      const updatedArray = [...currentArray];
      updatedArray[index] = newItem;
      handleValueChange(updatedArray);
    }
  };

  const addArrayItem = () => {
    if (type === 'array' && currentLanguage) {
      const currentArray = getCurrentValue() as string[];
      handleValueChange([...currentArray, '']);
    }
  };

  const removeArrayItem = (index: number) => {
    if (type === 'array' && currentLanguage) {
      const currentArray = getCurrentValue() as string[];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      handleValueChange(updatedArray);
    }
  };

  const renderInput = () => {
    if (type === 'array') {
      const arrayValue = getCurrentValue() as string[];
      return (
        <div className="space-y-2">
          {arrayValue.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayItemChange(index, e.target.value)}
                placeholder={`${placeholder} ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                dir={currentLanguage.rtl ? 'rtl' : 'ltr'}
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addArrayItem}
            className="px-4 py-2 text-primary-600 hover:text-primary-800 border border-primary-300 rounded-md"
          >
            + Add Item
          </button>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          value={getCurrentValue() as string}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          dir={currentLanguage.rtl ? 'rtl' : 'ltr'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
        />
      );
    }

    return (
      <input
        type="text"
        value={getCurrentValue() as string}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        dir={currentLanguage.rtl ? 'rtl' : 'ltr'}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      />
    );
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {renderInput()}
      
      {/* Language indicator */}
      {currentLanguage && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.nativeName}</span>
          {currentLanguage.rtl && <span className="text-orange-500">RTL</span>}
        </div>
      )}
    </div>
  );
};

export default SimpleMultilingualField;

