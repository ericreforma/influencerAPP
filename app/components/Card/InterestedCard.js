import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Modal, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import { LabelText, CommonText } from '../../components/Text';
import { GradientButton, WhiteButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import { CampaignController } from '../../controllers';
import { SOCIALMEDIA } from '../../config/variables';
import { CAMPAIGN } from '../../redux/actions/types.action';
import { CampaignAction } from '../../redux/actions/campaign.action';
import { URL } from '../../config/url';
import lang from '../../assets/language/home';
import { HttpRequest } from '../../services/http';
import NavigationService from '../../services/navigation';
import AutoHeightImage from 'react-native-auto-height-image';
import Collage from '../Collage';

class InterestedCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            width: Math.round(Dimensions.get('window').width), 
            sliderIndex: 0
        };
    }

    uninterested = () => {
        CampaignController.uninterested(this.props.userCampaign.id).then(() => {
            this.props.getMyList();
        }).catch(e => {
            console.log('Error removing from list');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }
    
    render = () =>
        <>
            <View
                style={{
                    borderRadius: theme.BORDER_RADIUS,
                    marginBottom: 5,
                    elevation: 2,
                    alignSelf: 'stretch',
                    margin: 25,
                    overflow: 'hidden'
                }}
            >
                {/* SOCIAL MEDIA ICONS */}
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'stretch',
                            height: 200,
                            maxHeight: 200,
                            padding: 20,
                            paddingBottom: 15,
                            justifyContent: 'space-between',
                            zIndex: 3
                        }}
                    >   
                            { this.props.type === 1 && this.props.campaign.sma.map((sma, index) => 
                                <Image
                                    key={index}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        position: 'absolute',
                                        left: (index * 23) + 15,
                                        top: 15
                                    }}
                                    resizeMode="contain"
                                    source={Object.values(SOCIALMEDIA)[sma.sm_id].icon}
                                />
                            )}
                            
                        <Text
                            style={{
                                fontSize: theme.FONT_SIZE_SMALL,
                                color: theme.COLOR_WHITE,
                                fontFamily: 'AvenirLTStd-Black',
                                position: 'absolute',
                                bottom: 20,
                                left: 20,
                                width: 200
                            }}
                        >
                            {this.props.campaign.client.business_name}
                        </Text>
                    </View>

                {/* MAIN PHOTO */}
                    <Collage media={this.props.campaign.media} />

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
                        <CommonText
                            size="medium"
                            fontWeightBold={true}
                            text={this.props.campaign.name}
                        />

                        <View
                            style={{
                                marginTop: 15,
                                height: 35
                            }}
                        >
                            <CommonText
                                size="small"
                                text={this.props.campaign.description.length <= 50 ? 
                                    this.props.campaign.description : 
                                    `${this.props.campaign.description.substr(0, 50)}...`
                                }
                            />
                        </View>

                        <View
                            style={{
                                marginVertical: 20,
                            }}
                        >
                            <GradientButton
                                text={lang.viewDetailsText}
                                onPress={() => { 
                                    if (this.props.type === 1) {
                                        NavigationService.navigate('Campaign', { id: this.props.campaign.id, type: this.props.type }); 
                                    } else {
                                        NavigationService.navigate('Event', { id: this.props.campaign.id, type: this.props.type }); 
                                    }
                                
                                }}
                            />
                            <WhiteButton
                                text='Unbookmark'
                                onPress={() => {
                                    Alert.alert(
                                        'Confirm remove',
                                        `Remove ${this.props.campaign.name} from your bookmark list?`,
                                        [
                                            {
                                                text: 'NO',
                                            },
                                            { text: 'YES', 
                                                onPress: () => this.uninterested()
                                            },
                                        ],
                                        { cancelable: true },
                                    );
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            
                            
                                <View
                                    style={{
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <CommonText
                                        size="small"
                                        text={this.props.type === 1 ? 'Deadline' : 'Event will start on'}
                                    />

                                    <LabelText
                                        size="medium"
                                        blue={true}
                                        text={this.props.type === 1 ?
                                            (moment(this.props.campaign.deadline).format('MMM. DD, YYYY')).toUpperCase() :
                                            (moment(this.props.campaign.schedule[0].date_from).format('MMM. DD, YYYY')).toUpperCase()
                                        }
                                    />
                                </View>
                                
                                { this.props.type === 1 &&
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
                                            text={`${this.props.user.country.monetary_sign.toUpperCase()} ${parseInt(this.props.campaign.collaborator_budget).toLocaleString()}`
                                            }
                                        />
                                    </View>
                                 }


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

export default connect(mapStateToProps, mapDispatchtoProps)(InterestedCard);