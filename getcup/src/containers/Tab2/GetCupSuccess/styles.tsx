import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {
        zIndex: 2,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    successContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        height: (variables.buttonHeight + 5) * 2, // 2 кнопки, 5 отступ
        justifyContent: 'space-between',
    },
    imageContainer: {
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        top: 0,
    },
    topImage: {
        width: window.width,
        height: window.height,
        resizeMode: 'cover', // or 'stretch',
    },
    cupsContainer: {
        paddingTop: 150,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cupsTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftCups: {
        color: '#333',
        paddingLeft: 10,
        fontSize: 60,
        fontWeight: 'bold'
    },
    totalCups: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 20,
        letterSpacing: 1,
    },
    title: {
        paddingTop: 20,
        color: '#000',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        paddingTop: 10,
        fontSize: 16
    }
});
