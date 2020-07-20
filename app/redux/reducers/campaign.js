import { CAMPAIGN } from '../actions/types.action';

const initialState = {
    home: null,
    requesting: false,
    myCampaigns: null,
};

export function campaign(state = initialState, action) {
    switch (action.type) {
        case CAMPAIGN.BROWSE.REQUEST:
            return Object.assign({}, state, {
                requesting: true
            });

        case CAMPAIGN.BROWSE.SUCCESS:
            return Object.assign({}, state, {
                home: action.home,
                requesting: false,
            });

        case CAMPAIGN.MYLIST.REQUEST:
            return Object.assign({}, state, {
                requesting: true
            });

        case CAMPAIGN.MYLIST.SUCCESS:
            return Object.assign({}, state, {
                myCampaigns: action.myList,
                requesting: false,
            });

        default:
            return state;
    }
}