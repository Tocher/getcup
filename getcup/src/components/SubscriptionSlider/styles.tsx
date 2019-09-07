import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.40;
const slideWidth = wp(55);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = wp(43);

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
    },
    imageContainer: {
        flex: 1,
        width: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: wp(43),
        height: wp(43),
        resizeMode: 'cover',
        borderRadius: entryBorderRadius / 2,
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    descriptionText: {
        textAlign: 'center'
    },
});
