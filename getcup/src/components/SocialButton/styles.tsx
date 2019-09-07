import { StyleSheet } from 'react-native';
import * as variables from 'src/assets/styles/variables';

const ICON_WRAPPER_DIMENSION = variables.socialButtonHeight * 0.75;

export default styles = StyleSheet.create({
    buttonWrapper: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: variables.socialButtonHeight,
        backgroundColor: variables.socialButtonBackgroundColor,
        borderRadius: 30,
        borderWidth: variables.socialButtonBorderWidth,
        padding: 5,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: variables.buttonText,
        color: '#000',
        fontWeight: "bold",
        paddingLeft: ICON_WRAPPER_DIMENSION/2
    },
    iconWrapper: {
        position: "absolute",
        left: 5,
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
