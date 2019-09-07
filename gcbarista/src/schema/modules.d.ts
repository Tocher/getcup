declare type Optional<T = any> = T | undefined;

declare module 'react-native-qrcode-scanner' {
    import {Component, ReactElement} from 'react';

    export interface QrData {
        data: string; // xhea9j
    }

    export interface QRCodeScannerProps {
        onRead: (data: QrData) => Promise<void>;
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

    class QRCodeScanner extends Component<QRCodeScannerProps> {}

    export default QRCodeScanner
}
