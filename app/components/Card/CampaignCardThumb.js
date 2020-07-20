import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import NavigationService from '../../services/navigation';
import { LabelText } from '../Text';
import { SOCIALMEDIA } from '../../config/variables';
import { URL } from '../../config/url';
import style from '../../styles/component.CampaignCardThumb.style';

const CampaignCardThumb = props => (
    <TouchableOpacity
        onPress={() => { 
            NavigationService.navigate('Campaign', 
            { 
                id: props.campaign.id,
                type: 1 
            }); 
        }}
        style={style.componentWrapper}
    >   
        <View style={style.smIconContainer}>
            { props.campaign.sma.map((sma, index) => 
                    <Image
                        key={index}
                        style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            left: (index * 23),
                            top: 3
                        }}
                        resizeMode="contain"
                        source={Object.values(SOCIALMEDIA)[sma.sm_id].icon}
                    />
                )}
        </View>

        <View style={style.mainImageContainer}>
            <Image
                style={style.mainImage}
                resizeMode="cover"
                source={{ 
                    uri: `${URL.SERVER_STORAGE}/${props.campaign.media[0].url}`
                }}
            />
        </View>

        <View style={style.nameContainer}>
            <LabelText
                size="medium"
                text={props.campaign.name.length <= 12 ? 
                    props.campaign.name : 
                    `${props.campaign.name.substr(0, 12)}...`
                }
            />

            <View style={{ marginTop: 5 }}>  
                <Text>
                    View Details
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default CampaignCardThumb;
