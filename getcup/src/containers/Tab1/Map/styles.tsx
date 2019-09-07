import {StyleSheet, Dimensions} from 'react-native';
import * as variables from 'src/assets/styles/variables';

const window = Dimensions.get('window');

// Задаем высоту блока в зависимости от высоты экрана устройства
let listViewHeight;
if (window.height > 1000) {
    listViewHeight = +(window.height / 5.7).toFixed();
} else if (window.height <= 1000 && window.height > 650) {
    listViewHeight = +(window.height / 4.7).toFixed();
} else if (window.height <= 650) {
    listViewHeight = +(window.height / 3.7).toFixed();
}

export default StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    cafeBlock: {
        width: window.width,
        position: 'relative',
        backgroundColor: '#000',
        borderColor: '#fff'
    },
    descriptionBlock: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 20,
    },
    address: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 14,
    },
    distance: {
        marginTop: 10,
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 12,
    },

    cafeBlockImage: {
        resizeMode: 'cover', // or 'stretch',
        height: listViewHeight,
        opacity: .4,
    },
    marker: {
        flexDirection: 'row',
        marginLeft: '50%',
    },
    markerCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        zIndex: 5
    },
    markerCircleWhite: {
        width:14,
        height:14,
        borderRadius: 7,
        backgroundColor: variables.primaryColor,
    },
    markerCircleTextWrapper: {
        zIndex: 4,
        height: 20,
        marginTop: 2,
        marginLeft: -10,
        paddingLeft: 12,
        paddingRight: 5,
        backgroundColor: '#fff',
        opacity: .9,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    markerCircleText: {
        fontSize: 11,
        lineHeight: 19,
        color: '#333',
    }
});
