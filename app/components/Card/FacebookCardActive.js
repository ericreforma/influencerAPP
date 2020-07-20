import React, { Component } from 'react';
import moment from 'moment';
import VideoPlayer from 'react-native-video-controls';
import { View, Image, Text, Linking, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { GradientButton } from '../../components/Button';
import { SocialMediaController } from '../../controllers';

import style from '../../styles/component.FacebookCard.style';

export default class FacebookCardActive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            heightScaled: 0,
            width: Dimensions.get('window').width
        };
    }

    componentDidMount() {
        SocialMediaController.facebook.getPost(this.props.page, this.props.post_id, post => {
            this.setState({ post });
        }, (error) => {
            console.log(error);
        });
    }

    header = () => 
        <View style={style.header}>
            <Image
                style={style.profile_picture}
                resizeMode='cover'
                source={{ uri: this.props.page.page_profile_picture }} 
            />
            <View>
                <Text style={style.page_name}>{ this.props.page.page_name }</Text>
                <Text style={style.page_date}>{ moment(this.state.post.created_time).format('MMMM D') }</Text>
            </View>
        </View>

    media = () => {
        const attachment = this.state.post.attachments.data[0];
        switch (attachment.type) {
            case 'photo':
                return (
                    <Image 
                        style={style.post_mainImage}
                        resizeMode='cover'
                        source={{ uri: attachment.media.image.src }} 
                    />
                );
            case 'video':
            case 'video_inline':
            case 'video_autoplay':
                return (
                    <VideoPlayer
                        source={{ uri: attachment.media.source }}
                        navigator={ this.props.navigator }
                        controlTimeout={3000}
                        showOnStart={false}
                        paused={true}
                        videoStyle={{ 
                            width: "100%",
                            height: this.state.heightScaled 
                        }}
                        resizeMode='contain'
                        disableBack
                        style={{ 
                            width: "100%",
                            height: this.state.heightScaled 
                        }}
                        onLoad={response => {
                            const { width, height } = response.naturalSize;
                            const heightScaled = height * ((this.state.width - 40)/ width);
                        
                            this.setState({
                                heightScaled,
                                videoPaused: false,
                            });
                        }}
                    />
                    
                );
            case 'album':
                return this.displayPhoto(this.state.post.attachments.data[0].subattachments.data);
        }
    }   
    
    caption = () => {
        const message = this.state.post.message;
        return (
            <Text style={style.post_message}>
                { message }
            </Text>
        );
    }

    buttons = () => 
        <View style={{ padding: 10 }}>
            <GradientButton 
                text={'View Post'}
                onPress={() => { 
                    Linking.openURL(this.state.post.permalink_url);
                }}
            />
            { this.props.hasSelect && 
                <GradientButton 
                    text={'Select'}
                    onPress={() => { 
                        this.props.onSelect()
                    }}
                />
            }
            
        </View>

    engagements = () => {
        const engagement = [
            { type: 'Likes', count: this.state.post.likes.summary.total_count },
            { type: 'Comments', count: this.state.post.comments.summary.total_count },
            { type: 'Shares', count: this.state.post.hasOwnProperty('shares') ? this.state.post.shares.count : 0 },
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

    displayPhoto = images => {
        switch (images.length) {
            case 2:
                return this.doublePhoto(images);
            case 3:
                return this.triplePhoto(images);
            case 4:
                return this.multiPhoto(images);
            default:
                return this.multiPhoto(images);
        }
    }

    doublePhoto = images => 
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

    triplePhoto = images => 
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

    multiPhoto = images =>
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

    
    render = () => 
        <>
            { this.state.post && 
                <View style={style.container}>
                    { this.header() }
                    { this.caption() }
                    { this.media() }
                    { this.engagements() }
                    { this.buttons() }


                </View>
            }
        </>
}

