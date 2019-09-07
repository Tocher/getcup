import {StyleSheet, Dimensions, Platform} from 'react-native';

import * as variables from 'src/assets/styles/variables';
const window = Dimensions.get('window');
const navBarHeight = (Platform.OS === 'ios') ? 64 : 64;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: navBarHeight
    },
    contentContainer: {
        zIndex: 2,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20
    },
    successContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        height: (variables.buttonHeight + 10) * 2, // 2 кнопки, 10 отступ
        justifyContent: 'space-between',
    },
    loading: {
        height: window.height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    loadingText: {
        color: '#000'
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
    title: {
        paddingTop: 30,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subTitle: {
        marginTop: 20,
        color: '#999',
        fontSize: 20,
        textAlign: 'center',
        width: window.width,
    }
});
