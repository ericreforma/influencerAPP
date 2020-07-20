import React from 'react';
import moment from 'moment';
import { Image, View, Text, Alert, TouchableOpacity } from 'react-native';
import { GradientButton } from '../Button';
import GradientContainer from '../GradientContainer';
import { CampaignController } from '../../controllers';
import style from '../../styles/component.MyCampaignCard.style';
import { URL } from '../../config/url';
import image from '../../assets';
import NavigationService from '../../services/navigation';

const PendingCard = props => {

    const parent = props.campaign.type === 1 ? 
        props.campaign.parent_campaign : 
        props.campaign.parent_event;

    const openChat = () => 
        <View style={style.messageIcon_container}>
            <TouchableOpacity
            onPress={() => {
                console.log(props.campaign);
                CampaignController.chatSession(
                    props.campaign.type,
                    parent.id,
                    props.campaign.client.id,
                ).then(response => {
                    console.log('chatsession', response.data);
                    NavigationService.navigate('Chat', { chatSession: response.data });
                }).catch(e => {
                    console.log(e);
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                });
            }}
            >
                <Image
                    resizeMode="contain"
                    style={style.messageIcon}
                    source={image.icon.mail_icon}
                />
            </TouchableOpacity>
        </View>


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
                <Text style={style.platformTitle}>Submitted Posts</Text>
                <Text style={style.postCounter}>
                    { props.campaign.posts.length }
                </Text>
            </View>
            <View style={style.body}>
                <View style={style.deadlineContainer}>
                    <Text style={style.deadlineCaption}>Deadline</Text>
                    <Text style={style.deadline}>{(moment(parent.deadline).format('hh:mm A - MMM. DD, YYYY')).toUpperCase()}</Text>
                </View>
            </View>
            
            <GradientButton 
                text='View Campaign Details'
                style={style.button}
                onPress={() => {
                    NavigationService.navigate('Campaign', { id: parent.id, type: props.campaign.type }); 
                }}
            />
            
            <GradientButton 
                text='View Posts'
                style={style.button}
                onPress={() => {
                    NavigationService.navigate('MyPost', { campaign: props.campaign }); 
                }}
            />
        </View>
    
    const event = () =>
        <View style={style.container}>
            {/* HEADER */}
                <GradientContainer style={[style.header, style.eventHeader]}> 
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
                            { props.campaign.event.name }
                        </Text>
                        <Text style={style.titleClient}>
                            { props.campaign.client.business_name }
                            
                        </Text>
                        <Text style={style.titleClient}>
                            {(moment(props.campaign.event.created_at).format('MMM. DD, YYYY')).toUpperCase()}
                        </Text>
                    </View>
                    {/* { openChat() } */}
                </GradientContainer>
            {/* BODY */}
                <View style={style.body}>
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

export default PendingCard;
