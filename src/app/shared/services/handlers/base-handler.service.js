export default class BaseMessageHandler {
    constructor($rootScope) {
        this.callback = null;
        this.$rootScope = $rootScope;
    }

    connect(channels) {

    }

    process(message) {

    }

    safeApply(fn) {
        let phase = this.$rootScope.$$phase;

        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        }
        else {
            this.$rootScope.$apply(fn);
        }
    }
}