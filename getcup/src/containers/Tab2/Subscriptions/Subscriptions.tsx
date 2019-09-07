import React, {PureComponent} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SubscriptionSlider from 'src/components/SubscriptionSlider';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import * as variables from 'src/assets/styles/variables';
import {connect} from 'src/redux/connect';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';

import {sliderWidth, itemWidth} from 'src/components/SubscriptionSlider/styles';
import styles from './styles';

import Spinner from 'src/components/Spinner';
import Wrapper from 'src/components/Wrapper';
import {createSubscription} from 'src/services/subscription/createSubscription';
import {getSubscriptionTypes} from 'src/services/subscriptionTypes/getSubscriptionTypes';
import {getProducts} from 'src/services/products/getProducts';

interface SubscriptionsInternalProps {
    subscription: object;
    subscriptionTypes: object;
    products: object;
}

function stateToProps(state: State) {
    return {
        subscription: state.subscription,
        subscriptionTypes: state.subscriptionTypes,
        products: state.products,
    };
}

class SubscriptionsInternal extends PureComponent<SubscriptionsInternalProps & UnpackedConnect> {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 0,
            slider1Ref: null,
            activeCupCount: 10,
            selectedSubtypeIndex: 0,
        };
    }

    componentDidMount() {
        if (!this.props.products.data) {
            this.props.dispatch(getProducts({}));
        }

        if (this.props.subscriptionTypes.data) {
            this.setDefaultActiveValues();
            return;
        }

        this.props.dispatch(getSubscriptionTypes({}));
    }

    componentDidUpdate(prevProps: State) {
        if (!prevProps.subscriptionTypes.data && this.props.subscriptionTypes.data) {
            this.setDefaultActiveValues();
        }
    }

    setDefaultActiveValues = () => {
        const {slider1ActiveSlide} = this.state;
        const {subscriptionTypes} = this.props;

        const {subtypes} = subscriptionTypes.data[slider1ActiveSlide];

        const selectedSubtypeIndex = subtypes.length === 3 ? 1 : 0;
        const activeCupCount = subtypes.length === 3 ? subtypes[1].cups : subtypes[0].cups;

        this.setState({
            selectedSubtypeIndex,
            activeCupCount
        });
    };

    onButtonClick(subsTypeId: number, subsSubtypeId: number) {
        const {dispatch} = this.props;

        dispatch(createSubscription({subsTypeId, subsSubtypeId}))
    }

    _renderItem ({item, index}) {
        return (
            <SubscriptionSlider
                data={item}
                even={(index + 1) % 2 === 0}
            />
        );
    }

    _renderButtons (count, subtypeIndex) {
        const {activeCupCount} = this.state;
        const isActive = count === activeCupCount;

        return <TouchableOpacity
            key={count}
            activeOpacity={0.8}
            style={[styles.cupButton, isActive && styles.activeButton]}
            onPress={() => this.setState({activeCupCount: count, selectedSubtypeIndex: subtypeIndex})}
        >
            <Text
                style={[styles.cupButtonText, isActive && styles.activeText]}
            >
                {count}
            </Text>
            <Icon
                name='TermoCup'
                height={variables.chooseCupsCountIcon}
                fill={isActive ? variables.chooseCupsCountActiveColor : variables.chooseCupsCountColor}
                stroke={isActive ? variables.chooseCupsCountActiveColor : variables.chooseCupsCountColor}
            />
        </TouchableOpacity>;
    }

    get carousel() {
        const {selectedSubtypeIndex, slider1ActiveSlide} = this.state;
        const {subscriptionTypes, products} = this.props;
        const buttons = subscriptionTypes.data[slider1ActiveSlide].subtypes.map(s => s.cups).map(this._renderButtons.bind(this));

        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    ref={(c) => { if (!this.state.slider1Ref) { this.setState({slider1Ref: c}); } }}
                    data={subscriptionTypes.data.map(s => ({...s, products: products.data}))}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={false}
                    firstItem={0}
                    inactiveSlideScale={0.7}
                    inactiveSlideOpacity={0.6}
                    scrollEventThrottle={200}
                    enableMomentum={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index}) }
                />
                <View style={styles.bottomContent}>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>
                            {subscriptionTypes.data[slider1ActiveSlide].subtypes[selectedSubtypeIndex].price.value} BYN
                        </Text>
                    </View>
                    <View style={styles.priceHint}>
                        <Text style={styles.priceHintText}>2.5</Text>
                        <Text style={styles.priceHintSymbol}>BYN</Text>
                        <Text style={styles.priceHintText}>за кружку, вместо 3.5</Text>
                        <Text style={styles.priceHintSymbol}>BYN</Text>
                    </View>
                    <View style={styles.cupButtons}>
                        { buttons }
                    </View>
                </View>
            </View>
        );
    }

    // render({ selectedType })
    render() {
        const {subscriptionTypes} = this.props;
        const {slider1ActiveSlide, selectedSubtypeIndex} = this.state;

        // Временные переменные
        let selectedType, selectedSubType;
        if (subscriptionTypes.data) {
            selectedType = subscriptionTypes.data[slider1ActiveSlide];
            selectedSubType = selectedType.subtypes[selectedSubtypeIndex];
        }

        return (
            <Wrapper>
                { subscriptionTypes.loading && <Spinner/> }
                <Text style={styles.title}>Абонемент на кофе</Text>
                {subscriptionTypes.data && (
                    <View style={styles.contentContainer}>
                        { this.carousel }
                        <Button
                            size='l'
                            bgColor='#651919'
                            color='#fff'
                            onClick={() => this.onButtonClick(selectedType.id, selectedSubType.id)}
                        >
                            КУПИТЬ АБОНЕМЕНТ
                        </Button>
                    </View>
                )}

            </Wrapper>
        );
    }
}

export const Subscriptions = connect(stateToProps)(SubscriptionsInternal);
