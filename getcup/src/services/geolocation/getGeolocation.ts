import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import Geolocation from '@react-native-community/geolocation';

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000,
};

// @TODO remove after correct Geolocation-service export typings
// https://github.com/Agontuk/react-native-geolocation-service/issues/82
export const GeoErrorCode = {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
    PLAY_SERVICE_NOT_AVAILABLE: 4,
    SETTINGS_NOT_SATISFIED: 5,
    INTERNAL_ERROR: -1
};

export const getGeolocation = createAsyncService<any>(async (social, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        geolocation: {
            ...state.geolocation,
            loading: true,
        }
    }, 'getGeolocation Loading');

    Geolocation.setRNConfiguration({
        authorizationLevel: 'always',
        skipPermissionRequests: false,
    });

    Geolocation.getCurrentPosition(
        (position) => {
            state = getState();

            setState({
                ...state,
                geolocation: {
                    ...state.geolocation,
                    loading: false,
                    userLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.035
                    },
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.035
                    },
                }
            }, 'getGeolocation Loaded');
        },
        (error) => {
            state = getState();

            setState({
                ...state,
                geolocation: {
                    ...state.geolocation,
                    loading: false,
                    region: {
                        latitude: 53.902687,
                        longitude: 27.560986,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.035
                    },
                    error,
                }
            }, 'getGeolocation Error');

            if (error.code === GeoErrorCode.PERMISSION_DENIED) {
                // дай доступа плз
            }

            console.log('geolocation error: ', error);
        },
        GEOLOCATION_OPTIONS,
    );
});
