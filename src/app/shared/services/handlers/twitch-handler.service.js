import tmi from 'tmi.js';
import BaseMessageHandler from './base-handler.service';

/* @ngInject */
export default class TwitchMessageHandler extends BaseMessageHandler {
    constructor($rootScope) {
        super($rootScope);

        let options = {
            connection: {
                secure: true,
                reconnect: true
            },
        };

        this.tmi = new tmi.client(options);
        this.tmi.on('message', (channel, userstate, message, self) => {
            if (this.callback) {
                this.safeApply(() => {
                    this.callback({
                        platform: 'twitch',
                        text: this.process(message, userstate)
                    });
                });
            }
        });
    }

    connect(channels) {
        // look's like hack
        // multi-connect to different channels
        this.tmi.opts.channels = [channels].map((channel) => {
            return `#${channel}`;
        });

        this.tmi.connect();
    }

    process(message, userstate) {
        return `${userstate['display-name']}: ${message}`;
    }
}