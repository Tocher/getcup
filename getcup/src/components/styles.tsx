import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});