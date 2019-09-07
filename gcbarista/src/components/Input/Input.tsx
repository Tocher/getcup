import * as React from 'react';
import {
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputFocusEventData, TextInputProps,
    View, ViewStyle,
} from 'react-native';
import {State} from 'src/schema/global';
import {whiteColor} from 'src/global/variables';
import {connect} from 'src/redux/connect';

export interface InputProps extends Pick<TextInputProps, 'keyboardType'> {
    placeholder?: string;
    password?: boolean;
    style?: ViewStyle;
    onChange?: (val: string) => void;
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

interface Internal {

}

interface ComponentState {
    text: string;
}

function stateToProps(state: State, props: InputProps): Internal {
    return {};
}

class InputInternal extends React.Component<InputProps & Internal, ComponentState> {
    constructor(props: InputProps) {
        super(props);

        this.state = { text: '' };
    }

    onChangeText(text: string) {
        this.setState({text});

        let {onChange} = this.props;

        if (onChange) {
            onChange(text);
        }
    }

    render() {
        let {password, placeholder, style, onFocus, onBlur, keyboardType} = this.props;
        let {text} = this.state;

        return (
            <View style={style ? style : {}}>
                {text.length < 1 && placeholder && (
                    <Text style={{
                        position: 'absolute',
                        color: '#555555',
                        height: 40,
                        lineHeight: 40,
                        paddingLeft: 2,
                    }}>
                        {placeholder}
                    </Text>
                )}
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#555555',
                        borderBottomWidth: 1,
                        color: whiteColor,
                    }}
                    keyboardType={keyboardType}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={password}
                    onChangeText={this.onChangeText.bind(this)}
                    value={text}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </View>
        );
    }

}

export const Input = connect<InputProps>(stateToProps)(InputInternal);
