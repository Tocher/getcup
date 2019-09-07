import {StyleSheet, Dimensions} from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: window.height,
        backgroundColor: '#fff',
    },
    bgContainer: {
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        top: window.height * 0.3,
    },
    bgImage: {
        width: window.width * 1.3,
        height: window.height,
        resizeMode: 'cover', // or 'stretch',
    },
    formContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
    },
    title: {
        backgroundColor: 'transparent',
        color: variables.primaryColor,
        fontSize: variables.h1,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
        lineHeight: 70,
        marginTop: variables.loginScreenButtonsMargin,
        paddingBottom: 20,
        //marginLeft: -5,
        //marginRight: -30,
        //textShadowColor: 'rgba(0, 0, 0, 0.70)',
        //textShadowOffset: { width: 1, height: 2 },
        //textShadowRadius: 10
    },
    form: {
        alignSelf: 'stretch',
        marginTop: variables.loginScreenButtonsMargin,
        marginLeft: variables.sidePaddings,
        marginRight: variables.sidePaddings,
    },
    withoutReg: {
        display: 'none',
        backgroundColor: 'transparent',
        marginTop: variables.loginScreenButtonsMargin,
        color: '#ccc',
        textAlign: 'center',
    }
});
