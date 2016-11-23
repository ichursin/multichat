/* @ngInject */
export default function production($locationProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    // $locationProvider.html5Mode(true);
}
