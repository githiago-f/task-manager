const BASE_URL = 'https://localhost:8443';
export const getServiceUrl = (endpoint: string) => new URL(endpoint, BASE_URL);