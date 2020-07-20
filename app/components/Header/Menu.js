import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthAction } from '../../redux/actions/auth.action';
import { AuthController } from '../../controllers';
import lang from '../../assets/language/Main';
import theme from '../../styles/theme.style';
import { NavLabelText, NavCommonText } from '../Text';

const Menu = (props) => {
    const dispatch = useDispatch();
    return (
        <View 
            style={{ 
            flex: 1,
            paddingTop: '20%'
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT]}
                style={{
                    alignItems: 'flex-end',
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    padding: 20,
                    paddingRight: 40,
                }}
            >
            {/* CLOSE */}
                <View
                    style={{
                        width: '100%',
                        alignItems: 'flex-start'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => { props.navigation.closeDrawer(); }}
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
                
                {/* MENU ITEMS */}
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        marginTop: 40,
                    }}
                >
                    {props.menuItems.map((nav, index) =>
                        <View
                            key={index}
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderTopWidth: index == 0 ? 1 : 0,
                                borderColor: theme.COLOR_WHITE,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 15,
                                }}
                                onPress={() => {
                                    props.navigation.navigate(nav.page);
                                }}
                            >
                                <Image
                                    style={{
                                        width: 12,
                                        height: 12
                                    }}
                                    resizeMode="contain"
                                    source={require('../../assets/image/icons/caret_left_icon.png')}
                                />

                                <NavLabelText
                                    size="medium"
                                    text={nav.label}
                                />
                            </TouchableOpacity>

                        </View>
                    )}

                    <View
                        style={{
                            marginTop: 20,
                            paddingBottom: 20,
                            borderColor: theme.COLOR_WHITE + '80',
                            borderBottomWidth: 1
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 15,
                            }}
                            onPress={() => {
                                props.navigation.navigate('ReportProblem');
                            }}
                        >
                                <NavLabelText
                                    size="light"
                                    text={'Report a problem'}
                                />
                            </TouchableOpacity>
                    </View>

                    {/* LOGOUT */}
                    <TouchableOpacity
                        style={{
                            marginTop: 35
                        }}
                        onPress={() => {
                            dispatch(AuthAction.firebase.logout());
                        }}
                    >
                        <NavLabelText
                            size="medium"
                            text={lang.navigation.logoutText}
                        />
                    </TouchableOpacity>
                </View>
            
            </LinearGradient>
        </View>
        );
};

export default Menu;
