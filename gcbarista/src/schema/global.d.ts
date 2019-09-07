export interface Error {
    name: string;
    message: string;
    stack?: string;
}

export interface State {
    auth: Dict;
    qr?: QrResponseSchema;

    stats?: {
        _time?: number;
        _loading: boolean;
        results?: Stat[];
    }

    products?: {
        _time?: number;
        _loading: boolean;
        results?: Product[];
    }

    screen?: string;
}

export interface Stat {
    id: string;
    productId: string;
    status: 'success' | 'error';
    created: string;
}

export interface Product {
    id: string;
    title: string;
}

export interface QrResponseSchema {
    error?: string;
    time?: number;
    product?: string; //'Капучино'
    togo?: boolean;
    status: 'success' | 'error' | 'pending';
    customer?: {
        name: string;
    };
}

declare interface Dict<T = any> {
    [key: string]: T;
}
