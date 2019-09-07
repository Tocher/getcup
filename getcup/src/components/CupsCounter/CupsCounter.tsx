import React, {PureComponent} from 'react';
import { View, Text } from 'react-native';
import {connect} from 'src/redux/connect';

import Icon from 'src/components/Icon';
import * as variables from 'src/assets/styles/variables';
import {State} from 'src/schema/global';
import {UnpackedConnect} from 'src/redux/redux';
import styles from './styles';

interface Internal {}

function stateToProps(state: State): Internal {
    return {
        subscription: state.subscription,
        subscriptionSubTypes: state.subscriptionSubTypes,
    };
}

class CupsCounterInternal extends PureComponent<Internal & UnpackedConnect> {
    render() {
        const { subscription, subscriptionSubTypes } = this.props;
        const subscriptionSubType = subscriptionSubTypes.data.find(st => st.id === subscription.data.subscriptionSubtypeId);

        return (
            <View style={styles.cupsContainer}>
                <Icon
                    name='TermoCup'
                    height="50"
                    fill={variables.primaryColor}
                    stroke={variables.primaryColor}
                />
                <View style={styles.cupsTextContainer}>
                    <Text style={styles.leftCups}>{subscription.data.cups}</Text>
                    <Text style={styles.totalCups}>/ {subscriptionSubType.cups}</Text>
                </View>
            </View>
        );
    }
}

export const CupsCounter = connect<Internal>(stateToProps)(CupsCounterInternal);
