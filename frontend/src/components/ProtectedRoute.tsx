import { OrganizationContext } from "@/context";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { organization } = useContext(OrganizationContext);

    if (!organization) {
        // Redirect to login page if user is not logged in
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;