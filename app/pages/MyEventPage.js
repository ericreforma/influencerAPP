import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, Text, View, FlatList, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import GradientContainer from '../components/GradientContainer';
import { connect } from 'react-redux';
import image from '../assets';
import { CampaignAction } from '../redux/actions/campaign.action';
import { 
    InterestedCard,
    PendingEventCard,
    AcceptedEventCard,
    CompletedEventCard,
    ApprovedCard,
    ActiveCard,
    CompletedCard,
    FacebookCardActive,
    InstagramCardActive,
} from '../components/Card';
import { SocialMediaController } from '../controllers';
import style from '../styles/page.MyCampaignPage.style';
import { UserController } from '../controllers';
import firebase from 'react-native-firebase';
import TokenSchema from '../database/TokenSchema';

class MyEventPage extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.myCampaigns !== undefined) {
            if (nextProps.myCampaigns !== prevState.myCampaigns) {
                return { 
                    socialMedia: nextProps.myCampaigns.socialMedia,
                    interested: nextProps.myCampaigns.socialMedia.interested,
                    pending: nextProps.myCampaigns.events.pending,
                    accepted: nextProps.myCampaigns.events.accepted,
                    completed: nextProps.myCampaigns.events.completed,
                };
            }
        }
        return null;
     }

    constructor(props) {
        super(props);

        this.state = {
            navigation: ['Bookmark', 'Pending', 'Accepted', 'Completed'],
            myCampaigns: null,
            socialMedia: null,
            interested: null,
            completed: null,
            accepted: null,
            pending: null,
            width: Math.round(Dimensions.get('window').width),
            carouselIndex: 0,
            navCarouselndex: 0,
            list: [0, 1, 2, 3],
            isRefreshing: false,
            exchangeRate: 1
        };
        props.getMyList();
    }

    componentDidMount() {
        UserController.exchangeRate(response => {
            this.setState({ exchangeRate: response.data.rate })
        });

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
                slide = this.accepted;
                break;
            case 3:
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
            renderItem={({ item }) => <PendingEventCard event={item} type={1} exchangeRate={this.state.exchangeRate} />}
            keyExtractor={item => item.id.toString()}
        />

    accepted = () => 
        this.state.accepted.length == 0 ?
        this.emptyCard('accepted') : 
        <FlatList
            data={this.state.accepted}
            renderItem={({ item }) => <AcceptedEventCard event={item} type={1} exchangeRate={this.state.exchangeRate}/>}
            keyExtractor={item => item.id.toString()}
        />

    completed = () => 
        this.state.completed.length == 0 ?
        this.emptyCard('completed') : 
        <FlatList
            data={this.state.completed}
            renderItem={({ item }) => <CompletedEventCard event={item} type={1} exchangeRate={this.state.exchangeRate}/>}
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
                <TouchableOpacity style={style.topNavList}
                    onPress={() => {
                        this.props.navigation.navigate('MyCampaign');
                    }}
                >
                    <Text style={style.topNavListText}>Online</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity style={style.topNavList}
                    
                >
                    <Text style={style.topNavListTextActive}>Events</Text>
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

export default connect(mapStateToProps, mapDispatchtoProps)(MyEventPage);
