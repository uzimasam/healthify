import { createContext } from 'react';
import { Organization } from './types/organization';

export const OrganizationContext = createContext<{
    organization: Organization | null;
    setOrganization: (organization: Organization | null) => void;
}>({
    organization: null,
    setOrganization: (organization: Organization | null) => {
        console.log(organization);
    },
});