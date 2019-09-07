import { Dimensions, Platform, PixelRatio } from 'react-native';

export const primaryColor = '#651919';
export const whiteColor = '#ffffff';

export const borderRaduis = 4;

function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

export const h1 = normalize(75); // login title
export const h2 = normalize(45); // sub login title
