import React, {PureComponent} from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View, RefreshControl, StatusBar} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {connect} from 'src/redux/connect';
import styles from './styles';
import {getDayIndex} from 'src/helpers';
import * as variables from 'src/assets/styles/variables';
import Button from 'src/components/Button';
import NavigationService from 'src/navigation/NavigationService';
import {State} from 'src/schema/global';
import {UnpackedConnect} from 'src/redux/redux';
import {getPlaceDetails} from 'src/services/placeDetails/getPlaceDetails';

interface Internal {
    place: object;
}

function stateToProps(state: State): Internal {
    return {
        place: state.placeDetails
    };
}

class PlaceDetailsInternal extends PureComponent<Internal & UnpackedConnect> {
    state = {
        openText: '',
        address: '',
    };

    componentDidMount() {
        this.getReadableData();
    }

    componentDidUpdate(prevProps) {
        if (
            (!prevProps.place.data && this.props.place.data) ||
            (prevProps.place.data && prevProps.place.data.id !== this.props.place.data.id)
        ) {
            this.getReadableData();
        }
    }

    getReadableData = () => {
        this.getAddress();
        this.getOpenText();
    };

    getPlaceDetails = () => {
        const {dispatch, place} = this.props;
        dispatch(getPlaceDetails(place.data.id));
    };

    getCup = () => {
        NavigationService.navigate('SubTab1');
        NavigationService.navigate('TabTwo');
    };

    getAddress = () => {
        const {place} = this.props;

        let address = '';
        if (place.data && place.data.address) {
            address = place.data.address.addressLine1;
            address += `, ${place.data.address.city}, ${place.data.address.country}`;
        }

        this.setState({
            address,
        });
    };

    getOpenText = () => {
        const {place} = this.props;

        if (place.data && place.data.workingHours) {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const dayIndex = getDayIndex(today);
            const nextDayIndex = getDayIndex(tomorrow);
            const daySchedule = place.data.workingHours[dayIndex];
            const nextDaySchedule = place.data.workingHours[nextDayIndex];

            if (daySchedule.allDay) {
                return this.setState({
                    openText: 'Открыто круглосуточно',
                });
            }

            const currentTime= moment(today, 'HH:mm a');
            const startTime = moment(daySchedule.from, 'HH:mm a');
            const endTime = moment(daySchedule.till, 'HH:mm a');

            if (currentTime.isBetween(startTime, endTime)) {
                return this.setState({
                    openText: `Открыто до ${daySchedule.till}`,
                });
            }

            if (nextDaySchedule.from || nextDaySchedule.allDay) {
                return this.setState({
                    openText: `Закрыто, откроется завтра в ${nextDaySchedule.from || 'полночь'}`,
                });
            }
        }

        return this.setState({
            openText: 'Закрыто',
        });
    };

    render() {
        const {place, navigation} = this.props;
        const {address, openText} = this.state;

        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                overScrollMode={'never'}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={place.loading} onRefresh={this.getPlaceDetails} />}
            >
                <StatusBar barStyle="light-content" />
                <View style={styles.imageWrapper}>
                    <View style={styles.backButtonWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FeatherIcon color={'#fff'} name="chevron-left" size={30} />
                        </TouchableOpacity>
                    </View>
                    {place.data && place.data.images && place.data.images.length > 0 && !place.loading
                        ? <Image source={{uri: place.data.images[0]}} style={styles.headerImage} />
                        : <Image source={require('src/assets/images/no-photo.jpg')} style={styles.headerImage} />
                    }
                </View>
                {!!place.data && (
                    <View>
                        <Text style={styles.coffeeTitle}>{place.data && place.data.title}</Text>
                        <View style={styles.coffeeList}>
                            <Text style={styles.coffeeText}>{address}</Text>
                            <Text style={styles.coffeeText}>{openText}</Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onClick={() => this.getCup()}
                                bgColor={variables.primaryColor}
                                color='#fff'
                            >
                                Взять чашку
                            </Button>
                        </View>
                    </View>
                )}

            </ScrollView>
        );
    }
}

export const PlaceDetails = connect(stateToProps)(PlaceDetailsInternal);
