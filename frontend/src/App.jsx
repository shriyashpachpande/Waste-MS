import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NotificationProvider } from "./context/NotificationContext";
import NotificationToast from "./components/NotificationToast";
import { ThemeProvider } from './context/ThemeContext';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegistrationStatus from './pages/Auth/RegistrationStatus';

import Home from "./pages/Home";

import CitizenDashboard from './pages/Dashboard/CitizenDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ChampionDashboard from './pages/Dashboard/ChampionDashboard';
import WorkerDashboard from './pages/Dashboard/WorkerDashboard';

import WasteTracking from './pages/WasteTracking';

import TrainingList from './pages/Training/TrainingList';
import TrainingPlayer from './pages/Training/TrainingPlayer';
import QuizPage from './pages/Training/QuizPage';
import CertificateViewer from './pages/Training/CertificateViewer';

import ShopList from './pages/Shop/ShopList';
import OrderPage from './pages/Shop/OrderPage';

import FacilityList from './pages/FacilityList';
import VehicleMap from './pages/VehicleMap';
import AdminVehiclePanel from './pages/AdminVehiclePanel';
import WorkerVehicleList from './pages/WorkerVehicleList';

import ReportForm from './pages/Reports/ReportForm';
import ReportDetails from './pages/Reports/ReportDetails';
import ReportList from './pages/Reports/ReportList';

import AnalyticsSummary from './pages/Analytics/AnalyticsSummary';
import Leaderboard from './pages/Analytics/Leaderboard';
import Heatmap from './pages/Analytics/Heatmap';

import RewardsWallet from './pages/RewardsWallet';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';
import AdminTrainingModule from './pages/AdminTrainingModule';
import RedeemCoupon from './pages/RedeemCoupon';
import AdminOfferPanel from './pages/AdminOfferPanel';
import AdminShopPanel from './pages/Shop/AdminShopPanel';
import FacilityAdminPanel from './pages/FacilityAdminPanel';
import AdminRoutePanel from './pages/AdminRoutePanel';
import AllReportsList from './pages/Reports/AllReportsList';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <NotificationToast />
        <Router>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Navbar />
              <main className="container mx-auto px-4 py-6">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/registration-status" element={<RegistrationStatus />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>

                    {/* Citizen Dashboard */}
                    <Route path="/CitizenDashboard" element={<CitizenDashboard />} />

                    {/* Admin */}
                    <Route element={<ProtectedRoute role="ULB_ADMIN" />}>
                      <Route path="/dashboard/admin" element={<AdminDashboard />} />
                      <Route path="/admin/training" element={<AdminTrainingModule />} />
                      <Route path="/admin/offer-panel" element={<AdminOfferPanel />} />
                      <Route path="/shop/admin-panel" element={<AdminShopPanel />} />
                      <Route path="/facilities-admin" element={<FacilityAdminPanel />} />
                      <Route path="/vehicles/admin" element={<AdminVehiclePanel />} />
                      <Route path="/routes/admin" element={<AdminRoutePanel />} />
                    </Route>

                    {/* Super Admin */}
                    <Route element={<ProtectedRoute role="SUPER_ADMIN" />}>
                      <Route path="/dashboard/super-admin" element={<AdminDashboard />} />
                    </Route>

                    {/* Worker */}
                    <Route element={<ProtectedRoute role="WORKER" />}>
                      <Route path="/dashboard/worker" element={<WorkerDashboard />} />
                      <Route path="/facilities-admin" element={<FacilityAdminPanel />} />
                      <Route path="/vehicles/my" element={<WorkerVehicleList />} />
                      <Route path="/reports/:id/details" element={<ReportDetails />} />
                    </Route>

                    {/* Green Champion */}
                    <Route element={<ProtectedRoute role="GREEN_CHAMPION" />}>
                      <Route path="/dashboard/champion" element={<ChampionDashboard />} />
                    </Route>

                    {/* Other Pages */}
                    <Route path="/waste-tracking" element={<WasteTracking />} />

                    <Route path="/training" element={<TrainingList />} />
                    <Route path="/training/:id" element={<TrainingPlayer />} />
                    <Route path="/training/:id/quiz" element={<QuizPage />} />
                    <Route path="/training/:id/certificate" element={<CertificateViewer />} />

                    <Route path="/shop" element={<ShopList />} />
                    <Route path="/shop/order" element={<OrderPage />} />

                    <Route path="/facilities" element={<FacilityList />} />
                    <Route path="/vehicles" element={<VehicleMap />} />

                    <Route path="/reports/new" element={<ReportForm />} />
                    {/* User: See their own "My Reports" list */}
                    <Route path="/reports/me" element={<ReportList />} />
                    <Route path="/report/:id" element={<ReportDetails />} />

                    <Route path="/reports" element={<AllReportsList />} />
                    <Route path="/analytics" element={<AnalyticsSummary />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/heatmap" element={<Heatmap />} />
                    <Route path="/rewards" element={<RewardsWallet />} />
                    <Route path="/redeem-coupon" element={<RedeemCoupon />} />

                  </Route>

                  {/* Not Found */}
                  <Route path="*" element={<NotFound />} />

                </Routes>
              </main>
            </div>
          </AuthProvider>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;



















