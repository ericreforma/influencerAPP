import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client';
import { URL } from '../config/url';
import { TokenSchema } from '../database';

const tokenSchema = TokenSchema.get();
const echo = new Echo({
    authEndpoint: `${URL.SERVER}/broadcasting/auth`,
    client: Socketio,
    broadcaster: 'socket.io',
    host: `${URL.HOST}:6001`,
    auth: { headers: { Authorization: `Bearer ${tokenSchema.token}` } }
});

const socket = {
    init: id => {
        echo.private(`user.${id}`)
        .listen('UserEvent', (e) => {
            console.log(e);
        });
    },
    chat: (sessionId, callback) => {
        echo.channel(`chat.${sessionId}`)
            .listen('ChatEvent', (e) => {
                callback(e);
            });
    },
    notification: (user_id, callback) => {
        echo.channel(`notification.${user_id}`)
            .listen('NotificationEvent', (e) => {
                callback(e);
            });
    }
};

export default socket;
