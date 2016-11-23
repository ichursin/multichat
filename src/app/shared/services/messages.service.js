/* @ngInject */
export default class Messages {
    constructor($injector, $stateParams, platforms) {
        this.messages = [];

        let currentPlatforms = platforms.getPlatforms();
        for (let i = 0; i < currentPlatforms.length; i++) {
            let platform = currentPlatforms[i];
            let channel = $stateParams[platform] || $stateParams.username;
            if (channel) {
                let service = $injector.get(`${platform}MessageHandler`);

                service.callback = (message) => {
                    this.messages.push(message);
                };

                service.connect(channel);
            }
        }
    }

    getMessages() {
        return this.messages;
    }
}