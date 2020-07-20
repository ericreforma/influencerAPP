import { CAMPAIGN } from './types.action';
import { HttpRequest } from '../../services/http';
import { URL } from '../../config/url';
import { TokenSchema } from '../../database';

export const CampaignAction = {
    browse: (callback) => dispatch => {
        dispatch({ type: CAMPAIGN.BROWSE.REQUEST });
        
        HttpRequest.get(URL.CAMPAIGN.BROWSE)
        .then(response => {
            dispatch({ type: CAMPAIGN.BROWSE.SUCCESS, home: response.data });
            callback();
        })
        .catch(e => {
            console.log('error');
            console.log(e);
        });
    },
    
    getMyList: (callback = null) => dispatch => {
        dispatch({ type: CAMPAIGN.MYLIST.REQUEST });

        HttpRequest.get(URL.CAMPAIGN.LIST)
        .then(response => {
            dispatch({ type: CAMPAIGN.MYLIST.SUCCESS, myList: response.data });
            if (callback) { callback(); }
        })
        .catch(e => {
            if (callback) { callback(); }
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
            TokenSchema.revoke();
        });
    }
};
