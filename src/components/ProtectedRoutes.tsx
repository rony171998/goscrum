
import { Outlet ,Navigate  } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div>
        
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;