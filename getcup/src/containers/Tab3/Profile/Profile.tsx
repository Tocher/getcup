import React, {Component} from 'react';
import {View, Image, ScrollView, Text, TouchableHighlight} from 'react-native';
import * as variables from 'src/assets/styles/variables';

import Button from 'src/components/Button';
import Wrapper from 'src/components/Wrapper';
import {connect} from 'src/redux/connect';
import {UnpackedConnect} from 'src/redux/redux';
import {AuthSchema, State} from 'src/schema/global';

import styles from 'src/containers/Tab3/Profile/ProfileStyles';
import {logout} from 'src/services/auth/logout';
import NavigationService from 'src/navigation/NavigationService';
import {getSubsctiptionCups} from 'src/helpers/Subscription/getSubscriptionCups';

interface ProfileProps {

}

interface Internal {
    auth?: AuthSchema;
    cups: number;
}

function stateToProps(state: State): Internal {

    return {
        auth: state.auth,
        cups: getSubsctiptionCups(state),
    };
}

class ProfileInternal extends Component<ProfileProps & Internal & UnpackedConnect> {
    userLogout() {
        this.props.dispatch(logout({}));
    }

    userInfo() {
        const {auth, cups} = this.props;

        if (!auth) return;

        // TODO no auth.avatar -> show stub image

        return (
            <View style={styles.userWrapper}>
                <Image
                    style={styles.avatar}
                    source={{uri: auth.avatar && auth.avatar.url}}
                />
                <View style={styles.userTextWrapper}>
                    <Text>{auth.name}</Text>
                    <Text style={styles.cups}>Чашек: {cups}</Text>
                </View>
            </View>
        )
    }

    onScrollViewItemClick(item?: string) {
        if (item === 'app') {
            NavigationService.navigate('AboutApp');
        }
    }

    render() {
        return (
            <Wrapper>
                <Text style={styles.title}>Профиль</Text>
                <View style={styles.contentContainer}>
                    {this.userInfo()}
                    <ScrollView style={styles.scrollView}>
                        <TouchableHighlight
                            activeOpacity={0.8}
                            underlayColor='#e0e0e0'
                            style={styles.scrollViewItem}
                            onPress={() => this.onScrollViewItemClick()}
                        >
                            <View style={styles.scrollViewItemWrapper}>
                                <Text>Настройки</Text>
                                <Text>></Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            activeOpacity={0.8}
                            underlayColor='#e0e0e0'
                            style={styles.scrollViewItem}
                            onPress={() => this.onScrollViewItemClick()}
                        >
                            <View style={styles.scrollViewItemWrapper}>
                                <Text>FAQ</Text>
                                <Text>></Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            activeOpacity={0.8}
                            underlayColor='#e0e0e0'
                            style={styles.scrollViewItem}
                            onPress={() => this.onScrollViewItemClick('app')}
                        >
                            <View style={styles.scrollViewItemWrapper}>
                                <Text>О приложении</Text>
                                <Text>></Text>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                    <Button
                        onClick={() => this.userLogout()}
                        borderColor={variables.primaryColor}
                        color={variables.primaryColor}
                    >
                        Выйти
                    </Button>
                </View>
            </Wrapper>
        );
    }
}

export const Profile = connect(stateToProps)(ProfileInternal);
