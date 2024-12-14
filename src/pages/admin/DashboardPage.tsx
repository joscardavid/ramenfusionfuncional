import React from 'react';
import { BarChart3, CalendarDays, Users2, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DashboardStats } from '../../types/admin';

const MOCK_STATS: DashboardStats = {
  totalReservations: 156,
  todayReservations: 12,
  upcomingReservations: 45,
  popularTables: [
    { tableId: 'vip', reservations: 24 },
    { tableId: 'table-4-1', reservations: 18 },
  ],
};

function StatCard({ title, value, icon: Icon, trend }: {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{trend.value}% vs. mes anterior</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const stats = MOCK_STATS;
  const today = new Date();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          {format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Reservaciones Totales"
          value={stats.totalReservations}
          icon={BarChart3}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Reservaciones Hoy"
          value={stats.todayReservations}
          icon={CalendarDays}
        />
        <StatCard
          title="Próximas Reservaciones"
          value={stats.upcomingReservations}
          icon={Users2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Mesas más Reservadas</h2>
          <div className="space-y-4">
            {stats.popularTables.map((table) => (
              <div key={table.tableId} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{table.tableId}</p>
                    <p className="text-sm text-gray-500">
                      {table.reservations} reservaciones
                    </p>
                  </div>
                </div>
                <div className="w-24 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(table.reservations / stats.totalReservations) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Próximas Reservaciones</h2>
          <div className="space-y-4">
            {/* This would be populated with real data in a production environment */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div>
                <p className="font-medium">Juan Pérez</p>
                <p className="text-sm text-gray-500">Mesa VIP - 8 personas</p>
              </div>
              <p className="text-sm text-gray-600">Hoy, 8:00 PM</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div>
                <p className="font-medium">María García</p>
                <p className="text-sm text-gray-500">Mesa 4P - 4 personas</p>
              </div>
              <p className="text-sm text-gray-600">Hoy, 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}