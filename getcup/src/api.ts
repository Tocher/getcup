import request from 'superagent';
import config from './config';

// server api endpoint
const url = config.api.prod;
//const url = __DEV__ ? config.api.dev : config.api.prod;

// Auth
export const login = (data) => {
    return request.post(`${url}/users/auth/social`, data);
};

// Places
export const getPlaces = (token) => {
    return request.get(`${url}/places`)
        .set('Authorization', token);
};

export const getPlaceDetails = (token, id) => {
    return request.get(`${url}/places/${id}`)
        .set('Authorization', token);
};

// Products
export const getProducts = (token) => {
    return request.get(`${url}/products`)
        .set('Authorization', token);
};

// Subscription Types
export const getSubscriptionTypes = (token) => {
    return request.get(`${url}/subscription-types/custom`)
        .set('Authorization', token);
};

export const getSubscriptionTypeDetails = (token, id) => {
    return request.get(`${url}/subscription-types/${id}`)
        .set('Authorization', token);
};

export const getSubscriptionSubTypes = (token) => {
    return request.get(`${url}/subscription-subtypes`)
        .set('Authorization', token);
};

// Начало покупки подписки на кофе
// Нужно передать:
// subscriptionSubtypeId
// subscriptionTypeId
// userId
export const createSubscription = (token, data) => {
    return request
        .post(`${url}/subscriptions/custom`, data)
        .set('Authorization', token);
};

// Покупка прошла успешно/либо отменили
// Нужно передать:
// id в урле
// status = cancelled/confirmed
export const setSubscriptionStatus = (token, id, status) => {
    return request
        .patch(`${url}/subscriptions/custom/status/${id}`, {
            status: status,
        })
        .set('Authorization', token);
};

export const getAllSubscription = (token) => {
    return request
        .get(`${url}/subscriptions`)
        .set('Authorization', token);
};

export const getUserSubscription = (token, userId) => {
    return request
        .get(`${url}/subscriptions/custom/user/${userId}`)
        .set('Authorization', token);
};

// QR code

export const getQrcode = (token, data) => {
    return request.post(`${url}/qrcode/generate`, data)
        .set('Authorization', token);
};
export const checkQrcode = (token, data) => {
    return request.post(`${url}/qrcode/check`, data)
        .set('Authorization', token);
};

// Transactions

export const getTransactions = () => {
    return request.get(`${url}/transactions`);
};
export const createTransaction = (data) => {
    return request.post(`${url}/transactions/create`, data);
};

// Альфа банк тест!

export const createPayment = (data) => {
    return request
        .get('https://web.rbsuat.com/ab_by/rest/register.do', data)
        .set('Accept', 'application/json');
};
