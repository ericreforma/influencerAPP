import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

export const CampaignController = {
    browse: {
        home: HttpRequest.get(URL.CAMPAIGN.BROWSE)
    },
    viewDetails: (id, type) => HttpRequest.get(URL.CAMPAIGN.DETAILS, { id, type }),

    interested: (social_media_id, client_id) => 
        HttpRequest.get(URL.CAMPAIGN.INTERESTED, { social_media_id, client_id }),

    uninterested: campaign_id => HttpRequest.get(URL.CAMPAIGN.UNINTERESTED, { campaign_id }),

    chatSession: (campaign_type, campaign_id, client_id) =>
        HttpRequest.get(URL.CHAT.SESSION.CREATE, { campaign_type, campaign_id, client_id })
};
