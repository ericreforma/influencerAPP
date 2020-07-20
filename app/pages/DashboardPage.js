import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, Text, View, Image, 
        FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { LabelText, CommonText } from '../components/Text';
import { SOCIALMEDIA, GENDER, ENGAGEMENT } from '../config/variables';
import { GradientButton } from '../components/Button';
import { URL } from '../config/url';
import style from '../styles/page.DashboardPage.style';
import { Utils } from '../controllers';
import image from '../assets';
import theme from '../styles/theme.style';

class DashboardPage extends Component {

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.myCampaigns !== undefined) {
            if (nextProps.myCampaigns !== prevState.myCampaigns) {
                return { 
                    myCampaigns: nextProps.myCampaigns,
                };
            }
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            myCampaigns: null,
            campaign: null,
            menu: ['Overview', 'Posts'],
            list: [0, 1],
            width: Math.round(Dimensions.get('window').width),
            carouselIndex: 0,
            postHeight: 0,
            overviewHeight: 0
        };
    }

    componentDidMount() {
        this.setState({
            campaign: this.props.navigation.getParam('campaign')
        });
    }

    _renderSlide = ({ item, index }) => {
        if (item === 'Overview') {
            return this.overview();
        }

        return (
            <View>
                { this.posts() }
                
            </View>);
    }

    overview = () =>
        <ScrollView>
            <View
                style={style.overviewContainer}
                onLayout={e => {
                    this.setState({ overviewHeight: e.nativeEvent.layout.height });
                }}
            >
                {/* Image */}
                    <View style={style.campaignImageContainer}>
                        <Image 
                            style={style.campaignPhoto} 
                            source={{ uri: `${URL.SERVER_STORAGE}/${this.state.campaign.parent_campaign.media.url}` }}
                        />
                        <Image 
                            style={style.campaignLogo}
                            source={Object.values(SOCIALMEDIA)[this.state.campaign.parent_campaign.social_media].icon}
                        />
                        
                        <Text style={style.campaignTitle}>{this.state.campaign.parent_campaign.name}</Text>
                    </View>

                {/* Description */}
                    <Text style={style.campaignDescription}>
                        {this.state.campaign.parent_campaign.description}
                    </Text>

                {/* tags */}
                    <Text style={style.campaignTag}>
                        {this.state.campaign.parent_campaign.tags.map((tag, index) => 
                            `${tag.caption} `
                        )}
                    </Text>

                {/* Preferred */}
                    <View style={{ marginTop: 20 }}>
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
                                text="Preferred"
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {/* FOLLOWERS */}
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
                                        text={Utils.compressNumber(this.state.campaign.parent_campaign.followers)}
                                    />

                                    <CommonText
                                        size="small"
                                        text="Followers"
                                    />
                                </View>

                            {/* GENDER */}
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
                                        source={image.icon.divider_icon}
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
                                            text={GENDER[this.state.campaign.parent_campaign.gender]}
                                        />

                                        <CommonText
                                            size="small"
                                            text="Gender"
                                        />
                                    </View>

                                    {/* divider */}
                                    <Image
                                        style={{
                                            width: 5,
                                        }}
                                        resizeMode="contain"
                                        source={image.icon.divider_icon}
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
                                    text={[this.state.campaign.parent_campaign.age_from, this.state.campaign.parent_campaign.age_to].join('-')}
                                />

                                <CommonText
                                    size="small"
                                    text="Age"
                                />
                            </View>
                        </View>
                    </View>
                
                {/* Earn */}
                    <View style={{ marginTop: 20 }}>
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
                                            text={Utils.compressNumber(this.state.campaign.parent_campaign.collaborator_budget, true)}
                                        />
                                    </View>

                                    <CommonText
                                        size="small"
                                        text="Pesos"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                
                {/* Incentives */}
                    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                        {this.state.campaign.parent_campaign.budgets.map((td, tdIdx) =>
                            <View
                                key={tdIdx}
                                style={{
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    marginVertical: 7,
                                    backgroundColor: '#fff',
                                    elevation: 3,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <CommonText
                                    size="small"
                                    text={`${td.min} - ${td.max} ${ENGAGEMENT[td.engagement]}s`}
                                />

                                <CommonText
                                    size="small"
                                    blue={true}
                                    text={`P ${parseInt(td.cost).toLocaleString()}`}
                                />
                            </View>
                        )}
                    </View>
            
                {/* Status */}
                    <View style={style.campaignStatus}>
                        <Text style={style.campaignStatus_text}>Status <Text style={style.campaignStatus_value}>PENDING APPROVAL</Text></Text>
                    </View>

                {/* Deadline */}
                    <View
                        style={{
                            backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                            marginTop: 30,
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
                            text={(moment(this.state.campaign.parent_campaign.deadline).format('hh:mm A - MMM. DD, YYYY')).toUpperCase()}
                        />
                    </View>
            
            </View>
        </ScrollView>
    post = pst => 
        <View 
            style={style.postContainer}
            onLayout={e => {
                this.setState({ postHeight: e.nativeEvent.layout.height });
            }}
        >
            <Image 
                style={style.postImage}
                source={{ uri: `${URL.SERVER_STORAGE}/${pst.media.url}` }}
            />
            <Text style={style.postTitle}>{pst.title}</Text>
            <Text style={style.postDescription}>{pst.caption}</Text>
            <Text style={style.postTags}>{pst.tags}</Text>

            {/* Status */}  
            <View style={style.campaignStatus}>
                <Text style={style.campaignStatus_text}>Status <Text style={style.campaignStatus_value}>PENDING APPROVAL</Text></Text>
            </View>

            <GradientButton 
                text="Update Post"
                style={style.postUpdateButton} 
                onPress={() => { 
                    this.props.navigation.navigate('UpdatePost', { 
                        post: pst
                    });
                }}
            />
        </View>

    posts = () =>
        <ScrollView>
            <FlatList
                data={this.state.campaign.posts}
                renderItem={({ item }) => this.post(item)}
                keyExtractor={item => item.id.toString()}
            />

            <TouchableOpacity
                style={style.postAddMoreContainer}
                onPress={() => {
                    this.props.navigation.navigate('CreatePost', { 
                        campaign: this.state.campaign.parent_campaign,
                        fromDashboard: true,
                    }); 
                }}    
            >
                <Image 
                    style={style.postAddMoreImage}
                    source={image.icon.add_icon}
                />
                <Text style={style.postAddMoreText}>Add more post</Text>
            </TouchableOpacity>
        </ScrollView>


    navigation = () =>
        <View style={style.navigation}>
            {this.state.menu.map((nav, index) => 
                <TouchableOpacity 
                    onPress={() => {
                        this.setState({ carouselIndex: index });
                        this.carousel.snapToItem(index); 
                    }}
                    key={index}
                >
                    <Text 
                        style={[
                            style.navItem, 
                            this.state.carouselIndex === index ? style.navItemActive : null
                        ]}
                    >
                        {nav}
                    </Text>
                    <View style={this.state.carouselIndex === index ? style.navLineActive : null} />
                </TouchableOpacity>
            )}
        </View>

    render = () => 
        <View  
            style={{ 
                paddingBottom: 55, 
            }}
        >
            { this.navigation() }
            { this.state.campaign &&
                <Carousel
                    layout={'default'} 
                    ref={(c) => { this.carousel = c; }}
                    data={this.state.menu}
                    renderItem={this._renderSlide}
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width} 
                    onSnapToItem={index => this.setState({ carouselIndex: index })}
                />
            }
                
        </View>
    
}

const mapStateToProps = state => ({
    myCampaigns: state.campaign.myCampaigns
});

export default connect(mapStateToProps)(DashboardPage);
