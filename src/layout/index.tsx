import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="text-white">
      <Outlet />
    </div>
  );
}
export default Layout;
