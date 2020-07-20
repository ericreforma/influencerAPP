import React from 'react';
import moment from 'moment';
import { View, Image, Text, Linking } from 'react-native';
import Video from 'react-native-video';
import { GradientButton } from '../../components/Button';
import style from '../../styles/component.InstagramCard.style';

const InstagramCard = props => {
    const header = () => 
        <View style={style.header}>
            <Image 
                style={style.profile_picture}
                resizeMode='cover'
                source={{ uri: props.page.page_profile_picture }} 
            />
            <View style={{ justifyContent: 'center'}}>
                <Text style={style.page_name}>{ props.page.page_username }</Text>
            </View>
        </View>

    const media = () => {
        switch(props.post.media_type){
            case 'IMAGE':
                return (
                    <Image 
                        style={style.post_mainImage}
                        resizeMode='cover'
                        source={{ uri: props.post.media_url }} 
                    />
                );
            case 'VIDEO':
                return (
                    <Video 
                        style={{
                            aspectRatio: 1,
                            width: "100%"
                        }}
                        bufferConfig={{
                            minBufferMs: 15000,
                            maxBufferMs: 50000,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }}
                        resizeMode='contain'
                        controls={true}
                        source={{ uri: props.post.media_url }} 
                    />
                );
            
        }
    }   
    
    const caption = () => {
        const caption = props.post.caption;
        return (
            <Text style={style.post_message}>
                { caption }
            </Text>
        );
    }

    const buttons = () => 
        <View style={{ padding: 10 }}>
            <GradientButton 
                text={'View Post'}
                onPress={() => { 
                    Linking.openURL(props.post.permalink)
                }}
            />
            <GradientButton 
                text={'Select'}
                onPress={() => { props.onSent(); }}
            />
        </View>

    const engagements = () => {
        const engagement = [
            { type: 'Likes', count: props.post.like_count },
            { type: 'Comments', count: props.post.comments_count },
        ];

        return (
            <View style={style.post_engagement_container}>
                { engagement.map((eng, index) => 
                    <View style={style.post_engagement_content} key={`engagements${index}`}>
                        <Text style={style.post_engagement_count}>{ eng.count }</Text>
                        <Text>{ eng.type }</Text>
                    </View>
                )}

            </View>
        )
    }

    const displayPhoto = images => {
        switch (images.length) {
            case 2:
                return doublePhoto(images);
            case 3:
                return triplePhoto(images);
            case 4:
                return multiPhoto(images);
            default:
                return multiPhoto(images);
        }
    }

    const doublePhoto = images => 
        <View
            style={{
                position: 'relative',
                flexDirection: 'row',
                alignSelf: 'stretch'
            }}
        >
            { images.map((img, index) => 
                <Image
                    style={{
                        height: 200,
                        width: '50%'
                    }}
                    resizeMode="cover"
                    source={{ uri: img.media.image.src }}
                    key={`fbalbum${index}`}
                />
            )}
        </View>

    const triplePhoto = images => 
        <View
            style={{
                flexDirection: 'row',
                alignSelf: 'stretch',
                position: 'relative'
            }}
        >
            <Image
                style={{
                    height: 200,
                    width: '50%'
                }}
                resizeMode="cover"
                source={{ uri: images[0].media.image.src }}
            />
            <View
                style={{
                    height: 200,
                    width: '50%',
                    flexDirection: 'column'
                }}
            >
                <Image
                    style={{
                        height: 100,
                        alignSelf: 'stretch'
                    }}
                    resizeMode="cover"
                    source={{ 
                        uri: images[1].media.image.src
                    }}
                />
                <Image
                    style={{
                        height: 100,
                        alignSelf: 'stretch'
                    }}
                    resizeMode="cover"
                    source={{ 
                        uri: images[2].media.image.src
                    }}
                />
            </View>
        </View>

    const multiPhoto = images =>
        <View
            style={{
                position: 'relative',
                flexDirection: 'column',
                alignSelf: 'stretch',
                height: 200
            }}
        >
            <View 
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    height: 100
                }}
            >
                    <Image
                        style={{
                            height: 100,
                            width: '50%'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: images[0].media.image.src
                        }}
                    />
                    <Image
                        style={{
                            height: 100,
                            width: '50%'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: images[1].media.image.src
                        }}
                    />
            </View>
            <View 
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    height: 100
                }}
            >
                    <Image
                        style={{
                            height: 100,
                            width: '50%'
                        }}
                        resizeMode="cover"
                        source={{ 
                            uri: images[2].media.image.src
                        }}
                    />
                <View
                    style={{
                        height: 100,
                        width: '50%',
                        position: 'relative'
                    }}
                >
                        <Image
                            style={{
                                height: 100,
                                alignSelf: 'stretch'
                            }}
                            resizeMode="cover"
                            source={{ 
                                uri: images[3].media.image.src
                            }}
                        />
                    
                        
                        { images.length > 4 &&
                            <View
                                style={{
                                    height: 100,
                                    alignSelf: 'stretch',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 55
                                    }}
                                    selectable
                                >{`+${images.length - 4}`}</Text>
                            </View>
                        }
                </View>
             </View>
        </View>

    
    return (
        <View style={style.container}>
            { header() }
            { caption() }
            { media() }
            { engagements() }
            { buttons() }
        </View>
    );
};

export default InstagramCard;
