import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, Text, View, FlatList, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import GradientContainer from '../components/GradientContainer';
import { connect } from 'react-redux';
import image from '../assets';
import { CampaignAction } from '../redux/actions/campaign.action';
import { 
    InterestedCard,
    PendingCard,
    ApprovedCard,
    ActiveCard,
    CompletedCard,
    FacebookCardActive,
    InstagramCardActive
} from '../components/Card';
import { SocialMediaController } from '../controllers';
import style from '../styles/page.MyCampaignPage.style';
import firebase from 'react-native-firebase';
import TokenSchema from '../database/TokenSchema';

class MyCampaignPage extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.myCampaigns !== undefined) {
            if (nextProps.myCampaigns !== prevState.myCampaigns) {
                return { 
                    socialMedia: nextProps.myCampaigns.socialMedia,
                    interested: nextProps.myCampaigns.socialMedia.interested,
                    pending: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'PENDING'),
                    approved: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'APPROVED'), 
                    active: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'ACTIVE') ,
                    verification: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'VERIFICATION'),
                    completed: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'COMPLETED') 
                };
            }
        }
        return null;
     }

    constructor(props) {
        super(props);

        this.state = {
            navigation: ['Bookmark', 'Pending', 'Approved', 'Verification', 'Active', 'Completed'],
            myCampaigns: null,
            socialMedia: null,
            interested: null,
            approved: null,
            active: null,
            verification: null,
            width: Math.round(Dimensions.get('window').width),
            carouselIndex: 0,
            navCarouselndex: 0,
            list: [0, 1, 2, 3, 4, 5],
            isRefreshing: false,
        };
        props.getMyList();
    }

    componentDidMount() {
        this.props.getMyList();
    }
    
    refreshList = () => {
        this.setState({ isRefreshing: true },
            () => {
                this.props.getMyList(() => this.setState({ isRefreshing: false }));
            });
    }

    navigation = () => 
        <View style={style.navigation}>
            <Carousel
                layout={'default'} 
                ref={(c) => { this.navCarousel = c; }}
                data={this.state.navigation}
                renderItem={ this._renderNav }
                sliderWidth={this.state.width}
                itemWidth={100} 
                layoutCardOffset={10}
                onSnapToItem={index => {
                    this.carousel.snapToItem(index);
                    this.setState({ carouselIndex: index })
                }}
            />
        </View>

    _renderSlide = ({ item, index }) => {
        let slide = null;

        switch (item) {
            case 0:
                slide = this.interested;
                break;
            case 1:
                slide = this.pending;
                break;
            case 2:
                slide = this.approved;
                break;
            case 3:
                slide = this.verification;
                break;
            case 4:
                slide = this.active;
                break;
            case 5:
                slide = this.completed;
                break;
            default: 
                return null;
        }

        return (
            <View style={style.scrollContainer}>
                <ScrollView >
                    <Text style={style.navTitle}>{ this.state.navigation[item] }</Text>
                    { slide() }
                </ScrollView>
            </View>
        )

    }
    
    _renderNav = ({ item, index }) => 
        <TouchableOpacity 
            key={index}
            style={style.navItem}
            onPress={() => {
                this.setState({ carouselIndex: index });
                this.carousel.snapToItem(index); 
            }}
        >   
            
            <Text style={ this.state.carouselIndex == index ? style.navTextActive : style.navText }>
                {item.toUpperCase()}
            </Text>

            { this.state.carouselIndex == index && 
                <View style={style.navActive } ></View>
            } 

        </TouchableOpacity>

    interested = () => 
        this.state.socialMedia.interested.length == 0 ? this.emptyCard('interested') : 
        <FlatList
            data={this.state.interested}
            renderItem={({ item }) => 
                <InterestedCard userCampaign={item} campaign={item.parent_campaign} type={1}/>}
            keyExtractor={item => item.id.toString()}
        />

    pending = () => 
        this.state.pending.length == 0 ?
        this.emptyCard('pending') : 
        <FlatList
            data={this.state.pending}
            renderItem={({ item }) => <PendingCard post={item} type={1}/>}
            keyExtractor={item => item.id.toString()}
        />

    approved = () => 
        this.state.approved.length == 0 ?
        this.emptyCard('pending') : 
        <FlatList
            data={this.state.approved}
            renderItem={({ item }) => <ApprovedCard post={item} type={1}/>}
            keyExtractor={item => item.id.toString()}
        />

    verification = () =>
        this.state.verification.length == 0 ? this.emptyCard('active') : 
        <FlatList
            data={this.state.verification}
            renderItem={({ item }) => {
                const credential = this.props.profile.social_media.filter(sm => sm.type === item.online.sma_type)[0];
                if(item.online.sma_type === 0) {
                    return (<FacebookCardActive page={credential} post_id={item.online.online_post_id} />)
                } else if(item.online.sma_type === 1) {
                    return (<InstagramCardActive page={credential} post_id={item.online.online_post_id}/>)
                }
            }}
               
            keyExtractor={item => item.id.toString()}
        />

    active = () =>
        this.state.active.length == 0 ? this.emptyCard('active') : 
        <FlatList
            data={this.state.active}
            renderItem={({ item }) => {
                const credential = this.props.profile.social_media.filter(sm => sm.type === item.online.sma_type)[0];
                if(item.online.sma_type === 0) {
                    return (<FacebookCardActive page={credential} post_id={item.online.online_post_id} />)
                } else if(item.online.sma_type === 1) {
                    return (<InstagramCardActive page={credential} post_id={item.online.online_post_id}/>)
                }
            }}
               
            keyExtractor={item => item.id.toString()}
        />

    completed = () => 
        this.state.completed.length == 0 ? this.emptyCard('completed') : 
        <FlatList
            data={this.state.completed}
            renderItem={({ item }) => {
                const credential = this.props.profile.social_media.filter(sm => sm.type === item.online.sma_type)[0];
                if(item.online.sma_type === 0) {
                    return (<FacebookCardActive page={credential} post_id={item.online.online_post_id} />)
                } else if(item.online.sma_type === 1) {
                    return (<InstagramCardActive page={credential} post_id={item.online.online_post_id}/>)
                }
            }}
            
            keyExtractor={item => item.id.toString()}
        />
        
    emptyCard = info => {
        const infoText = `There is no currently ${info} campaigns`;
        return (
            <View style={style.emptyCard} >
                <Text style={style.emptyCardText}>{infoText}</Text>
            </View>);
    }

    render = () => 
        <>
            <GradientContainer style={style.topNav}>
                <View style={style.topNavList}>
                    <Text style={style.topNavListTextActive}>Online</Text>
                    
                </View>
                <TouchableOpacity style={style.topNavList}
                    onPress={() => {
                        this.props.navigation.navigate('MyEvent');
                    }}
                >
                    <Text style={style.topNavListText}>Events</Text>
                </TouchableOpacity>
            </GradientContainer>
            <View style={{ flex: 1 }}>
                <Carousel
                    layout={'default'} 
                    ref={(c) => { this.carousel = c; }}
                    data={this.state.list}
                    renderItem={this._renderSlide}
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width} 
                    onSnapToItem={index => {
                        this.navCarousel.snapToItem(index);
                        this.setState({ carouselIndex: index })}
                    }
                />
            </View>
            { this.navigation() }
        </>
}

const mapStateToProps = state => ({
    myCampaigns: state.campaign.myCampaigns,
    profile: state.user.profile 
});

const mapDispatchtoProps = dispatch => ({
    getMyList: (callback) => dispatch(CampaignAction.getMyList(callback))
});

export default connect(mapStateToProps, mapDispatchtoProps)(MyCampaignPage);
