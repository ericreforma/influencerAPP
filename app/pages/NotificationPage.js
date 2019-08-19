import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    NavLabelText,
    CommonText
} from '../components/Text';
import Header from '../components/Header';

import theme from '../styles/theme.style';
import lang from '../assets/language/notification';

export default class NotificationPage extends Component {
    state = {
        /*
            0 - message
            1 - approved post
            2 - payment
        */
        notificationData: [
            {
                id: 2,
                client: 'Mcdonalds Philippines',
                type: 0,
                seen: 0,
            },{
                id: 6,
                client: 'KIA Philippines',
                type: 1,
                seen: 0,
            },{
                id: 8,
                client: 'Davies Paint',
                type: 2,
                seen: 0,
            },{
                id: 9,
                client: 'Mcdonalds Philippines',
                type: 0,
                seen: 1,
            },{
                id: 10,
                client: 'KIA Philippines',
                type: 1,
                seen: 1,
            },{
                id: 12,
                client: 'Davies Paint',
                type: 2,
                seen: 1,
            }
        ]
    }

    navTitleData = () => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: theme.HEADER_PADDING_VERTICAL
                }}
            >
                <NavLabelText
                    size="large"
                    text="Notifications"
                />
            </View>
        );
    }

    render() {
        return (
            <Header
                navigation={this.props.navigation}
                backgroundGradient={true}
                backgroundGradientData={this.navTitleData()}
            >
                <View
                    style={{
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    {this.state.notificationData.map((notif, index) =>
                        <TouchableOpacity
                            key={index}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: theme.BORDER_RADIUS,
                                padding: 20,
                                marginVertical: 7,
                                elevation: 2
                            }}
                            activeOpacity={1}
                            onPress={() => alert('Notification clicked')}
                        >
                            <View>
                                <CommonText
                                    size="medium"
                                    dark={notif.seen == 1 ? false : true}
                                    text={notif.client}
                                />

                                <CommonText
                                    size="small"
                                    dark={notif.seen == 1 ? false : true}
                                    text={lang.notificationAdditionalText[notif.type]}
                                />
                            </View>

                            <Image
                                style={{
                                    width: notif.type == 2 ? 35 : 30,
                                    height: notif.type == 2 ? 35 : 30,
                                }}
                                resizeMode="contain"
                                source={theme.notificationIcons[notif.type]}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </Header>
        )
    }
}
