import angular from 'angular';

import Peka2tvSocket from './services/handlers/peka-handler.service';
import GoodgameSocket from './services/handlers/goodgame-handler.service';
import TwitchMessageHandler from './services/handlers/twitch-handler.service';

import GoodgameSmiles from './services/goodgame.smiles';
import Platforms from './services/platforms.service';
import Messages from './services/messages.service';
import LiveCodingMessageHandler from "./services/handlers/livecoding-handler.service";


export default angular.module('multichat.shared', [])
    .service('peka2tvMessageHandler', Peka2tvSocket)
    .service('goodgameMessageHandler', GoodgameSocket)
    .factory('goodgameSmiles', GoodgameSmiles)
    .service('twitchMessageHandler', TwitchMessageHandler)
    .service('livecodingMessageHandler', LiveCodingMessageHandler)
    .service('platforms', Platforms)
    .service('messages', Messages)
    .name;
