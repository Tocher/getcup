import React, {PureComponent} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {borderRaduis, primaryColor, whiteColor} from 'src/global/variables';
import {connect} from 'src/redux/connect';
import {Dict} from 'src/schema/global';

export interface Button2Props {
    text: string;
    onClick: () => void;
    width?: number;
    disableTopRadius?: boolean;
}

interface Internal {
}

function stateToProps(): Internal {
    return {};
}

class Button2Internal extends PureComponent<Button2Props & Internal> {

    render() {
        let {onClick, text, width, disableTopRadius} = this.props;
        let borderRaduisStyle: Dict = {
            borderRadius: borderRaduis,
        };

        if (disableTopRadius) {
            borderRaduisStyle = {
                borderBottomLeftRadius: borderRaduis,
                borderBottomRightRadius: borderRaduis,
            };
        }

        return(
            <TouchableOpacity
                style={{
                    backgroundColor: primaryColor,
                    ...borderRaduisStyle,
                }}
                onPress={onClick}
                activeOpacity={0.8}
            >
                <Text style={{
                    color: whiteColor,
                    textAlign: 'center',
                    lineHeight: 48,
                    height: 48,
                    fontSize: 16,
                    width: width,
                }}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }

}

export const Button2 = connect<Button2Props>(stateToProps)(Button2Internal);
