import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useSelector((state) => state.auth);

    if (!isLoading && !user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    if (!user?.user?.email_verified_at) {
        return <Navigate to="/email/verify" />;
    }

    return children;
};

export default AuthRoute;
