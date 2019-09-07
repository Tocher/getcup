import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
const { width: viewportWidth } = Dimensions.get('window');
import styles from './styles';

export default class Switcher extends Component {
    render() {
        const switchWidth = this.props.width || +(viewportWidth * 0.7).toFixed();
        const buttonWidth = +(switchWidth / 2).toFixed();

        let buttons = this.props.buttons || [];

        return(
            <View style={styles.container}>
                {buttons.map(function(e, i) {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={e.onPress}
                            activeOpacity={0.8}
                            style={[
                                styles.buttonWrapper,
                                i === 0 ? styles.leftButton : styles.rightButton,
                                e.active ? styles.buttonSelected : {},
                                { width: buttonWidth }
                            ]}
                        >
                            <Text style={[
                                styles.buttonText,
                                e.active ? styles.buttonTextSelected : {}
                            ]}>{e.text}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}
