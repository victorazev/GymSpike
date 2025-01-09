import { Routes, Route } from "react-router-dom";
import AppLayout from "../pages/AppLayout/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import { User, Userconfig } from "../pages/User/User";
import { Friends, Groups } from "../pages/Social/Friends";
import UserActivity from "../pages/UserActivity/UserActivity";
import GroupActivity from "../pages/GroupActivity/GroupActivity";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userActivity" element={<UserActivity />} />
        <Route path="groupActivity" element={<GroupActivity />} />
        <Route path="user" element={<User />} />
        <Route path="userconfig" element={<Userconfig />} />
        <Route path="friends" element={<Friends />} />
        <Route path="groups" element={<Groups />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
