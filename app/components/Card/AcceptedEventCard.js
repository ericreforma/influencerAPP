import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPlayer from 'react-native-video-controls';
import { View, Text, Image, Modal, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import { LabelText, CommonText } from '../../components/Text';
import { GradientButton, WhiteButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import style from '../../styles/component.MyCampaignCard.style';
import { CampaignController } from '../../controllers';
import { SOCIALMEDIA } from '../../config/variables';
import { CAMPAIGN } from '../../redux/actions/types.action';
import { CampaignAction } from '../../redux/actions/campaign.action';
import { URL } from '../../config/url';
import lang from '../../assets/language/home';
import { HttpRequest } from '../../services/http';
import NavigationService from '../../services/navigation';
import image from '../../assets';
import AutoHeightImage from 'react-native-auto-height-image';
import Collage from '../Collage';

class AcceptedEventCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            width: Math.round(Dimensions.get('window').width), 
            sliderIndex: 0,
            heightScaled: 0,
        };
    }
    
    cancel = () => {
      
    }

    render = () =>
        <>
            <View
                style={{
                    borderRadius: theme.BORDER_RADIUS,
                    marginBottom: 25,
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
                                    { uri: `${URL.SERVER_STORAGE}/${this.props.event.media[0].url}` }
                                }
                            />
                        </View>
                        
                        <View style={style.title}>
                            <Text style={style.titleName}>
                                { this.props.event.name }
                            </Text>
                            <Text style={style.titleClient}>
                                { this.props.event.client.business_name }
                                
                            </Text>
                            <Text style={style.titleClient}>
                                {(moment(this.props.event.created_at).format('MMM. DD, YYYY')).toUpperCase()}
                            </Text>
                        </View>
                    </View>        
                   
                {/* MAIN PHOTO */}
                   <Collage media={this.props.event.media} />

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
                                text={this.props.event.description}
                            />
                            <CommonText
                                size="small"
                                text={this.props.event.venue}
                            />
                            <Text style={style.eventAppliedJobHeader}>Jobs Applied</Text>
                            { this.props.event.jobsApplied.map((applied, index) => 
                                <View style={style.event_appliedJobs}>
                                    <Text>
                                        {applied.job_description}
                                    </Text>
                                    <Text>
                                        {this.props.user.country.monetary_sign.toUpperCase()}{applied.job.rate}/{applied.job.rate_unit}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <GradientButton
                                text={'View Event'}
                                onPress={() => { 
                                  
                                    NavigationService.navigate('Event', { id: this.props.event.id, type: this.props.type }); 
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

export default connect(mapStateToProps, mapDispatchtoProps)(AcceptedEventCard);