import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import styles from './styles';

export default class Wrapper extends Component {
    render() {
        return(
            <View style={styles.container}>
                { this.props.children }
            </View>
        )
    }
}
