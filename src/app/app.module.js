import angular from 'angular';
import uirouter from 'angular-ui-router';
import css from 'angular-css';
import sanitize from 'angular-sanitize';


import production from  './app.config';
import routes from './app.routes';
import shared from './shared/shared.module';
import ChatController from './chat/chat.controller';

export default angular.module('multichat', [uirouter, css, sanitize, shared])
    .config(production)
    .config(routes)
    .controller('ChatController', ChatController)
    .name;
