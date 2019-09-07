import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pulse from 'react-native-pulse';

import * as styleVariables from 'src/assets/styles/variables';
import styles from './styles';


const ICON_SIZE = parseInt((styleVariables.socialButtonHeight * 0.4).toFixed());

export default class GetCoffeeButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.buttonWrapper]}
                onPress={this.props.onClick}
                activeOpacity={0.8}
            >
                <Pulse color='#821a1b' numPulses={2} diameter={80} speed={150} duration={1500} />
                <View
                    style={[
                        styles.iconWrapper,
                        {
                            backgroundColor: '#821a1b',
                        },
                    ]}
                >
                    <Icon name='coffee' size={ICON_SIZE} style={[styles.icon]} />
                </View>
            </TouchableOpacity>
        );
    }
}
