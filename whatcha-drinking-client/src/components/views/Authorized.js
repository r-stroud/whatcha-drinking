import { Navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {
    const location = useLocation();

    if (localStorage.getItem("wd_user")) {
        return children;
    } else {
        return (
            <Navigate to={`/welcome/${location.search}`} replace state={{ location }} />
        );
    }
};