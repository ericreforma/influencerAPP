import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import moment from 'moment';
import { 
    Modal, ScrollView, View, Text, Image, 
    TouchableOpacity, TextInput, Picker,
    ActivityIndicator, BackHandler, Alert
} from 'react-native';
import { GradientButton } from '../components/Button';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GradientContainer from '../components/GradientContainer';
import { innerPageHeader } from '../components/Header';
import { AuthController } from '../controllers/AuthController';
import style from '../styles/page.EditProfile.style';
import { URL } from '../config/url';
import { GENDER, SOCIALMEDIA } from '../config/variables';
import image from '../assets';
import { HttpForm, HttpRequest } from '../services/http';
import { USER } from '../redux/actions/types.action';
import { AuthAction } from '../redux/actions/auth.action';
import { SocialMediaController } from '../controllers';

class EditProfilePage extends Component {

    constructor(props) {
        super(props);
        let profilePhotoType = '';
        let profilePhotoFileName = '';
        let profilePhoto = image.male_avatar;

        if (this.props.profile.media !== null) {
            profilePhotoType = this.props.profile.media.file_type;
            profilePhotoFileName = this.props.profile.media.filename;
            profilePhoto = { uri: `${URL.SERVER_STORAGE}/${this.props.profile.media.url}` };
        } 

        this.state = {
            hasChanges: false,
            profile: this.props.profile,
            modalVisible: false,
            datePickerModalVisibe: false,
            modalTitle: '',
            selectCountry: null,
            selectedControl: '',
            genderOptions: ['Male', 'Female'],
            isSaving: false,
            bioCount: 200,
            profilePhotoChanged: 0,
            profilePhotoType: profilePhotoType,
            profilePhotoFileName: profilePhotoFileName,
            profilePhoto: profilePhoto,

            description: this.props.profile.description,
            gender: this.props.profile.gender,
            contact_number: this.props.profile.contact_number,
            username: this.props.profile.username,
            birthdate: this.props.profile.birthdate,
            location: this.props.profile.location,
            social_media: this.props.profile.social_media,
            country_id: this.props.profile.country_id,
            country_text: this.props.profile.country.name,
            phone_verified: this.props.profile.phone_verified,
            phone_prefix: this.props.profile.phone_prefix || this.props.profile.country.phone_prefix,

            sma_username: '',
            sma_followers: 0,

            temp_country_text: this.props.profile.country.name,
            temp_country_id: this.props.profile.country_id,
            temp_description: this.props.profile.description,
            temp_gender: this.props.profile.gender,
            temp_contact_number: this.props.profile.contact_number,
            temp_username: this.props.profile.username,
            temp_birthdate: this.props.profile.birthdate,
            temp_location: this.props.profile.location,
            temp_phone_verified: this.props.profile.phone_verified,
            temp_phone_prefix: this.props.profile.phone_prefix || this.props.profile.country.phone_prefix,
            temp_social_media: this.props.profile.social_media,
            temp_sma_username: '',
            temp_sma_followers: 0,

            years: [],
            days: [],

            phoneVerificationId: null,
            isVerifying: false,

            credential: null,
            isFBModalVisible: false,
            isIGModalVisible: false,
            facebookPages: [],
            instagramAccounts: [],
            facebookCredential: null,
            instagramCredential: null
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
       
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        const today = new Date();

        let days = [], 
            years = [];

        for (let d = 1; d < 32; d++) {
            days.push(<Picker.Item label={d.toString()} value={d < 10 ? `0${d}` : d} key={d} />);
        }

        for (let y = (today.getFullYear() - 80); y < (today.getFullYear() - 17); y++) {
            years.push(<Picker.Item label={y.toString()} value={y.toString()} key={y} />);
        }

        this.setState({ years, days });
        HttpRequest.get(URL.ENV.COUNTRY.LIST)
        .then(response  => {
            this.setState({ selectCountry: response.data })
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });

        let bioCount = this.state.temp_description !== null ? 200 - this.state.temp_description.length : 200;
        this.setState({ bioCount });
    }

    handleBackButtonClick() {
        if(this.state.hasChanges) {
            Alert.alert('Unsaved Changes.', 
                'Are you sure do you want to leave without saving? Any unsaved changes will be lost.',
                [
                    { text: 'Exit', onPress: () => { this.props.navigation.goBack(null); } },
                    { text: 'Stay', onPress: () => { }}
                ]
            );
        } else {
            this.props.navigation.goBack(null); 
        }
        
        return true;
    }

    openImagePicker = () => {
        ImagePicker.showImagePicker({
            title: 'Select Profile Photo',
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
                    profilePhoto: { uri: response.uri },
                    profilePhotoChanged: 1,
                    profilePhotoType: response.type == null ? 'image/jpeg' : response.type,
                    profilePhotoFileName: response.fileName
                });
            }
        });
    }

    forms = () => {
        switch (this.state.selectedControl) {
            case 'description':
                return (
                    <TextInput 
                        multiline 
                        style={style.inputControl} 
                        value={this.state.temp_description}
                        onChangeText={text => { 
                            let bioCount = 200 - text.length;
                            console.log(bioCount);
                            if(bioCount >= 0){
                                this.setState({ 
                                    temp_description: text,
                                    bioCount
                                });
                            }
                             
                        }}
                        placeholder="Describe yourself..."
                    />
                );
            case 'contact_number':
                return (
                    <>
                        <View style={style.phoneInput}>
                            <Text style={style.phoneNumber}>
                                {this.state.phone_prefix}
                            </Text>
                            <TextInput
                                style={[style.phoneNumber, { flexGrow: 1 }]}
                                placeholder=""
                                keyboardType='numeric'
                                value={this.state.temp_contact_number}
                                onChangeText={text => { this.setState({ temp_contact_number: text }); }}
                            />
                        </View>

                        <GradientButton
                            text={'Verify'}
                            onPress={() => {
                                let error = 0;
                                if(this.state.temp_country_id == 1) {
                                    if(this.state.temp_contact_number.length != 10) {
                                        Alert.alert('Invalid phone number');
                                        error += 1;
                                    }
                                } else if(this.state.temp_country_id == 2) {
                                    if(this.state.temp_contact_number.length != 8) {
                                        Alert.alert('Invalid phone number')
                                        error += 1;
                                    }
                                }

                                if(error == 0) {
                                    this.setState({ isVerifying: true });
                                    AuthController.firebase.verifyPhone(`${this.state.temp_phone_prefix}${this.state.temp_contact_number}`,
                                        () => {
                                            this.setState({ 
                                                modalVisible: false,
                                                isVerifying: false,
                                                phone_verified: 1,
                                                contact_number: this.state.temp_contact_number,
                                                phone_prefix: this.state.temp_phone_prefix
                                            });
                                        },
                                        () => {
                                            this.setState({ 
                                                isVerifying: false,
                                            });
                                            Alert.alert(`We can't verify your phone. Please try again.`)
                                        }
                                    );
                                }
                            }}

                            isSaving={this.state.isVerifying}
                        />
                           
                    </>

                );
            
            case 'gender':
                return (
                    <View stlye={{ flex: 1 }}>
                        { this.state.genderOptions.map((type, index) => 
                            <TouchableOpacity 
                                key={index} 
                                style={style.genderOption}
                                onPress={() => {
                                    this.setState({
                                        temp_gender: (index + 1)
                                    });
                                }}
                            >
                                <Text style={{ fontSize: 21 }}>{type}</Text>
                                <Image
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginTop: 10,
                                        marginRight: 5
                                    }}
                                    resizeMode="contain"
                                    source={this.state.temp_gender === (index + 1) ? image.icon.check_radio_icon : null}
                                />
                            </TouchableOpacity>    
                        )}
                    </View>
                );

            case 'birthdate':
                return (
                    <>
                        <TouchableOpacity
                            style={{
                                alignContent: 'center',
                                borderWidth: 1,
                                borderColor: '#999',
                                borderRadius: 20,
                                paddingVertical: 10
                            }}
                            onPress={() => {
                                this.setState({ datePickerModalVisibe: true });
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    alignSelf: 'center'
                                }}
                            >{moment(this.state.temp_birthdate).format('MMM. DD, Y')}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.datePickerModalVisibe}
                            mode="date"
                            onConfirm={date => {
                                const today = moment(new Date());
                                const thatDay = moment(date);

                                const duration = moment.duration(today.diff(thatDay));
                                const days = duration.asDays();
                                
                                console.log(days);
                                if(days >= 5840 && days <= 36500) {
                                    this.setState({
                                        temp_birthdate: date,
                                        datePickerModalVisibe: false
                                    });
                                } else {
                                    Alert.alert('Age is restricted starting 16 years old.')
                                }

                               
                            }}
                            onCancel={() => {
                                this.setState({ datePickerModalVisibe: false });
                            }}
                        />
                    </>

                );
            case 'location':
                return (
                    <>
                        <TextInput
                            multiline 
                            style={[style.inputControl, {
                                textAlign: 'center',
                                fontSize: 22
                            }]}
                            placeholder="City / Province"
                            value={this.state.temp_location}
                            onChangeText={text => { this.setState({ temp_location: text }); }}
                        />
                        <View style={style.selectControl}>
                            <Picker
                                style={{ height: 30 }}
                                selectedValue={this.state.temp_country_id}
                                onValueChange={(itemValue, itemIndex) => {
                                    if(itemValue != this.state.temp_country_id) {
                                        Alert.alert(
                                            'Confirm Action',
                                            `Changing country preference will clear your current contact number.`,
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => {}
                                                },
                                                {
                                                    text: 'Continue',
                                                    onPress: () => {
                                                        console.log(this.state.selectCountry[itemIndex].phone_prefix)
                                                        this.setState({
                                                            temp_phone_prefix: this.state.selectCountry[itemIndex].phone_prefix,
                                                            temp_contact_number: '',
                                                            temp_phone_verified: 0,
                                                            temp_country_id: itemValue,
                                                            temp_country_text: this.state.selectCountry[itemIndex].name
                                                        })
                                                    }
                                                }
                                            ]
                                        );
                                    } 
                                    
                                }
                                    
                                }>
                                    { this.state.selectCountry.map((country, index) => 
                                        <Picker.Item key={index} label={country.name} value={country.id} />
                                    )}
                                
                            </Picker>
                        </View>
                        
                    </>
                );

            case 'social_media':
                return (
                    <View>
                        <View style={style.modal_sma_container}>
                            <Text style={style.modal_sma_label}>Username: </Text>
                            <TextInput
                                style={[style.inputControl, style.modal_sma_input]}
                                onChangeText={text => { this.setState({ temp_sma_username: text }); }}
                                value={this.state.temp_sma_username}
                            />
                        </View>
                        <View style={style.modal_sma_container}>
                            <Text style={style.modal_sma_label}>Followers: </Text>
                            <TextInput
                                keyboardType='numeric'
                                style={[style.inputControl, style.modal_sma_input]}
                                onChangeText={text => { this.setState({ temp_sma_followers: text }); }}
                                value={this.state.temp_sma_followers.toString()}
                            />
                        </View>
                    </View>
                );
            default:
                return (
                    <View>
                        <Text>Nothing Selected</Text>
                    </View>
                );
        }
    }

    formHeader = (title, control) => 
        <View style={style.HeaderContainer}>
            <Text style={style.HeaderText}>{title}</Text>
            <TouchableOpacity 
                style={style.HeaderButton} 
                onPress={() => { 
                    if (control === 'profilePhoto') {
                        this.openImagePicker();
                    } else {
                        this.setState({ 
                            modalVisible: true,
                            modalTitle: title,
                            selectedControl: control
                        }); 
                    }
                }}
            >
                <Text style={style.HeaderButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>

    editModal = () =>
        <Modal 
            style={style.editModal} 
            animationType={'slide'}
            visible={this.state.modalVisible}
            onRequestClose={() => { 

                this.setState({ modalVisible: false }); 
            }}
        >
            <View style={style.modalContainer}>
                {/* HEADER */}
                    <View style={style.modalHeader}>
                        {/* CANCEL BUTTON */}
                            <TouchableOpacity
                                onPress={() => { 
                                    this.setState({ 
                                        modalVisible: false,
                                        [`temp_${this.state.selectedControl}`]: this.state[this.state.selectedControl]
                                    }); 
                                }}
                            >
                                <Image 
                                    style={style.modalIcon} 
                                    source={image.icon.cancel_icon} 
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                        {/* TITLE */}
                            <Text style={style.HeaderText}>{this.state.modalTitle}</Text>

                        {/* OK BUTTON*/}
                            <TouchableOpacity 
                                onPress={() => { 
                                    this.setState({ hasChanges: true });
                                    if (this.state.selectedControl === 'social_media') {
                                        const sma = SOCIALMEDIA[this.state.modalTitle.toString().toLowerCase()];
                                        const filteredSma = this.state.social_media.filter(s => s.type !== sma.id);
                                        
                                        filteredSma.push({
                                            type: sma.id,
                                            username: this.state.temp_sma_username,
                                            followers: this.state.temp_sma_followers,
                                        });
                                        
                                        this.setState({ 
                                            modalVisible: false,
                                            social_media: filteredSma
                                        });
                                       
                                    } else if (this.state.selectedControl === 'birthdate') {
                                        const birthdate = moment(this.state.temp_birthdate).format('Y-MM-DD');
                                        this.setState({
                                            modalVisible: false,
                                            birthdate,
                                        });

                                    } else if (this.state.selectedControl === 'location') {
                                        
                                        this.setState({
                                            modalVisible: false,
                                            location: this.state.temp_location,
                                            phone_prefix: this.state.temp_phone_prefix,
                                            phone_verified: this.state.temp_phone_verified,
                                            contact_number: this.state.temp_contact_number,
                                            country_id: this.state.temp_country_id,
                                            country_text: this.state.temp_country_text
                                        });
                                    } else if (this.state.selectedControl === 'contact_number') {
                                        Alert.alert('Verify your phone number first.')
                                    } else {
                                        const newValue = this.state[`temp_${this.state.selectedControl}`];
                                        this.setState({ 
                                            modalVisible: false,
                                            [this.state.selectedControl]: newValue
                                        });
                                    }
                                }}
                            >
                                <Image 
                                    style={style.modalIcon}
                                    source={image.icon.check_icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                    </View>

                {/* BODY */}
                    <View style={style.modalBody}>
                        
                        <View>
                            { this.forms() }
                        </View>
                    </View>
            </View>
            
        </Modal>

    submit = () => {
        this.setState({ isSaving: true });
        const formData = new FormData();

        if (this.state.profilePhotoChanged === 1) {
            formData.append('profilePhoto', {
                uri: this.state.profilePhoto.uri,
                type: this.state.profilePhotoType,
                name: this.state.profilePhotoFileName
            });
        }
        
        formData.append('profilePhotoChanged', this.state.profilePhotoChanged);
        formData.append('description', this.state.description);
        formData.append('phone_verified', this.state.phone_verified);
        formData.append('phone_prefix', this.state.phone_prefix);
        formData.append('gender', this.state.gender);
        formData.append('contact_number', this.state.contact_number);
        formData.append('username', this.state.username);
        formData.append('birthdate', this.state.birthdate);
        formData.append('location', this.state.location);
        formData.append('country_id', this.state.country_id);
        formData.append('social_media', JSON.stringify(this.state.social_media));

        HttpForm.post(URL.USER.PROFILE_UPDATE, formData)
        .then(response => { 
            console.log(response);
            this.setState({
                profilePhotoChanged: 0,
                isSaving: false,
                hasChanges: false
            });

            const user = response.data;
            this.props.dispatchGetProfile(user);
            this.props.navigation.navigate('Profile');
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

    socialMedia = () => {
        let socialMedia = [];

        Object.values(SOCIALMEDIA).map((sma, index) => {
            const tempSocialMedia = this.state.social_media.filter(soc => soc.type === sma.id);

            socialMedia.push(
                <View key={index}>
                    <View style={style.HeaderContainer}>
                        <View style={style.sma_header}>                        
                            <GradientContainer style={style.sma_icon_container}>
                                <Image
                                    style={style.sma_image}
                                    source={sma.icon}
                                />
                            </GradientContainer>
                            <Text style={style.HeaderText}>{sma.prettyname}</Text>
                        </View>
                        {/* <TouchableOpacity 
                            style={style.HeaderButton} 
                            onPress={() => { 
                                this.setState({ 
                                    modalVisible: true,
                                    modalTitle: sma.prettyname,
                                    selectedControl: 'social_media',
                                    temp_sma_username: username,
                                    temp_sma_followers: followers
                                }); 
                            }}
                        >
                            <Text style={style.HeaderButtonText}>Edit</Text>
                        </TouchableOpacity> */}
                        {  tempSocialMedia.length === 0 && 
                            <TouchableOpacity
                                onPress={() => {
                                    this.linkAccount(sma.prettyname.toLowerCase())
                                }}
                            >
                                <Text>Link Account</Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
                    <View >
                        { tempSocialMedia.length !== 0 ? 
                            <View
                                style={{ 
                                    flexDirection: 'row',
                                    padding: 8,
                                    elevation: 1,
                                    borderRadius: 10,
                                    marginBottom: 15
                                }}
                            >
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 10,
                                        marginRight: 10,
                                        alignSelf: 'center'
                                    }}
                                    resizeMode="cover"
                                    source={{ uri: tempSocialMedia[0].page_profile_picture }}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>{ tempSocialMedia[0].page_name }</Text>
                                    <Text>{`followers: ${ tempSocialMedia[0].page_fan_count}`}</Text>
                                </View>
                            </View>
                        :
                            <View style={style.BodyContainer}>
                                <View style={style.sma_label_container}>
                                    <Text> No Active Page Linked</Text>
                                </View>
                            </View>
                        }
                        
                    </View>
                </View>
            );
        });
        
        return socialMedia;
    }

    facebookPageModal = () =>
        <Modal
            animationType={'slide'}
            visible={this.state.isFBModalVisible}
            transparent={true}
            onRequestClose={() => { 
                this.setState({ isFBModalVisible: false }); 
            }}
        > 
            <View style={style.FBModalContainer}>
                <View style={style.FBModalContent}>
                    <Text style={style.FBModalTitle}>Select a page you wanted to link</Text>
                    { this.state.facebookPages && this.state.facebookPages.map((page, index) => 
                        <TouchableOpacity
                            key={`fbpage${index}`}
                            style={{ 
                                flexDirection: 'row',
                                alignSelf: 'stretch',
                                marginVertical: 10,
                                borderRadius: 10,
                                elevation: 1,
                                padding: 10
                            }}

                            onPress={() => {
                                this.setState({ isFBModalVisible: false })
                                this.submitFacebook(page);
                            }}
                        >
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 10,
                                    marginRight: 10,
                                    alignSelf: 'center'
                                }}
                                resizeMode="cover"
                                source={{ uri: page.picture.data.url }}
                            />
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{ page.name }</Text>
                                <Text>{`followers: ${page.fan_count}`}</Text>
                            </View>
                             
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>

    instagramAccountModal = () =>
        <Modal
            animationType={'slide'}
            visible={this.state.isIGModalVisible}
            transparent={true}
            onRequestClose={() => { 
                this.setState({ isIGModalVisible: false }); 
            }}
        > 
            <View style={style.FBModalContainer}>
                <View style={style.FBModalContent}>
                    <Text style={style.FBModalTitle}>Select an account you wanted to link</Text>
                    { this.state.instagramAccounts && this.state.instagramAccounts.map((ig, index) => 
                        <TouchableOpacity
                            key={`igpage${index}`}
                            style={{ 
                                flexDirection: 'row',
                                alignSelf: 'stretch',
                                marginVertical: 10,
                                borderRadius: 10,
                                elevation: 1,
                                padding: 10
                            }}

                            onPress={() => {
                                this.setState({ isIGModalVisible: false })
                                this.submitInstagram(ig);
                            }}
                        >
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    alignSelf: 'center'
                                }}
                                resizeMode="cover"
                                source={{ uri: ig.connected_instagram_account.profile_picture_url }}
                            />
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{ ig.connected_instagram_account.username }</Text>
                                <Text>{`followers: ${ig.connected_instagram_account.followers_count}`}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>

    submitFacebook = (page) => {
        const socMed = this.props.profile.social_media.filter(sma => sma.type === 0);
        if(socMed.length === 0) {
            HttpRequest.post(URL.USER.LINKACCOUNT, {
                app_id: this.state.facebookCredential.applicationID,
                app_user_id: this.state.facebookCredential.userID,
                access_token: this.state.facebookCredential.accessToken,
                credential: JSON.stringify(this.state.facebookCredential),
                type: 0,
                type_name: 'facebook',
                username: '',
                user_link: '',
                profile_picture: '',
                page_id: page.id,
                page_name: page.name,
                page_username: page.username,
                page_access_token: page.access_token,
                page_link: page.link,
                page_fan_count: page.fan_count,
                page_profile_picture: page.picture.data.url,
            })
            .then(response => {
                console.log('success');

                firebase.auth().currentUser.linkWithCredential(this.state.credential)
                const user = response.data;
                this.props.dispatchGetProfile(user);
                this.props.navigation.navigate('Profile');
            })
            .catch(e => {
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
            })

            
        }
    }

    submitInstagram = (page) => {
        const socMed = this.props.profile.social_media.filter(sma => sma.type === 1);
        if(socMed.length === 0) {
            HttpRequest.post(URL.USER.LINKACCOUNT, {
                app_id: this.state.facebookCredential.applicationID,
                app_user_id: this.state.facebookCredential.userID,
                access_token: this.state.facebookCredential.accessToken,
                credential: JSON.stringify(this.state.facebookCredential),
                type: 1,
                type_name: 'instagram',
                username: '',
                user_link: '',
                profile_picture: '',
                page_id: page.connected_instagram_account.id,
                page_name: page.connected_instagram_account.name,
                page_username: page.connected_instagram_account.username,
                page_access_token: page.access_token,
                page_link: `https://www.instagram.com/${page.connected_instagram_account.username}`,
                page_fan_count: page.connected_instagram_account.followers_count,
                page_profile_picture: page.connected_instagram_account.profile_picture_url,
            })
            .then(response => {
                console.log('success');
                firebase.auth().currentUser.linkWithCredential(this.state.credential)
                const user = response.data;
                this.props.dispatchGetProfile(user);
                this.props.navigation.navigate('Profile');
            })
            .catch(e => {
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
            })
        }
    }

    linkAccount = authLink => {

      if (authLink === 'facebook') {
        SocialMediaController.facebook.connect(() => {
            AccessToken.getCurrentAccessToken().then(data => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                this.setState({ 
                    credential,
                    facebookCredential: data
                });
                
                new GraphRequestManager().addRequest(
                    new GraphRequest(
                        `/${data.userID}/accounts`, {
                            accessToken: data.accessToken,
                            parameters: {
                                fields: {
                                    string: 'id, access_token, name, link, fan_count, username, picture'
                                }
                            }
                        }, (error, pageListData) => {
                            if (error) {
                                this.setState({ 
                                    isFBModalVisible: true 
                                }); 
                                Alert.alert('Error retrieving data from Facebook');
                            } else {
                                console.log(pageListData.data);
                                this.setState({ 
                                    facebookPages: pageListData.data,
                                    isFBModalVisible: true 
                                }); 
                            }
                        }
                    )
                ).start();
            });
          }, error => {
              Alert.alert(error);
          })
         
      } else if (authLink == 'instagram') {
        SocialMediaController.facebook.connect(() => {
            AccessToken.getCurrentAccessToken().then(data => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                
                this.setState({ 
                    credential,
                    facebookCredential: data
                })
                
                console.log(credential);
                console.log(data);
                new GraphRequestManager().addRequest(
                    new GraphRequest(
                        `/${data.userID}/accounts`, {
                            accessToken: data.accessToken,
                            parameters: {
                                fields: {
                                    string: 'id,access_token,connected_instagram_account{follows_count,id,name,username,followers_count,profile_picture_url}'
                                }
                            }
                        }, (error, pageListData) => {
                            if (error) {
                                this.setState({ 
                                    isIGModalVisible: true 
                                }); 
                                Alert.alert('Error retrieving data from Instagram');
                                console.log(error);
                            } else {
                                console.log(pageListData.data);
                                this.setState({ 
                                    instagramAccounts: pageListData.data.filter(i => i.hasOwnProperty('connected_instagram_account')),
                                    isIGModalVisible: true 
                                }); 
                            }
                        }
                    )
                ).start();
            });
  
        }, error => {
            Alert.alert(error);
        })
      }
    }

    render = () => 
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={style.container}>
                    { this.editModal() }
                    { this.facebookPageModal() }
                    { this.instagramAccountModal() }

                    {/* PROFILE PHOTO */}
                        { this.formHeader('Profile Picture', 'profilePhoto') }
                        <View style={style.BodyContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.openImagePicker();
                                }}
                            >
                                <Image
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 150,
                                        alignSelf: 'center'
                                    }}
                                    resizeMode="cover"
                                    source={this.state.profilePhoto}
                                />
                            </TouchableOpacity>
                        </View>

                    {/* DESCRIPTION */}
                        { this.formHeader('Bio', 'description') }
                        <View style={style.BodyContainer}>
                            <Text>{(this.state.description === 'null' || this.state.description === null || this.state.description === '') ? 'Describe yourself...' : this.state.description}</Text>
                        </View>
                    
                    {/* GENDER */}
                        { this.formHeader('Gender', 'gender') }
                        <View style={style.BodyContainer}>
                            <Text>{
                                this.state.gender === null || this.state.gender === 0 ?
                                'State your gender' : 
                                GENDER[this.state.gender - 1]
                            }</Text>
                        </View>

                    {/* CONTACT NUMBER */}
                        { this.formHeader('Mobile Number', 'contact_number') }
                        <View style={style.BodyContainer}>
                            <Text>{(this.state.contact_number === '') ?
                                'Enter your contact number' :
                                `(${this.state.phone_prefix}) ${this.state.contact_number}`
                                }</Text>

                            {this.state.phone_verified === 1 ?
                                <Text style={style.phoneNumberVerified}>
                                    Verified
                                </Text> :
                                <Text style={style.phoneNumberNotVerified}>
                                    Not Verified
                                </Text>
                            }
                        </View>

                    {/* BIRTH DATE */}
                        { this.formHeader('Birth Date', 'birthdate') }
                        <View style={style.BodyContainer}>
                            { this.state.birthdate == '1971-01-01' ?
                                <Text>Enter your birth date</Text>  :
                                <Text>{moment(this.state.birthdate).format('MMM DD, YYYY')}</Text>
                            }
                        </View>

                    {/* Location */}
                        { this.formHeader('Location', 'location') }
                        <View style={style.BodyContainer}>
                            <Text>
                                {(this.state.location === '') ?
                                    'City or Province not defined' :
                                    this.state.location
                                }
                            </Text>
                            <Text>
                                { this.state.country_text }
                            </Text>
                        </View>
                        
                    
                    {/* SOCIAL MEDIA */}
                        <Text style={style.title}>Social Media</Text>
                        { this.socialMedia() }
                                
                </View>
                
            </ScrollView>

            {/* SAVE BUTTON */}
            <TouchableOpacity style={style.saveButton} onPress={() => { this.submit(); }}>
                { (!this.state.isSaving) ? 
                <Text style={style.saveButtonText}>SAVE</Text> : 
                <ActivityIndicator size="small" color="#fff" />
                }
                
            </TouchableOpacity>
        </View>
}

const mapStateToProps = state => ({
    profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
    dispatchGetProfile: user => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
    linkAccount: authLink => dispatch(AuthAction.firebase.linkAccount(authLink))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
