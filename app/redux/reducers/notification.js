import { NOTIFICATION } from '../actions/types.action';

const initialState = {
    all: [],
    unread: []
};

export function notification(state = initialState, action) {
    switch (action.type) {
        case NOTIFICATION.GET.REQUEST:
            return Object.assign({}, state, {
                requesting: true
            });

        case NOTIFICATION.GET.SUCCESS:
            return Object.assign({}, state, {
                all: action.notifs.all,
                unread: action.notifs.unread,
            });

        case NOTIFICATION.GET.FAILED:
            return Object.assign({}, state, {
                requesting: true
            });

        default:
            return state;
    }
}