import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Modal, 
         Dimensions, TouchableOpacity, Alert,
        TextInput, Clipboard } from 'react-native';
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

class ActiveCard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
            islinkModalVisible: false,
            width: Math.round(Dimensions.get('window').width), 
            sliderIndex: 0,
            clipboard: '',
            
        };
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
                    <Collage media={this.props.post.media} />

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
                                text={'View Campaign'}
                                onPress={() => { 
                                    if (this.props.type === 1) {
                                        NavigationService.navigate('Campaign', { id: this.props.post.campaign.id, type: this.props.type  }); 
                                    } else {
                                        NavigationService.navigate('Event', { id: this.props.post.campaign.id, type: this.props.type }); 
                                    }
                                
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

export default connect(mapStateToProps, mapDispatchtoProps)(ActiveCard);