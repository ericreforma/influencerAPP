import React, { PureComponent } from 'react';
import { ScrollView, View, FlatList, Dimensions, RefreshControl, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { CampaignAction } from '../redux/actions/campaign.action';
import { CampaignCard, CampaignCardThumb } from '../components/Card';
import { UserInfo } from '../components/Header';
import { LabelText, OtherTextButton } from '../components/Text';
import { NotificationAction } from '../redux/actions/notification.action';
import theme from '../styles/theme.style';
import lang from '../assets/language/home';
import { UserController } from '../controllers';
import { HttpRequest } from '../services/http';
import {URL} from '../config/url';

class HomePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            campaign: ['recommended', 'online', 'events', 'survey'],
            width: Math.round(Dimensions.get('window').width), 
            refreshing: false,
            exchangeRate: 1
        };
    }
    
    componentDidMount() {
        UserController.exchangeRate(response => {
            this.setState({ exchangeRate: response.data.rate })
        });

        this.props.browseRequest(() => {});
        this.props.getMyList();
        this.props.getNotifs();

      
    }

    campaignSection = (type) => 
        <View key={type} style={{ marginVertical: 15 }} >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: theme.HORIZONTAL_PADDING,
                    marginBottom: 20
                }}
            >
                <LabelText
                    size={(type === 0) ? 'medium' : 'large'}
                    dark={true}
                    text={lang[`${this.state.campaign[type]}Text`]}
                />
                <OtherTextButton
                    size="small"
                    text={lang.viewAllText}
                    onPress={() => {
                        this.props.navigation.navigate('CampaignViewAll', { type });
                    }}
                />
            </View>
            
            { type === 0 ? 
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        marginTop: 15
                    }}
                    overScrollMode="never"
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.props.campaign[this.state.campaign[type]]}
                    renderItem={({ item }) => <CampaignCardThumb campaign={item} type={type} /> }
                    keyExtractor={(item, index) => index.toString()}
                />
                : 
                this.props.campaign[this.state.campaign[type]] && 
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.props.campaign[this.state.campaign[type]]}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    renderItem={({ item }) => <CampaignCard campaign={item} type={type} exchangeRate={this.state.exchangeRate} /> }
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width - 50}
                    loopClonesPerSide={2}
                    loop={true}
                    containerCustomStyle={{ overflow: 'visible' }}
                />
            }

            {type == 3 &&
                <View
                    style={{
                        backgroundColor: '#eee',
                        borderRadius: 20,
                        alignSelf: 'stretch',
                        paddingVertical: 80,
                        marginHorizontal: 20,
                    }}
                >  
                    <Text 
                        style={{
                            textAlign: 'center',
                            fontSize: 18
                        }}
                    >
                        Coming soon
                    </Text>
                </View>
            }
        </View>
    
    refreshList = () => {
        this.setState({ refreshing: true });
        
        this.props.browseRequest(() => {
            this.setState({ refreshing: false });
        });
    }

    render = () =>
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshList}
                    />
                }
            >
                <UserInfo user={this.props.user} />

                {this.props.campaign && Array(4).fill(0).map((c, index) =>
                    this.campaignSection(index)
                )}
            </ScrollView>
        </View>
}

const mapStateToProps = state => ({
    campaign: state.campaign.home,
    user: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    browseRequest: (callback) => dispatch(CampaignAction.browse(callback)),
    getMyList: () => dispatch(CampaignAction.getMyList()),
    getNotifs: () => dispatch(NotificationAction.get())
});

export default connect(mapStateToProps, mapDispatchtoProps)(HomePage);
