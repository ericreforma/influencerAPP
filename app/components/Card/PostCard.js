import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Image, View, Text, Alert } from 'react-native';
import { WhiteButton, GradientButton } from '../Button';
import { CommonText } from '../../components/Text';
import style from '../../styles/component.PostCard.style';
import { URL } from '../../config/url';
import { HttpRequest } from '../../services/http';
import NavigationService from '../../services/navigation';
import { CAMPAIGN } from '../../redux/actions/types.action';

const PostCard = props => {
    const dispatch = useDispatch();

    const cancel = useCallback(() => {
        HttpRequest.get(URL.SOCIALMEDIA.POST.CANCEL, { post_id: props.post.id })
        .then(response => {
            dispatch({ type: CAMPAIGN.MYLIST.SUCCESS, myList: response.data });
            NavigationService.navigate('MyCampaign');
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
        });
    }, [props.post.id]);
    
    return (
        <View style={style.container} >
            <View style={style.imageContainer} >
                <Image
                    style={style.image}
                    resizeMode="cover"
                    source={{ 
                        uri: `${URL.SERVER_STORAGE}/${props.post.media.url}`
                    }}
                />
            </View>
    
            <View style={style.body}>
                <View style={{ marginTop: 15 }} >
                    <CommonText
                        size="small"
                        text={props.post.caption}
                    />
                </View>

                <View style={{ marginTop: 15 }} >
                    <CommonText
                        size="small"
                        text={props.post.tags}
                    />
                </View>
                
                <View style={style.statusContainer}>
                    <Text style={style.status}>STATUS <Text style={style.statusText}>{ props.post.status }</Text></Text>
                </View>
                
                <GradientButton
                    text={'Edit'}
                    style={style.cancelButton}
                    onPress={() => 
                        NavigationService.navigate('EditPost', { post: props.post, campaign: props.campaign })
                    }
                />
                <WhiteButton 
                    text={'Cancel Post'}
                    style={style.cancelButton}
                    onPress={() =>{
                        Alert.alert(
                            'Confirm remove',
                            'Are you sure you wanted to cancel this post?',
                            [
                                {
                                    text: 'NO',
                                },
                                { text: 'YES', 
                                    onPress: cancel
                                },
                            ],
                            { cancelable: true },
                          );
                    }}
                />
            </View>
        </View>
    );
};

export default PostCard;
