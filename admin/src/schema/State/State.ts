export interface State {
    user: {
        auth_checked?: boolean;
        token?: string;
        userId?: string;
        ttl?: number;
        is_authorized: boolean;
    }
    users?: CollectionResponse<UserSchema>;
    qrcode?: string;
}

export type StateKey = keyof State;

export interface UserSchema {
    id: string;
    email: string;
    name?: string;
}

export type CollectionResponse<T> = {
    //count: number;
    //next?: Dict<string>;
    //previous?: Dict<string>;
    results: T[];

    _loading?: boolean;         // client only flag
    _errorLoading?: boolean;
};

export interface ModelSchema {
    id: string;
}
