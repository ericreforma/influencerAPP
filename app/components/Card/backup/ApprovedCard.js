import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { View, Text, Image, Modal, 
         Dimensions, TouchableOpacity, Alert,
        TextInput, Clipboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import { LabelText, CommonText } from '../../components/Text';
import { GradientButton, WhiteButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import style from '../../styles/component.MyCampaignCard.style';
import { CampaignController, SocialMediaController } from '../../controllers';
import { SOCIALMEDIA } from '../../config/variables';
import { CAMPAIGN } from '../../redux/actions/types.action';
import { CampaignAction } from '../../redux/actions/campaign.action';
import { URL } from '../../config/url';
import lang from '../../assets/language/home';
import { HttpRequest } from '../../services/http';
import NavigationService from '../../services/navigation';
import image from '../../assets';
import AutoHeightImage from 'react-native-auto-height-image';
import { ScrollView } from 'react-native-gesture-handler';
import FacebookCard from './FacebookCard';
import InstagramCard from './InstagramCard';

class ApprovedCard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
            isFBPostListVisible: false,
            isIGPostListVisible: false,
            width: Math.round(Dimensions.get('window').width), 
            sliderIndex: 0,
            clipboard: '',
            sma_id: this.props.post.sma[0].sma_id,
            facebookPosts: [],
            instagramPosts: [],
            accountCredential: null
        };
    }

    componentDidMount() {

    }

    cancel = () => {
        HttpRequest.get(URL.SOCIALMEDIA.POST.CANCEL, { post_id: this.props.post.id })
        .then(() => {
            this.props.getMyList();
        }).catch(e => {
            console.log('Error removing from list');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }

    displayPhoto = () => {
        switch(this.props.post.media.length) {
            case 1:
                return this.singlePhoto();
                break;
            case 2:
                return this.doublePhoto();
                break;
            case 3:
                return this.triplePhoto();
                break;
            case 4:
                return this.multiPhoto();
                break;
            default:
                return this.multiPhoto();
                break;
        }
    }

    singlePhoto = () =>
        <TouchableOpacity
            onPress={ () => {
                this.setState({ isModalVisible: true });
            }}
        >
            <Image
                style={{
                    alignSelf: 'stretch',
                    height: 200,
                    maxHeight: 200,
                }}
                resizeMode="cover"
                source={{ 
                    uri: `${URL.SERVER_STORAGE}/${this.props.post.media[0].url}`
                }}
                
            />
        </TouchableOpacity>
    
    doublePhoto = () => 
        <View
            style={{
                position: 'relative',
                flexDirection: 'row',
                alignSelf: 'stretch'
            }}
        >
            { this.props.post.media.map((img, index) => 
                <TouchableOpacity
                    key={index}
                    style={{
                        height: 200,
                        width: '50%'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(index));
                    }}
                >
                    <Image
                        style={{
                            height: 200,
                            width: '100%'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[index].url}`
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>

    triplePhoto = () => 
        <View
            style={{
                flexDirection: 'row',
                alignSelf: 'stretch',
                position: 'relative'
            }}
        >
            <TouchableOpacity
                style={{
                    height: 200,
                    width: '50%'
                }}
                onPress={ () => {
                    this.setState({ isModalVisible: true });
                    setTimeout(() => this.carousel.snapToItem(0));
                }}
            >
                <Image
                    style={{
                        height: 200,
                        width: '100%'
                    }}
                    resizeMode="cover"
                    source={{ 
                        uri: `${URL.SERVER_STORAGE}/${this.props.post.media[0].url}`
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    height: 200,
                    width: '50%',
                    flexDirection: 'column'
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 100,
                        alignSelf: 'stretch'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(1));
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[1].url}`
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        alignSelf: 'stretch'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(2));
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[2].url}`
                        }}
                    />

                </TouchableOpacity>
                
            </View>
        </View>

    multiPhoto = () =>
        <View
            style={{
                position: 'relative',
                flexDirection: 'column',
                alignSelf: 'stretch',
                height: 200
            }}
        >
            <View 
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    height: 100
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: '50%'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(0));
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[0].url}`
                        }}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: '50%'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(1));
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[1].url}`
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View 
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    height: 100
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: '50%'
                    }}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                        setTimeout(() => this.carousel.snapToItem(2));
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: `${URL.SERVER_STORAGE}/${this.props.post.media[2].url}`
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        height: 100,
                        width: '50%',
                        position: 'relative'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 100,
                            alignSelf: 'stretch'
                        }}
                        onPress={ () => {
                            this.setState({ isModalVisible: true });
                            setTimeout(() => this.carousel.snapToItem(3));
                        }}
                    >
                        <Image
                            style={{
                                height: 100,
                                alignSelf: 'stretch'
                            }}
                            resizeMode="cover"
                            source={{ 
                                uri: `${URL.SERVER_STORAGE}/${this.props.post.media[3].url}`
                            }}
                        />
                    
                        
                        { this.props.post.campaign.media.length > 4 &&
                            <View
                                style={{
                                    height: 100,
                                    alignSelf: 'stretch',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 55
                                    }}
                                >{`+${this.props.post.campaign.media.length - 4}`}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                
             </View>
        </View>

    previewModal = () =>
        <Modal 
            animationType={'fade'}
            visible={this.state.isModalVisible}
            onRequestClose={() => { 
                this.setState({ isModalVisible: false }); 
            }}
        >
            <View
                style={{ 
                    backgroundColor: '#000',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.props.post.media}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    renderItem={({ item }) => 
                        <View 
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <AutoHeightImage
                                width={ this.state.width }
                                source={{ 
                                    uri: `${URL.SERVER_STORAGE}/${item.url}`
                                }}
                            /> 
                        </View>
                    }
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width - 50}
                    containerCustomStyle={{ 
                        overflow: 'visible',
                        
                    }}
                />

            </View>
        </Modal>

    checkSocialMediaAccount = () => {
       
        const accountCredential = this.props.user.social_media.filter(sma => sma.type === this.state.sma_id);
        this.setState({ accountCredential: accountCredential[0] });

        if(accountCredential.length === 0) {
            Alert.alert(`Your account must be linked or logged in to facebook`)
        } else {
            switch(this.state.sma_id){
                case 0:
                    this.setState({ isFBPostListVisible: true })
                    SocialMediaController.facebook.getPosts(accountCredential[0], (posts) => {
                        this.setState({ facebookPosts: posts })
                        
                    }, () => {
                        Alert.alert('Error on displaying posts.')
                    })
                break;
                case 1: 
                    this.setState({ isIGPostListVisible: true })
                    SocialMediaController.instagram.getPosts(accountCredential[0], (posts) => {
                        this.setState({ instagramPosts: posts })
                        
                    }, () => {
                        Alert.alert('Error on displaying posts.')
                    })
                break;
            }
        }
    }

    facebookPostList = () => 
        <Modal 
            animationType={'slide'}
            visible={this.state.isFBPostListVisible}
            onRequestClose={() => { 
                this.setState({ isFBPostListVisible: false }); 
            }}
        >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    { this.state.facebookPosts.map((post, index) =>
                        <FacebookCard 
                            post={post} 
                            page={this.state.accountCredential} 
                            key={`facebookCard${index}`}
                            onSent={() => {
                                this.submitFacebook(post);
                            }}
                        />
                    )}
                </ScrollView>
            </View>
        </Modal>

    instagramPostList = () => 
        <Modal 
            animationType={'slide'}
            visible={this.state.isIGPostListVisible}
            onRequestClose={() => { 
                this.setState({ isIGPostListVisible: false }); 
            }}
        >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    { this.state.instagramPosts.map((post, index) =>
                        <InstagramCard 
                            post={post} 
                            page={this.state.accountCredential} 
                            key={`instagramCard${index}`}
                            onSent={() => {
                                this.submitInstagram(post);
                            }}
                        />
                    )}
                </ScrollView>
            </View>
        </Modal>

    submitInstagram = post => {
       
        HttpRequest.post(URL.SOCIALMEDIA.POST.LIVESUBMIT, {
            post_id: this.props.post.id,
            sma_type: 1,
            sma: 'instagram',
            online_user_id: this.state.accountCredential.page_id,
            online_user_photo: this.state.accountCredential.page_profile_picture,
            online_user_name: this.state.accountCredential.page_username,
            online_post_id: post.id,
            online_post_caption: post.caption,
            online_post_media: post.media_url,
            online_post_likes: post.like_count,
            online_post_comments: post.comments_count,
            online_post_shares: 0,
            online_post_timestamp: post.timestamp,
            online_post_permalink: post.permalink
        }).then(result => {
            this.props.getMyList();
            this.setState({ isIGPostListVisible: false }); 
        }).catch(e=> {
            console.log(e);
            console.log(e.response);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        })
    }

    submitFacebook = post => {
        HttpRequest.post(URL.SOCIALMEDIA.POST.LIVESUBMIT, {
            post_id: this.props.post.id,
            sma_type: 0,
            sma: 'facebook',
            online_user_id: this.state.accountCredential.page_id,
            online_user_photo: this.state.accountCredential.page_profile_picture,
            online_user_name: this.state.accountCredential.page_username,
            online_post_id: post.id,
            online_post_caption: post.message,
            online_post_media: post.full_picture,
            online_post_likes: post.likes.summary.total_count,
            online_post_comments: post.comments.summary.total_count,
            online_post_shares: post.hasOwnProperty('shared') ? post.shares.count : 0,
            online_post_timestamp: post.created_time,
            online_post_permalink: post.permalink_url
        }).then(result => {
            this.props.getMyList();
            this.setState({ isFBPostListVisible: false }); 
        }).catch(e=> {
            console.log(e);
            console.log(e.response);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        })
    }

    render = () =>
        <>
            { this.previewModal() }
            { this.facebookPostList() }
            { this.instagramPostList() }
            <View
                style={{
                    borderRadius: theme.BORDER_RADIUS,
                    marginBottom: 5,
                    elevation: 2,
                    alignSelf: 'stretch',
                    margin: 25,
                }}
            >
                {/* HEADER */}
                    <View style={style.header}> 
                        <View style={style.photoContainer}>
                            <Image
                                resizeMode="cover"
                                style={style.photo}
                                source={
                                    { uri: `${URL.SERVER_STORAGE}/${this.props.post.campaign.media[0].url}` }
                                }
                            />
                        </View>
                        
                        <View style={style.title}>
                            <Text style={style.titleName}>
                                { this.props.post.campaign.name }
                            </Text>
                            <Text style={style.titleClient}>
                                { this.props.post.client.business_name }
                                
                            </Text>
                            <Text style={style.titleClient}>
                                {(moment(this.props.post.created_at).format('MMM. DD, YYYY')).toUpperCase()}
                            </Text>
                        </View>
                    </View>        
                   
                {/* MAIN PHOTO */}
                    <View
                        style={{
                            height: 200,
                            maxHeight: 200,
                            overflow: 'hidden',
                            marginTop: 50
                        }}
                    >
                        { this.displayPhoto() }
                    </View>

                {/* BODY */}
                    <View
                        style={{
                            flex: 1,
                            padding: 20,
                            backgroundColor: theme.COLOR_WHITE,
                            borderBottomLeftRadius: theme.BORDER_RADIUS,
                            borderBottomRightRadius: theme.BORDER_RADIUS,
                        }}
                    >
                        <View
                            style={{
                                marginTop: 15,
                            }}
                        >
                            <CommonText
                                size="small"
                                text={this.props.post.caption}
                            />
                            <CommonText
                                size="small"
                                text={this.props.post.tags}
                            />

                            <View>
                                <View style={style.socialMediaContainer}>
                                    { this.props.post.sma.map((sma, index) => 
                                        <Image 
                                            style={style.socialMedia}
                                            key={index}
                                            resizeMode='contain'
                                            source={Object.values(SOCIALMEDIA)[sma.sma_id].icon_colored}
                                        />
                                    )}
                                </View>
                            </View>

                        </View>

                        <View style={{ marginTop: 20 }} >
                            <GradientButton
                                text={'Send Post'}
                                onPress={() => { 
                                    this.checkSocialMediaAccount();
                                }}
                            />
                            <GradientButton
                                text={'View Campaign'}
                                onPress={() => { 
                                    if (this.props.type === 1) {
                                        NavigationService.navigate('Campaign', { id: this.props.post.campaign.id, type: this.props.type  }); 
                                    } else {
                                        NavigationService.navigate('Event', { id: this.props.post.campaign.id, type: this.props.type }); 
                                    }
                                
                                }}
                            />
                            <WhiteButton
                                text='Cancel'
                                onPress={() => {
                                    Alert.alert(
                                        'Confirm remove',
                                        `Cancel your post for the campaign ${this.props.post.campaign.name}?`,
                                        [
                                            {
                                                text: 'NO',
                                            },
                                            { text: 'YES', 
                                                onPress: () => this.cancel()
                                            },
                                        ],
                                        { cancelable: true },
                                    );
                                }}
                            />
                        </View>
                </View>
            </View>
        </>

}

const mapStateToProps = state => ({
    user: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(mapStateToProps, mapDispatchtoProps)(ApprovedCard);