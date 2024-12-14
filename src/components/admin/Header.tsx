import React from 'react';
import { LogOut, Bell } from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { Button } from '../ui/Button';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Panel Administrativo
        </h1>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-sm">
              <p className="font-medium text-gray-700">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-gray-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}