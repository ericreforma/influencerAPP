import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';

import ButtonGradient from '../components/ButtonGradient';
import Header from '../components/Header';
import {
    LabelText,
    CommonText,
    OtherTextButton
} from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/home';

export default class HomePage extends Component {
    state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        // user data
        user: {
            name: 'Patrick Cua',
            rating: 4.6,
            totalRating: 35
        },

        // recommended for you data
        recommended: [
            {
                id: 24,
                sma: 0,
                client: 'FujiFilm Instax',
                image: require('../assets/image/recommended_sample_1.png'),
                type: 0,
                name: 'Fujifilm Philippines',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                deadline: '03:00 PM - Mar. 30, 2019',
                earn: 5000,
                hashes_n_tags: [
                    '#FujifilmInstax',
                    '@Fujifilm'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            },{
                id: 26,
                sma: 1,
                client: 'Owndays',
                image: require('../assets/image/recommended_sample_2.png'),
                type: 0,
                name: 'Owndays Philippines',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                deadline: '03:00 PM - Mar. 30, 2019',
                earn: 5000,
                hashes_n_tags: [
                    '#OwnYourSummer',
                    '@Owndays'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            },{
                id: 32,
                sma: 3,
                client: 'Lorem Ipsum Dolor fasdf asdf asfas',
                type: 0,
                name: 'Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                deadline: '03:00 PM - Mar. 30, 2019',
                earn: '5000',
                hashes_n_tags: [
                    '#Lorem',
                    '@Ipsums'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            }
        ],
        recommendedBgColors: [],

        // campaigns data
        online: [
            {
                id: 42,
                sma: 0,
                client: 'Mcdonalds Philippines',
                image: require('../assets/image/online_sample_pic.png'),
                type: 0,
                name: 'Burger Mcdo',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                deadline: '03:00 PM - Mar. 30, 2019',
                earn: '5000',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            },{
                id: 45,
                type: 0,
                sma: 0,
                client: 'Mcdonalds Philippines',
                name: 'Burger Mcdo',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                earn: '5,000',
                deadline: '03:00 PM - Mar. 30, 2019',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            }
        ],
        onlineBgColors: [],
        events: [
            {
                id: 51,
                type: 1,
                sma: 1,
                client: 'KIA Philippines',
                name: 'Kia Picanto Launch',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                earn: 5000,
                image: require('../assets/image/events_sample_pic.png'),
                deadline: '03:00 PM - Mar. 30, 2019',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            },{
                id: 55,
                type: 1,
                sma: 1,
                client: 'KIA Philippines',
                name: 'Kia Picanto Launch',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                earn: 5000,
                deadline: '03:00 PM - Mar. 30, 2019',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            }
        ],
        eventsBgColors: [],
        survey: [
            {
                id: 66,
                type: 2,
                sma: 1,
                client: 'Davies Philippines',
                campaignName: 'Paint Convention',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                earn: 3000,
                image: require('../assets/image/survey_sample_pic.png'),
                deadline: '03:00 PM - Mar. 30, 2019',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            },{
                id: 67,
                type: 2,
                sma: 1,
                client: 'Davies Philippines',
                campaignName: 'Paint Convention',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                earn: 3000,
                deadline: '03:00 PM - Mar. 30, 2019',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                gender: 'Male',
                followers: 300000,
                age_from: 19,
                age_to: 24,
                target_likes_from: '100',
                target_likes_to: '200',
                target_likes_incentives: '1,000',
                target_views_from: null,
                target_views_to: null,
                target_views_incentives: null,
                target_comments_from: '40',
                target_comments_to: '100',
                target_comments_incentives: '3,000',
                target_shares_from: null,
                target_shares_to: null,
                target_shares_incentives: null,
            }
        ],
        surveyBgColors: [],
    }

    componentWillMount = () => {
        var onlineBgColors = Array(this.state.online.length).fill(null).map(o => this.getRandomColor()),
            eventsBgColors = Array(this.state.events.length).fill(null).map(o => this.getRandomColor()),
            surveyBgColors = Array(this.state.survey.length).fill(null).map(o => this.getRandomColor()),
            recommendedBgColors = Array(this.state.recommended.length).fill(null).map(o => this.getRandomColor());
            
        this.setState({
            onlineBgColors: onlineBgColors,
            eventsBgColors: eventsBgColors,
            surveyBgColors: surveyBgColors,
            recommendedBgColors: recommendedBgColors
        });
    }

    getRandomColor = () => {
        var color = "hsl(" +
            360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' + 
            (85 + 10 * Math.random()) + '%)';

        return color;
    }

    viewDetailsButton = (item) => () => {
        this.props.navigation.navigate('Campaign', {
            campaign: item
        });
    }

    recommendedForYouSection = ({item, index}) => {
        var width = (this.state.width / 2) - 25,
            maxWidth = 220,
            height = ((this.state.width / 2) - 25) * (5/6),
            maxHeight = 220 * (5/6);

        return (
            <View
                style={{
                    borderRadius: theme.BORDER_RADIUS,
                    marginHorizontal: 5,
                    marginBottom: 5,
                    elevation: 2,
                    width: width,
                    maxWidth: maxWidth,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        zIndex: 3
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        resizeMode="contain"
                        source={theme.smaIcons[item.sma]}
                    />
                </View>

                <View
                    style={{
                        backgroundColor: this.state.recommendedBgColors[index],
                        width: width,
                        maxWidth: maxWidth,
                        height: height,
                        maxHeight: maxHeight,
                        borderTopLeftRadius: theme.BORDER_RADIUS,
                        borderTopRightRadius: theme.BORDER_RADIUS
                    }}
                >
                    <Image
                        style={{
                            width: width,
                            maxWidth: maxWidth,
                            height: height,
                            maxHeight: maxHeight,
                            borderTopLeftRadius: theme.BORDER_RADIUS,
                            borderTopRightRadius: theme.BORDER_RADIUS
                        }}
                        resizeMode="cover"
                        source={item.image}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        backgroundColor: theme.COLOR_WHITE,
                        borderBottomLeftRadius: theme.BORDER_RADIUS,
                        borderBottomRightRadius: theme.BORDER_RADIUS,
                        justifyContent: 'space-between'
                    }}
                >
                    <LabelText
                        size="medium"
                        text={item.client.length <= 22 ? item.client : item.client.substr(0,22) + '...'}
                    />

                    <View
                        style={{
                            marginTop: 5
                        }}
                    >
                        <OtherTextButton
                            size="small"
                            text={lang.viewDetailsText}
                            onPress={this.viewDetailsButton(item)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    campaignSectionRenderItems = ({item, index}) => {
        var width = this.state.width - 40,
            maxWidth = 450,
            height = (this.state.width - 40) * (1.4/3),
            maxHeight = 450 * (1.4/3),
            campaign = ['online', 'events', 'survey'];

        return (
            <View
                style={{
                    borderRadius: theme.BORDER_RADIUS,
                    marginHorizontal: 5,
                    marginBottom: 5,
                    elevation: 2,
                    width: width,
                    maxWidth: maxWidth,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: width,
                        maxWidth: maxWidth,
                        height: height,
                        maxHeight: maxHeight,
                        padding: 20,
                        paddingBottom: 15,
                        justifyContent: 'space-between',
                        zIndex: 3
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        resizeMode="contain"
                        source={theme.smaIcons[item.sma]}
                    />

                    <Text
                        style={{
                            fontSize: theme.FONT_SIZE_SMALL,
                            color: theme.COLOR_WHITE,
                            fontFamily: 'AvenirLTStd-Black'
                        }}
                    >
                        {item.name}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: this.state[campaign[item.type] + 'BgColors'],
                        width: width,
                        maxWidth: maxWidth,
                        height: height,
                        maxHeight: maxHeight,
                        borderTopLeftRadius: theme.BORDER_RADIUS,
                        borderTopRightRadius: theme.BORDER_RADIUS
                    }}
                >
                    <Image
                        style={{
                            width: width,
                            maxWidth: maxWidth,
                            height: height,
                            maxHeight: maxHeight,
                            borderTopLeftRadius: theme.BORDER_RADIUS,
                            borderTopRightRadius: theme.BORDER_RADIUS
                        }}
                        resizeMode="cover"
                        source={item.image}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        backgroundColor: theme.COLOR_WHITE,
                        borderBottomLeftRadius: theme.BORDER_RADIUS,
                        borderBottomRightRadius: theme.BORDER_RADIUS,
                    }}
                >
                    <CommonText
                        size="medium"
                        fontWeightBold={true}
                        text={item.client}
                    />
                    
                    <View
                        style={{
                            marginTop: 15
                        }}
                    >
                        <CommonText
                            size="small"
                            text={item.description}
                        />
                    </View>
                    
                    <View
                        style={{
                            marginVertical: 20,
                        }}
                    >
                        <ButtonGradient
                            text={lang.viewDetailsText}
                            onPress={this.viewDetailsButton(item)}
                        />
                    </View>
                    
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'flex-start'
                            }}
                        >
                            <CommonText
                                size="small"
                                text="Deadline"
                            />

                            <LabelText
                                size="medium"
                                blue={true}
                                text={item.deadline}
                            />
                        </View>
                        
                        <View
                            style={{
                                alignItems: 'flex-end'
                            }}
                        >
                            <CommonText
                                size="small"
                                text="Earn up to"
                            />

                            <LabelText
                                size="medium"
                                blue={true}
                                text={'P' + item.earn}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    campaignSection = (campaignType) => {
        var campaign = ['online', 'events', 'survey'];
        
        return (
            <View
                key={campaignType}
                style={{
                    marginVertical: 15
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    <LabelText
                        size="large"
                        dark={true}
                        text={lang[campaign[campaignType] + 'Text']}
                    />

                    <OtherTextButton
                        size="small"
                        text={lang.viewAllText}
                        onPress={() => alert('View ' + campaign[campaignType] +' clicked')}
                    />
                </View>
                
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        marginTop: 15
                    }}
                    pagingEnabled={true}
                    overScrollMode="never"
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state[campaign[campaignType]]}
                    renderItem={this.campaignSectionRenderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    userSummaryData = () => {
        return (
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
                        elevation: 2,
                        marginRight: 15
                    }}
                    onPress={() => this.props.navigation.navigate('Profile')}
                >
                    <Image
                        style={{
                            width: this.state.width / 5,
                            maxWidth: 150,
                            height: this.state.width / 5,
                            maxHeight: 150,
                        }}
                        resizeMode="contain"
                        source={theme.maleDefaultAvatar}
                    />
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
                        {this.state.user.name}
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
                            {this.state.user.rating}
                        </Text>

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

                        <Text
                            style={{
                                fontSize: theme.FONT_SIZE_SMALL - 3,
                                color: theme.COLOR_BLACK,
                                fontFamily: 'AvenirLTStd-Light',
                                marginLeft: 5
                            }}
                        >
                            ({this.state.user.totalRating})
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <Header
                navigation={this.props.navigation}
                backgroundGradient={true} // show container with gradient background
                backgroundGradientData={this.userSummaryData()} // user summary data
            >
                {/* recommended for you */}
                <View
                    style={{
                        marginVertical: 15
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            paddingHorizontal: theme.HORIZONTAL_PADDING
                        }}
                    >
                        <LabelText
                            size="medium"
                            dark={true}
                            text={lang.recommendedText}
                        />

                        <OtherTextButton
                            size="small"
                            text={lang.viewAllText}
                            onPress={() => alert('View all clicked')}
                        />
                    </View>
                    
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: 15,
                            marginTop: 15
                        }}
                        overScrollMode="never"
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.state.recommended}
                        renderItem={this.recommendedForYouSection}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            
                {/* campaign section */}
                {Array(3).fill(0).map((c, cIndex) =>
                    this.campaignSection(cIndex)
                )}
            </Header>
        )
    }
}
