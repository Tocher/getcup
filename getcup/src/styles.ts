import { StyleSheet } from 'react-native';
import * as variables from 'src/assets/styles/variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBar: {
        zIndex: 9999,
        height: 20,
        backgroundColor: variables.primaryColor,
        opacity: 0.7
    }
});
