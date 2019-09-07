import { StyleSheet } from 'react-native';
import * as variables from 'src/assets/styles/variables';

const ICON_WRAPPER_DIMENSION = variables.socialButtonHeight * 0.85;

export default styles = StyleSheet.create({
    buttonWrapper: {
        position: "absolute",
        width: ICON_WRAPPER_DIMENSION + 10,
        height: ICON_WRAPPER_DIMENSION + 10,
        bottom:50,
        right:10,
        padding: 5,
        zIndex: 5,
    },
    buttonAnimatedWrapper: {
        position: 'absolute',
        width: ICON_WRAPPER_DIMENSION + 10,
        height: ICON_WRAPPER_DIMENSION + 10,
        //backgroundColor: '#821a1b',
        borderColor: '#821a1b',
        borderRadius: 40,
        shadowColor: '#821a1b'
    },
    buttonText: {
        fontSize: 15,
        color: '#000',
        fontWeight: "bold",
        paddingLeft: ICON_WRAPPER_DIMENSION/2
    },
    iconWrapper: {
        height: ICON_WRAPPER_DIMENSION,
        width: ICON_WRAPPER_DIMENSION,
        borderRadius: ICON_WRAPPER_DIMENSION / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        color: "#fff"
    }
});
