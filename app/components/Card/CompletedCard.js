import React from 'react';
import moment from 'moment';
import { Image, View, Text, Alert } from 'react-native';
import { GradientButton } from '../Button';
import style from '../../styles/component.MyCampaignCard.style';
import { URL } from '../../config/url';
import { SOCIALMEDIA } from '../../config/variables';
import NavigationService from '../../services/navigation';

const InterestedCard = props => {
    const parent = props.campaign.type === 1 ? 
        props.campaign.parent_campaign : 
        props.campaign.parent_event;

    const socialMedia = () => 
        <View style={style.container}>
            {/* HEADER */}
                <View style={style.header}> 
                    <View style={style.photoContainer}>
                        <Image
                            resizeMode="contain"
                            style={style.photo}
                            source={{ 
                                uri: `${URL.SERVER_STORAGE}/${this.props.campaign.media.url}`
                            }}
                        />
                    </View>
                    
                    <View style={style.title}>
                        <Text style={style.titleName}>
                            { parent.name }
                        </Text>
                        <Text style={style.titleDate}>{(moment(parent.created_at).format('MMM. DD, YYYY')).toUpperCase()}</Text>
                    </View>
                
                </View>

                <View style={style.body}>
                    <Text style={style.status}>
                        Status
                        <Text style={style.statusText}> { props.campaign.status }</Text>
                    </Text>

                    <View style={style.deadlineContainer}>
                        <Text style={style.deadlineCaption}>Deadline</Text>
                        <Text style={style.deadline}>{(moment(parent.deadline).format('hh:mm A - MMM. DD, YYYY')).toUpperCase()}</Text>
                    </View>
                </View>
               
                <GradientButton 
                    text='View Details'
                    style={style.button}
                    onPress={() => {
                            NavigationService.navigate('Dashboard', { campaign: props.campaign });
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
