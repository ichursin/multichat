import angular from 'angular';

import Peka2tvMessageHandler from './services/handlers/peka-handler.service';
import GoodgameMessageHandler from './services/handlers/goodgame-handler.service';
import TwitchMessageHandler from './services/handlers/twitch-handler.service';
import LiveCodingMessageHandler from "./services/handlers/livecoding-handler.service";

import GoodgameSmiles from './services/goodgame.smiles';
import Platforms from './services/platforms.service';
import Messages from './services/messages.service';


export default angular.module('multichat.shared', [])
    .service('peka2tvMessageHandler', Peka2tvMessageHandler)
    .service('goodgameMessageHandler', GoodgameMessageHandler)
    .factory('goodgameSmiles', GoodgameSmiles)
    .service('twitchMessageHandler', TwitchMessageHandler)
    .service('livecodingMessageHandler', LiveCodingMessageHandler)
    .service('platforms', Platforms)
    .service('messages', Messages)
    .name;
