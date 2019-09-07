import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as variables from 'src/assets/styles/variables';

const { width: viewportWidth } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: 'transparent'
    },
    buttonWrapper: {
        height: 36,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,

        borderWidth: Platform.OS === 'android' ? 1 : 0,
        borderColor: '#ccc',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
    },
    buttonSelected: {
        backgroundColor: variables.primaryColor
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: '#999',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: -1,
        textAlign: 'center'
    },
    buttonTextSelected: {
        color: '#fff'
    },
    leftButton: {
        borderBottomLeftRadius: 18,
        borderTopLeftRadius: 18,
        borderRightWidth: 0
    },
    rightButton: {
        borderBottomRightRadius: 18,
        borderTopRightRadius: 18,
        borderLeftWidth: 0
    }
});
