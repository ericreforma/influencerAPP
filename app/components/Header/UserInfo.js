import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../styles/theme.style';
import NavigationService from '../../services/navigation';
import image from '../../assets';
import { URL } from '../../config/url';

const UserInfo = props => (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
        style={{
            marginBottom: 15
        }}
    >
        <View
            style={{
                paddingVertical: 13,
                paddingHorizontal: theme.HORIZONTAL_PADDING,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: theme.COLOR_WHITE,
                    padding: 1,
                    borderRadius: 75,
                    marginRight: 15
                }}
                onPress={() => NavigationService.navigate('Profile')}
            >
                { props.user && 
                    <Image
                        style={{
                            width: 75,
                            maxWidth: 75,
                            height: 75,
                            maxHeight: 75,
                            borderRadius: 200,
                        }}
                        resizeMode="cover"
                        source={props.user.media === null ?
                            image.male_avatar : 
                            { uri: `${URL.SERVER_STORAGE}/${props.user.media.url}` }}
                    />
                }
                
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}
            >
                <Text
                    style={{
                        fontSize: theme.FONT_SIZE_LARGE,
                        color: theme.COLOR_BLACK,
                        fontFamily: 'AvenirLTStd-Black'
                    }}
                >
                    {props.user.name}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 5
                    }}
                >
                    <Text
                        style={{
                            fontSize: theme.FONT_SIZE_MEDIUM,
                            color: theme.COLOR_BLACK,
                            fontFamily: 'AvenirLTStd-Black',
                            marginRight: 5
                        }}
                    >
                        {props.user.rating.average}
                    </Text>

                    {Array(5).fill(image.icon.star_active).map((star, index) =>
                        <Image
                            key={index}
                            style={{
                                width: 18,
                                height: 18,
                                marginHorizontal: 5
                            }}
                            resizeMode="contain"
                            source={
                                (index + 1) <= props.user.rating.average ?
                                star :
                                image.icon.star_inactive
                            }
                        />
                    )}

                    <Text
                        style={{
                            fontSize: theme.FONT_SIZE_SMALL - 3,
                            color: theme.COLOR_BLACK,
                            fontFamily: 'AvenirLTStd-Light',
                            marginLeft: 5
                        }}
                    >
                        ({props.user.rating.total})
                    </Text>
                </View>
            </View>
        </View>
    </LinearGradient>
);

export default UserInfo;
