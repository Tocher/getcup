import React, {PureComponent} from 'react';
import {WebView} from 'react-native-webview';
import Wrapper from 'src/components/Wrapper';
import Spinner from 'src/components/Spinner';
import {connect} from 'src/redux/connect';
import {State} from 'src/schema/global';
import {UnpackedConnect} from 'src/redux/redux';

import styles from './styles';
import {successSubscription} from 'src/services/subscription/successSubscription';
import {cancelSubscription} from 'src/services/subscription/cancelSubscription';

interface Internal {}

interface ComponentState {
    willDestroy: boolean;
}

function stateToProps(state: State) {
    return {
        subscription: state.subscription
    };
}

class PaymentInternal extends PureComponent<Internal & UnpackedConnect> {
    public state: ComponentState = {
        willDestroy: false,
    };

    onChange(location) {
        const {willDestroy} = this.state;

        if (!willDestroy && location.url.indexOf('https://getcup.by/') !== -1) {
            this.setState({
                willDestroy: true,
            });

            this.props.dispatch(successSubscription({}));
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const {subscription} = this.props;

            if (!subscription.data && !subscription.data.uri) {
                // todo: show warning
                this.props.dispatch(cancelSubscription({}));
            }
        }, 1000 * 30);
    }

    render() {
        const {subscription} = this.props;
        return (
            <Wrapper>
                {subscription.data && subscription.data.uri ? (
                    <WebView
                        source={{uri: subscription.data.uri}}
                        style={styles.webView}
                        onNavigationStateChange={this.onChange.bind(this)}
                    />
                ) : <Spinner text={'Выполняется запрос в банк.\nНе закрывайте страницу'} />}
            </Wrapper>
        )
    }
}

export const Payment = connect(stateToProps)(PaymentInternal);
