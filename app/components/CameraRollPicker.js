import React, { useState, useEffect, useCallback } from 'react';
import { PermissionsAndroid,
         ScrollView, View, Text, Image, Dimensions,
         TouchableOpacity
    } from 'react-native';
import Modal from 'react-native-modal';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-picker';
import image from '../assets';
import { GradientButton } from './Button';
import { requestPermission } from '../config/permission';
import style from '../styles/component.CameraRoll.style';
import DropDownPicker from 'react-native-dropdown-picker';

const CameraRollPicker = props => {
    const [photos, setPhotos] = useState([]);
    const width = Dimensions.get('window').width;
    const [selectedMedia, setSelectedMedia] = useState(props.currentMedia);
    const [albums, setAlbums] = useState([]);

    const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ];

    useEffect(() => {
        setSelectedMedia(props.currentMedia);
    }, [props.currentMedia]);

    const filterPhotos = useCallback(value => {
        CameraRoll.getPhotos({
            first: 500,
            assetType: 'All',
            groupName: value
        }).then(m => {
            setPhotos(m.edges);
        }).catch(e => {
            console.log(e);
        });
    });

    const choosePhoto = useCallback(photo => {
        const isExist = selectedMedia.find(x => x.node.image.filename === photo.node.image.filename);
        if (isExist === undefined) {
            setSelectedMedia([...selectedMedia, photo]);
        } else {
            setSelectedMedia(selectedMedia.filter(x => x.node.image.filename !== photo.node.image.filename));
        }
    });

    useEffect(() => {
        requestPermission(permissions, () => {
           
            CameraRoll.getAlbums({
                assetType: 'All'
            }).then(m => {
                const albumData = [];

                m.map(a => {
                    albumData.push({ label: a.title, value: a.title });
                });

                setAlbums(albumData);
                filterPhotos(albumData[0].value);
            }).catch(e => {
                console.log(e);
            });

        }, () => {
            console.log('error loading permission');
        });
    }, []);
    
    const camera = () => 
        ImagePicker.launchCamera({
            title: 'Select photos',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }, response => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const p = {
                    node: {
                        type: response.type,
                        image: {
                            uri: response.uri,
                            filename: response.fileName
                        }
                    }
                };
                const selectedMedias = selectedMedia;
                selectedMedias.push(p);

                setSelectedMedia(selectedMedias);
            }
        });

    const selectPhotos = useCallback(() => {
        props.onSelect(selectedMedia);
    });

    return (
        <Modal 
            isVisible={props.isVisible}
            style={[style.modal, {
                height: Dimensions.get('window').height
            }]}
            onBackButtonPress={() => {
                props.onBackButtonPress();
            }}
        >
            <View style={style.wrapper}>
                
                <DropDownPicker
                    items={albums}
                    defaultIndex={0}
                    containerStyle={{ 
                        height: 40,
                        width: 150,
                    }}
                    style={{ 
                        backgroundColor: '#fff', 
                        borderWidth: 0, 
                        
                    }}
                    dropDownStyle={{ backgroundColor: '#fff'}}
                    onChangeItem={item => filterPhotos(item.value)}
                />
                <TouchableOpacity 
                    style={style.camerabutton}
                    onPress={() => { camera(); }}
                >
                    <View style={[style.camera, { width: 25, height: 25 }]}> 
                        <Image 
                            style={{ width: 25, height: 25 }}
                            source={image.icon.camera} 
                        />
                    </View>
                </TouchableOpacity>
                
                <ScrollView>
                    <View style={style.container}>
                        { photos && photos.map((m, index) => 
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => choosePhoto(m)}
                                >
                                    <Image 
                                        style={{ 
                                            width: (width / 3), 
                                            height: (width / 3),
                                            
                                        }}
                                        source={{ uri: m.node.image.uri }} 
                                    />
                                    <View style={[
                                        style.selection, 
                                        selectedMedia.find(x => x.node.image.filename === m.node.image.filename) ?
                                        style.selected : {}
                                     ]}>

                                    </View>
                                </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>

                <GradientButton 
                    text={`Select Photos (${selectedMedia.length})`} 
                    style={{ marginBottom: 10, marginHorizontal: 25 }} 
                    onPress={() => { selectPhotos(); }}    
                />        
            </View>
        </Modal>
    );
};

export default CameraRollPicker;
