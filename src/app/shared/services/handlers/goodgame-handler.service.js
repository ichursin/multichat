import BaseMessageHandler from "./base-handler.service";

/* @ngInject */
export default class GoodgameMessageHandler extends BaseMessageHandler {
    constructor($rootScope, $http, goodgameSmiles) {
        super($rootScope);

        this.$http = $http;
        this.goodgameSmiles = goodgameSmiles;
    }

    connect(channels) {
        this.socket = new WebSocket('ws://chat.goodgame.ru:8081/chat/websocket');

        this.socket.onopen = () => {
            this.$http.get(`https://goodgame.ru/api/getchannelstatus?&fmt=json&id=${channels}`)
                .then((response) =>{
                    for (let prop in response.data) {
                        let data = {
                            type: 'join',
                            data: {
                                channel_id: prop,
                                hidden: false
                            }
                        };
                        this.socket.send(JSON.stringify(data));
                    }
                });
        };

        this.socket.onmessage = (response) => {
            let message = JSON.parse(response.data);
            switch (message.type) {
                case 'message':
                    let text = this.process(message.data.text);

                    if (this.callback) {
                        this.safeApply(() => {
                            this.callback({
                                platform: 'goodgame',
                                text: `${message.data['user_name']}: ${text}`
                            });
                        });
                    }

                    break;
            }
        };
    }

    process(message) {
        return message.replace(/:(\w+|\d+):/g, (code, key) => {
            let smile = this.goodgameSmiles.find((smile) => {
                return smile.name === key;
            });

            return smile
                ? `<img class="smile" src='${smile.img}' />`
                : `:${key}:`;
        });
    }
}
