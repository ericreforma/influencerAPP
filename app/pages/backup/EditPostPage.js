import React, { Component } from 'react';
import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import style from '../styles/page.CreatePost.style';
import { BackButton, GradientButton, WhiteButton } from '../components/Button';
import { showMessage } from 'react-native-flash-message';
import { SOCIALMEDIA } from '../config/variables';
import { CampaignAction } from '../redux/actions/campaign.action';
import image from '../assets';
import CameraRollPicker from '../components/CameraRollPicker';
import { HttpForm } from '../services/http';
import { URL } from '../config/url';

class EditPostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasImage: false,
            isSaving: false,
            title: '',
            id: 0,
            media: [],
            currentMedia: [],
            caption: '',
            social_media: 0,
            platforms: [],
            tags: '',
            imagePickerMediaType: 'photo',
            modalVisible: false,
            isValidated: false,
            post_count: 0,
            version: 0,
            campaign: this.props.navigation.getParam('campaign'),
            fromDashboard: false,
            post: this.props.navigation.getParam('post')
        };
    }
    
    componentDidMount() {
        const post = this.props.navigation.getParam('post');
        const platforms = [];

        post.media_collection.map(img => 
            img.deleted = 0
        );

        this.state.post.sma.map(sma => {
            platforms.push(sma.sma_id);
        });

        this.setState({ 
            id: post.id,
            title: post.title,
            caption: post.caption,
            tags: post.tags,
            platforms,
            currentMedia: post.media_collection,
            version: parseInt(post.version) + 1
        });
    }

    submit = () => {
        if (this.validate()) {
            console.log('submitting');
            this.setState({ isSaving: true });
            const formData = new FormData();

            this.state.media.map(img => {
                formData.append('media[]', { 
                    uri: img.node.image.uri,
                    type: img.node.type,
                    name: img.node.image.filename
                });
            });
            formData.append('post_id', this.state.id);
            formData.append('version', this.state.version);
            formData.append('title', this.state.title);
            formData.append('caption', this.state.caption);
            formData.append('tags', this.state.tags);
            formData.append('platforms', JSON.stringify(this.state.platforms));
            formData.append('currentMedia', JSON.stringify(this.state.currentMedia));

            HttpForm.post(URL.SOCIALMEDIA.POST.UPDATE, formData)
            .then(response => { 
                console.log('edited');
                this.setState({
                    isSaving: false
                });

                showMessage({
                    message: 'Success',
                    description: "Post updated!",
                    type: 'success',
                    icon: 'auto',
                });

                this.props.getMyList();
                this.props.navigation.navigate('MyCampaign');
            })
            .catch(e => {
                this.setState({ isSaving: false });
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data);
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

    title = () => 
        <TextInput 
            placeholder="Title"
            value={this.state.title}
            onChangeText={(text) => { this.setState({ title: text }); }} 
            style={[style.inputControl, {
                fontSize: 23,
                fontWeight: 'bold',
            }]}
        />

    caption = () =>
        <TextInput 
            placeholder="Caption" 
            value={this.state.caption}
            onChangeText={(text) => { this.setState({ caption: text }); }} 
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

    status = () =>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#999', fontSize: 17 }}>
                Status 
                <Text 
                    style={{ 
                        color: '#ff3c00',
                        fontWeight: 'bold'
                    }}
                > PENDING APPOVAL</Text>
            </Text>
        </View>
    
    post = () => 
        <View style={style.container}>
            {/* Upload Image */}
                <View style={style.uploadImageContainer}>
                    <ScrollView horizontal={true}>
                        { this.state.currentMedia && this.state.currentMedia.map((img, index) => {
                             if (img.deleted === 0) {
                                return (
                                <View style={{ position: 'relative' }} key={index}>
                                    <Image
                                        style={style.imageThumbs}
                                        source={{ 
                                            uri: `${URL.SERVER_STORAGE}/${img.url}`
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            const currentMedia = this.state.currentMedia;
                                            const objIndex = currentMedia.findIndex(x => x.id == img.id);
                                            currentMedia[objIndex].deleted = 1;

                                            this.setState({ currentMedia });
                                        }}
                                        style={style.removeButton}
                                    >
                                        <Text style={style.removeButtonText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                );
                                }
                            }
                        )}

                        { this.state.media && this.state.media.map((image, index) =>
                            <View style={{ position: 'relative' }} key={index}>
                                <Image
                                    style={style.imageThumbs}
                                    source={{ uri: image.node.image.uri }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const filtered = this.state.media.filter(x => x.node.image.filename != image.node.image.filename);
                                        this.setState({ media: filtered });
                                    }}
                                    style={style.removeButton}
                                >
                                    <Text style={style.removeButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <TouchableOpacity 
                            style={style.imageThumbsButton}
                            onPress={() => { this.setState({ modalVisible: true }); }}
                        >
                            <Image 
                                style={style.imageThumbsButtonPlaceHolder}
                                resizeMode='contain'
                                source={image.upload_image_placeholder}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                
                <View style={style.textContainer}>
                    {/* TITLE */}
                        {/* { this.title() } */}

                    {/* CAPTION */}
                        { this.caption() }

                    {/* TAGS */}
                        { this.tags() }

                    {/* PLATFORM */}
                        { this.platforms() }

                    {/* STATUS */}
                        { this.status() }
                </View>

               
        </View>

    platforms = () =>
        <View>
            <Text style={style.jobLabel}>Select specific platform for this post</Text>
            { this.state.campaign.sma.map((sma, index) =>
                <TouchableOpacity 
                    style={this.state.platforms.includes(sma.sm_id) ? style.checkInputSelected : style.checkInput} 
                    key={index}
                    onPress={() => {
                        const platforms = [];
                        platforms.push(sma.sm_id);
                        this.setState({ platforms });
                    }}
                >
                    <Text 
                        style={this.state.platforms.includes(sma.sm_id) ? style.checkInputTextSelected : style.checkInputText}
                    >
                        { Object.values(SOCIALMEDIA)[sma.sm_id].prettyname }
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    
    buttons = () =>
        <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 35 }}>
         
            <GradientButton 
                text="Submit" style={{ marginBottom: 10 }} 
                onPress={() => { this.submit(); }}    
            />
            
            <WhiteButton 
                text="Find More Campaigns" 
                border={true} 
                onPress={() => { this.props.navigation.navigate('Home'); }} 
            />
        </View>

    render = () => 
        <ScrollView>
            <BackButton darkButton={true} />

            <CameraRollPicker 
                isVisible={this.state.modalVisible} 
                onBackButtonPress={() => {
                    this.setState({ modalVisible: false });
                }}
                onSelect={media => {
                    this.setState({ media, modalVisible: false });
                }}
            />

            { this.post() }
                
            { this.buttons() }
            
        </ScrollView>
}

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(null, mapDispatchtoProps)(EditPostPage);
