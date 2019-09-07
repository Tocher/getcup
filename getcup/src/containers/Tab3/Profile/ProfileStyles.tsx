import {StyleSheet, Dimensions} from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

export default StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 20
    },
    title: variables.componentTitle,
    userWrapper: {
        marginTop: 20,
        marginBottom: 30,
        height: 50,
        width: window.width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userTextWrapper: {
    },
    cups: {
        fontWeight: 'bold',
        color: variables.primaryColor,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    scrollViewItem: {
        width: window.width,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: -1
    },
    scrollViewItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: variables.sidePaddings,
        paddingLeft: variables.sidePaddings
    }
});
