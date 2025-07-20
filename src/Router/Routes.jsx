import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../Route/PrivateRoute"
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import paymentHistory from "../Pages/Dashboard/PaymentHistory/paymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Route/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRiders/AssignRider";
import RiderRoute from "../Route/RiderRoute";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('warehouses.json'),
            },
            {
                path: 'forbidden',
                Component: Forbidden,
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
            },
            {
                path: 'beARider',
                element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashBoardLayout></DashBoardLayout> </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'myParcels',
                Component: MyParcels,
            },
            {
                path: 'payment/:parcelId',
                Component: Payment,
            },
            {
                path: 'paymentHistory',
                Component: paymentHistory,
            },
            {
                path: 'track',
                Component: TrackParcel,
            },
            //rider route  
            {
                path: 'pendingDeliveries',
                element: <RiderRoute><PendingDeliveries></PendingDeliveries> </RiderRoute>
            },
            {
                path: 'completedDeliveries',
                element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
            },
            {
                path: 'myEarnings',
                element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
            },
            //admin route
            {
                path: 'pendingRiders',
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>,
            },
            {
                path: 'activeRiders',
                element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>,
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>,
            },
            {
                path: 'assignRider',
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>,
            },
            // {
            //     path: 'profile',
            //     Component: UpdateProfile,
            // },
        ]
    }
]);