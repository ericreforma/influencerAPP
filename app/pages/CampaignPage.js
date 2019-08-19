import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image
} from 'react-native';

import ButtonGradient from '../components/ButtonGradient';
import Header from '../components/Header';
import {
    LabelText,
    CommonText
} from '../components/Text';

import theme from '../styles/theme.style';
import lang from '../assets/language/campaign';

export default class CampaignPage extends Component {
    state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        campaigns: [
            {
                id: 24,
                sma: 0,
                client: 'Mcdonalds Philippines',
                image: require('../assets/image/online_sample_pic.png'),
                type: 0,
                name: 'Burger Mcdo',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                deadline: '03:00 PM - Mar. 30, 2019',
                earn: 5000,
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
        targetData: [
            'Likes',
            'Views',
            'Comments',
            'Shares'
        ]
    }
    
    getRandomColor = () => {
        var color = "hsl(" +
            360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' + 
            (85 + 10 * Math.random()) + '%)';

        return color;
    }

    checkNumberLength = (numbers, uppercase) => {
        var numberString = numbers.toString();
        if(numberString.length > 6) {
            numbers = numberString.substr(0,numberString.length - 6) + 'M';
        } else if(numberString.length > 3) {
            numbers = numberString.substr(0,numberString.length - 3) + (uppercase ? 'K' : 'k');
        }
        
        return numbers;
    }

    render() {
        var height = this.state.width * (1.4/3),
            campaign = ['online', 'events', 'survey'],
            item = this.props.navigation.getParam('campaign', null);

        if(item) {
            return (
                <Header
                    navigation={this.props.navigation}
                    backButtonShow={true}
                >
                    <View
                        style={{
                            paddingHorizontal: theme.HORIZONTAL_PADDING,
                            marginVertical: 15
                        }}
                    >
                        <View
                            style={{
                                borderRadius: theme.BORDER_RADIUS,
                                elevation: 2,
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    height: height,
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
                                    backgroundColor: this.getRandomColor(),
                                    height: height,
                                    borderTopLeftRadius: theme.BORDER_RADIUS,
                                    borderTopRightRadius: theme.BORDER_RADIUS
                                }}
                            >
                                <Image
                                    style={{
                                        width: '100%',
                                        height: height,
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
                                    backgroundColor: theme.COLOR_WHITE,
                                    borderBottomLeftRadius: theme.BORDER_RADIUS,
                                    borderBottomRightRadius: theme.BORDER_RADIUS,
                                }}
                            >
                                <View
                                    style={{
                                        padding: 20
                                    }}
                                >
                                    {/* client name */}
                                    <CommonText
                                        size="medium"
                                        fontWeightBold={true}
                                        text={item.client}
                                    />
                                    
                                    {/* description */}
                                    <CampaignDiv>
                                        <CommonText
                                            size="small"
                                            text={item.description}
                                        />
                                    </CampaignDiv>
                                    
                                    {/* hashtags */}
                                    {item.hashes_n_tags.length !== 0 ? (
                                        <CampaignDiv>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap'
                                                }}
                                            >
                                                {item.hashes_n_tags.map((hnt, hntIdx) =>
                                                    <View
                                                        key={hntIdx}
                                                        style={{
                                                            marginRight: 7,
                                                            flexDirection: 'row'
                                                        }}
                                                    >
                                                        <CommonText
                                                            size="small"
                                                            blue={true}
                                                            text={hnt.charAt(0)}
                                                        />
                                                        
                                                        <CommonText
                                                            size="small"
                                                            text={hnt.substr(1, hnt.length - 1)}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        </CampaignDiv>
                                    ) : null}

                                    {/* preferred */}
                                    <CampaignDiv>
                                        {/* label */}
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <LabelText
                                                size="small"
                                                dark={true}
                                                text={lang.preferredLabel}
                                            />
                                        </View>
                                        
                                        {/* fields */}
                                        <View
                                            style={{
                                                marginTop: 5,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {/* followers */}
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <LabelText
                                                    size="medium"
                                                    blue={true}
                                                    text={this.checkNumberLength(item.followers)}
                                                />

                                                <CommonText
                                                    size="small"
                                                    text={lang.preferredFollowersText}
                                                />
                                            </View>
                                            
                                            {/* gender */}
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {/* divider */}
                                                <Image
                                                    style={{
                                                        width: 5,
                                                    }}
                                                    resizeMode="contain"
                                                    source={require('../assets/image/icons/divider_icon.png')}
                                                />

                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <LabelText
                                                        size="medium"
                                                        blue={true}
                                                        text={item.gender}
                                                    />

                                                    <CommonText
                                                        size="small"
                                                        text={lang.preferredGenderText}
                                                    />
                                                </View>

                                                {/* divider */}
                                                <Image
                                                    style={{
                                                        width: 5,
                                                    }}
                                                    resizeMode="contain"
                                                    source={require('../assets/image/icons/divider_icon.png')}
                                                />
                                            </View>
                                            
                                            {/* age */}
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <LabelText
                                                    size="medium"
                                                    blue={true}
                                                    text={[item.age_from,item.age_to].join('-')}
                                                />

                                                <CommonText
                                                    size="small"
                                                    text={lang.preferredAgeText}
                                                />
                                            </View>
                                        </View>
                                    </CampaignDiv>
                                
                                    {/* circle thingy */}
                                    <CampaignDiv>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    borderRadius: 150,
                                                    borderWidth: 2,
                                                    borderColor: theme.COLOR_GRAY_MEDIUM,
                                                    padding: 5,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 130,
                                                        height: 130,
                                                        borderRadius: 150,
                                                        borderWidth: 2,
                                                        borderColor: theme.COLOR_PAGE_HIGHLIGHT,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <CommonText
                                                        size="small"
                                                        text="Earn up to"
                                                    />
                                                    
                                                    <View
                                                        style={{
                                                            height: 60,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <LabelText
                                                            size="xlarge"
                                                            blue={true}
                                                            text={this.checkNumberLength(item.earn, true)}
                                                        />
                                                    </View>
                                                    
                                                    <CommonText
                                                        size="small"
                                                        text="Pesos"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </CampaignDiv>
                                
                                    {/* target data */}
                                    <CampaignDiv>
                                        {this.state.targetData.map((td, tdIdx) =>
                                            item['target_'+td.toLowerCase()+'_from'] && item['target_'+td.toLowerCase()+'_to'] ? (
                                                <View
                                                    key={tdIdx}
                                                    style={{
                                                        borderRadius: 30,
                                                        paddingHorizontal: 20,
                                                        paddingVertical: 15,
                                                        marginVertical: 7,
                                                        backgroundColor: theme.COLOR_WHITE,
                                                        elevation: 3,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <CommonText
                                                        size="small"
                                                        text={[item['target_'+td.toLowerCase()+'_from'], item['target_'+td.toLowerCase()+'_to']].join(' - ') + ' ' + td}
                                                    />
        
                                                    <CommonText
                                                        size="small"
                                                        blue={true}
                                                        text={'P' + item['target_'+td.toLowerCase()+'_incentives']}
                                                    />
                                                </View>
                                            ) : null
                                        )}
                                    </CampaignDiv>
                                </View>
                                
                                <View
                                    style={{
                                        backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                                        paddingVertical: 15,
                                        paddingHorizontal: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CommonText
                                        size="small"
                                        text="Deadline"
                                    />

                                    <LabelText
                                        size="medium"
                                        blue={true}
                                        text={item.deadline.toUpperCase()}
                                    />
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 30
                                    }}
                                >
                                    <ButtonGradient
                                        text={"I want to collaborate"}
                                        onPress={() => alert('I want to collaborate')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Header>
            )     
        } else {
            this.props.navigation.navigate('Home');
        }
    }   
}

class CampaignDiv extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: 20
                }}
            >{this.props.children}</View>
        );
    }
}