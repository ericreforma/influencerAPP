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

class CreatePostPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            hasImage: false,
            isSaving: false,
            title: '',

            media: [],

            caption: '',
            social_media: 0,
            platforms: [],
            tags: '',
            imagePickerMediaType: 'photo',
            modalVisible: false,
            isValidated: false,
            post_count: 0,
            campaign: this.props.navigation.getParam('campaign'),
            fromDashboard: false
        };
    }
    
    componentDidMount() {
        let tags = '';
        this.state.campaign.tags.map(tag => {
            tags = `${tags} ${tag.caption}`;
        });

        this.setState({ tags });
    }

    submit = () => {
        if (this.validate() && this.state.isSaving === false) {
            this.setState({ isSaving: true });
            const formData = new FormData();
            
            this.state.media.map(img => {
                formData.append('media[]', { 
                    uri: img.node.image.uri,
                    type: img.node.type,
                    name: img.node.image.filename
                });
            });

            formData.append('title', this.state.title);
            formData.append('caption', this.state.caption);
            formData.append('social_media_id', this.state.campaign.id);
            formData.append('client_id', this.state.campaign.client_id);
            formData.append('tags', this.state.tags);
            formData.append('mediaType', this.state.imagePickerMediaType);
            formData.append('platforms', JSON.stringify(this.state.platforms));

            HttpForm.post(URL.SOCIALMEDIA.POST.ADD, formData)
            .then(response => { 
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

        if (this.state.media.length === 0) {
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

    uploadImage = () =>
        (this.state.media ? 
            <Image
                style={{
                    alignSelf: 'stretch',
                    height: 200
                }}
                source={{ uri: this.state.media.node.image.uri }}
            />
            :
            <>
                <Image 
                    style={{
                        width: 100,
                        height: 100
                    }}
                    resizeMode='contain'
                    source={image.upload_image_placeholder}
                />
            </>

            
        );

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
                    { this.state.media.length == 0 ?
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
                                { this.state.media.map((image, index) =>
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
            
            { this.state.campaign.sma.map((sma, index) =>
                <TouchableOpacity 
                    style={this.state.platforms.includes(sma.sm_id) ? style.checkInputSelected : style.checkInput} 
                    key={index}
                    onPress={() => {
                        // SINGULAR PLATFORM FUNCTION
                            const platforms = [];
                            platforms.push(sma.sm_id);
                            this.setState({ platforms });

                        // MULITPLATFORM FUNCTION
                            // const platforms = this.state.platforms;
                            // const isExist = platforms.includes(sma.sm_id);

                            // if (isExist) {
                            //     const filtered = platforms.filter(s => s !== sma.sm_id);
                            //     this.setState({ platforms: filtered });
                            // } else {
                            //     platforms.push(sma.sm_id);
                            //     this.setState({ platforms });
                            // }

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
                text="Submit" 
                style={{ marginBottom: 10 }} 
                isSaving={this.state.isSaving}
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
                currentMedia={this.state.media}
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

const mapStatetoProps = state => ({
    profile: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(mapStatetoProps, mapDispatchtoProps)(CreatePostPage);
