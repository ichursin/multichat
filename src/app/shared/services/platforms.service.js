/* @ngInject */
export default class Platforms {
    constructor($location) {
        this.$location = $location;
        this.platforms = ['twitch', 'peka2tv', 'goodgame', 'livecoding'];
    }

    getPlatforms() {
        let params = this.$location.search();

        if (params.platforms && !Array.isArray(params.platforms)) {
            return params.platforms.split(',').filter((value) => {
                return this.platforms.indexOf(value) >= 0;
            });
        }

        return params.platforms || this.platforms;
    }
}
