import type { RouteObject } from "react-router-dom";
import * as APP from "@/lib/constants/routes";
import { Layout } from "@/components/templates";
import {
  AdminRouteGuard,
  AuthRouteGuard,
  CustomerRouteGuard,
  PrivateRouteGuard,
  SendOtpGuard,
  UpdateProfileGuard,
} from "@/lib/guard";
import {
  HomePage,
  NotFoundPage,
  LoginPage,
  ForgotPasswordRequestPage,
  ForgotPasswordPage,
  DashboardPage,
  ProfilePage,
  RegisterVehiclePage,
  AboutPage,
  NotificationPage,
  NotificationDetailsPage,
  VerifyPasswordPage,
  ChangePasswordPage,
  VerifyOtpPage,
  RequestMaintenanceVehiclePage,
  VehicleDetailsPage,
  UpdateProfilePage,
  VehicleListPage,
  VehiclePartsPage,
  ServicesHistoryPage,
  ServicesDetailPage,
} from "@/pages/customer";
import {
  AdminApproveMaintenancePage,
  AdminDashboardPage,
  AdminDetailsMaintenanceVehiclePage,
  AdminVehiclesPending,
} from "@/pages/admin";
import { RegisterPageMobile } from "@/mobile";
import AdminPart from "@/pages/admin/AdminPartPage/AdminPart";

const publicRoutes: RouteObject = {
  children: [
    {
      path: APP.NOT_FOUND_PAGE,
      element: <NotFoundPage />,
    },
    {
      path: APP.FORGOT_PASSWORD_REQUEST_PAGE,
      element: <ForgotPasswordRequestPage />,
    },
    {
      path: APP.FORGOT_PASSWORD_PAGE(":token"),
      element: <ForgotPasswordPage />,
    },
  ],
};

const authRoutes: RouteObject = {
  element: <AuthRouteGuard />,
  children: [
    {
      index: true,
      path: APP.INDEX_PAGE,
      element: <HomePage />,
    },
    {
      path: APP.REGISTER_USER_PAGE,
      element: <RegisterPageMobile />,
    },
    {
      path: APP.LOGIN_PAGE,
      element: <LoginPage />,
    },
  ],
};

const privateRoutes: RouteObject = {
  element: <PrivateRouteGuard />,
  children: [
    {
      element: <Layout />,
      children: [
        /* Customer Pages */
        {
          element: <CustomerRouteGuard />,
          children: [
            {
              path: APP.DASHBOARD_PAGE,
              element: <DashboardPage />,
            },
            {
              path: APP.VEHICLE_LIST_PAGE,
              element: <VehicleListPage />,
            },
            {
              path: APP.PROFILE_PAGE,
              element: <ProfilePage />,
            },
            {
              path: APP.SERVICES_PAGE,
              element: <ServicesHistoryPage />
            },
            {
              path: APP.VEHICLE_SERVICES_DETAILS_PAGE(":vehicleId", ":maintenanceId"),
              element: <ServicesDetailPage />
            },
            {
              path: APP.REQUEST_MAINTENANCE_VEHICLE_PAGE,
              element: <RequestMaintenanceVehiclePage />,
            },
            {
              path: APP.REGISTER_VEHICLE_PAGE,
              element: <RegisterVehiclePage />,
            },
            {
              path: APP.ABOUT_US_PAGE,
              element: <AboutPage />,
            },
            {
              path: APP.NOTIFICATION_PAGE,
              element: <NotificationPage />,
            },
            {
              path: APP.NOTIFICATION_DETAILS_PAGE(":notificationId"),
              element: <NotificationDetailsPage />,
            },
            {
              path: APP.VEHICLE_DETAILS_PAGE(":vehicleId"),
              element: <VehicleDetailsPage />,
            },
            {
              path: APP.VEHICLE_LIST_PAGE,
              element: <VehicleListPage />,
            },
            {
              path: APP.VEHICLE_PARTS_PAGE(":vehicleId"),
              element: <VehiclePartsPage />,
            },
            {
              path: APP.VERIFY_PASSWORD_PAGE,
              element: <VerifyPasswordPage />,
            },
            {
              element: <UpdateProfileGuard />,
              children: [
                {
                  path: APP.UPDATE_PROFILE_PAGE,
                  element: <UpdateProfilePage />,
                },
              ],
            },
            {
              path: APP.CHANGE_PASSWORD_PAGE,
              element: <ChangePasswordPage />,
            },
            {
              element: <SendOtpGuard />,
              children: [
                {
                  path: APP.VERIFY_OTP_PAGE,
                  element: <VerifyOtpPage />,
                },
              ],
            },
          ],
        },
        /* Admin Pages */
        {
          element: <AdminRouteGuard />,
          children: [
            {
              path: APP.ADMIN_DASHBOARD_PAGE,
              element: <AdminDashboardPage />,
            },
            {
              path: APP.ADMIN_APPROVE_MAINTENANCE_PAGE,
              element: <AdminApproveMaintenancePage />,
            },
            {
              path: APP.ADMIN_VEHICLES,
              element: <AdminVehiclesPending />,
            },
            {
              path: APP.ADMIN_DETAILS_MAINTENANCE_VEHICLE_PAGE(":vehicleId"),
              element: <AdminDetailsMaintenanceVehiclePage />,
            },
            { path: APP.ADMIN_PART_PAGE,
            element: <AdminPart />}
          ],
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [publicRoutes, authRoutes, privateRoutes];

export default routes;
