import { useContext } from "react";
import { useQueryClient } from "react-query";
import { OrganizationContext } from "@/context";
import { Organization } from "@/types/organization";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { organization, setOrganization } = useContext(OrganizationContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const login = async (organization: Organization) => {
        sessionStorage.setItem("organization", JSON.stringify(organization));
        setOrganization(organization);
        queryClient.invalidateQueries("organization");
    };

    const logout = async () => {
        setOrganization(null);
        sessionStorage.removeItem("organization");
        // navigate("/login");
        navigate("/login");
    };

    return { organization, login, logout };
};
