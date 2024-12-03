import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({ value, children, onValueChange }: TabsTriggerProps) {
  return (
    <button
      onClick={() => onValueChange?.(value)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${value === value
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-600 hover:text-gray-900'
        }`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  return (
    <div className="mt-4 rounded-lg bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}