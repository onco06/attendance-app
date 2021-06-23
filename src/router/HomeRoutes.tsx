import { Home } from "../components/pages/Home";
import { UserList } from "../components/pages/UserList";
import { MyAttendanceList } from "../components/pages/MyAttendanceList";
import { AttendanceList } from "../components/pages/AttendanceList";
import { Settings } from "../components/pages/Settings";
import { Page404 } from "../components/pages/Page404";

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/user_list",
    exact: false,
    children: <UserList />
  },
  {
    path: "/attendance_list",
    exact: false,
    children: <AttendanceList />
  },
  {
    path: "/myattendance_list",
    exact: false,
    children: <MyAttendanceList />
  },
  {
    path: "/settings",
    exact: false,
    children: <Settings />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
