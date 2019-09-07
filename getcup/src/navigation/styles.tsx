import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as variables from 'src/assets/styles/variables';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBar: {
        paddingTop: variables.navbarPadding,
        height: variables.navbarHeight,
        backgroundColor: variables.primaryColor
    },
    navBarTransparent: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    title: {
        color: '#fff'
    },
    navMenuButton: {
        marginTop: -3
    },
    navMenuButtonIcon: {
        color: '#fff',
        paddingLeft: 10, // Для удобства нажатия
        paddingRight: 10,
    },
    tabIcon: {
        color: '#000'
    },
    leftButton: {
        tintColor: '#fff'
    },
    leftButtonDark: {
        tintColor: '#333'
    },
    rightButton: {
        color: '#fff'
    }
});
