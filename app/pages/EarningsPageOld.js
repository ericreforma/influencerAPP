import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Modal,
    Dimensions,
    Animated,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';

import Header from '../components/Header';
import {
    LabelText,
    CommonText,
    OtherTextButton
} from '../components/Text';
import { GradientButton, BackButton } from '../components/Button';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../styles/theme.style';
import lang from '../assets/language/profile';

export default class EarningsPage extends Component {
    state = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,

        // edit category part
        categoryText: '',
        modalCategoryVisible: false,
        editCategory: false,
        editCategoryHeight: new Animated.Value(0),
        editCategoryYPos: new Animated.Value(-52),

        // edit profile part
        editProfile: false,
        userDescriptionText: '',
        userNameText: '',

        // user data
        userDescriptionLength: 0,
        userDescriptionMaxLength: 190,
        user: {
            name: 'Patrick Cua',
            rating: 4.6,
            totalRating: 35,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            user_socmed: [
                {
                    socmed: 0,
                    followers: 300000
                },{
                    socmed: 1,
                    followers: 30000
                },{
                    socmed: 2,
                    followers: 1400000
                }
            ],
            location: 'Metro Manila, Philippines',
            user_categories: [
                {
                    description: 'Foodie',
                },{
                    description: 'Techie',
                },{
                    description: 'Adventurous',
                }
            ],
            featured_campaign: [
                {
                    id: 2,
                    image: require('../assets/image/featured_category1.png'),
                    sma: 0,
                    client: 'Nike',
                    name: 'Fitness Love',
                    favorite: 1,
                },{
                    id: 5,
                    image: require('../assets/image/featured_category2.png'),
                    sma: 1,
                    client: 'Starbucks',
                    name: 'Share a cup',
                    favorite: 1,
                }
            ]
        },

        campaigns: [
            {
                id: 2,
                image: require('../assets/image/featured_category1.png'),
                sma: 0,
                client: 'Nike',
                name: 'Fitness Love',
                favorite: 1,
            },{
                id: 5,
                image: require('../assets/image/featured_category2.png'),
                sma: 1,
                client: 'Starbucks',
                name: 'Share a cup',
                favorite: 1,
            },{
                id: 7,
                image: require('../assets/image/featured_category3.png'),
                sma: 2,
                client: 'Breadtalk',
                name: 'Bread for a cause',
                favorite: 0,
            },{
                id: 9,
                image: require('../assets/image/featured_category4.png'),
                sma: 1,
                client: 'Adidas',
                name: 'Health Run',
                favorite: 0,
            }
        ],

