import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layoutmain from "./components/Layoutmain.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AccountManagement from "./components/Admin/pageAdmin/AccountManagement.jsx";
import AddAccount from "./components/Admin/cruds/AddAccount.jsx";
import EventManagement from "./components/Admin/pageAdmin/EventManagement.jsx";
import AddEvent from "./components/Admin/cruds/AddEvent.jsx";
import EditEvent from "./components/Admin/cruds/EditEvent.jsx";
import AddCategory from "./components/Admin/cruds/AddCategory.jsx";
import UpdateMain from "./components/Admin/pageAdmin/UpdateMain.jsx";
import VaccinesDetail from "./pages/VaccinesDetail.jsx";
import Cart from "./pages/Cart.jsx";
import AttendanceManagement from "./components/Admin/pageAdmin/AttendanceManagement.jsx";
import FeedbackManagement from "./components/Admin/pageAdmin/FeedbackManagement.jsx";
import Notification from "./components/Admin/pageAdmin/Notification.jsx";
import AddNotification from "./components/Admin/cruds/AddNotification.jsx";
import OtherSuccess from "./pages/OtherSuccess.jsx";
import Dashboard from "./components/Admin/pageAdmin/Dashboard.jsx";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import CategoryMain from "./components/Admin/pageAdmin/CategoryMain.jsx";
import ListEvents from "./pages/ListEvents.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import MyOrderDetail from "./pages/MyOrderDetail.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Favatie from "./pages/favatie.jsx";


const router = createBrowserRouter([
  {
    element: <Layoutmain></Layoutmain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path:"/fava",
        element:<Favatie></Favatie>
      },
      {
        path: "/othersuccess",
        element: <OtherSuccess></OtherSuccess>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/vacxindetail/:id",
        element: <VaccinesDetail></VaccinesDetail>,
      },
      {
        path: "/UpdateMain/:id",
        element: <UpdateMain></UpdateMain>,
      },
      {
        path: "/list-events",
        element: <ListEvents></ListEvents>,
      },
      {
        path: "/category/:id",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/my-order-detail/:id",
        element: <MyOrderDetail />,
      },
    ],
  },
  {
    element: <LayoutAdmin></LayoutAdmin>,
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/event-management",
        element: <EventManagement></EventManagement>,
      },
      {
        path: "/add-event",
        element: <AddEvent></AddEvent>,
      },
      {
        path: "/edit-event/:id",
        element: <EditEvent></EditEvent>,
      },
      {
        path: "/notifications",
        element: <Notification></Notification>,
      },
      {
        path: "/add-notification",
        element: <AddNotification></AddNotification>,
      },
      {
        path: "/account-management",
        element: <AccountManagement></AccountManagement>,
      },
      {
        path: "/add-account",
        element: <AddAccount></AddAccount>
      },
      {
        path: "/add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "/category",
        element: <CategoryMain></CategoryMain>,
      },
    
      {
        path: "/attendance-list",
        element: <AttendanceManagement></AttendanceManagement>,
      },
      {
        path: "/feedback-management",
        element: <FeedbackManagement></FeedbackManagement>,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
