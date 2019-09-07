import { StyleSheet } from 'react-native';
import * as variables from 'src/assets/styles/variables';

export default styles = StyleSheet.create({
    buttonWrapper: {
        //borderWidth: 2,
        borderRadius: 30,
        //borderColor: '#821a1b',
        backgroundColor: variables.primaryColor,
        height: variables.buttonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        width: variables.fullWidthWithPaddings
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold"
    }
});
