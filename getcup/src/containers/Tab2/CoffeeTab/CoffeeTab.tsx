import React, {PureComponent} from 'react';
import {connect} from 'src/redux/connect';

import {GetCup} from 'src/containers/Tab2/GetCup/GetCup';
import {Subscriptions} from 'src/containers/Tab2/Subscriptions/Subscriptions';

import {UnpackedConnect} from 'src/redux/redux';
import {State, Subscription} from 'src/schema/global';
import {getSubscription} from 'src/services/subscription/getSubscription';
import {getSubscriptionSubTypes} from 'src/services/subscriptionSubTypes/getSubscriptionSubTypes';
import Spinner from 'src/components/Spinner';

interface Internal {
    subsLoading: boolean;
    shouldLoad: boolean;
    hasSubscription: boolean;
}

function stateToProps(state: State): Internal {
    const {subscription} = state;

    const data = subscription.data || {} as Subscription;

    return {
        subsLoading: subscription.loading,
        shouldLoad: !data.cups && !subscription.loading,
        hasSubscription: data.cups > 0 && data.status === 'confirmed',
    };
}

// Какой экран показывать по табу с кофе
class CoffeeTabInternal extends PureComponent<Internal & UnpackedConnect> {
    componentDidMount() {
        const {dispatch, shouldLoad} = this.props;

        if (shouldLoad) {
            dispatch(getSubscription({}));
            dispatch(getSubscriptionSubTypes({}));
        }
    }

    render() {
        const {hasSubscription, subsLoading} = this.props;

        if (subsLoading) {
            return <Spinner />;
        }

        return hasSubscription ? <GetCup/> : <Subscriptions/>;
    }
}

export const CoffeeTab = connect(stateToProps)(CoffeeTabInternal);
