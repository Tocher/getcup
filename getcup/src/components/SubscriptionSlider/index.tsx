import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class SubscriptionSlider extends Component {
    get image () {
        const { data: { type } } = this.props;

        let img;
        switch (type) {
            case 0: {
                img = require('src/assets/images/subscriptions/modified/type-0.png');
                break;
            }
            case 1: {
                img = require('src/assets/images/subscriptions/modified/type-1.png');
                break;
            }
            default: {
                img = require('src/assets/images/subscriptions/modified/type-0.png');
            }
        }

        return <Image
            //source={{ uri: illustration }}
            source={img}
            style={styles.image}
        />;
    }

    render () {
        const { data: { title, productTypes, products }, even } = this.props;

        const uppercaseTitle = title ? <Text style={styles.title}>{title}</Text> : false;

        const productsText = productTypes && products
            ? productTypes.map(typeId => products.filter(p => p.productTypeId === typeId).map(p => p.title).join(', ')).join(', ')
            : 'загрузка...';

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.slideInnerContainer}
                onPress={() => {}}
            >
                <View style={styles.imageContainer}>
                    { this.image }
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                </View>
                <View>
                    <Text style={styles.descriptionText}>{productsText}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
