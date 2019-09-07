import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import * as variables from 'src/assets/styles/variables';
import styles from './styles';

export default class Spinner extends Component {
    render() {
        const { text = 'Обжариваем зерна...' } = this.props;

        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    color={variables.primaryColor}
                    size={'large'}
                />
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}
