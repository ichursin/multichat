import io from 'socket.io-client';
import BaseMessageHandler from "./base-handler.service";

/* @ngInject */
export default class Peka2tvMessageHandler extends BaseMessageHandler {
    constructor($rootScope, $http) {
        super($rootScope);

        this.$http = $http;
    }

    connect(channel) {
        this.ioSocket = io.connect('wss://chat.funstream.tv', {
            transports: ['websocket'],
            path: '/',
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionDelayMax: 2000,
            reconnectionAttempts: 5
        });

        this.ioSocket.on('connect', () => {
            this.$http.post('https://funstream.tv/api/user', { name: channel })
                .then((response) => {

                    this.ioSocket.emit('/chat/join', { channel: `stream/${response.data.id}` });

                    this.ioSocket.on('/chat/message', (message) => {
                        if (this.callback) {
                            let text = this.process(message.text);
                            let to = message.to ? '@' + message.to.name + ',' : '';
                            let from = `${message.from.name}:`;

                            this.safeApply(() => {
                                this.callback({
                                    platform: 'peka2tv',
                                    text: `${from} ${to} ${text}`
                                });
                            });
                        }
                    });
                });
        });
    }

    process(message) {
        return message.replace(/:(\w+|\d+):/g, (code, key) => {
            return `<img src='https://funstream.tv/build/images/smiles/${key}.png' />`;
        });
    }
}
