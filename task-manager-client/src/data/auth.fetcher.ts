import { getServiceUrl } from "./config";

type LoginCredentials = {
    email: string;
    password: string;
};

const loginUrl = getServiceUrl('/users/login');
export const login = (data: LoginCredentials) => fetch(loginUrl, {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        if(res.statusCode) {
            throw new Error(res.message);
        }
        return res;
    });