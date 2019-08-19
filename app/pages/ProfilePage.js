import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Modal,
    Dimensions,
    Animated,
    TextInput,
    TouchableOpacity
} from 'react-native';

import Header from '../components/Header';
import {
    LabelText,
    CommonText,
    OtherTextButton
} from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/profile';

export default class ProfilePage extends Component {
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
                {/* edit category modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalCategoryVisible}
                >
                    <View
                        style={{
                            backgroundColor: theme.COLOR_BLACK + '70',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: theme.COLOR_WHITE,
                                borderRadius: theme.BORDER_RADIUS,
                                width: '80%',
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                            }}
                        >
                            <LabelText
                                size="large"
                                dark={true}
                                text={lang.addCategoryText}
                            />

                            <View
                                style={{
                                    borderRadius: 5,
                                    borderColor: theme.COLOR_GRAY_LIGHT,
                                    borderWidth: 2,
                                    paddingHorizontal: 15,
                                    marginBottom: 15,
                                    marginTop: 20
                                }}
                            >
                                <TextInput
                                    value={this.state.categoryText}
                                    onChangeText={(categoryText) => this.setState({categoryText})}
                                    style={{
                                        color: theme.COLOR_BLACK,
                                        fontFamily: 'AvenirLTStd-Light',
                                        fontSize: theme.FONT_SIZE_SMALL
                                    }}
                                    placeholder={lang.categoryLabel + '...'}
                                    placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
                                    onSubmitEditing={this.addCategory}
                                />
                            </View>
                            
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        marginRight: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        borderRadius: theme.INPUT_BORDER_RADIUS,
                                        backgroundColor: theme.COLOR_BLUE
                                    }}
                                    onPress={this.addCategory}
                                >
                                    <CommonText
                                        size="small"
                                        white={true}
                                        text={lang.saveButtonText}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        marginLeft: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        borderRadius: theme.INPUT_BORDER_RADIUS,
                                        backgroundColor: theme.COLOR_RED
                                    }}
                                    onPress={this.toggleModalCategory}
                                >
                                    <CommonText
                                        size="small"
                                        white={true}
                                        text={lang.cancelButtonText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* add campaign modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalFeatureVisible}
                >
                    <View
                        style={{
                            backgroundColor: theme.COLOR_BLACK + '70',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: theme.COLOR_WHITE,
                                borderRadius: theme.BORDER_RADIUS,
                                width: '80%',
                            }}
                        >
                            <View
                                style={{
                                    borderTopLeftRadius: theme.BORDER_RADIUS,
                                    borderTopRightRadius: theme.BORDER_RADIUS,
                                    backgroundColor: theme.COLOR_BLACK,
                                    paddingVertical: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <CommonText
                                    size="medium"
                                    white={true}
                                    text="Campaigns"
                                />
                            </View>

                            <View
                                style={{
                                    maxHeight: 400,
                                    backgroundColor: theme.COLOR_PAGE_HIGHLIGHT
                                }}
                            >
                                <FlatList
                                    contentContainerStyle={{
                                        paddingVertical: 10
                                    }}
                                    data={this.state.campaigns}
                                    renderItem={this.campaignsRenderItems}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                            <View
                                style={{
                                    padding: 20
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        borderRadius: theme.INPUT_BORDER_RADIUS,
                                        backgroundColor: theme.COLOR_RED
                                    }}
                                    onPress={this.toggleAddCampaign}
                                >
                                    <CommonText
                                        size="small"
                                        white={true}
                                        text={lang.cancelButtonText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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

                                    <OtherTextButton
                                        size="small"
                                        text={this.state.editProfile ? lang.saveProfileText : lang.editProfileText}
                                        onPress={this.editProfileOnPress}
                                    />
                                </ProfileDiv>

                                {/* user description */}
                                <ProfileDiv>
                                    {this.state.editProfile ? (
                                        <View
                                            style={{
                                                width: '100%'
                                            }}
                                        >
                                            <CommonText
                                                size="small"
                                                textAlignCenter={true}
                                                dark={true}
                                                text={lang.descriptionText}
                                            />

                                            <TextInput
                                                style={{
                                                    borderWidth: 1,
                                                    marginVertical: 5,
                                                    borderColor: theme.COLOR_GRAY_LIGHT,
                                                    color: theme.COLOR_BLACK,
                                                    textAlignVertical: 'top',
                                                    height: 140,
                                                    padding: 15,
                                                    width: '100%',
                                                    fontSize: theme.FONT_SIZE_SMALL,
                                                    lineHeight: theme.FONT_SIZE_SMALL + 5,
                                                    fontFamily: 'AvenirLTStd-Light',
                                                    borderRadius: 5
                                                }}
                                                maxLength={this.state.userDescriptionMaxLength}
                                                multiline={true}
                                                value={this.state.userDescriptionText}
                                                onChangeText={this.userDescriptionChangeText}
                                            />

                                            <View
                                                style={{
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                <CommonText
                                                    size="small"
                                                    text={lang.characterLeft + " ("+ (this.state.userDescriptionMaxLength - this.state.userDescriptionLength).toString() +")"}
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <CommonText
                                            size="small"
                                            textAlignCenter={true}
                                            text={this.state.user.description}
                                        />
                                    )}
                                </ProfileDiv>

                                {/* user rating */}
                                <ProfileDiv>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <LabelText
                                            size="large"
                                            dark={true}
                                            text={this.state.user.rating}
                                        />

                                        {Array(5).fill(require('../assets/image/icons/star_active.png')).map((star, index) =>
                                            <Image
                                                key={index}
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    marginHorizontal: 5
                                                }}
                                                resizeMode="contain"
                                                source={(index + 1) < this.state.user.rating ? star : require('../assets/image/icons/star_inactive.png')}
                                            />
                                        )}

