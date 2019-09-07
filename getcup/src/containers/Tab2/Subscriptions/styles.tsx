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
        height: window.height,
    },
    contentContainer: {
        flex:1,
        alignItems: 'center',
        paddingBottom: 20,
        height: window.height,
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
    slider: {
    },
    sliderContentContainer: {
    },
    exampleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        marginTop: 30,
        color: '#333',
        fontSize: variables.topTitle,
        fontWeight: 'bold',
        textAlign: 'center',
        width: window.width,
    },
    bottomContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cupButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        width: variables.fullWidthWithPaddings,
        marginBottom: 15
    },
    cupButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
        width: (variables.fullWidthWithPaddings / 3),
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
    },
    cupButtonText: {
        fontSize: variables.chooseCupsCountText,
        fontWeight: 'bold',
        color: '#666',
        marginRight: -10
    },
    activeButton: {
        borderBottomColor: '#821a1b',
    },
    activeText: {
        color: '#000'
    },
    price: {
        paddingBottom: 5
    },
    priceText: {
        fontSize: variables.priceText
    },
    priceHint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    priceHintText: {
    },
    priceHintSymbol: {
        paddingRight: 4,
        fontSize: variables.priceHintSymbol
    }
});
