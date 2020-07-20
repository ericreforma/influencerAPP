import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavLabelText } from '../../components/Text';
import theme from '../../styles/theme.style';

const Title = props => (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
    >
        <View
            style={{
                paddingHorizontal: theme.HORIZONTAL_PADDING,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: theme.HEADER_PADDING_VERTICAL
                }}
            >
                <NavLabelText
                    size="large"
                    text={props.title}
                />
            </View>
        </View>
    </LinearGradient>
);

export default Title;
