import axios from 'axios';
import { endpoints } from '@/constants';
import { Organization } from '@/types/organization';
import { handleError } from '@/utils/handleError';

type DataRes = { data: Organization };

export const registerOrganization = async (
    name: string,
    email: string,
    type: string,
    password: string
) => {
    try {
        const { data }: DataRes = await axios.post(endpoints.register, {
            name,
            email,
            type,
            password,
        });
        if (data) {
            return data;
        }
        return null;
    } catch (error) {
        return handleError(error);
    }
}

export const loginOrganization = async (email: string, password: string) => {
    try {
        const { data }: DataRes = await axios.post(endpoints.login, {
            email,
            password,
        });
        if (data) {
            return data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return handleError(error);
    }
}
