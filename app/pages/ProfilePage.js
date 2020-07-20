import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, 
         Dimensions, Image, TouchableOpacity, 
         Modal, FlatList } from 'react-native';
import { navOptionsDark } from '../components/Header';
import { LabelText, CommonText, OtherTextButton } from '../components/Text';
import GradientContainer from '../components/GradientContainer';
import { Utils } from '../controllers';
import theme from '../styles/theme.style';
import style from '../styles/page.Profile.style';
import { URL } from '../config/url';
import lang from '../assets/language/profile';
import image from '../assets';
import { SOCIALMEDIA } from '../config/variables';
import NavigationService from '../services/navigation';
import { HttpRequest } from '../services/http';
import { CampaignAction } from '../redux/actions/campaign.action';
import { 
    FacebookCardActive,
    InstagramCardActive
} from '../components/Card';

class ProfilePage extends Component {
    static navigationOptions = navOptionsDark;

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user !== prevState.user) {
          return { 
                user: nextProps.user,
                profilePhoto: nextProps.user.media === null ?
                    image.male_avatar : 
                    { uri: `${URL.SERVER_STORAGE}/${nextProps.user.media.url}` },
                completedCampaigns: nextProps.myCampaigns.socialMedia.posts.filter(p => p.status === 'COMPLETED') 
            };
        }
        
        return null;
     }

    constructor(props) {
        super(props);

        this.state = {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            user: this.props.user,

            isCampaignListModalVisible: false,
            completedCampaigns: [],
            profilePhoto: this.props.user.media === null ?
                image.male_avatar : 
                { uri: `${URL.SERVER_STORAGE}/${this.props.user.media.url}` },
        };
    }

    componentDidMount() {
        console.log(this.state.completedCampaigns);
    }
    profilePicture = () =>
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
                        borderRadius: this.state.width / 3
                    }}
                    resizeMode="cover"
                    source={this.state.profilePhoto}
                />
            </View>
        </View>

    profileName = () => 
        <View style={style.div}>
            
            <LabelText
                size="large"
                dark={true}
                text={this.state.user.name}
            />
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditProfile')}} >
                <Text
                    style={{
                        fontSize: theme.FONT_SIZE_SMALL,
                        color: theme.COLOR_YELLOW_HEAVY,
                    }}
                >
                Edit Profile
                </Text>
            </TouchableOpacity>

        </View>

    description = () => 
        <View style={style.div}>
            { this.state.user.description && this.state.user.description !== 'null' ? 
                <CommonText
                    size="small"
                    textAlignCenter={true}
                    text={this.state.user.description}
                />
                :
                <View>
                    <Text style={style.bioPlaceholder}>Your personal bio here</Text>
                </View>

            }
            
        </View>

    rating = () =>
        <View style={style.div}>
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
                    text={this.state.user.rating.average}
                />

                {Array(5).fill(image.icon.star_active).map((star, index) =>
                    <Image
                        key={index}
                        style={{
                            width: 18,
                            height: 18,
                            marginHorizontal: 5
                        }}
                        resizeMode="contain"
                        source={(index) < this.state.user.rating.average ?
                            star : 
                            image.icon.star_inactive}
                    />
                )}

                <CommonText
                    size="xsmall"
                    dark={true}
                    text={`(${this.state.user.rating.total})`}
                />
            </View>
        </View>

    socialMedia = () =>
        <View style={style.div}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {this.state.user.social_media.map((sma, smaIdx) =>
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
                                text={Utils.compressNumber(sma.page_fan_count)}
                            />

                            <CommonText
                                size="small"
                                text={Object.values(SOCIALMEDIA)[sma.type].prettyname}
                            />
                        </View>
                        
                        {smaIdx !== (this.state.user.social_media.length - 1) &&
                            <Image
                                style={{
                                    width: 5,
                                    marginHorizontal: 20
                                }}
                                resizeMode="contain"
                                source={image.icon.divider_icon}
                            />
                        }
                    </View>
                )}
            </View>
        </View>

    location = () =>
        <View style={style.div}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'stretch'
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
            </View>
                { this.state.user.location !== '' ?
                    <View>
                        <CommonText
                            size="small"
                            dark={false}
                            text={this.state.user.location}
                        />
                    </View>
                    : null
                }
               
                <View>
                    <CommonText
                        size="small"
                        dark={true}
                        text={this.state.user.country.name}
                    />
                </View>
        </View>
    
    category = () => 
        <View
            style={{
                width: '100%',
                backgroundColor: theme.COLOR_WHITE,
                borderRadius: theme.BORDER_RADIUS,
                alignItems: 'center',
                padding: 20
            }}
        >   
            { this.state.user.category.length !== 0 ?
                <View
                    style={{
                        backgroundColor: theme.COLOR_WHITE,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    { this.state.user.category.map((cat, catIdx) =>
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
                        </View>
                    )}
                </View>
                :
                <TouchableOpacity
                    style={{
                        borderRadius: theme.BORDER_RADIUS,
                        height: 35,
                        width: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                        flexGrow: 1,
                    }}
                    activeOpacity={0.8}
                    onPress={() => { NavigationService.navigate('EditCategory', { category: this.state.user.category }); }}
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
                        text="Add Categories"
                    />
                </TouchableOpacity>
            }
        </View>

    featuredCampaign = () =>
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            

            { this.props.myCampaigns.socialMedia.posts.map((post, index) => 
                { if(post.online && post.online.isFeatured === 1) {
                    return(
                        <View
                            key={index}
                            style={{
                                borderRadius: theme.BORDER_RADIUS,
                                backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 5,
                                flexGrow: 1,
                                position: 'relative',
                                width: (this.state.width / 2) - 60,
                                height: (this.state.width / 2) - 60,
                                overflow: 'hidden'
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={{
                                        width: (this.state.width / 2) - 60,
                                        height: (this.state.width / 2) - 60,
                                        marginBottom: 5
                                    }}
                                    resizeMode="stretch"
                                    source={{ uri: post.online.online_post_media }}
                                />
                                <Text
                                    style={{ 
                                        position: 'absolute',
                                        fontSize: 16,
                                        bottom: 25,
                                        left: 4,
                                        zIndex: 1
                                    }}
                                >{ post.campaign.name }</Text>
                                <Text
                                    style={{ 
                                        position: 'absolute',
                                        fontSize: 13,
                                        bottom: 15,
                                        left: 4,
                                        zIndex: 1
                                    }}
                                >{ post.client.business_name }</Text>
                            </View>
                            
                        </View>
                    )} else {
                        return(<></>)
                    }
                }
                
            )}

            <TouchableOpacity
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
                onPress={() => {
                    this.setState({ isCampaignListModalVisible: true })
                }}
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
        </View>      
       
    modalCompletedCampaignList = () => {
        const completedCampaigns = this.props.myCampaigns.socialMedia.posts.filter(p => p.status === 'COMPLETED');

        return(
            <Modal 
                animationType={'slide'}
                visible={this.state.isCampaignListModalVisible}
                onRequestClose={() => { 
                    this.setState({ isCampaignListModalVisible: false }); 
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <GradientContainer
                        style={{
                            alignSelf: 'stretch',
                            paddingVertical: 10
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 24,
                                color: '#fff'
                            }}
                        >Completed Campaigns</Text>
                    </GradientContainer>

                    { completedCampaigns.length === 0 ?
                        <Text
                            style={{ textAlign: 'center', marginTop: 25 }}
                        >
                                There are no available campaigns yet.
                        </Text>
                    :
                        <FlatList
                            data={completedCampaigns}
                            renderItem={({ item }) => {
                                const credential = this.props.user.social_media.filter(sm => sm.type === item.online.sma_type)[0];
                                
                                if(item.online.sma_type === 0) {
                                    return (
                                        <FacebookCardActive 
                                            page={credential} 
                                            post_id={item.online.online_post_id} 
                                            hasSelect={true}
                                            onSelect={() => {
                                                this.postSetFeatured(item.online.id);
                                            }}
                                        />
                                    )
                                } else if(item.online.sma_type === 1) {
                                    return (
                                        <InstagramCardActive 
                                            page={credential} 
                                            post_id={item.online.online_post_id}
                                            hasSelect={true}
                                            onSelect={() => {
                                                this.postSetFeatured(item.online.id);
                                            }}
                                        />
                                    )
                                }
                            }}
                            
                            keyExtractor={item => item.id.toString()}
                        />
                    }
                </View>

            </Modal>
        );
     }
        
    postSetFeatured = postOnline_id => {
        HttpRequest.get(URL.SOCIALMEDIA.POST.SETFEATURED, {
            postOnline_id
        }).then(result => {
            this.setState({ isCampaignListModalVisible: false }); 
            this.props.getMyList();
        }).catch(e=> {
            console.log(e);
            console.log(e.response);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        })
    }

    render = () => 
        <View 
            style={{ 
                flex: 1, 
                backgroundColor: theme.COLOR_BLACK, 
                paddingHorizontal: theme.HORIZONTAL_PADDING
            }}
        >
            { this.modalCompletedCampaignList() }
            <ScrollView>
                {/* PROFILE INFO */}
                <View style={style.div}>
                    { this.profilePicture() }
                    
                    
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
                        />

                        <View style={{ padding: 20, }} >

                            { this.profileName() }

                            { this.description() }

                            { this.rating() }

                            { this.socialMedia() }

                            { this.location() }
                            
                        </View>
                    </View>
                </View>
                
                {/* CATEGORY */}
                <View style={style.div}>
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
                            text={lang.editCategoryLabel}
                            onPress={() => { NavigationService.navigate('EditCategory', { category: this.state.user.category }); }}
                        />
                    </View>

                    { this.category() }
                </View>

                {/* FEATURED CAMPAIGN */}

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

                { this.featuredCampaign() }
            </ScrollView> 

        </View>
}

const mapStateToProps = state => ({
    user: state.user.profile,
    myCampaigns: state.campaign.myCampaigns,
});

const mapDispatchtoProps = dispatch => ({
    getMyList: (callback) => dispatch(CampaignAction.getMyList(callback))
});

export default connect(mapStateToProps, mapDispatchtoProps)(ProfilePage);
