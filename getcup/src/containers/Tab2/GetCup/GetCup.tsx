import React, {PureComponent} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import {connect} from 'src/redux/connect';

import Switcher from 'src/components/Switcher';
import Wrapper from 'src/components/Wrapper';
import Spinner from 'src/components/Spinner';

import styles, {coffeeSize} from './styles';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';
import {getProducts} from 'src/services/products/getProducts';
import NavigationService from 'src/navigation/NavigationService';
import {chooseProduct} from 'src/services/products/chooseProduct';
import {chooseProductPlace} from 'src/services/products/chooseProductPlace';

interface Internal {
    products: object;
    subscription: object;
}

function stateToProps(state: State): Internal {
    return {
        products: state.products,
        subscription: state.subscription,
    };
}

class GetCupInternal extends PureComponent<Internal & UnpackedConnect> {
    componentDidMount() {
        const {dispatch, products} = this.props;
        // не загружаем если уже есть
        if (products.data) return;
        dispatch(getProducts({}));
    }

    getImage = (product) => {

        let img;
        switch (product.title) {
        case 'Американо': {
            img = require('src/assets/images/cups/americano.jpg');
            break;
        }
        case 'Капучино': {
            img = require('src/assets/images/cups/cappuccino-2.jpg');
            break;
        }
        case 'Латте': {
            img = require('src/assets/images/cups/latte.jpg');
            break;
        }
        case 'Эспрессо': {
            img = require('src/assets/images/cups/espresso-2.jpg');
            break;
        }
        default: {
            img = require('src/assets/images/cups/americano.jpg');
        }
        }

        return <Image
            source={img}
            style={styles.image}
        />;
    };

    onCoffeeClick(productId) {
        const {dispatch} = this.props;

        dispatch(chooseProduct(productId));

        NavigationService.navigate('Qrcode');
    }

    renderProducts(data) {
        // Раскладываем массив по 2 элемента в массив
        const newArr = [];

        data.map((e, i) => {
            if (i%2) {
                newArr[newArr.length - 1].push(e);
            } else {
                newArr.push([e]);
            }
        });

        return newArr.map(this.renderProductLine.bind(this));
    }

    renderProductLine(line, i) {
        const items = line.map(this.renderProductItem.bind(this));

        return (
            <View key={i} style={styles.coffeeLine}>
                {items}
            </View>
        );
    }

    renderProductItem(product) {
        const {subscription} = this.props;

        const isDisabled = !(
            subscription.data &&
            subscription.data.subscription &&
            Array.isArray(subscription.data.subscription.productTypes) &&
            subscription.data.subscription.productTypes.some(t => t === product.productTypeId)
        );

        return (
            <View key={product.id}>
                <TouchableOpacity
                    onPress={() => this.onCoffeeClick(product.id)}
                    activeOpacity={0.8}
                    disabled={isDisabled}
                >
                    <View style={isDisabled ? {...styles.imageContainer, ...styles.imageContainerDisabled} : styles.imageContainer}>
                        { this.getImage(product) }
                    </View>
                    <Text style={isDisabled ? {...styles.coffeeText, ...styles.coffeeTextDisabled} : styles.coffeeText}>{ product.title }</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {dispatch, products} = this.props;

        return (
            <Wrapper>
                {products.loading && <Spinner/>}
                <Switcher
                    buttons={[
                        {
                            text: 'С СОБОЙ',
                            active: products.currentPlace === 'с собой',
                            onPress: () => dispatch(chooseProductPlace('с собой'))
                        },
                        {
                            text: 'В КОФЕЙНЕ',
                            active: products.currentPlace === 'в кофейне',
                            onPress: () => dispatch(chooseProductPlace('в кофейне'))
                        }
                    ]}
                />
                <Text style={styles.title}>Что будете пить?</Text>
                <ScrollView
                    style={styles.contentContainer}
                    contentContainerStyle={styles.scrollviewContentContainer}
                    bounces={false}
                    overScrollMode={'never'}
                >
                    {products.data && this.renderProducts(products.data)}
                </ScrollView>
            </Wrapper>
        );
    }
}

export const GetCup = connect(stateToProps)(GetCupInternal);
