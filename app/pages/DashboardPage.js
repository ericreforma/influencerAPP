import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    Modal,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {
    CommonText,
    LabelText,
    OtherTextButton
} from '../components/Text';
import ButtonGradient from '../components/ButtonGradient';
import ButtonWhite from '../components/ButtonWhite';
import Header from '../components/Header';

import theme from '../styles/theme.style';
import lang from '../assets/language/dashboard';

export default class DashboardPage extends Component {
    state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        campaign: {
            id: 10,
            status: 0,
            sma: 0,
            client: 'Mcdo Philippines',
            name: 'Burger Mcdo',
            hashes_n_tags: [
                '#Lovekoto',
                '@McdoPh'
            ]
        },

        totalPosts: [
            {
                id: 4,
                campaign_id: 10,
                post_num: 1,
                image: require('../assets/image/post_sample_pic1.png'),
                title: 'Lorem Test',
                caption: 'Lorem ipsum dolor sit amet.',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                status: 0,
                revision: 1,
                date: '2019-03-30 12:12:00',
            },{
                id: 5,
                campaign_id: 10,
                post_num: 1,
                image: require('../assets/image/post_sample_pic1.png'),
                title: 'Lorem Ipsum Dolor',
                caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                status: 0,
                revision: 2,
                date: '2019-03-30 15:00:00',
            }
        ],
        posts: [
            {
                id: 5,
                campaign_id: 10,
                post_num: 1,
                image: require('../assets/image/post_sample_pic1.png'),
                title: 'Lorem Ipsum Dolor',
                caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
                hashes_n_tags: [
                    '#Lovekoto',
                    '@McdoPh'
                ],
                status: 0,
                revision: 2,
                date: '2019-03-30 15:00:00',
            }
        ],

        // add posts modal
        titleText: '',
        captionText: '',
        hntText: '',
        hntArray: [],
        addPost: true,
        editPostData: {},
        addPostModalVisible: false,

