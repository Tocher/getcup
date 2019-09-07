import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        width: viewportWidth,
        height: viewportHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 100
    },
    text: {
        marginTop: 20,
        textAlign: 'center',
    }
});
