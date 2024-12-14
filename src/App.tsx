import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/home/Hero';
import { About } from './components/home/About';
import { Info } from './components/home/Info';
import { Menu } from './components/home/Menu';
import { Gallery } from './components/home/Gallery';
import { ReservationFlow } from './components/reservation/ReservationFlow';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ReservationsPage } from './pages/admin/ReservationsPage';
import { PrivateRoute } from './components/admin/PrivateRoute';

function App() {
  const [showReservation, setShowReservation] = React.useState(false);

  const handleReservationOpen = () => {
    setShowReservation(true);
  };

  const handleReservationClose = () => {
    setShowReservation(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
        </Route>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-background">
              {showReservation ? (
                <ReservationFlow onClose={handleReservationClose} />
              ) : (
                <>
                  <Hero onReserve={handleReservationOpen} />
                  <About />
                  <Menu />
                  <Info />
                  <Gallery />
                </>
              )}
            </div>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;