
import { useState } from 'react';
import { Organization } from '@/types/organization';
import { useQueryClient } from 'react-query';

export const useOrganizer = () => {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const queryClient = useQueryClient();

    const setAndStoreOrganization = (organization: Organization | null) => {
        let organizationString = JSON.stringify(organization);
        setOrganization(organization);
        localStorage.setItem('organization', organizationString);
        queryClient.invalidateQueries('organization');
    };

    const login = (organization: Organization) => {
        setAndStoreOrganization(organization);
    }

    const logout = () => {
        setAndStoreOrganization(null);
    }

    return { organization, login, logout };
}
