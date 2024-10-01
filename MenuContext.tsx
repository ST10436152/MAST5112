//MenuContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export type MenuItem = {
  dishName: string;
  description: string;
  course: string;
  price: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (dishName: string) => void; // Add this line
};

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { dishName: 'Bruschetta', description: 'Grilled bread with toppings', course: 'Starters', price: '65.00' },
    { dishName: 'Caesar Salad', description: 'Crisp romaine with Caesar dressing', course: 'Starters', price: '80.00' },
    { dishName: 'Spaghetti Carbonara', description: 'Pasta with creamy sauce and pancetta', course: 'Mains', price: '120.00' },
    { dishName: 'Grilled Salmon', description: 'Fresh salmon with lemon butter', course: 'Mains', price: '185.00' },
    { dishName: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', course: 'Dessert', price: '75.00' },
    { dishName: 'Cheesecake', description: 'Creamy cheesecake with graham cracker crust', course: 'Dessert', price: '105.00' },
  ]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
  };

  const removeMenuItem = (dishName: string) => {
    setMenuItems(prev => prev.filter(item => item.dishName !== dishName));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
