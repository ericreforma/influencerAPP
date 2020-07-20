import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { CommonText } from '../components/Text';
import { Title } from '../components/Header';
import theme from '../styles/theme.style';
import { connect } from 'react-redux';
import { NotificationAction } from '../redux/actions/notification.action';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

class NotificationPage extends Component {
    constructor(props) {
        super(props);
        props.getNotifs();
    }

    render = () => (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Title title={'Notifications'} />
                <View
                    style={{
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    {this.props.notification.all.map((notif, index) =>
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
                            onPress={() => {
                                HttpRequest.get(URL.NOTIFICATION.OPENED, { notification_id: notif.id })
                                .then(() => {
                                    this.props.getNotifs();
                                    if (notif.type === 1) {
                                        this.props.navigation.navigate('MyCampaign');
                                    }
                                })
                                .catch(e => {
                                    console.log('error');
                                    console.log(e);
                                    console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
                                });
                            }}
                        >
                            <View>
                                <CommonText
                                    size="medium"
                                    dark={notif.isOpened !== 1}
                                    text={notif.from_name}
                                />

                                <CommonText
                                    size="small"
                                    dark={notif.isOpened !== 1}
                                    text={notif.message}
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
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    notification: state.notification
});

const mapDispatchToProps = (dispatch) => ({
    getNotifs: () => dispatch(NotificationAction.get())
  });
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
