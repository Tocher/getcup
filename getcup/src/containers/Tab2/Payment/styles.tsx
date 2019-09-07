import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    webView: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30
    },
    title: {
        marginTop: 20,
        color: '#333',
        fontWeight: 'bold',
        fontSize: variables.topTitle,
        textAlign: 'center',
        width: window.width,
    }
});
