const localhost = 'http://10.0.2.2';
const bcdhost = 'https://www.thehatchery.app';

const HOST = bcdhost;
const SERVER = `${HOST}`;
const SERVER_API = `${SERVER}/api`;
const SERVER_STORAGE = `${SERVER}/storage`;

export const URL = {
  SERVER,
  SERVER_API,
  SERVER_STORAGE,
  HOST,
  FIREBASE: {
    LOGIN: `${SERVER_API}/user/firebase/login`,
    SIGNUP: `${SERVER_API}/user/firebase/signup`,
  }, 

  CHAT: {
    SESSION: {
      LIST: `${SERVER_API}/user/chat/session/list`,
      CREATE: `${SERVER_API}/user/chat/session/create`,
    },
    SEND: `${SERVER_API}/user/chat/send`,
    DELETE: `${SERVER_API}/user/chat/delete`,
    HISTORY: `${SERVER_API}/user/chat/history`,
  },

  USER: {
    LOGIN: `${SERVER_API}/user/login`,
    LOGOUT: `${SERVER_API}/user/logout`,
    SIGNUP: `${SERVER_API}/user/signup`,
    PROFILE: `${SERVER_API}/user`,
    PROFILE_UPDATE: `${SERVER_API}/user/update`,
    VERIFYCODE: `${SERVER_API}/user/verifyCode`,
    VERIFYCODERESEND: `${SERVER_API}/user/verifyCodeResend`,
    FCM: {
      TOKEN_UPDATE: `${SERVER_API}/user/fcm/token_update`,
    },
    LINKACCOUNT: `${SERVER_API}/user/linkAccount`,
  },

  CAMPAIGN: {
    LIST: `${SERVER_API}/user/campaign/list`, 
    DETAILS: `${SERVER_API}/user/client/campaign/details`, 
    BROWSE: `${SERVER_API}/user/client/campaign/browse`,
    INTERESTED: `${SERVER_API}/user/client/campaign/interested`, 
    UNINTERESTED: `${SERVER_API}/user/client/campaign/uninterested`, 
    VIEWALL: `${SERVER_API}/user/client/campaign/viewall`, 
  },
      
  SOCIALMEDIA: {
    POST: {
      ADD: `${SERVER_API}/user/socialmedia/post/add`, 
      DETAILS: `${SERVER_API}/user/socialmedia/post/details`,
      UPDATE: `${SERVER_API}/user/socialmedia/post/update`,
      CANCEL: `${SERVER_API}/user/socialmedia/post/cancel`,
      LIVESUBMIT: `${SERVER_API}/user/socialmedia/post/liveSubmit`,
      SETFEATURED: `${SERVER_API}/user/socialmedia/post/setFeatured`,
    },
  },
  
  EVENT: {
    APPLY: `${SERVER_API}/user/event/apply`, 
  },

  CATEGORY: {
    BROWSE: `${SERVER_API}/user/category/browse`, 
    LIST: `${SERVER_API}/user/category/list`,
    SAVE: `${SERVER_API}/user/category/save`,
  },
  REPORT: `${SERVER_API}/user/reportProblem`, 
  NOTIFICATION: {
    GET: `${SERVER_API}/user/notification`,
    OPENED: `${SERVER_API}/user/notification/opened`
  },
  ENV: {
    COUNTRY: {
      LIST: `${SERVER_API}/env/country/list`
    }
  },
  TEST: {
    MAIL: `${SERVER_API}/user/testMail`
  }
  
};
