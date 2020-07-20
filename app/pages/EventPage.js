import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScrollView, Dimensions, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';
import { CampaignController,  UserController } from '../controllers';
import { GradientButton, BackButton, WhiteButton } from '../components/Button';
import { URL } from '../config/url';
import { LabelText, CommonText } from '../components/Text';
import image from '../assets';
import theme from '../styles/theme.style';
import lang from '../assets/language/campaign';
import Collage from '../components/Collage';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
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

        CampaignController.viewDetails(navigation.getParam('id'), 2)
        .then(response => {
            const campaign = response.data;

            if(this.props.user.country.code === 'PH') {
                const xRate =  this.state.exchangeRate;

                campaign.basic_pay = campaign.basic_pay * xRate;
                campaign.collaborator_budget = parseFloat(campaign.collaborator_budget * this.state.exchangeRate)
                
                const jobs = campaign.jobs;
                jobs.forEach(function(job, index){
                    const oldRate = this[index].rate;
                    console.log( this[index].rate, xRate)
                    this[index].rate = oldRate * xRate;
                }, jobs);

                campaign.jobs = jobs;
            }

            this.setState({ campaign: response.data });
            console.log(response.data)
        })
        .catch(e => {
            alert(e);
        });
    }   

    checkNumberLength = (numbers, uppercase) => {
        const numberString = numbers.toString();

        if (numberString.length > 6) {
            numbers = numberString.substr(0, numberString.length - 6) + 'M';
        } else if (numberString.length > 3) {
            numbers = numberString.substr(0, numberString.length - 3) + (uppercase ? 'K' : 'k');
        }

        return numbers;
    }

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
                    text='Jobs Available'
                />
            </View>

            <View >
                {this.state.campaign.jobs.map((td, tdIdx) =>
                    <View
                        key={tdIdx}
                        style={{
                            borderRadius: 30,
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            marginVertical: 7,
                            backgroundColor: theme.COLOR_WHITE,
                            elevation: 3,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <CommonText
                            size="small"
                            text={td.job_description}
                        />

                        <CommonText
                            size="small"
                            blue={true}
                            text={`${this.props.user.country.monetary_sign.toUpperCase()}${parseInt(td.rate).toLocaleString()} / ${td.rate_unit.toUpperCase()}`}
                        />
                    </View>
                )}
            </View>
        </View>
    
    render = () => 
        <>
            <ScrollView>
                <BackButton darkButton={true} />

                {Object.entries(this.state.campaign).length !== 0 ? 
                    
                    <View   
                        style={{
                            paddingHorizontal: theme.HORIZONTAL_PADDING,
                        }}
                    >
                        <View
                            style={{
                                borderRadius: theme.BORDER_RADIUS,
                                elevation: 2,
                                overflow: 'hidden'
                            }}
                        >
                            {/* IMAGE */}
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
                                    <View
                                        style={{
                                            padding: 20
                                        }}
                                    >
                                        {/* CLIENT */}
                                            <CommonText
                                                size="medium"
                                                fontWeightBold={true}
                                                text={this.state.campaign.name}
                                            />

                                        {/* CLIENT */}
                                            <CommonText
                                                size="small"
                                                fontWeightBold={true}
                                                text={this.state.campaign.client.business_name}
                                            />

                                        {/* DESCRIPTION */}
                                            <View style={{ marginTop: 20 }}>
                                                <CommonText
                                                    size="small"
                                                    text={this.state.campaign.description}
                                                />
                                            </View>


                                        {/* PREFERRED */}
                                            { this.preferred() }

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
                                            text="Venue"
                                        />
                                        <LabelText
                                            size="medium"
                                            blue={true}
                                            text={this.state.campaign.venue}
                                        />

                                        <LabelText
                                            size="medium"
                                            blue={true}
                                            text={`${moment(this.state.campaign.schedule[0].date_from).format('MMM. DD, Y')}`}
                                        />
                                        
                                    </View>

                                    <View
                                        style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 30
                                        }}
                                    >   
                                        { this.state.campaign.applicationStatus.length == 0 ?
                                        
                                            <GradientButton
                                                text={'I want to apply'}
                                                onPress={
                                                    () => { 
                                                        this.props.navigation.navigate('CreateApplication', 
                                                        { campaign: this.state.campaign });
                                                    }
                                                }
                                            /> :
                                            <WhiteButton text={`You have a pending application for this event`} />
                                        }
                                        
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

export default connect(mapStateToProps)(EventPage);