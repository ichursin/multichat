/* @ngInject */
export default function routes($stateProvider, $urlRouterProvider) {
    /* @ngInject */
    function css($stateParams) {
        return `/themes/${$stateParams.theme || 'default'}/style.css`;
    }

    let chat = {
        name: 'chat',
        url: '/chat?username?goodgame?peka2tv?twitch?livecoding?theme?platforms',
        reloadOnSearch: false,
        controller: 'ChatController',
        controllerAs: 'vm',

        templateUrl: ($stateParams) => {
            return `/themes/${$stateParams.theme || 'default'}/`;
        },

        css: css
    };

    let help = {
        name: 'help',
        url: '/help',
        template: require('./help/index.html')
    };

    $stateProvider.state(chat);
    $stateProvider.state(help);
    $urlRouterProvider.otherwise('/help');
}
