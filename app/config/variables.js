const SOCIALMEDIA = {
  facebook: {
    id: 0,
    name: 'facebook',
    prettyname: 'Facebook',
    shortname: 'FB',
    icon: require('../assets/image/icons/facebook_icon.png'),
    icon_colored: require('../assets/image/icons/facebook.png')
  },
  instagram: {
    id: 1,
    name: 'instagram',
    prettyname: 'Instagram',
    shortname: 'IG',
    icon: require('../assets/image/icons/instagram_icon.png'),
    icon_colored: require('../assets/image/icons/instagram.png')
  },
  youtube: {
    id: 2,
    name: 'youtube',
    prettyname: 'YouTube',
    shortname: 'YouTube',
    icon: require('../assets/image/icons/youtube_icon.png'),
    icon_colored: require('../assets/image/icons/youtube.png')
  },
  twitter: {
    id: 3,
    name: 'twitter',
    prettyname: 'Twitter',
    shortname: 'Twitter',
    icon: require('../assets/image/icons/twitter_icon.png'),
    icon_colored: require('../assets/image/icons/twitter.png')
  },
  google: {
    id: 4,
    name: 'google',
    prettyname: 'Google',
    shortname: 'G+',
    icon: require('../assets/image/icons/google_icon.png'),
    icon_colored: require('../assets/image/icons/google_icon.png')
    
  }
};

const FIREBASE = {
  GCM: '553833031460'
};

const GENDER = [
    'Male',
    'Female',
    'LGBT',
    'Any',
  ];

const ENGAGEMENT = [
    'Like',
    'Comment',
    'Share',
    'View',
  ];
  
const POST_STATUS = [
    'Pending',
    'Declined',
    'Approved',
    'Running',
    'Completed'
];

export {
  SOCIALMEDIA,
  GENDER,
  ENGAGEMENT,
  POST_STATUS,
  FIREBASE
};