        // add feature campaign
        modalFeatureVisible: false,
    }

    // user section part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    editProfileOnPress = () => {
        if(this.state.editProfile) {
            var user = this.state.user;
            user.name = this.state.userNameText;
            user.description = this.state.userDescriptionText;

            this.setState({user});
        } else {
            this.setState({
                userDescriptionText: this.state.user.description,
                userDescriptionLength: this.state.user.description.length,
                userNameText: this.state.user.name
            });
        }

        this.toggleEditProfile();
    }

    toggleEditProfile = () => {
        this.setState({editProfile: !this.state.editProfile});
    }

    userDescriptionChangeText = (text) => {
        this.setState({
            userDescriptionText: text,
            userDescriptionLength: text.length
        });
    }
    // end user section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // category section part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    editCategoryOnPress = () => {
        Animated.timing(this.state.editCategoryHeight, {
            toValue: !this.state.editCategory ? 57 : 0,
            duration: 500
        }).start();

        Animated.timing(this.state.editCategoryYPos, {
            toValue: !this.state.editCategory ? 0 : -52,
            duration: 500
        }).start();

        this.setState({ editCategory: !this.state.editCategory });
    }

    toggleModalCategory = () => {
        this.setState({
            modalCategoryVisible: !this.state.modalCategoryVisible,
            categoryText: ''
        });
    }

    addCategory = () => {
        var user = this.state.user,
            categories = user.user_categories,
            categoryPush = this.state.categoryText;

        if(categoryPush !== '') {
            categories.push({description: categoryPush});
            user.user_categories = categories;
            this.setState({user});
        }

        this.toggleModalCategory();
    }

    removeCategory = (index) => () => {
        var user = this.state.user,
            categories = user.user_categories.filter((uc, ucIdx) => ucIdx !== index);

        user.user_categories = categories;
        this.setState({user});
    }
    // end category section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // add campaign section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    addCampaignOnPress = (id) => () => {
        var user = this.state.user,
            campaigns = user.featured_campaign,
            campaignsId = campaigns.map(c => c.id);

        if(campaignsId.indexOf(id) !== -1) {
            alert('Campaign already added');
        } else {
            var campaignPush = this.state.campaigns.filter(c => c.id == id)[0];
            campaigns.push(campaignPush);
            user.featured_campaign = campaigns;

            this.setState({user});
            this.toggleAddCampaign();
        }
    }

    toggleAddCampaign = () => {
        this.setState({modalFeatureVisible: !this.state.modalFeatureVisible});
    }

    campaignsRenderItems = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}
                activeOpacity={0.8}
                onPress={this.addCampaignOnPress(item.id)}
            >
                <View
                    style={{
                        width: '100%',
                        height: (this.state.width / 2) - 30,
                        borderRadius: theme.BORDER_RADIUS,
                        backgroundColor: this.getRandomColor()
                    }}
                >
                    <Image
                        style={{
                            width: '100%',
                            height: (this.state.width / 2) - 30,
                            borderRadius: theme.BORDER_RADIUS,
                        }}
                        resizeMode="cover"
                        source={item.image}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            paddingVertical: 10,
                            paddingHorizontal: 15
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                                resizeMode="contain"
                                source={theme.smaIcons[item.sma]}
                            />

                            <Image
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                resizeMode="contain"
                                source={item.favorite == 1 ? theme.favoriteActiveIcon : theme.favoriteInactiveIcon}
                            />
                        </View>

                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <CommonText
                                size="small"
                                fontWeightBold={true}
                                white={true}
                                text={item.name}
                            />

                            <CommonText
                                size="small"
                                white={true}
                                text={item.client}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    // end campaign section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    checkNumberLength = (num) => {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "G" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
        ];

        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }

        return (num / si[i].value).toFixed(1).replace(rx, "$1") + si[i].symbol;
    }

    getRandomColor = () => {
        var color = "hsl(" +
            360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)';

        return color;
    }

    render() {
        return (
            <Header
                darkMode={true}
                navigation={this.props.navigation}
            >
                <View
                    style={{
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    {/* user info section */}
                    <ProfileDiv>
                        {/* profile picture */}
                        <View
                            style={{
                                height: ((this.state.width / 3) / 2) + 6,
                                maxHeight: (300 / 2) + 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 3,
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'transparent',
                                    top: 0,
                                    padding: 5,
                                    borderRadius: 150,
                                    borderWidth: 2,
                                    borderColor: theme.COLOR_BLUE_GREEN
                                }}
                            >
                                <Image
                                    style={{
                                        width: this.state.width / 3,
                                        maxWidth: 300,
                                        height: this.state.width / 3,
                                        maxHeight: 300,
                                    }}
                                    resizeMode="cover"
                                    source={theme.maleDefaultAvatar}
                                />
                            </View>
                        </View>

                        {/* profile info */}
                        <View
                            style={{
                                backgroundColor: theme.COLOR_WHITE,
                                borderRadius: theme.BORDER_RADIUS,
                                width: '100%'
                            }}
                        >
                            <View
                                style={{
                                    height: ((this.state.width / 3) / 2) + 6,
                                    maxHeight: (300 / 2) + 6,
                                    width: '100%',
                                }}
                            ></View>

                            <View
                                style={{
                                    padding: 20,
                                }}
                            >
                                {/* user name and edit profile button */}
                                <ProfileDiv>
                                    {this.state.editProfile ? (
                                        <View
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <CommonText
                                                size="small"
                                                dark={true}
                                                textAlignCenter={true}
                                                text={lang.usernameText}
                                            />

                                            <TextInput
                                                style={{
                                                    textAlign: 'center',
                                                    marginVertical: 5,
                                                    borderRadius: 5,
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 10,
                                                    borderWidth: 1,
                                                    borderColor: theme.COLOR_GRAY_LIGHT,
                                                    fontSize: theme.FONT_SIZE_LARGE,
                                                    lineHeight: theme.FONT_SIZE_LARGE + 5,
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    color: theme.COLOR_BLACK
                                                }}
                                                value={this.state.userNameText}
                                                onChangeText={(userNameText) => this.setState({userNameText})}
                                            />
                                        </View>
                                    ) : (
                                        <LabelText
                                            size="large"
                                            dark={true}
                                            text={this.state.user.name}
                                        />
                                    )}


                                </ProfileDiv>

                                <ProfileDiv>
                                  <Text style={{
                                    'fontFamily': 'AvenirLTStd-Heavy',
                                    'color': theme.COLOR_BLUE,
                                    'fontSize': 65,
                                    'fontWeight': 'bold'
                                  }}>
                                    152K
                                  </Text>
                                  <OtherTextButton
                                        size="small"
                                        text="Edit Bank Details"
                                    />
                                </ProfileDiv>
                                <GradientButton
                  								text="Widthdraw"
                  							/>
                                <View style={{
                                  'marginTop': 25
                                }}>
                                  <Text style={{
                                      'fontFamily': 'AvenirLTStd-Heavy',
                                      'color': theme.COLOR_GRAY_HEAVY,
                                      'fontSize': 18,
                                      'fontWeight': 'bold'
                                    }}>
                                    Earning History
                                  </Text>
                                  <Text style={{
                                      fontFamily: 'AvenirLTStd-Heavy',
                                      color: theme.COLOR_YELLOW_HEAVY,
                                      fontSize: 16,
                                      position: 'absolute',
                                      right: 0,
                                      top: 3
                                  }}>
                                    Weekly
                                  </Text>


                                  <View style={{ marginTop: 18 }}>


                                      <View style={{
                                      borderRadius: 4,
                                      borderWidth: 0.5,
                                      borderColor: '#d6d7da',
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginBottom: 10
                                    }}>
                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 21,
                                        paddingLeft: 22,
                                        width: '33%'
                                      }}>
                                        <Text>
                                          Davies
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 15,

                                        width: '33%'
                                      }}>
                                        <Text style={{textAlign: 'center'}}>
                                          01.15.19
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        width: '33%',
                                      }}>
                                        <LinearGradient
                                          start={{ x: 0, y: 0 }}
                                          end={{ x: 0, y: 1 }}
                                          colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
                                          style={{
                                            width: 75,
                                            position: 'absolute',
                                            right: 0,
                                            borderRadius: 10,
                                          }}
                                        >
                                          <Text style={{
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                          }}>
                                            P53K
                                          </Text>

                                        </LinearGradient>

                                      </View>
                                    </View>

                                    <View style={{
                                      borderRadius: 4,
                                      borderWidth: 0.5,
                                      borderColor: '#d6d7da',
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginBottom: 10
                                    }}>
                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 21,
                                        paddingLeft: 22,
                                        width: '33%'
                                      }}>
                                        <Text>
                                          Nike
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 15,

                                        width: '33%'
                                      }}>
                                        <Text style={{textAlign: 'center'}}>
                                          01.15.19
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        width: '33%',
                                      }}>
                                        <LinearGradient
                                          start={{ x: 0, y: 0 }}
                                          end={{ x: 0, y: 1 }}
                                          colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
                                          style={{
                                            width: 75,
                                            position: 'absolute',
                                            right: 0,
                                            borderRadius: 10,
                                          }}
                                        >
                                          <Text style={{
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                          }}>
                                            P100K
                                          </Text>

                                        </LinearGradient>

                                      </View>
                                    </View>

                                    <View style={{
                                      borderRadius: 4,
                                      borderWidth: 0.5,
                                      borderColor: '#d6d7da',
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginBottom: 10
                                    }}>
                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 21,
                                        paddingLeft: 22,
                                        width: '33%'
                                      }}>
                                        <Text>
                                          Maybelline
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 21,
                                        paddingBottom: 15,

                                        width: '33%'
                                      }}>
                                        <Text style={{textAlign: 'center'}}>
                                          01.15.19
                                        </Text>
                                      </View>

                                      <View style={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        width: '33%',
                                      }}>
                                        <LinearGradient
                                          start={{ x: 0, y: 0 }}
                                          end={{ x: 0, y: 1 }}
                                          colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
                                          style={{
                                            width: 75,
                                            position: 'absolute',
                                            right: 0,
                                            borderRadius: 10,
                                          }}
                                        >
                                          <Text style={{
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                          }}>
                                            P100K
                                          </Text>

                                        </LinearGradient>

                                      </View>
                                    </View>



                                  </View>



                                </View>
                            </View>
                        </View>
                    </ProfileDiv>


                </View>
            </Header>
        )
    }
}

class ProfileDiv extends Component {
    render() {
        return (
            <View
                style={{
                    marginBottom: 30,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >{this.props.children}</View>
        );
    }
}
