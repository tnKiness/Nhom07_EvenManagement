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
import AccountManagement from "./components/Admin/pageAdmin/AccountManagement.jsx";
import AddAccount from "./components/Admin/cruds/AddAccount.jsx";
import EventManagement from "./components/Admin/pageAdmin/EventManagement.jsx";
import AddEvent from "./components/Admin/cruds/AddEvent.jsx";
import EditEvent from "./components/Admin/cruds/EditEvent.jsx";
import AddCategory from "./components/Admin/cruds/AddCategory.jsx";
import UpdateMain from "./components/Admin/pageAdmin/UpdateMain.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import AttendanceManagement from "./components/Admin/pageAdmin/AttendanceManagement.jsx";
import FeedbackManagement from "./components/Admin/pageAdmin/FeedbackManagement.jsx";
import Notification from "./components/Admin/pageAdmin/Notification.jsx";
import AddNotification from "./components/Admin/cruds/AddNotification.jsx";
import RegisterSuccess from "./pages/RegisterSuccess.jsx";
import Dashboard from "./components/Admin/pageAdmin/Dashboard.jsx";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import CategoryMain from "./components/Admin/pageAdmin/CategoryMain.jsx";
import ListEvents from "./pages/ListEvents.jsx";
import AttendanceHistory from "./pages/AttendanceHistory.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layoutmain></Layoutmain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/register-success",
        element: <RegisterSuccess></RegisterSuccess>,
      },
      {
        path: "/event-detail/:id",
        element: <EventDetail></EventDetail>,
      },
      {
        path: "/update-info/:id",
        element: <UpdateMain></UpdateMain>,
      },
      {
        path: "/list-events",
        element: <ListEvents></ListEvents>,
      },
      {
        path: "/my-notifications/:id",
        element: <NotificationPage></NotificationPage>,
      },
      {
        path: "/attendance-history",
        element: <AttendanceHistory />,
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
