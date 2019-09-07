import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');

const heightWithoutHeader = window.height - 90;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageWrapper: {
        position: 'relative',
        backgroundColor: '#000',
    },
    descriptionWrapper: {
        backgroundColor: '#ededed',
    },
    description: {
        color: '#6e6e6e',
        fontSize: 12,
        fontStyle: 'italic',
        paddingHorizontal: 20,
    },
    backButtonWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 30,
        left: 5,
        width: 40,
        height: 40,
    },
    headerImage: {
        width: window.width,
        height: 200,
        opacity: .9,
    },
    headerText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextTitle: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 20,
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    coffeeList: {
        marginBottom: 40,
    },
    coffeeTitle: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 24,
        fontWeight: 'bold'
    },
    coffeeText: {
        height: 26
    },
    buttonWrapper: {
        paddingBottom: 20,
    },
});
