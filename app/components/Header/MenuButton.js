import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import image from '../../assets';
import socket from '../../services/socket';
import { CampaignAction } from '../../redux/actions/campaign.action';

const MenuButton = props => {
    const [notifCount, setNotifCount] = useState(props.notification.unread.length);
    const dispatch = useDispatch();
    useEffect(() => {
        setNotifCount(props.notification.unread.length);
    }, [props.notification]);

    socket.notification(props.user.id, e => {
        setNotifCount(e.notif.length);
        dispatch(CampaignAction.getMyList());
    });

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>  
        {/* NOTIFICATION BUTTON */}
            <TouchableOpacity
                onPress={() => { props.navigation.navigate('Notification'); }}
                style={{ 
                    paddingRight: 20,
                    position: 'relative'
                }}
            >
                <Image
                    style={{
                        height: 33,
                        width: 25,
                        zIndex: 1,
                        position: 'relative'
                    }}
                    resizeMode="contain"
                    source={(props.theme === 'dark') ?
                        image.icon.notification_icon_white :
                        image.icon.notification_icon}
                />
                { notifCount !== 0 && 
                    <Text
                        style={{ 
                            backgroundColor: 'red',
                            color: '#fff',
                            position: 'absolute',
                            top: 0,
                            right: 10,
                            zIndex: 2,
                            paddingHorizontal: 5,
                            width: 30,
                            textAlign: 'center',
                            paddingBottom: 2,
                            borderRadius: 10
                        }}
                    >{notifCount}</Text>
                }
                
            </TouchableOpacity>

        {/* MENU BUTTON */}
            <TouchableOpacity
                onPress={() => { props.navigation.openDrawer(); }}
                style={{ 
                    paddingRight: 20,
                    top: 5
                }}
            >
                <Image
                    style={{
                        height: 22,
                        width: 22
                    }}
                    resizeMode="contain"
                    source={(props.theme === 'dark') ?
                        image.icon.navigation_icon_white :
                        image.icon.navigation_icon}
                />
            </TouchableOpacity>

        </View>
    );
};

const mapStateToProps = state => ({
    user: state.user.profile,
    notification: state.notification

});

export default connect(mapStateToProps)(MenuButton);
