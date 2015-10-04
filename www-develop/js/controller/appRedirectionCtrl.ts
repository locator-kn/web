module Controller {

    export class AppRedirectionCtrl {

        static $inject = ['UtilityService', '$state', '$window'];

        constructor(private UtilityService, private $state, private $window) {
            var os = this.UtilityService.getMobileOs();

            if (os === 'ios') {
                $window.location.href = 'https://goo.gl/5S2vNg';
            } else if (os === 'android') {
                $window.location.href = 'https://goo.gl/Euu0sp';
            } else {
                this.$state.go('welcome');
            }
        }

        static controllerId:string = "AppRedirectionCtrl";
    }
}
