import 'strophe';
import 'strophe-plugins/muc';
import convert from 'xml-js';

import BaseMessageHandler from "./base-handler.service";

/* @ngInject */
export default class LiveCodingMessageHandler extends BaseMessageHandler {
    constructor($rootScope, $http) {
        super($rootScope);

        this.$http = $http;
        this.xml2json = convert.xml2json;
    }

    connect(channel) {
        let client = new Strophe.Connection('wss://ws.www.livecoding.tv/chat/websocket');

        client.rawInput = (data) => {
            let input = JSON.parse(this.xml2json(data, {compact: true}));

            if (input.message && this.callback) {
                this.safeApply(() => {
                    let from = input.message['_attributes'].from.replace(`${channel}@chat.livecoding.tv/`, '');
                    let message = this.process(input.message.body['_text']);

                    this.callback({
                        platform: 'livecoding',
                        text: `${from}: ${message}`
                    });
                });
            }
        };

        client.connect('public.livecoding.tv', null, (status) => {
            switch (status) {
                case Strophe.Status.CONNECTED:
                    client.muc.join(`${channel}@chat.livecoding.tv`, this.nickname(10));
                    break;
            }
        });
    }

    process(message) {
        // return message.replace(/:(\w+|\d+):/g, (code, key) => {
        //     return `<img src='https://funstream.tv/build/images/smiles/${key}.png' />`;
        // });

        return message;
    }

    nickname(length) {
        let text = '';
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * chars.length);
            text += chars.charAt(index);
        }

        return `anonymous${text}`;
    }
}