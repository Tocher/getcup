import request from 'superagent';

// server api endpoint
// const url = 'https://get-coffee-server.herokuapp.com/api'; // DEV
const url = 'http://142.93.170.45:8000/api'; // PROD
//const url = 'http://localhost:8000/api';

// Auth
export const login = (data) => {
    return request.post(`${url}/users/auth/social`, data);
};

export const sendQrcode = (token, data) => {
    return request.post(`${url}/qrcode/send`, data)
        .set('Authorization', token);
};

export const baristaAuth = (data) => {
    return request.post(`${url}/users/auth/barista`, data);
};

export const getAllQrcodes = (token) => {
    return request.get(`${url}/qrcode`)
        .set('Authorization', token);
};

export const getProducts = (token) => {
    return request.get(`${url}/products`)
        .set('Authorization', token);
};

export const Api = {
    qrcodeSend: (token, data) => {
        return request.post(`${url}/qrcode/send`, {hash: data})
            .set('Authorization', token);
    },
};
