import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export const SocialMediaController = {
    facebook: {
        connect: (success, failed) => {
            AccessToken.getCurrentAccessToken().then(data => {
                if (data === null) {
                    LoginManager.logInWithPermissions([
                        'public_profile', 
                        'email',
                        'groups_access_member_info',
                        'publish_to_groups',
                        'user_age_range',
                        'user_birthday',
                        'user_friends',
                        'user_gender',
                        'user_hometown',
                        'user_likes',
                        'user_link',
                        'user_location',
                        'user_photos',
                        'user_posts',
                        'user_videos',
                        'manage_pages',
                        'instagram_manage_insights',
                        'instagram_basic',
                        'pages_show_list'
                        ])
                        .then((result) => {
                            if (result.isCancelled) {
                                failed("Sign in cancelled");
                            } else {
                                success();
                            }
                    })
                    .catch((error) => {
                        console.log('Facebook Login error');
                        console.log(error);
                        failed();
                    });
                } else {
                    success();
                }
            });
        },
        getPages: {

        },
        getPosts: (credential, success, failed) => {
            new GraphRequestManager().addRequest(
                new GraphRequest(
                    `/${credential.page_id}/posts`, {
                        parameters: {
                            fields: {
                                string: 'id, full_picture, message, attachments, likes.summary(true), comments.summary(true), permalink_url, shares, created_time'
                            }
                        },
                        accessToken: credential.page_access_token,
                    }, (error, postList) => {
                        if (error) {
                            console.log(error);
                            failed();
                        } else {
                            const withAttachments = postList.data.filter(post => post.hasOwnProperty('attachments'));
                            const filtered = withAttachments.filter(post => 
                                post.attachments.data[0].type === 'photo' ||
                                post.attachments.data[0].type === 'album' ||
                                post.attachments.data[0].type === 'video' ||
                                post.attachments.data[0].type === 'video_autoplay' ||
                                post.attachments.data[0].type === 'video_inline');

                            success(filtered);
                        }
                    }
                )
            ).start();
        },
        getPost: (credential, postId, success, failed) => {
            new GraphRequestManager().addRequest(
                new GraphRequest(
                    `/${postId}`, {
                        parameters: {
                            fields: {
                                string: 'id, full_picture, message, attachments, likes.summary(true), comments.summary(true), permalink_url, shares, created_time'
                            }
                        },
                        accessToken: credential.page_access_token,
                    }, (error, postList) => {
                        if (error) {
                            console.log(error);
                            failed();
                        } else {
                            success(postList);
                        }
                    }
                )
            ).start();
        }
    },
    instagram: {
        getPosts: (credential, success, failed) => {
            new GraphRequestManager().addRequest(
                new GraphRequest(
                    `/${credential.page_id}/media`, {
                        parameters: {
                            fields: {
                                string: 'id,caption,children,comments_count,like_count,media_type,media_url,permalink,timestamp'
                            }
                        },
                        accessToken: credential.page_access_token,
                    }, (error, postList) => {
                        if (error) {
                            console.log(error);
                            failed();
                        } else {
                            success(postList.data);
                        }
                    }
                )
            ).start();
        },
        getPost: (credential, postId, success, failed) => {
            new GraphRequestManager().addRequest(
                new GraphRequest(
                    `/${postId}`, {
                        parameters: {
                            fields: {
                                string: 'id,caption,children,comments_count,like_count,media_type,media_url,permalink,timestamp'
                            }
                        },
                        accessToken: credential.page_access_token,
                    }, (error, postList) => {
                        if (error) {
                            console.log(error);
                            failed();
                        } else {
                            success(postList);
                            console.log(postList);
                        }
                    }
                )
            ).start();
        },
    }
}