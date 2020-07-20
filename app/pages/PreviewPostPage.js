import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { GradientButton, WhiteButton } from '../components/Button';
import NavigationService from '../services/navigation';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';
import { CampaignAction } from '../redux/actions/campaign.action';

class PreviewPostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.navigation.getParam('post'),
            link: this.props.navigation.getParam('link'),
            postUrl: '',
            target: '',
            html: '',
            // https://www.instagram.com/p/BfUkRr4lCoT
            // https://www.facebook.com/story.php?story_fbid=2856424027744864&id=100001318834556
        };
    }

    componentDidMount() {
        const link = this.props.navigation.getParam('link');
        let postUrl = '';

        if (link.search('www.facebook.com') !== -1) {
            postUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(link)}&show_text=true&height=500`;
        } else if (link.search('www.instagram.com') !== -1) {
            postUrl = `${link}/embed`;
        }

        this.setState({
            postUrl,
            html: `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="postion: relative; height: 100%">
                
                    <iframe src=${postUrl}
                        allowTransparency="true" allow="encrypted-media"
                        width='100%'
                        height='100%'
                        frameBorder=1
                        style="border:none;overflow:hidden" 
                        scrolling="no"
                        style="position: relative; z-index: 0;"
                    >
                    </iframe>
                    <div style="background-color: transparent; opacity: 0; width: 100%; height: 100%;position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1">
                    </div>
                </body>
            </html>`,
           
        })
    }

    submit = () => {
        HttpRequest.get(URL.SOCIALMEDIA.POST.LIVESUBMIT, { link: this.state.postUrl, post_id: this.state.post.id })
        .then(() => {
            this.props.getMyList();
            NavigationService.navigate('MyCampaign');
        }).catch(e => {
            console.log('Error removing from list');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        });
    }

    render = () =>
        <View style={{ flex: 1 }}>

                <WebView 
                    source={{ html: this.state.html }} 
                    
                />
            
            
            <View
                style={{
                    zIndex: 1,
                    alignSelf: 'stretch',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    padding: 20,
                    elevation: 20
                }}
            >
                <Text>Is this your post?</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <WhiteButton
                            text={'No'}
                            onPress={() => { 
                                NavigationService.navigate('MyCampaign');
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <GradientButton
                        
                            text={'Yes, Send'}
                            onPress={() => { 
                                this.submit();
                            }}
                        />
                    </View>
                    
                </View>
            </View>

        </View>
}

const mapStateToProps = state => ({
    user: state.user.profile
});

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

export default connect(mapStateToProps, mapDispatchtoProps)(PreviewPostPage);
