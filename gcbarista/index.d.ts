import {ReactElement} from 'react';

declare module "react-native-qrcode-scanner" {
    export interface QRCodeScanner {
        onRead: () => void;
        vibrate?: boolean;
        reactivate?: boolean;
        reactivateTimeout?: number;
        fadeIn?: boolean;
        showMarker?: boolean;
        cameraType?: 'front' | 'back';
        customMarker?: ReactElement<any>;
        containerStyle?: any;
        cameraStyle?: any;
        markerStyle?: any;
        topViewStyle?: any;
        bottomViewStyle?: any;
        topContent?: ReactElement<any> | string;
        bottomContent?: ReactElement<any> | string;
        notAuthorizedView?: ReactElement<any>;
        permissionDialogTitle?: string;
        permissionDialogMessage?: string;
        checkAndroid6Permissions?: boolean;
        cameraProps?: object;
    }
}
