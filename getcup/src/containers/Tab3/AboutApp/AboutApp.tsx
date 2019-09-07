import React, {Component} from 'react';
import {View, Image, ScrollView, Text, StatusBar, TouchableHighlight} from 'react-native';
import * as variables from 'src/assets/styles/variables';

import Button from 'src/components/Button';
import Wrapper from 'src/components/Wrapper';
import {connect} from 'src/redux/connect';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';

import styles from 'src/containers/Tab3/AboutApp/AboutAppStyles';
import codePush from 'react-native-code-push';
import NavigationService from 'src/navigation/NavigationService';

interface AboutAppProps {

}

function stateToProps(state: State) {

    return {
        auth: state.auth,
        subscription: state.subscription
    };
}

class AboutAppInternal extends Component<AboutAppProps & UnpackedConnect> {
    public state = {
        codePushData: undefined,
    };

    componentDidMount() {
        const {codePushData} = this.state;

        if (!codePushData) {
            codePush.getUpdateMetadata().then((update) => {
                console.log('getUpdateMetadata', update);
                if (update) {
                    setTimeout(() => {
                        this.setState({
                            codePushData: update,
                        })
                    });
                }
            });
        }
    }

    back() {
        NavigationService.navigate('Profile');
    }

    render() {
        const {codePushData} = this.state;

        return (
            <Wrapper>
                <Text style={styles.title}>О приложении</Text>
                <View style={styles.contentContainer}>
                    <ScrollView style={styles.scrollView}>
                        {codePushData && (
                            <React.Fragment>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.appVersion}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.label}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.bundlePath}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.failedInstall}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.isFirstRun}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.isPending}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor='#e0e0e0'
                                    style={styles.scrollViewItem}
                                >
                                    <View style={styles.scrollViewItemWrapper}>
                                        <Text>{codePushData.packageSize}</Text>
                                    </View>
                                </TouchableHighlight>
                            </React.Fragment>
                        )}
                    </ScrollView>
                    <Button
                        onClick={() => this.back()}
                        borderColor={variables.primaryColor}
                        color={variables.primaryColor}
                    >
                        Назад
                    </Button>
                </View>
            </Wrapper>
        );
    }
}

export const AboutApp = connect(stateToProps)(AboutAppInternal);
