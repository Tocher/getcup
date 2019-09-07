import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as variables from 'src/assets/styles/variables';
import {itemWidth} from '../../../components/SubscriptionSlider/styles';

const window = Dimensions.get('window');
export const coffeeSize = window.width / 3.5;

function wp(percentage) {
    const value = (percentage * window.width) / 100;
    return Math.round(value);
}
const imageSize = wp(35);

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingBottom: 20
    },
    scrollviewContentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 50
    },
    imageContainer: {
        flex: 1,
        width: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainerDisabled: {
        opacity: 0.5
    },
    image: {
        width: imageSize,
        height: imageSize,
        resizeMode: 'cover',
        borderRadius: imageSize / 2,
    },
    title: {
        paddingTop: 30,
        color: '#333',
        fontSize: variables.topTitle,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    coffee: {
        width: coffeeSize,
        height: coffeeSize,
        borderRadius: coffeeSize / 2
    },
    coffeeLine: {
        flex: 1,
        width: window.width,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    coffeeText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    coffeeTextDisabled: {
        color:  colors.gray,
    },
});
