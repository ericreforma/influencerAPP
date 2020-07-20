import React, { Component } from 'react';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { GradientButton, WhiteButton } from '../components/Button';
import { PostCard } from '../components/Card';
import { Title } from '../components/Header';
import image from '../assets';
import { URL } from '../config/url';
import style from '../styles/page.MyPostPage.style';
import NavigationService from '../services/navigation';

export default class MyPostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaign: this.props.navigation.getParam('campaign'),
            width: Math.round(Dimensions.get('window').width), 
        };
    }

    componentDidMount() {
    }
    
    campaignInfo = () => 
        <View style={style.header}> 
            <View style={style.photoContainer}>
                <Image
                    resizeMode="contain"
                    style={style.photo}
                    source={
                        this.state.campaign.client.media_id === 0 ?
                        image.male_avatar :
                        { uri: `${URL.SERVER_STORAGE}/${this.state.campaign.client.media.url}` }
                    }
                />
            </View>
            
            <View style={style.title}>
                <Text style={style.titleName}>
                    { this.state.campaign.parent_campaign.name }
                </Text>
                <Text style={style.titleClient}>
                    { this.state.campaign.client.business_name }
                    
                </Text>
                <Text style={style.titleClient}>
                    {(moment(this.state.campaign.created_at).format('MMM. DD, YYYY')).toUpperCase()}
                </Text>
            </View>
            
           
        </View>
    
    render = () => 
        <View style={{ flex: 1 }}>
            <View style={style.scrollContainer}>
                <ScrollView style={style.scrollView}>
                    <Title title={'Posts'} />
                        { this.campaignInfo() }
                    <Carousel
                        ref={(c) => { this.carousel = c; }}
                        data={this.state.campaign.posts}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        renderItem={({ item }) => <PostCard post={item} campaign={this.state.campaign.parent_campaign} />}
                        sliderWidth={this.state.width}
                        itemWidth={this.state.width - 50}
                        containerCustomStyle={{ overflow: 'visible' }}
                    />
                </ScrollView>
                
            </View>
            
            <View style={style.buttonContainer}>
                <GradientButton 
                    text='Add More Post'
                    style={style.button}
                    onPress={() => {
                        NavigationService.navigate('CreatePost', { campaign: this.state.campaign.parent_campaign });
                    }}
                />
            </View>
            
        </View>
}