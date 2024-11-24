const backendEndpoint = 'http://localhost:8020/api';

const organization = '/organizations';
const organizationEndpoint = backendEndpoint + organization;

const login = '/login';
const loginEndpoint = backendEndpoint + organization + login;

const register = '/register';
const registerEndpoint = backendEndpoint + organization + register;

const agency = '/agency';
const agencyEndpoint = backendEndpoint + agency;

const dashboard = '/dashboard';

const agencyDashboardDataEndpoint = agencyEndpoint + dashboard;

export const endpoints = {
    organization: organizationEndpoint,
    login: loginEndpoint,
    register: registerEndpoint,
    agencyDashboardData: agencyDashboardDataEndpoint,
};