import React, {PureComponent} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'src/redux/connect';
import styles from './styles';
import Switcher from 'src/components/Switcher';
import Spinner from 'src/components/Spinner';
import Wrapper from 'src/components/Wrapper';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';
import {getGeolocation} from 'src/services/geolocation/getGeolocation';
import {getPlaces} from 'src/services/places/getPlaces';
import {selectPlace} from 'src/services/placeDetails/getPlaceDetails';
import NavigationService from 'src/navigation/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deg2rad, rad2deg} from 'src/helpers';

const window = Dimensions.get('window');

interface MapInternalProps {
    geolocation: object;
    places: object;
}

function stateToProps(state: State) {
    return {
        geolocation: state.geolocation,
        places: state.places,
    };
}

class MapInternal extends PureComponent<MapInternalProps & UnpackedConnect> {
    constructor(props) {
        super(props);

        this.state = {
            map: true,
            list: false
        };
    }

    componentDidMount() {
        const {dispatch, places, geolocation} = this.props;

        if (!places.data && !places.loading) {
            dispatch(getPlaces({}))
        }

        if (!geolocation.userLocation && !geolocation.loading) {
            dispatch(getGeolocation({}));
        }

        // исправляет перемещение в океан (нулевые координаты)
        requestAnimationFrame(() => {
            if (this.map) {
                this.map.animateToRegion(geolocation.region || {
                    latitude: 53.902687,
                    longitude: 27.560986,
                    latitudeDelta: 0.035,
                    longitudeDelta: 0.035
                }, 1);
            }
        });
    }

    toMyLocation() {
        const {geolocation} = this.props;

        if (this.map && geolocation.userLocation) {
            this.map.animateToRegion(geolocation.userLocation, 1);
        }
    }

    onPlaceSelect(place) {
        this.onPlaceDetails(place.id);
    }

    onPlaceDetails(placeId) {
        const {dispatch} = this.props;
        dispatch(selectPlace(placeId));
        NavigationService.navigate('PlaceDetails', {id: placeId});
    }

    onListSelect() {
        this.setState({
            list: true,
            map: false
        });
    }

    onMapSelect() {
        this.setState({
            list: false,
            map: true
        });
    }

    getDistance(lat1, lon1, lat2, lon2) {
        const theta = lon1 - lon2;
        let dist = Math.sin(deg2rad(lat1))
            * Math.sin(deg2rad(lat2))
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat2))
            * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        const definition = dist < 1 ? 'м' : 'км';
        const value = dist < 1 ? (dist * 1000).toFixed(0) : dist.toFixed(2);

        return value + ' ' + definition;
    }

    renderList() {
        const {
            places
        } = this.props;

        return (
            <ScrollView
                style={[
                    styles.container,
                    this.state.map && {left: window.width}
                ]}
                bounces={false}
                overScrollMode={'never'}
                contentContainerStyle={styles.scrollviewContainer}
            >
                {places.data && places.data.map((place, index) => {
                    return (
                        <TouchableOpacity
                            key={place.id}
                            activeOpacity={0.8}
                            style={[
                                styles.cafeBlock,
                                {
                                    // если хотим borderTop на первый элемент - раскомменти ниже
                                    // borderTopWidth: index === 0 ? 2 : 0,
                                    borderBottomWidth: places.data.length - 1 === index ? 0 : 2
                                }
                            ]}
                            onPress={() => this.onPlaceDetails(place.id)}
                        >
                            <Image
                                source={place.images && place.images.length > 0
                                    ? {uri: place.images[0]}
                                    : require('src/assets/images/no-photo.jpg')
                                }
                                style={styles.cafeBlockImage}
                            />
                            <View style={styles.descriptionBlock}>
                                <Text style={styles.title}>{place.title}</Text>
                                <Text style={styles.address}>{place.address.addressLine1}</Text>
                                {this.state.userLocation && (
                                    <Text style={styles.distance}>
                                        {this.getDistance(
                                            this.state.userLocation.latitude,
                                            this.state.userLocation.longitude,
                                            place.location.latitude,
                                            place.location.longitude,
                                        )}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    renderMap() {
        const {
            places,
            geolocation
        } = this.props;

        return (
            <View style={[
                styles.map,
                this.state.list && {left: window.width}
            ]}>
                { geolocation.region && <MapView
                    loadingEnabled
                    zoomEnabled={true}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsMyLocationButton={false}
                    showsUserLocation={true}
                    rotateEnabled={false}
                    ref={ref => { this.map = ref; }}
                    initialRegion={geolocation.region}
                >
                    {places.data && places.data.map(place => (
                        <MapView.Marker
                            key={place.id}
                            coordinate={place.location}
                            onPress={(e) => {
                                this.onPlaceSelect(place);
                                e.stopPropagation();
                            }}
                        >
                            <View style={styles.marker}>
                                <View style={styles.markerCircle}>
                                    <View style={styles.markerCircleWhite}/>
                                </View>
                                <View style={styles.markerCircleTextWrapper}>
                                    <Text numberOfLines={1} style={styles.markerCircleText}>{place.title}</Text>
                                </View>
                            </View>
                            { /* <MapView.Callout tooltip={true} /> */ }
                        </MapView.Marker>
                    ))}
                </MapView> }
                {this.state.map && <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        position: 'absolute',
                        width: 46,
                        height: 46,
                        right: 15,
                        bottom: 80,
                        backgroundColor: '#fff',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 60 / 2,
                        opacity: 0.9,
                    }}
                    onPress={this.toMyLocation.bind(this)}
                >
                    <Icon name='location-arrow' size={24} />
                </TouchableOpacity>}
            </View>
        );
    }

    render() {
        const {geolocation} = this.props;

        return (
            <Wrapper>
                <StatusBar barStyle={this.state.map ? 'dark-content' : 'light-content'} />
                { geolocation.loading && <Spinner/> }
                <Switcher
                    buttons={[
                        {
                            text: 'НА КАРТЕ',
                            active: this.state.map,
                            onPress: () => this.onMapSelect()
                        },
                        {
                            text: 'СПИСКОМ',
                            active: this.state.list,
                            onPress: () => this.onListSelect()
                        }
                    ]}
                />
                { this.renderMap() }
                { this.renderList() }
            </Wrapper>
        );
    }
}

export const Map = connect<MapInternalProps>(stateToProps)(MapInternal);
