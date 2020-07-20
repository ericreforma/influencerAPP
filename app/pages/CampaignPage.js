import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text, Image, ActivityIndicator, 
        TouchableOpacity } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';
import { CampaignAction } from '../redux/actions/campaign.action';
import { showMessage } from "react-native-flash-message";
import { CampaignController, UserController } from '../controllers';
import { GradientButton, BackButton, WhiteButton } from '../components/Button';
import { SOCIALMEDIA, ENGAGEMENT } from '../config/variables';
import { URL } from '../config/url';
import { LabelText, CommonText } from '../components/Text';
import image from '../assets';
import theme from '../styles/theme.style';
import style from '../styles/page.CampaignPage.style';
import lang from '../assets/language/campaign';
import Collage from '../components/Collage';

class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            modalVisible: false,
            isModalVisible: false,
            sendingInterest: false,
            campaign: {},
            exchangeRate: 1,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        UserController.exchangeRate(response => {
            this.setState({ exchangeRate: response.data.rate })
        });

        this.setState({ height: this.state.width * (1.4/3) });

        CampaignController.viewDetails(navigation.getParam('id'), navigation.getParam('type'))
        .then(response => {
            let campaign = response.data;

            if(this.props.user.country.code === 'PH') {
                const xRate =  this.state.exchangeRate;

                campaign.basic_pay = campaign.basic_pay * xRate;
                campaign.collaborator_budget = parseFloat(campaign.collaborator_budget * this.state.exchangeRate)
                
                const budgets = campaign.budgets;
                budgets.forEach(function(budget, index){
                    const oldColst = this[index].cost;
                    console.log('oldcost', oldColst)
                    this[index].cost = oldColst * xRate;
                    console.log('newcost', this[index].cost)
                }, budgets);

                campaign.budgets = budgets;
            }

            this.setState({ campaign });
            
        })
        .catch(e => {
            alert(e);
        });
    }   

    checkNumberLength = (numbers, uppercase) => {

        const numberString = parseInt(numbers).toString();

        if (numberString.length > 6) {
            numbers = numberString.substr(0, numberString.length - 6) + 'M';
        } else if (numberString.length > 3) {
            numbers = numberString.substr(0, numberString.length - 3) + (uppercase ? 'K' : 'k');
        }

        return numbers;
    }

    tags = () =>
        <View style={{ marginTop: 20 }}>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}
            >
                {this.state.campaign.tags.map((hnt, hntIdx) =>
                    <View
                        key={hntIdx}
                        style={{
                            marginRight: 7,
                            flexDirection: 'row'
                        }}
                    >
                        <CommonText
                            size="small"
                            text={hnt.caption.toLowerCase()}
                        />
                    </View>
                )}
            </View>
        </View>

    preferred = () => 
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
                    text={lang.preferredLabel}
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
                            text={this.checkNumberLength(this.state.campaign.followers)}
                        />

                        <CommonText
                            size="small"
                            text={lang.preferredFollowersText}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                            text={[this.state.campaign.age_from, this.state.campaign.age_to].join('-')}
                        />

                        <CommonText
                            size="small"
                            text={lang.preferredAgeText}
                        />
                    </View>
            </View>
        </View>

    earn = () => 
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
                            width: 175,
                            height: 175,
                            borderRadius: 175,
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
                                text={this.checkNumberLength(this.state.campaign.collaborator_budget, true)}
                            />
                        </View>

                        <CommonText
                            size="small"
                            text={this.props.user.country.monetary_sign.toUpperCase()}
                        />
                    </View>
                </View>
            </View>
        </View>

    incentives = () =>
        <View style={{ marginTop: 20 }}>
            <View
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
                    text={`Basic Pay`}
                />

                <CommonText
                    size="small"
                    blue={true}
                    text={`${this.props.user.country.monetary_sign.toUpperCase()} ${this.checkNumberLength(parseInt(this.state.campaign.basic_pay))}`}
                />
            </View>
            {this.state.campaign.budgets.map((td, tdIdx) =>
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
                        text={`${parseInt(td.min).toLocaleString()} - ${parseInt(td.max).toLocaleString()} ${ENGAGEMENT[td.engagement]}s`}
                    />

                    <CommonText
                        size="small"
                        blue={true}
                        text={`${this.props.user.country.monetary_sign.toUpperCase()} ${this.checkNumberLength(parseInt(td.cost))}`}
                    />
                </View>
            )}
        </View>
    
    modalAction = () => 
        <Modal 
            isVisible={this.state.modalVisible}
            onBackButtonPress={() => this.setState({ modalVisible: false })}
            onBackdropPress={() => this.setState({ modalVisible: false })}
        >
            <View style={style.modalContainer}>
                { this.state.sendingInterest ? 
                    <ActivityIndicator size="large" color="#0000ff" />    
                    :
                    <>
                        <Text style={style.modalText}>Select an action</Text>

                        { this.state.campaign.userStatus ?
                            <WhiteButton text={`This campaign is already on your list.`} />
                            :
                            <GradientButton
                                text={`Bookmark this!`}
                                onPress={() => { 
                                    this.setState({ sendingInterest: true }, () => {
                                        this.sendInterest();
                                    });
                                    
                                }}
                            />
                        }
                        
                        <GradientButton
                            text={'Join now!'}
                            onPress={() => { 
                                this.setState({ modalVisible: false })
                                this.props.navigation.navigate('CreatePost', { campaign: this.state.campaign }); 
                            }}
                        />
                    </>
                }
            </View>
        </Modal>

    sendInterest = () => {
        CampaignController.interested(
            this.state.campaign.id,
            this.state.campaign.client.id)
        .then(e => {
            CampaignController.viewDetails(
                this.props.navigation.getParam('id'), 
                this.props.navigation.getParam('type'))
            .then(response => {
                this.setState({ 
                    campaign: response.data,
                    modalVisible: false,
                    sendingInterest: false
                }, () => {
                    this.props.getMyList();
                    showMessage({
                        message: 'Success',
                        description: "Campaign added to favorites",
                        type: 'success',
                        icon: 'auto',
                    })
                });
            })
            .catch(e => {
                alert(e);
            });
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
        })
    }

    render = () => 
        <>
            <ScrollView>
                { this.modalAction() }
                
                <BackButton darkButton={true} />
                {Object.entries(this.state.campaign).length !== 0 ? 
                    
                    <View   
                        style={{
                            paddingHorizontal: theme.HORIZONTAL_PADDING,
                            marginBottom: 25
                        }}
                    >
                        <View
                            style={{
                                borderRadius: theme.BORDER_RADIUS,
                                elevation: 2,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            {/* SOCIAL MEDIA ICON */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 15,
                                            left: 15,
                                            zIndex: 9,
                                        }}
                                    >
                                        { this.state.campaign.sma.map((sma, index) => 
                                            <Image
                                                key={index}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    position: 'absolute',
                                                    left: (index * 23),
                                                }}
                                                resizeMode="contain"
                                                source={Object.values(SOCIALMEDIA)[sma.sm_id].icon}
                                            />
                                        )}
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: theme.FONT_SIZE_SMALL,
                                            color: theme.COLOR_WHITE,
                                            fontFamily: 'AvenirLTStd-Black',
                                            position: 'absolute',
                                            top: 170,
                                            left: 20,
                                            zIndex: 9
                                        }}
                                    >
                                        {this.state.campaign.client.business_name}
                                    </Text>
                            
                            {/* IMAGE */}
                                 {/* MAIN PHOTO */}
                                <Collage media={this.state.campaign.media} />
                            
                            {/* BODY */}
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.COLOR_WHITE,
                                        borderBottomLeftRadius: theme.BORDER_RADIUS,
                                        borderBottomRightRadius: theme.BORDER_RADIUS,
                                    }}
                                >
                                    <View style={{ padding: 20 }}>
                                        {/* CLIENT */}
                                            <CommonText
                                                size="medium"
                                                fontWeightBold={true}
                                                text={this.state.campaign.name}
                                            />

                                        {/* DESCRIPTION */}
                                            <View style={{ marginTop: 20 }}>
                                                <CommonText
                                                    size="small"
                                                    text={this.state.campaign.description}
                                                />
                                            </View>

                                        {/* TAGS */}
                                            { this.state.campaign.tags.length !== 0 && this.tags() }

                                        {/* PREFERRED */}
                                            {/* { this.preferred() } */}

                                        {/* EARN */}
                                            { this.earn() }

                                        {/* INCENTIVES */}
                                            { this.incentives() }
                                        
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
                                            text={(moment(this.state.campaign.deadline).format('hh:mm A - MMM. DD, YYYY')).toUpperCase()}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 30
                                        }}
                                    >
                                        <GradientButton
                                            text={'I want to collaborate'}
                                            onPress={() => { 
                                                this.setState({ modalVisible: true });
                                            }}
                                        />
                                    </View>
                                </View>
                        </View>
                    </View>
                    :
                    <ActivityIndicator size="large" color="#0000ff" />
                }
            </ScrollView>
        </>
}

const mapStateToProps = state => ({
    user: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(mapStateToProps, mapDispatchtoProps)(CampaignPage);
