import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './../../assets/svgs';

const Icon = (props) => <SvgIcon {...props} svgs={svgs} />;

//Icon.defaultProps = {
//    fill: '#000',
//    height: '44',
//    width: '44',
//    viewBox: '0 0 100 100'
//};

export default Icon;