        // view previous revisions modal
        previousRevisionModal: false,
        previousRevisionPostNum: 0,
    }
    
    // other functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deadlineDate = (dates, timeInclude, header) => {
        var d = dates.split(' ')[0],
            time = dates.split(' ')[1],
            year = d.split('-')[0],
            month = parseInt(d.split('-')[1]),
            date = d.split('-')[2],
            hour = parseInt(time.split(':')[0]),
            min = time.split(':')[1],
            months = [
                'JAN', 'FEB', 'MAR', 'APR',
                'MAY', 'JUN', 'JUL', 'AUG',
                'SEP', 'OCT', 'NOV', 'DEC'
            ],
            time = hour == 0 ? '12:' + min + ' AM' : (
                hour < 13 ? (hour.length < 10 ? '0' + hour.toString() : hour) + ':' + min + ' AM' : (
                    ((hour - 12) < 10 ? '0' + (hour - 12).toString() : (hour - 12)) + ':' + min + ' PM'
                )
            );
    
        if(timeInclude) {
            return time + ' - ' + months[month] + '. ' + date + ', ' + year;
        } else {
            return header ? (
                months[month] + '.' + date + '.' + year
            ) : (
                months[month] + '. ' + date + ', ' + year
            );
        }
    }
    // end other functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    

    // add post part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    addPostOnPress = () => {
        this.setState({
            titleText: '',
            captionText: '',
            hntText: '',
            hntArray: [],
            editPostData: {},
            addPost: true
        });
        this.addPostModalToggle();
    }

    addPostModalToggle = () => {
        this.setState({addPostModalVisible: !this.state.addPostModalVisible});
    }

    savePostOnPress = () => {
        var title = this.state.titleText,
            caption = this.state.captionText,
            hnt = this.state.hntArray,
            addPost = this.state.addPost,
            posts = this.state.posts,
            totalPosts = this.state.totalPosts,
            campaign = this.state.campaign,
            d = new Date(),
            year = d.getFullYear(),
            month = ('0' + (d.getMonth() + 1)).slice(-2) ,
            date = ('0' + d.getDate()).slice(-2),
            hour = ('0' + d.getHours()).slice(-2),
            min = ('0' + d.getMinutes()).slice(-2),
            sec = ('0' + d.getSeconds()).slice(-2),
            timestamp = [year, month, date].join('-') + ' ' + [hour, min, sec].join(':'),
            postResult,
            proceed = true;

        if(addPost) {
            if(title !== '' && caption !== '') {
                // result of the submission of data into database
                var postsId = posts.map(p => p.id)
                    postNums = posts.map(p => p.post_num);

                postResult = {
                    id: Math.max.apply(null, postsId) + 1,
                    campaign_id: 10,
                    post_num: Math.max.apply(null, postNums),
                    image: require('../assets/image/post_sample_pic2.png'),
                    title: title,
                    caption: caption,
                    hashes_n_tags: hnt.length == 0 ? campaign.hashes_n_tags : hnt,
                    status: 0,
                    revision: 1,
                    date: timestamp,
                };
    
                posts.push(postResult);
                totalPosts.push(postResult);
                alert('Post submitted!');
            } else {
                alert('Please fill up all of the input fields to proceed');
                proceed = false;
            }
        } else {
            var postsId = posts.map(p => p.id),
                index = postsId.indexOf(this.state.editPostData.id)
                post = posts[index];

            postResult = {
                id: Math.max.apply(null, postsId) + 1,
                campaign_id: campaign.id,
                post_num: post.post_num,
                image: post.image,
                title: title,
                caption: caption,
                hashes_n_tags: hnt.length == 0 ? post.hashes_n_tags : hnt,
                status: post.status,
                revision: post.revision + 1,
                date: timestamp,
            };

            posts.splice(index, 1, postResult);
            totalPosts.push(postResult);
            alert('Post submitted!');
        }

        if(proceed) {
            this.setState({
                posts: posts,
                totalPosts: totalPosts
            });
            this.addPostModalToggle();
        }
    }
    // add post end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // edit part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    editPostOnPress = (item) => () => {
        this.setState({
            editPostData: item,
            addPost: false,
            titleText: item.title,
            captionText: item.caption
        });

        this.addPostModalToggle();
    }
    // end edit part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    
    // view previous revisions part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    previousRevisionOnPress = (postNum) => () => {
        this.setState({previousRevisionPostNum: postNum});
        this.togglePreviousRevisionModal();
    }

    togglePreviousRevisionModal = () => {
        this.setState({previousRevisionModal: !this.state.previousRevisionModal});
    }
    // view previous revisions end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    render() {
        var item = this.state.campaign;
        return (
            <Header
                navigation={this.props.navigation}
                backButtonShow={true}
            >
                {/* add and edit post */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.addPostModalVisible}
                >
                    <View
                        style={{
                            backgroundColor: theme.COLOR_BLACK + '70',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: theme.HORIZONTAL_PADDING,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <ScrollView
                                contentContainerStyle={{
                                    paddingVertical: 50,
                                }}
                                showsVerticalScrollIndicator={false}
                                overScrollMode="never"
                            >
                                <View
                                    style={{
                                        backgroundColor: theme.COLOR_WHITE,
                                        borderRadius: theme.BORDER_RADIUS
                                    }}
                                >
                                    {/* photo section */}
                                    <View
                                        style={{
                                            borderTopLeftRadius: theme.BORDER_RADIUS,
                                            borderTopRightRadius: theme.BORDER_RADIUS,
                                            width: '100%',
                                            height: (this.state.width - 40) * (1.4/3),
                                            backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {this.state.addPost ? (
                                            <TouchableOpacity
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 35,
                                                        height: 35,
                                                        marginBottom: 10
                                                    }}
                                                    resizeMode="contain"
                                                    source={theme.uploadIcon}
                                                />

                                                <CommonText
                                                    size="small"
                                                    yellow={true}
                                                    text={"upload photo"}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <Image
                                                style={{
                                                    borderTopLeftRadius: theme.BORDER_RADIUS,
                                                    borderTopRightRadius: theme.BORDER_RADIUS,
                                                    width: '100%',
                                                    height: (this.state.width - 40) * (1.4/3),
                                                }}
                                                resizeMode="cover"
                                                source={this.state.editPostData.image}
                                            />
                                        )}
                                    </View>
                            
                                    <View
                                        style={{
                                            borderBottomLeftRadius: theme.BORDER_RADIUS,
                                            borderBottomRightRadius: theme.BORDER_RADIUS,
                                            backgroundColor: theme.COLOR_WHITE,
                                            padding: theme.HORIZONTAL_PADDING
                                        }}
                                    >
                                        {/* title */}
                                        <TextInput
                                            style={{
                                                fontFamily: 'AvenirLTStd-Medium',
                                                fontSize: theme.FONT_SIZE_MEDIUM,
                                                color: theme.COLOR_GRAY_HEAVY,
                                                borderWidth: 0.5,
                                                marginBottom: 20,
                                                borderColor: theme.COLOR_GRAY_HEAVY,
                                                borderRadius: theme.INPUT_BORDER_RADIUS,
                                                paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING - 5
                                            }}
                                            placeholder={"Title here"}
                                            placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
                                            value={this.state.titleText}
                                            onChangeText={(titleText) => this.setState({titleText})}
                                        />

                                        {/* caption */}
                                        <TextInput
                                            style={{
                                                fontFamily: 'AvenirLTStd-Medium',
                                                fontSize: theme.FONT_SIZE_SMALL,
                                                color: theme.COLOR_GRAY_HEAVY,
                                                borderWidth: 0.5,
                                                marginBottom: 20,
                                                borderColor: theme.COLOR_GRAY_HEAVY,
                                                borderRadius: theme.INPUT_BORDER_RADIUS,
                                                height: 200,
                                                paddingVertical: 15,
                                                paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING - 5,
                                                textAlignVertical: 'top'
                                            }}
                                            placeholder={"Caption here"}
                                            placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
                                            multiline={true}
                                            value={this.state.captionText}
                                            onChangeText={(captionText) => this.setState({captionText})}
                                        />

                                        {/* hashes and tags */}
                                        {item.hashes_n_tags.length === 0 ? (
                                            <TextInput
                                                style={{
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    fontSize: theme.FONT_SIZE_SMALL,
                                                    color: theme.COLOR_GRAY_HEAVY,
                                                    borderWidth: 0.5,
                                                    marginBottom: 30,
                                                    borderColor: theme.COLOR_GRAY_HEAVY,
                                                    borderRadius: theme.INPUT_BORDER_RADIUS,
                                                    paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING - 5
                                                }}
                                                placeholder={"Hashes and tags here"}
                                                placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
                                                value={this.state.hntText}
                                                onChangeText={(hntText) => this.setState({hntText})}
                                            />
                                        ) : (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    borderWidth: 0.5,
                                                    marginBottom: 30,
                                                    borderColor: theme.COLOR_GRAY_HEAVY,
                                                    borderRadius: theme.INPUT_BORDER_RADIUS,
                                                    paddingHorizontal: theme.INPUT_HORIZONTAL_PADDING - 5,
                                                    paddingVertical: 15
                                                }}
                                            >
                                                {item.hashes_n_tags.map((hnt, hntIdx) =>
                                                    <View
                                                        key={hntIdx}
                                                        style={{
                                                            marginRight: 7,
                                                            flexDirection: 'row'
                                                        }}
                                                    >
                                                        <CommonText
                                                            size="small"
                                                            blue={true}
                                                            text={hnt.charAt(0)}
                                                        />
                                                        
                                                        <CommonText
                                                            size="small"
                                                            dark={true}
                                                            text={hnt.substr(1, hnt.length - 1)}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        )}

                                        {/* status */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    marginRight: 7
                                                }}
                                            >
                                                <CommonText
                                                    size="small"
                                                    text={"Status"}
                                                />
                                            </View>

                                            <CommonText
                                                size="small"
                                                red={item.status !== 1 ? true : false}
                                                blue={item.status === 1 ? true : false}
                                                text={lang.statusText[this.state.addPost ? 0 : this.state.editPostData.status]}
                                            />
                                        </View>

                                        {/* action buttons section */}
                                        <View
                                            style={{
                                                marginTop: 20
                                            }}
                                        >
                                            <ButtonGradient
                                                text={this.state.addPost ? 'Submit' : 'Save'}
                                                onPress={this.savePostOnPress}
                                            />

                                            <ButtonWhite
                                                border={true}
                                                text={"Cancel"}
                                                onPress={this.addPostModalToggle}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* view previous post modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.previousRevisionModal}
                >
                    <View
                        style={{
                            backgroundColor: theme.COLOR_BLACK + '70',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: theme.HORIZONTAL_PADDING,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                borderRadius: theme.BORDER_RADIUS,
                                padding: theme.HORIZONTAL_PADDING,
                                backgroundColor: theme.COLOR_WHITE
                            }}
                        >
                            <View
                                style={{
                                    marginBottom: 20
                                }}
                            >
                                {this.state.totalPosts
                                    .filter(tp => tp.post_num == this.state.previousRevisionPostNum)
                                    .map(post =>
                                        <View
                                            key={post.revision}
                                            style={{
                                                marginVertical: 7
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: 5
                                                }}
                                            >
                                                <CommonText
                                                    size="small"
                                                    text={"Revision - " + post.revision}
                                                />

                                                <CommonText
                                                    size="small"
                                                    red={item.status !== 1 ? true : false}
                                                    blue={item.status === 1 ? true : false}
                                                    text={lang.statusText[post.status]}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    height: (this.state.width - 60) * (1.4/3),
                                                    backgroundColor: theme.COLOR_BLACK
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: '100%',
                                                        height: (this.state.width - 60) * (1.4/3),
                                                    }}
                                                    resizeMode="cover"
                                                    source={post.image}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    borderColor: theme.COLOR_YELLOW_HEAVY,
                                                    borderBottomWidth: 3,
                                                    padding: 15
                                                }}
                                            >

                                            </View>
                                        </View>    
                                    )
                                }
                            </View>

                            <ButtonWhite
                                text={"Close"}
                                border={true}
                                onPress={this.togglePreviousRevisionModal}
                            />
                        </View>
                    </View>
                </Modal>

                <View
                    style={{
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    <View
                        style={{
                            borderBottomWidth: 3,
                            borderColor: theme.COLOR_YELLOW_HEAVY,
                            paddingBottom: 13,
                            marginBottom: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <LabelText
                                size="large"
                                dark={true}
                                text={this.state.campaign.name}
                            />

                            <CommonText
                                size="small"
                                dark={true}
                                text={this.state.campaign.client}
                            />
                        </View>
                        
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    height: 34,
                                    width: 34,
                                    backgroundColor: theme.COLOR_WHITE + '00'
                                }}
                                resizeMode="contain"
                                source={require('../assets/image/app_icon.png')}
                            />

                            <View
                                style={{
                                    position: 'absolute',
                                    left: 7,
                                }}
                            >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    resizeMode="contain"
                                    source={theme.smaIcons[this.state.campaign.sma]}
                                />
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            marginBottom: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >  
                        {this.state.posts.length === 0 ? (
                            <View
                                style={{
                                    paddingVertical: 10
                                }}
                            >
                                <CommonText
                                    size="small"
                                    text={"-- no posts has been made --"}
                                />
                            </View>
                        ) : this.state.posts.map((post, postIdx) =>
                            <View
                                key={post.id}
                                style={{
                                    width: '100%',
                                    marginVertical: 10
                                }}
                            >
                                {/* status with post number */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        marginBottom: 5
                                    }}
                                >
                                    <CommonText
                                        size="small"
                                        text={"Post " + (postIdx + 1) + ": "}
                                    />

                                    <CommonText
                                        size="small"
                                        red={item.status !== 1 ? true : false}
                                        blue={item.status === 1 ? true : false}
                                        text={lang.statusText[post.status]}
                                    />
                                </View>
                           
                                {/* post data */}
                                <View
                                    style={{
                                        padding: theme.HEADER_PADDING_VERTICAL,
                                        borderRadius: 5,
                                        borderColor: theme.COLOR_GRAY_MEDIUM,
                                        borderWidth: 0.5,
                                        backgroundColor: theme.COLOR_WHITE,
                                        marginBottom: 5,
                                        width: '100%'
                                    }}
                                >
                                    <View
                                        style={{
                                            height: (this.state.width - 60) * (1.4/3),
                                            backgroundColor: theme.COLOR_BLACK
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: (this.state.width - 60) * (1.4/3),
                                            }}
                                            resizeMode="cover"
                                            source={post.image}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <LabelText
                                                size="medium"
                                                text={post.title.length <= 22 ? post.title : post.title.substr(0, 22) + '...'}
                                            />

                                            <CommonText
                                                size="xsmall"
                                                text={this.deadlineDate(post.date, false, true)}
                                            />
                                        </View>
                                        
                                        <View
                                            style={{
                                                paddingTop: 5
                                            }}
                                        >
                                            <OtherTextButton
                                                size="small"
                                                text={"Edit post"}
                                                onPress={this.editPostOnPress(post)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            
                                {/* revision */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CommonText
                                        size="small"
                                        text={"Revision/s (" + post.revision + ")"}
                                    />

                                    <OtherTextButton
                                        size="small"
                                        text={"View previous revisions"}
                                        onPress={this.previousRevisionOnPress(post.post_num)}
                                    />
                                </View>
                            </View>
                        )}
                    </View>

                    {/* add more post button */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 10,
                            zIndex: -1
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={this.addPostOnPress}
                        >
                            <Image
                                style={{
                                    width: 22,
                                    height: 22,
                                    marginRight: 10
                                }}
                                resizeMode="contain"
                                source={theme.addIcon}
                            />

                            <CommonText
                                size="small"
                                text={"Add more posts"}
                            />
                        </TouchableOpacity>
                    </View>

                    <ButtonWhite
                        border={true}
                        text={"Find more campaigns"}
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            </Header>
        )
    }
}
