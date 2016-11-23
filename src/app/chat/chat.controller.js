/* @ngInject */
export default class ChatController {
    constructor(messages) {
        this.messages = messages.getMessages();
    }
}