import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Animated
} from 'react-native';

import {
    MyCampaignActiveCard,
    MyCampaignCompletedCard
} from '../components/Card';
import Header from '../components/Header';
import {
    LabelText,
} from '../components/Text';

import theme from '../styles/theme.style';

export default class MyCampaignPage extends Component {
    state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        activeNav: 'active',
        
        campaignXPos: new Animated.Value(0),
        activeDisplay: true,
        completedDisplay: false,

        /*
            status
            0 - pending
            1 - approved
            2 - rejected
        */
        activeCampaigns: [
            {
                id: 5,
                sma: 0,
                client: 'Burger Philippines',
                name: 'Burger Mcdo',
                date: '2019-03-30 15:00:00',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                message: 1,
                status: 0,
                favorite: 0
            },{
                id: 8,
                sma: 1,
                client: 'Davies Philippines',
                name: 'Colors of the Philippines',
                date: '2019-03-30 15:00:00',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                message: 1,
                status: 1,
                favorite: 0
            }
        ],
        completedCampaigns: [
            {
                id: 4,
                sma: 0,
                client: 'Nike Fitness',
                name: 'Nike',
                date: '2019-03-30 15:00:00',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                message: 1,
                status: 1,
                favorite: 1
            },{
                id: 6,
                sma: 1,
                client: 'BMW Motorrad',
                name: 'BMW Philippines',
                date: '2019-03-30 15:00:00',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                message: 1,
                status: 1,
                favorite: 0
            },{
                id: 10,
                sma: 0,
                client: 'Maybelline',
                name: 'Maybelline Philippines',
                date: '2019-03-30 15:00:00',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                message: 1,
                status: 1,
                favorite: 0
            }
        ]
    }

    // nav button text >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    navTitleData = () => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: theme.HEADER_PADDING_VERTICAL
                }}
            >
                <LabelText
                    size="large"
                    white={true}
                    text="My Campaigns"
                />
            </View>
        );
    }

    navOnPress = (activeNav) => () => {
        if(activeNav == 'completed') {
            this.setState({completedDisplay: true});

            Animated.timing(this.state.campaignXPos, {
                toValue: (-1 * this.state.width) - 10,
                duration: 500
            }).start(() => {
                this.setState({activeDisplay: false});
            });
        } else {
            this.setState({activeDisplay: true});
            Animated.timing(this.state.campaignXPos, {
                toValue: 0,
                duration: 500
            }).start(() => {
                this.setState({completedDisplay: false});
            });
        }

        this.setState({activeNav});
    }
    // nav button text end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // favorite button on press >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    favoriteButtonOnPress = (id) => () => {
        var completedCampaigns = this.state.completedCampaigns;

        completedCampaigns = completedCampaigns.map(cc => {
            if(cc.id == id) {
                cc.favorite = cc.favorite == 0 ? 1 : 0;
            }
            return cc;
        });

        this.setState({completedCampaigns});
    }
    // favorite button on press end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    render() {
        return (
            <Header
                navigation={this.props.navigation}
                backgroundGradient={true}
                backgroundGradientData={this.navTitleData()}
            >
                {/* header nav */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: this.state.width / 6,
                        marginBottom: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={this.navOnPress('active')}
                    >
                        <View
                            style={{
                                opacity: this.state.activeNav == 'active' ? 1 : 0.3,
                                borderBottomColor: theme.COLOR_YELLOW_HEAVY,
                                borderBottomWidth: this.state.activeNav == 'active' ? 3 : 0,
                                paddingBottom: 7
                            }}
                        >
                            <LabelText
                                size="large"
                                dark={true}
                                text={"ACTIVE"}
                            />
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={this.navOnPress('completed')}
                    >
                        <View
                            style={{
                                opacity: this.state.activeNav == 'completed' ? 1 : 0.3,
                                borderBottomColor: theme.COLOR_YELLOW_HEAVY,
                                borderBottomWidth: this.state.activeNav == 'completed' ? 3 : 0,
                                paddingBottom: 7
                            }}
                        >
                            <LabelText
                                size="large"
                                dark={true}
                                text={"COMPLETED"}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View
                    style={{
                        paddingHorizontal: theme.HORIZONTAL_PADDING,
                    }}
                >
                    <Animated.View
                        style={{
                            width: '200%',
                            flexDirection: 'row',
                            left: this.state.campaignXPos
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                marginRight: 50
                            }}
                        >
                            {this.state.activeDisplay ? (
                                this.state.activeCampaigns.map((ac, acIdx) =>
                                    <MyCampaignActiveCard
                                        key={acIdx}
                                        item={ac}
                                        navigation={this.props.navigation}
                                    />
                                )
                            ) : null}
                        </View>

                        <View
                            style={{
                                width: '50%'
                            }}
                        >
                            {this.state.completedDisplay ? (
                                this.state.completedCampaigns.map((cc, ccIdx) =>
                                    <MyCampaignCompletedCard
                                        key={ccIdx}
                                        item={cc}
                                        favoriteButtonOnPress={this.favoriteButtonOnPress}
                                        navigation={this.props.navigation}
                                    />
                                )
                            ) : null}
                        </View>
                    </Animated.View>
                </View>
            </Header>
        )
    }
}