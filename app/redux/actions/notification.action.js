import { NOTIFICATION } from './types.action';
import { HttpRequest } from '../../services/http';
import { URL } from '../../config/url';

export const NotificationAction = {
    get: () => dispatch => {
        dispatch({ type: NOTIFICATION.GET.REQUEST });
        
        HttpRequest.get(URL.NOTIFICATION.GET)
        .then(response => {
            dispatch({ type: NOTIFICATION.GET.SUCCESS, notifs: response.data });
        })
        .catch(e => {
            console.log('error');
            console.log(e);
        });
    },
};
