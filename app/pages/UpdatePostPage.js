import React, { Component } from 'react';
import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import style from '../styles/page.UpdatePost.style';
import { BackButton, GradientButton, WhiteButton } from '../components/Button';
import { CampaignAction } from '../redux/actions/campaign.action';
import ImagePicker from 'react-native-image-picker';
import image from '../assets';
import { CommonText } from '../components/Text';
import { HttpForm } from '../services/http';
import { URL } from '../config/url';
import { ENGAGEMENT } from '../config/variables';

class UpdatePostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPhotoChanged: 0,
            hasImage: false,
            isSaving: false,
            photo: {
                uri: `${URL.SERVER_STORAGE}/${this.props.navigation.getParam('post').media.url}`,
                type: this.props.navigation.getParam('post').media.file_type,
                filename: this.props.navigation.getParam('post').media.filename
            },
            title: this.props.navigation.getParam('post').title,
            caption: this.props.navigation.getParam('post').caption,
            tags: this.props.navigation.getParam('post').tags,
            likes: this.props.navigation.getParam('post').likes,
            comments: this.props.navigation.getParam('post').comments,
            shares: this.props.navigation.getParam('post').shares,
            views: this.props.navigation.getParam('post').views,
            link: this.props.navigation.getParam('post').link,
            campaign_id: this.props.navigation.getParam('post').campaign_id,
            isValidated: false,
            post_count: 0,
            post: this.props.navigation.getParam('post'),
        };
    }
    
    componentDidMount() {
        this.setState({
            photo: {
                uri: `${URL.SERVER_STORAGE}/${this.props.navigation.getParam('post').media.url}`,
                type: this.props.navigation.getParam('post').media.file_type,
                filename: this.props.navigation.getParam('post').media.filename
            },
            title: this.props.navigation.getParam('post').title,
            caption: this.props.navigation.getParam('post').caption,
            tags: this.props.navigation.getParam('post').tags,
            likes: this.props.navigation.getParam('post').likes,
            comments: this.props.navigation.getParam('post').comments,
            shares: this.props.navigation.getParam('post').shares,
            views: this.props.navigation.getParam('post').views,
            link: this.props.navigation.getParam('post').link,
            campaign_id: this.props.navigation.getParam('post').campaign_id,
        });
    }

    submit = () => {
        if (this.validate()) {
            this.setState({ isSaving: true });
            const formData = new FormData();
            
            if (this.state.isPhotoChanged === 1) {
                formData.append('photo', { 
                    uri: this.state.photo.uri,
                    type: this.state.photo.type,
                    name: this.state.photo.filename
                });
            }

            formData.append('isPhotoChanged', this.state.isPhotoChanged);
            formData.append('post_id', this.state.post.id);
            formData.append('title', this.state.title);
            formData.append('caption', this.state.caption);
            formData.append('likes', this.state.likes);
            formData.append('shares', this.state.shares);
            formData.append('comments', this.state.comments);
            formData.append('views', this.state.views);
            formData.append('link', this.state.link);

            console.log(formData);
            HttpForm.post(URL.POST.UPDATE, formData)
            .then(response => { 
                this.setState({
                    isSaving: false
                });
                this.props.getMyList();
                this.props.navigation.navigate('MyCampaign');
            })
            .catch(e => {
                this.setState({ isSaving: false });
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data.errors);
                console.log(e.message);
                console.log(e.request);
            });
        }
    }

    validate = () => {
        let willContinue = false;

        if (this.state.photo === null) {
            Alert.alert('Upload a photo to your post');
        } else {
            if (this.state.title === ''){
                Alert.alert('Provide a title to your campaign');
            } else if (this.state.caption === '') {
               Alert.alert('Describe your post');
            } else {
                willContinue = true;
            }
        }

        return willContinue;
    }

    _handleChangeImage = () => {
        ImagePicker.showImagePicker({
            title: 'Upload photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }, (response) => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    photo: { 
                        uri: response.uri,
                        type: response.type,
                        filename: response.fileName
                    },
                    isPhotoChanged: 1
                });
            }
        });
    }

    uploadImage = () => 
        <Image
            style={{
                alignSelf: 'stretch',
                height: 200
            }}
            resizeMode="contain"
            source={this.state.photo}
        />

    title = () => 
        <TextInput 
            placeholder="Title" 
            onChangeText={(text) => { this.setState({ title: text }); }} 
            value={this.state.title}
            style={[style.inputControl, {
                fontSize: 23,
                fontWeight: 'bold',
            }]}
        />

    caption = () =>
        <TextInput 
            placeholder="Caption" 
            onChangeText={(text) => { this.setState({ caption: text }); }} 
            value={this.state.caption}
            multiline
            numberOfLines={7}
            style={[style.inputControl, {
                fontSize: 15,
                textAlignVertical: 'top'
            }]}
        />
    
    tags = () => 
        <TextInput
            placeholder="Tags and Mentions"
            onChangeText={(text) => { this.setState({ tags: text }); }} 
            style={style.inputControl}
            value={this.state.tags}
        />

    incentives = () =>
        <View style={style.incentivesWrapper}>
            <View style={style.incentivesContainer}>
                <CommonText size="small" text="Likes" />
                <TextInput 
                    style={[style.inputControl, style.incentive]}
                    value={`${this.state.likes}`}
                    keyboardType='numeric'
                    onChangeText={text => this.setState({ likes: text })}
                />
            </View>

            <View style={style.incentivesContainer}>
                <CommonText size="small" text="Comments" />
                <TextInput 
                    style={[style.inputControl, style.incentive]}
                    value={`${this.state.comments}`}
                    keyboardType='numeric'
                    onChangeText={text => this.setState({ comments: text })}
                />
            </View>

            <View style={style.incentivesContainer}>
                <CommonText size="small" text="Shares" />
                <TextInput 
                    style={[style.inputControl, style.incentive]}
                    value={`${this.state.shares}`}
                    keyboardType='numeric'
                    onChangeText={text => this.setState({ shares: text })}
                />
            </View>

            <View style={style.incentivesContainer}>
                <CommonText size="small" text="Views" />
                <TextInput 
                    style={[style.inputControl, style.incentive]}
                    value={`${this.state.views}`}
                    keyboardType='numeric'
                    onChangeText={text => this.setState({ views: text })}
                />
            </View>
            
        </View>

    link = () => 
        <View>
            <CommonText size="small" text="Link" />
            <TextInput 
                style={[style.inputControl, style.incentive]}
                value={this.state.link}
                onChangeText={text => this.setState({ link: text })}
            />
        </View>
    post = () => 
        <View style={style.container}>
            {/* Upload Image */}
                <View style={style.uploadImageContainer}>
                    <TouchableOpacity 
                        style={style.uploadImageButton} 
                        onPress={() => { this._handleChangeImage(); }}
                    >
                        { this.uploadImage() }
                    </TouchableOpacity>
                </View>
                
                <View style={style.textContainer}>
                    {/* TITLE */}
                        { this.title() }

                    {/* CAPTION */}
                        { this.caption() }

                    {/* TAGS */}
                        { this.tags() }

                    {/* INCENTIVES */}
                        { this.link() }

                    {/* INCENTIVES */}
                        { this.incentives() }
                </View>
        </View>

    buttons = () =>
        <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 35 }}>
         
            <GradientButton 
                text="Update" style={{ marginBottom: 10 }} 
                onPress={() => { this.submit(); }}    
            />
     
        </View>

    render = () => 
        <ScrollView>
            <BackButton darkButton={true} />
            
            { this.post() }
            
            { this.buttons() }
            
        </ScrollView>
}

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(null, mapDispatchtoProps)(UpdatePostPage);
