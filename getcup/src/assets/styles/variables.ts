import { Dimensions, Platform, PixelRatio } from 'react-native';

/* MAIN */

export const primaryColor = "#651919";
export const defaultIconColor = "#ccc";
export const secondaryColor = "";
export const whiteTransparentColor = "rgba(255,255,255,0.6)";

/* NAVBAR */

export const navbarHeight = Platform.OS === 'ios' ? 60 : 80;
export const navbarPadding = Platform.OS === 'ios' ? 0 : 20;

/* LANDING */

// switcher

export const landingSwitcherHeight = 50;

/* BUTTONS */

// Social Button

export const socialButtonHeight = 50;
export const socialButtonBorderWidth = 2;
export const socialButtonColor = "#333333";
export const socialButtonBackgroundColor = "rgba(255,255,255,0.9)";
export const socialButtonVKColor = "#4479ab";
export const socialButtonFBColor = "#3a5d97";

/* FONTS */

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

export const h1 = normalize(75); // login title
export const loginScreenButtonsMargin = normalize(10);

export const topTitle = normalize(25); // заголовки на экранах
export const chooseCupsCountText = normalize(24);
export const chooseCupsCountIcon = normalize(23);
export const chooseCupsCountColor = '#999';
export const chooseCupsCountActiveColor = '#000';
export const priceText = normalize(35);
export const priceHintSymbol = normalize(10);

export const text = normalize(100);
export const buttonText = normalize(15); // login buttons
export const buttonHeight = 50;
export const sidePaddings = 20 * scale;
export const fullWidthWithPaddings = SCREEN_WIDTH - (sidePaddings * 2);

export const componentTitle = {
    paddingTop: 30,
    color: '#333',
    fontSize: topTitle,
    fontWeight: 'bold',
    textAlign: 'center',
};
