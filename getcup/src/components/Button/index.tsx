import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

const {width: viewportWidth} = Dimensions.get('window');
import styles from './styles';

const sizes = {
    s: 0.4,
    m: 0.6,
    l: 0.8,
};

export default class Button extends Component {
    render() {
        let borderColor = this.props.borderColor;
        return (
            <TouchableOpacity
                style={[
                    styles.buttonWrapper,
                    {
                        backgroundColor: this.props.bgColor,
                        borderWidth: borderColor ? 2 : 0,
                        borderColor: borderColor,
                    },
                ]}
                onPress={this.props.onClick}
                activeOpacity={0.8}
            >
                <Text style={[
                    styles.buttonText, {color: this.props.color},
                ]}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}
