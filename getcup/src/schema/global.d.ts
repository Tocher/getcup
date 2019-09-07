export interface Error {
    name: string;
    message: string;
    stack?: string;
}

export interface AuthSchema {
    email?: string | null;
    name?: string;
    firstName?: string;
    lastName?: string;
    avatar?: AvatarSchema;

    authType?: 'vk' | 'fb';

    accessToken?: string | null;
    userId?: string | null;

    checkOnStartUp: boolean;
    checking: boolean;

    isLoggedIn: boolean;
    isServerLoggedIn: boolean;

    serverToken?: {
        id: string;
        userId: string;
    }
}

export interface AvatarSchema {
    url: string;
    height: number;
    width: number;
}

export interface SubscriptionSchema {
    data?: Subscription;
    loading: boolean;
    error?: Error;
}

export interface State {
    auth?: AuthSchema;
    geolocation: {
        userLocation?: {
            latitude: number;
            longitude: number;
            latitudeDelta: number;
            longitudeDelta: number;
        };
        loading: boolean;
        region?: {
            latitude: number;
            longitude: number;
            latitudeDelta: number;
            longitudeDelta: number;
        };
        placeDetailsOpen: boolean;
        selectedPlaceDetails?: number;
    };
    places: {
        data?: Place[],
        loading: boolean;
        error?: Error
    };
    placeDetails?: {
        data?: Place;
        loading: boolean;
        error?: Error;
    };
    products: {
        data?: Product[];
        loading: boolean;
        error?: Error;
        current: false;
        currentPlace: string; // 'с собой'
    };
    subscription?: SubscriptionSchema;
    subscriptionTypes: {
        data?: SubscriptionType[],
        loading: boolean;
        error?: Error;
    };
    subscriptionSubTypes: {
        data?: SubscriptionSubType[],
        loading: boolean;
        error?: Error;
    };
    qrcode: {
        id?: string;
        status?: string; // pending
        created?: string; //"2018-01-13T17:12:06.192Z",
        hash?: string;
        userId?: string;
        productId?: string;
        loading: boolean;
        checking: boolean;
        error?: Error;
    };
    cachedImages?: any;
}

interface Place {
    id: string;
    title: string;
    address: {
        addressLine1: string;
        city: string;
        state: string;
        country: string;
        isoCountry: string; // BY
    };
    location: {
        latitude: number;
        longitude: number;
    };
    description: string;
    workingHours: PlaceWorkTime[];
    images: string[];
}

interface PlaceWorkTime {
    allDay: boolean;
}

interface Product {
    title: string;
    description: string;
    image: string;
    id: string;
    productTypeId: string;
}

interface Subscription {
    id: string;
    created: string; // "2018-11-08T14:14:50.139Z"
    cups: number;
    status: string; // success
    subscriptionTypeId: string;
    subscriptionSubtypeId: string;
    userId: string;
    uri: string;
}

interface SubscriptionType {
    id: string;
    title: string;
    type: number;
    description: string;
    productTypes: string[];
}

interface SubscriptionSubType {
    id: string;
    created: string;
    days: number;
    cups: number;
    price: SubTypePrice[];
    subscriptionTypeId: string;
}

interface SubTypePrice {
    value: number;
    currency: string;
    date: string;
}
