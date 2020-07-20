import { USER } from '../actions/types.action';

const initialState = {
    profile: null,
};

export function user(state = initialState, action) {
    switch (action.type) {

        case USER.GET.PROFILE.REQUEST:
            return Object.assign({}, state, {
                profile: initialState.user
            });
        case USER.GET.PROFILE.SUCCESS:
            return Object.assign({}, state, {
                profile: action.user
            });
        case USER.GET.PROFILE.FAILED:
            return Object.assign({}, state, {
                profile: initialState.user
            });
        default:
        return state;
    }
}
