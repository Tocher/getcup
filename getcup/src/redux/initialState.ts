import {Error, State} from 'src/schema/global';

export const initialState: State = {
    auth: {
        checkOnStartUp: true, // загрузка авторизации из AsyncStorage, на открытие приложения с красивой анимацией
        checking: false, // по дефолту начинаем проверку
        email: undefined,
        authType: undefined,
        userId: undefined,
        isLoggedIn: false,
        isServerLoggedIn: false,
        serverToken: undefined,
        avatar: undefined,
        name: undefined
    },
    geolocation: {
        userLocation: undefined,
        loading: false,
        region: undefined,
        placeDetailsOpen: false,
        selectedPlaceDetails: undefined
    },
    places: {
        data: undefined,
        loading: false,
        error: undefined
    },
    placeDetails: {
        data: undefined,
        loading: false,
        error: undefined
    },
    products: {
        data: undefined,
        loading: false,
        error: undefined,
        current: false,
        currentPlace: 'с собой'
    },
    subscriptionTypes: {
        data: undefined,
        loading: false,
        error: undefined
    },
    subscriptionSubTypes: {
        data: undefined,
        loading: false,
        error: undefined
    },
    subscription: {
        data: undefined,
        loading: false,
        error: undefined
    },
    qrcode: {
        id: undefined,
        status: undefined,
        created: undefined,
        userId: undefined,
        productId: undefined,

        hash: undefined,
        loading: false,
        checking: false,
        error: undefined
    }
};
