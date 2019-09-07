import React  from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as styleVariables from 'src/assets/styles/variables';
import styles from './styles';

const ICON_SIZE = parseInt((styleVariables.socialButtonHeight * 0.4).toFixed());

const SocialButton = ({ onClick, text, color, type }) => (
    <TouchableOpacity
        style={[styles.buttonWrapper, { borderColor: color }]}
        onPress={onClick}
        activeOpacity={0.8}
    >
        <View style={[styles.iconWrapper, { backgroundColor: color }]}>
            <Icon name={type} size={ICON_SIZE} style={[styles.icon]} />
        </View>
        <Text style={[styles.buttonText, { color: styleVariables.socialButtonColor}]}>{text}</Text>
    </TouchableOpacity>
);

export default SocialButton;
