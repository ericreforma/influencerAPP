import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    LabelText,
    NavLabelText,
    NavCommonText
} from '../components/Text';
import BackButton from '../components/BackButton';

import theme from '../styles/theme.style';
import lang from '../assets/language/Main';

export default class Header extends Component {
    state = {
        notificationCount: 12,
        scrollEnabled: true,

        navigationDisplay: false,
        navigationOnPressDisabled: false,
        navigationData: [
            {
                label: lang.navigation.viewProfileText,
                page: 'Profile'
            },{
                label: lang.navigation.earningsText,
                page: 'Earning'
            },{
                label: lang.navigation.myCampaignsText,
                page: 'Mycampaign'
            },{
                label: lang.navigation.aboutText,
                page: 'about'
            }
        ],
        navigationXPos: new Animated.Value(-400),
        navigationOpacity: new Animated.Value(0),
    }

    navigationToggle = () => {
        this.setState({ scrollEnabled: !this.state.scrollEnabled });
    }

    navigationButtonToggleDisable = () => {
        this.setState({ navigationOnPressDisabled: !this.state.navigationOnPressDisabled });
    }

    navigationDisplayToggle = () => {
        this.setState({ navigationDisplay: !this.state.navigationDisplay });
    }

    navigationOnPress = () => {
        this.navigationButtonToggleDisable();

        if(this.state.scrollEnabled) {
            this.navigationDisplayToggle();
            Animated.timing(this.state.navigationXPos, {
                toValue: 0,
                duration: 300
            }).start(() => {
                this.navigationButtonToggleDisable();
            });
            
            Animated.timing(this.state.navigationOpacity, {
                toValue: 0.8,
                duration: 300
            }).start();
        } else {
            Animated.timing(this.state.navigationXPos, {
                toValue: -400,
                duration: 300
            }).start(() => {
                this.navigationButtonToggleDisable();
                this.navigationDisplayToggle();
            });

            Animated.timing(this.state.navigationOpacity, {
                toValue: 0,
                duration: 300
            }).start();
        }

        this.navigationToggle();
    }

    navigationNavigateButton = (label, page) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 15,
                }}
                onPress={() => {
                    this.navigationOnPress();
                    this.props.navigation.navigate(page);
                }}
            >
                <Image
                    style={{
                        width: 12,
                        height: 12
                    }}
                    resizeMode="contain"
                    source={require('../assets/image/icons/caret_left_icon.png')}
                />

                <NavLabelText
                    size="medium"
                    text={label}
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: this.props.darkMode ? theme.COLOR_BLACK : theme.COLOR_PAGE,
                }}
            >
                {/* modal for menu button */}
                {this.state.navigationDisplay ? (
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            top: 0,
                            zIndex: 5,
                        }}
                    >
                        <Animated.View
                            style={{
                                opacity: this.state.navigationOpacity,
                                backgroundColor: theme.COLOR_BLACK,
                                flex: 1,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                }}
                                activeOpacity={1}
                                disabled={this.state.navigationOnPressDisabled}
                                onPress={this.navigationOnPress}
                            ></TouchableOpacity>
                        </Animated.View>

                        <Animated.View
                            style={{
                                width: Dimensions.get('window').width * (2.5/3),
                                maxWidth: 400,
                                position: 'absolute',
                                right: this.state.navigationXPos,
                                top: 50,
                            }}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT]}
                                style={{
                                    alignItems: 'flex-end',
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    padding: 20,
                                    paddingRight: 40,
                                    paddingBottom: 50
                                }}
                            >
                                {/* close icon */}
                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <TouchableOpacity
                                        disabled={this.state.navigationOnPressDisabled}
                                        onPress={this.navigationOnPress}
                                    >
                                        <Image
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                            resizeMode="contain"
                                            source={theme.removeIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                
                                {/* navigation buttons */}
                                <View
                                    style={{
                                        width: '80%',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        marginTop: 40,
                                    }}
                                >
                                    {this.state.navigationData.map((nav, index) =>
                                        <View
                                            key={index}
                                            style={{
                                                width: '100%',
                                                borderBottomWidth: 1,
                                                borderTopWidth: index == 0 ? 1 : 0,
                                                borderColor: theme.COLOR_WHITE,
                                            }}
                                        >
                                            {this.navigationNavigateButton(nav.label, nav.page)}
                                        </View>
                                    )}

                                    {/* app description */}
                                    <View
                                        style={{
                                            marginTop: 80,
                                            paddingBottom: 20,
                                            borderColor: theme.COLOR_WHITE + '80',
                                            borderBottomWidth: 1
                                        }}
                                    >
                                        <NavCommonText
                                            textAlign="right"
                                            size="xsmall"
                                            text={lang.navigation.description}
                                        />
                                    </View>

                                    {/* logout button */}
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 15
                                        }}
                                        onPress={() => alert('Logout pressed')}
                                    >
                                        <NavLabelText
                                            size="medium"
                                            text={lang.navigation.logoutText}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </Animated.View>
                    </View>
                ) : null}

                <View
                    style={{
                        backgroundColor: this.props.darkMode ? theme.COLOR_BLACK : theme.COLOR_PAGE,
                        paddingVertical: 25,
                        paddingHorizontal: theme.HORIZONTAL_PADDING,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Image
                            style={{
                                height: 30,
                                width: 30,
                                marginRight: 10,
                                backgroundColor: theme.COLOR_WHITE + '00'
                            }}
                            resizeMode="contain"
                            source={require('../assets/image/app_icon.png')}
                        />

                        <LabelText
                            size="large"
                            dark={this.props.darkMode ? false : true}
                            white={this.props.darkMode ? true : false}
                            text={lang.appName}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                marginRight: 25
                            }}
                            onPress={() => this.props.navigation.navigate('Notification')}
                        >
                            <Image
                                style={{
                                    height: 33,
                                    width: 25,
                                }}
                                resizeMode="stretch"
                                source={this.props.darkMode ? require('../assets/image/icons/notification_icon_white.png') : require('../assets/image/icons/notification_icon.png')}
                            />

                            <View
                                style={{
                                    position: 'absolute',
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    backgroundColor: theme.COLOR_YELLOW_HEAVY,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    left: 15,
                                    top: 2
                                }}
                            >
                                <Text
                                    style={{
                                        color: theme.COLOR_WHITE,
                                        fontSize: 12,
                                        fontFamily: 'AvenirLTStd-Black'
                                    }}
                                >
                                    {this.state.notificationCount > 9 ? '9+' : this.state.notificationCount.toString()}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.navigationOnPress}
                            disabled={this.state.navigationOnPressDisabled}
                        >
                            <Image
                                style={{
                                    height: 22,
                                    width: 22
                                }}
                                resizeMode="contain"
                                source={this.props.darkMode ? require('../assets/image/icons/navigation_icon_white.png') : require('../assets/image/icons/navigation_icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 15
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnabled}
                >
                    {this.props.backButtonShow ? (
                        <View
                            style={{
                                paddingHorizontal: theme.HORIZONTAL_PADDING
                            }}
                        >
                            <BackButton
                                darkButton={true}
                                onPress={() => this.props.navigation.pop()}
                            />
                        </View>
                    ) : null}

                    {this.props.backgroundGradient ? (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
                            style={{
                                marginBottom: 15
                            }}
                        >
                            {this.props.backgroundGradientData}
                        </LinearGradient>
                    ) : null}

                    {this.props.children}
                </ScrollView>
            </View>
        )
    }
}
