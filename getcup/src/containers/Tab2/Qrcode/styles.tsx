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
        //paddingTop: navBarHeight
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30
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
    subTitle: {
        paddingTop: 30,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    title: {
        paddingTop: 30,
        color: '#333',
        fontSize: variables.topTitle,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: '#333',
        fontSize: 18,
        textAlign: 'center',
    }
});
