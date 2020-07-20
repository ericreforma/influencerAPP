import React, { Component } from 'react';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import AutoHeightImage from 'react-native-auto-height-image';
import { Image, View, Modal, TouchableOpacity, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { URL } from '../config/url';
import style from '../styles/component.Collage.style';
import image from '../assets';
import VideoAutoHeight from './VideoAutoHeight';

export default class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            width: Math.round(Dimensions.get('window').width), 
            heightScaled: 0,
            carouselIndex: 0
        }
    }

    media = media => 
        media.type == 0 ? 
        <AutoHeightImage
            width={ this.state.width }
            source={{  uri: `${URL.SERVER_STORAGE}/${media.url}` }}
        /> :
            <VideoAutoHeight media={media} />
    
    collageMedia = (media, customStyle) => {
        return (media.type === 0 ?
        <Image style={customStyle}
            resizeMode="cover"
            source={{ 
                uri: `${URL.SERVER_STORAGE}/${media.url_thumb}`
            }}
        /> 
        :
        <View style={[style.collageVideoContainer, customStyle]}>
            <Image style={style.collageVideoButton}
                resizeMode="cover"
                source={image.videointerface}
            /> 
            <Video source={{ uri: `${URL.SERVER_STORAGE}/${media.url_thumb}` }}   // Can be a URL or a local file.
                ref={(ref) => { this.player = ref }}                                      // Store reference
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
            />
        </View>

        )
    }

    displayPhoto = () => {
        switch(this.props.media.length) {
            case 1:
                return this.singlePhoto();
                break;
            case 2:
                return this.doublePhoto();
                break;
            case 3:
                return this.triplePhoto();
                break;
            case 4:
                return this.multiPhoto();
                break;
            default:
                return this.multiPhoto();
                break;
        }
    }

    singlePhoto = () =>
        <TouchableOpacity
            onPress={ () => {
                this.setState({ isModalVisible: true });
            }}
        >
                { this.collageMedia(this.props.media[0], style.mediaFull)}
        </TouchableOpacity>
    
    doublePhoto = () => 
        <View style={style.rowContainer}>
            { this.props.media.map((img, index) => 
                <TouchableOpacity
                    key={index}
                    style={style.columnHalf}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    { this.collageMedia(this.props.media[index], style.imageHalf)}
                </TouchableOpacity>
            )}
        </View>

    triplePhoto = () => 
        <View style={style.rowContainer}>
            <TouchableOpacity
                style={style.columnHalf}
                onPress={ () => {
                    this.setState({ isModalVisible: true });
                }}
            >
                { this.collageMedia(this.props.media[0], style.imageHalf)}
            </TouchableOpacity>
            <View style={[style.columnHalf, { flexDirection: 'column' }]}>
                <TouchableOpacity
                    style={style.quarter}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    { this.collageMedia(this.props.media[1], style.quarterImage)}
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.quarter}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    { this.collageMedia(this.props.media[2], style.quarterImage)}
                </TouchableOpacity>
                
            </View>
        </View>

    multiPhoto = () =>
        <View style={style.multiContainer}>
            <View style={style.multiContainerRow}>
                <TouchableOpacity
                    style={style.multiContainerQuarter}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    { this.collageMedia(this.props.media[0], style.multiContainerQuarterImage)}
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={style.multiContainerQuarter}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    { this.collageMedia(this.props.media[1], style.multiContainerQuarterImage)}
                </TouchableOpacity>
            </View>
            <View style={style.multiContainerRow}>
                <TouchableOpacity
                    style={style.multiContainerQuarter}
                    onPress={ () => {
                        this.setState({ isModalVisible: true });
                    }}
                >
                    
                    { this.collageMedia(this.props.media[2], style.multiContainerQuarterImage)}
                </TouchableOpacity>
                
                <View style={style.multiContainerQuarter}>
                    <TouchableOpacity
                        style={style.multiContainerQuarterImage}
                        onPress={ () => {
                            this.setState({ isModalVisible: true });
                        }}
                    >
                        { this.collageMedia(this.props.media[3], style.multiContainerQuarterImage)}
                        { this.props.media.length > 4 &&
                            <View style={style.multiPlus} >
                                <Text style={style.multiPlusText} >
                                    {`+${this.props.media.length - 4}`}
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                
             </View>
        </View>

    previewModal = () =>
        <Modal 
            animationType={'fade'}
            visible={this.state.isModalVisible}
            onRequestClose={() => { 
                this.setState({ isModalVisible: false }); 
            }}
        >
            <View
                style={{ 
                    backgroundColor: '#000',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.props.media}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    renderItem={({ item }) => 
                        <View 
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            { this.media(item) }
                        </View>
                    }
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width}
                    containerCustomStyle={{ 
                        overflow: 'visible',
                        
                    }}
                    onSnapToItem={index => {
                        this.setState({ carouselIndex: index })}
                    }
                />
                <View style={style.bulletContainer}>
                        { this.props.media.map((img, index) => 
                           <Text 
                                key={`navButton${index}`}
                                style={index == this.state.carouselIndex ? style.navBulletCurrent : style.navBullet }
                            >
                                •
                            </Text>
                        )}
                </View>
            </View>
        </Modal>

    render = () => 
        <>
            { this.previewModal() }
            <View style={style.container}>
                { this.displayPhoto() }
            </View>
        </>

}

