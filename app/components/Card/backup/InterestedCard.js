import React, { useCallback } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Image, View, Text, Alert } from 'react-native';
import { GradientButton, WhiteButton } from '../Button';
import style from '../../styles/component.MyCampaignCard.style';
import { CampaignController } from '../../controllers';
import { CAMPAIGN } from '../../redux/actions/types.action';
import { URL } from '../../config/url';
import { SOCIALMEDIA } from '../../config/variables';
import image from '../../assets';
import NavigationService from '../../services/navigation';
import { HttpRequest } from '../../services/http';

const InterestedCard = props => {
    const parent = 
        props.campaignType === 'SocialMedia' ? 
        props.campaign.parent_campaign : 
        props.campaign.parent_event;

    const dispatch = useDispatch();

    const refresh = useCallback(() => {
        CampaignController.uninterested(props.campaign.id).then(() => {
            HttpRequest.get(URL.CAMPAIGN.LIST)
            .then(response => {
                dispatch({ type: CAMPAIGN.MYLIST.SUCCESS, myList: response.data });
                
            })
            .catch(e => {
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data.errors);
                console.log(e.message);
                console.log(e.request);
            });
        }).catch(e => {
            console.log('Error removing from list');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }, [dispatch]);

    const socialMedia = () => 
        <View style={style.container}>
            {/* HEADER */}
                <View style={style.header}> 
                    <View style={style.photoContainer}>
                        <Image
                            resizeMode="contain"
                            style={style.photo}
                            source={
                                props.campaign.client.media_id === 0 ?
                                image.male_avatar :
                                { uri: `${URL.SERVER_STORAGE}/${props.campaign.client.media.url}` }
                            }
                        />
                    </View>
                    
                    <View style={style.title}>
                        <Text style={style.titleName}>
                            { parent.name }
                        </Text>
                        <Text style={style.titleClient}>
                            { props.campaign.client.business_name }
                            
                        </Text>
                        <Text style={style.titleClient}>
                            {(moment(parent.created_at).format('MMM. DD, YYYY')).toUpperCase()}
                        </Text>
                    </View>
                
                </View>
                <View style={style.socialMediaWrapper}>
                    <Text style={style.platformTitle}>Platforms</Text>
                    <View style={style.socialMediaContainer}>
                        { parent.sma.map((sma, index) => 
                            <Image 
                                style={style.socialMedia}
                                key={index}
                                resizeMode='contain'
                                source={Object.values(SOCIALMEDIA)[sma.sm_id].icon_colored}
                            />
                        )}
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.deadlineContainer}>
                        <Text style={style.deadlineCaption}>Deadline</Text>
                        <Text style={style.deadline}>{(moment(parent.deadline).format('hh:mm A - MMM. DD, YYYY')).toUpperCase()}</Text>
                    </View>
                </View>
               
                <GradientButton 
                    text='View Details'
                    style={style.button}
                    onPress={() => {
                        NavigationService.navigate('Campaign', { id: parent.id, type: props.campaign.type }); 
                    }}
                />

                <WhiteButton
                    text='Remove'
                    style={style.button}
                    onPress={() => {
                        Alert.alert(
                            'Confirm remove',
                            `Remove ${parent.name} from your interested campaigns?`,
                            [
                                {
                                    text: 'NO',
                                },
                                { text: 'YES', 
                                    onPress: refresh
                                },
                            ],
                            { cancelable: true },
                          );
                    }}
                />
        </View>
    
    const event = () =>
        <View style={style.container}>
            {/* HEADER */}
                    <View style={style.header}> 
                        {/* EVENT */}
                        <View style={style.title}>
                            <Text style={style.titleName}>
                                {props.campaign.event.name }
                            </Text>
                        </View>
                    </View>
            {/* BODY */}
                <View style={style.body}>
                    <Text style={style.status}>
                        Status
                        <Text style={style.statusText}> {
                            props.campaign.status 
                        }</Text>
                    </Text>

                    <View style={style.deadlineContainer}>
                        <Text style={style.deadlineCaption}>Applying for</Text>
                        <Text style={style.deadline}>{props.campaign.job.job_description}</Text>
                    </View>
                </View>
                <GradientButton 
                    text='View Dashboard'
                    style={style.button}
                    onPress={() => {
                        Alert.alert('More interesting features coming soon!');
                    }}
                />
        </View>
                    
    return (
        props.campaign.type === 1 ? socialMedia() : event()
    );
}

export default InterestedCard;