                                        <CommonText
                                            size="xsmall"
                                            dark={true}
                                            text={'('+this.state.user.totalRating+')'}
                                        />
                                    </View>
                                </ProfileDiv>

                                {/* soc med followers */}
                                <ProfileDiv>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {this.state.user.user_socmed.map((sma, smaIdx) =>
                                            <View
                                                key={smaIdx}
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <LabelText
                                                        size="medium"
                                                        blue={true}
                                                        text={this.checkNumberLength(sma.followers).toUpperCase()}
                                                    />

                                                    <CommonText
                                                        size="small"
                                                        text={lang.smaLabels[sma.socmed]}
                                                    />
                                                </View>
                                                
                                                {smaIdx != (this.state.user.user_socmed.length - 1) ? (
                                                    <Image
                                                        style={{
                                                            width: 5,
                                                            marginHorizontal: 20
                                                        }}
                                                        resizeMode="contain"
                                                        source={require('../assets/image/icons/divider_icon.png')}
                                                    />
                                                ) : null}
                                            </View>
                                        )}
                                    </View>
                                </ProfileDiv>
                            
                                {/* user location */}
                                <ProfileDiv>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'baseline'
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginRight: 10
                                            }}
                                        >
                                            <CommonText
                                                size="small"
                                                text={lang.locationText}
                                            />
                                        </View>

                                        <CommonText
                                            size="small"
                                            dark={true}
                                            text={this.state.user.location}
                                        />
                                    </View>
                                </ProfileDiv>
                            </View>
                        </View>
                    </ProfileDiv>
                    
                    {/* user category section */}
                    <ProfileDiv>
                        {/* category labels */}
                        <View
                            style={{
                                width: '100%',
                                marginBottom: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <CommonText
                                size="large"
                                white={true}
                                text={lang.categoryLabel}
                            />

                            <OtherTextButton
                                size="small"
                                text={this.state.editCategory ? lang.doneEditingCategory : lang.editCategoryLabel}
                                onPress={this.editCategoryOnPress}
                            />
                        </View>

                        {/* category data */}
                        <View
                            style={{
                                width: '100%',
                                backgroundColor: theme.COLOR_WHITE,
                                borderRadius: theme.BORDER_RADIUS,
                                alignItems: 'center',
                                padding: 20
                            }}
                        >
                            {/* categories */}
                            <View
                                style={{
                                    backgroundColor: theme.COLOR_WHITE,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {this.state.user.user_categories.map((cat, catIdx) =>
                                    <View
                                        key={catIdx}
                                        style={{
                                            flexGrow: 1,
                                            backgroundColor: theme.COLOR_BLUE,
                                            borderRadius: 100,
                                            paddingVertical: 12,
                                            paddingHorizontal: 40,
                                            margin: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CommonText
                                            size="small"
                                            white={true}
                                            textAlignCenter={true}
                                            text={cat.description}
                                        />

                                        {this.state.editCategory ? (
                                            <TouchableOpacity
                                                style={{
                                                    position: 'absolute',
                                                    right: 15
                                                }}
                                                onPress={this.removeCategory(catIdx)}
                                            >
                                                <Image
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        marginLeft: 5
                                                    }}
                                                    resizeMode="contain"
                                                    source={theme.removeIcon}
                                                />
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                )}
                            </View>
                            
                            {/* add campaign buttons */}
                            <Animated.View
                                style={{
                                    width: '100%',
                                    zIndex: -1,
                                    height: this.state.editCategoryHeight,
                                    top: this.state.editCategoryYPos
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: theme.COLOR_BLACK,
                                        borderRadius: 100,
                                        paddingVertical: 12,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 5
                                    }}
                                    onPress={this.toggleModalCategory}
                                >
                                    <CommonText
                                        size="small"
                                        white={true}
                                        textAlignCenter={true}
                                        text={lang.addCategoryText}
                                    />
                                    
                                    <Image
                                        style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 5
                                        }}
                                        resizeMode="contain"
                                        source={theme.addIcon}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </ProfileDiv>
                    
                    {/* featured campaign section */}
                    <View>
                        {/* feature label */}
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                marginBottom: 10
                            }}
                        >
                            <View
                                style={{
                                    marginRight: 5
                                }}
                            >
                                <CommonText
                                    size="large"
                                    white={true}
                                    text={lang.featuredLabel}
                                />
                            </View>
                            
                            <CommonText
                                size="large"
                                white={true}
                                fontWeightBold={true}
                                text={lang.featuredLabelBold}
                            />
                        </View>
                        
                        {/* feature data */}
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {this.state.user.featured_campaign.map((fc, fcIdx) =>
                                <View
                                    key={fcIdx}
                                    style={{
                                        borderRadius: theme.BORDER_RADIUS,
                                        backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                                        minWidth: (this.state.width / 2) - 60,
                                        height: (this.state.width / 2) - 60,
                                        margin: 5,
                                        flexGrow: 1,
                                    }}
                                >
                                    <Image
                                        style={{
                                            borderRadius: theme.BORDER_RADIUS,
                                            width: '100%',
                                            height: (this.state.width / 2) - 60,
                                        }}
                                        resizeMode="cover"
                                        source={fc.image}
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
                                                source={theme.smaIcons[fc.sma]}
                                            />

                                            <Image
                                                style={{
                                                    width: 22,
                                                    height: 22,
                                                }}
                                                resizeMode="contain"
                                                source={theme.favoriteActiveIcon}
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
                                                text={fc.name}
                                            />

                                            <CommonText
                                                size="small"
                                                white={true}
                                                text={fc.client}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}

                            {Array(this.state.user.featured_campaign.length % 2 == 0 ? 2 : 1).fill(null).map((ac, acIdx) =>
                                <TouchableOpacity
                                    key={acIdx}
                                    style={{
                                        borderRadius: theme.BORDER_RADIUS,
                                        backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                                        minWidth: (this.state.width / 2) - 60,
                                        height: (this.state.width / 2) - 60,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 5,
                                        flexGrow: 1,
                                    }}
                                    activeOpacity={0.8}
                                    onPress={this.toggleAddCampaign}
                                >
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginBottom: 5
                                        }}
                                        resizeMode="contain"
                                        source={theme.addIcon}
                                    />

                                    <CommonText
                                        size="small"
                                        text={lang.addCampaignText}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
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