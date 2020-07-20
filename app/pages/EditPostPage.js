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
import { HttpForm, HttpRequest } from '../services/http';
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
            sma: [],
            caption: '',
            social_media: 0,
            platforms: [],
            tags: '',
            imagePickerMediaType: 'photo',
            modalVisible: false,
            isValidated: false,
            post_count: 0,
            fromDashboard: false,
            post_id: this.props.navigation.getParam('post_id'),
        };
    }
    
    componentWillMount() {
        HttpRequest.get(URL.SOCIALMEDIA.POST.DETAILS, { id: this.state.post_id })
        .then(response => {
            console.log(response);
            const post = response.data;
            const platforms = [];

            post.sma.map(sma => {
                platforms.push(sma.sma_id);
            });

            this.setState({ 
                id: post.id,
                title: post.title,
                caption: post.caption,
                tags: post.tags,
                media: post.media,
                sma: post.campaign.sma,
                platforms,
                version: parseInt(post.version) + 1
            });
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

    submit = () => {
        if (this.validate() && this.state.isSaving === false) {
            this.setState({ isSaving: true });
            const formData = new FormData();

            formData.append('oldMedia', JSON.stringify(this.state.media.filter(x => x.hasOwnProperty('id'))));

            this.state.media.filter(x => !x.hasOwnProperty('id')).map(img => {
                formData.append('newMedia[]', { 
                    uri: img.node.image.uri,
                    type: img.node.type,
                    name: img.node.image.filename
                });
            });
            
            formData.append('post_id', this.state.id);
            formData.append('title', this.state.title);
            formData.append('caption', this.state.caption);
            formData.append('tags', this.state.tags);
            formData.append('platforms', JSON.stringify(this.state.platforms));

            HttpForm.post(URL.SOCIALMEDIA.POST.UPDATE, formData)
            .then(response => { 
                console.log(response);
                this.setState({
                    isSaving: false
                });

                showMessage({
                    message: 'Success',
                    description: "Post is submitted!",
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
                console.log(e.response.data.errors);
                console.log(e.message);
                console.log(e.request);
            });
        }
    }

    validate = () => {
        let willContinue = false;
        const notDeletedOrigMedia = this.state.media
                            .filter(x => x.hasOwnProperty('id'))
                            .filter(x => !x.hasOwnProperty('willDelete'));

        const newMedia = this.state.media.filter(x => !x.hasOwnProperty('id'));

        if (notDeletedOrigMedia.length === 0 && newMedia.length == 0) {
            Alert.alert('Upload a photo to your post');
        } else if (this.state.caption === '') {
            Alert.alert('Describe your post');
        } else if(this.state.platforms.length === 0) {
            Alert.alert('Select a target platform');
        } else if(this.props.profile.social_media.filter(sma => sma.type == this.state.platforms[0]).length == 0) {
            Alert.alert('You must have an account on the target platform');
        } else {
            willContinue = true;
        }

        return willContinue;
    }

    title = () => 
        <TextInput 
            placeholder="Title" 
            onChangeText={(text) => { this.setState({ title: text }); }} 
            style={[style.inputControl, {
                fontSize: 23,
                fontWeight: 'bold',
            }]}
        />

    caption = () =>
        <TextInput 
            placeholder="Caption" 
            onChangeText={(text) => { this.setState({ caption: text }); }} 
            multiline
            numberOfLines={7}
            value={this.state.caption}
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

    post = () => 
        <View style={style.container}>
            {/* Upload Image */}
                <View style={style.uploadImageContainer}>
                    { this.state.media.filter(img => !img.hasOwnProperty('willDelete')).length == 0 ?
                        <View
                            style={{
                                alignSelf: 'stretch',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}
                        >
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
                        </View>
                        :
                            <ScrollView horizontal={true}>
                                { this.state.media.filter(img => !img.hasOwnProperty('willDelete')).map((image, index) =>
                                    <View style={{ position: 'relative' }} key={index}>
                                        <Image
                                            style={style.imageThumbs}
                                            source={
                                                image.hasOwnProperty("id") ? 
                                                { uri: `${URL.SERVER_STORAGE}/${image.url}` } :
                                                { uri: image.node.image.uri }
                                            }
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                let filtered = [];
                                                if (image.hasOwnProperty('id')) {
                                                    const thisMedia = image;
                                                    filtered = this.state.media.filter(x => image.id !== x.id);
                                                    thisMedia.willDelete = 1;
                                                    filtered.push(thisMedia);
                                                } else {
                                                    const origMedia = this.state.media.filter(x => x.hasOwnProperty('id'));
                                                    const newMedia = this.state.media.filter(x => x.hasOwnProperty('id') === false );
                                                    const filteredNewMedia = newMedia.filter(x => x.node.image.filename != image.node.image.filename);
                                                    filtered = [...origMedia, ...filteredNewMedia];
                                                }
                                                
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
                    }

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

                </View>

               
        </View>

    platforms = () =>
        <View>
            <Text style={style.jobLabel}>Select specific platform for this post</Text>
            
            { this.state.sma && this.state.sma.map((sma, index) =>
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
                text="Save" 
                style={{ marginBottom: 10 }} 
                isSaving={this.state.isSaving}
                onPress={() => { this.submit(); }}    
            />
           
        </View>

    render = () => 
        <ScrollView>
            <BackButton darkButton={true} />
            <CameraRollPicker 
                isVisible={this.state.modalVisible} 
                currentMedia={[]}
                onBackButtonPress={() => {
                    this.setState({ modalVisible: false });
                }}
                onSelect={m => {
                    const fileteredMedia = this.state.media.filter(x => x.hasOwnProperty('id'));

                    const newMedia = fileteredMedia.length > 0 ?
                        [...fileteredMedia, ...m]
                        :
                        m;
                    
                    this.setState({ media: newMedia, modalVisible: false });
                }}
            />

            { this.post() }
                
            { this.buttons() }
            
        </ScrollView>
}

const mapStatetoProps = state => ({
    profile: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(mapStatetoProps, mapDispatchtoProps)(EditPostPage);
