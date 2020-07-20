import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import lang from '../../assets/language/Main';
import theme from '../../styles/theme.style';
import { LabelText } from '../Text';
import image from '../../assets';

const Logo = props => (
    <View style={{ flex: 1 }}>  
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                left: 20
            }}
            onPress={() => { props.navigation.navigate('Home'); }}
        >
            <Image
                style={{
                    height: 30,
                    width: 30,
                    marginRight: 10,
                    backgroundColor: `${theme.COLOR_WHITE}00`
                }}
                resizeMode="contain"
                source={image.app_icon_png}
            />

            <LabelText
                size="large"
                dark={!(props.theme === 'dark')}
                white={true}
                text={'Hatchery'}
            />
        </TouchableOpacity>
    </View>
);

export default Logo;
