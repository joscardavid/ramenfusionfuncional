import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users2,
  Settings,
  ChefHat,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Reservaciones', href: '/admin/reservations', icon: CalendarDays },
  { name: 'Clientes', href: '/admin/customers', icon: Users2 },
  { name: 'Mesas', href: '/admin/tables', icon: ChefHat },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                'transition-colors duration-150 ease-in-out',
                {
                  'bg-primary text-white': isActive,
                  'text-gray-600 hover:bg-gray-50': !isActive,
                }
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}