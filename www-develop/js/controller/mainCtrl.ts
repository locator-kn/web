module Controller {
    export class MainCtrl {

        overlay:boolean;

        constructor(private $rootScope, private $location) {
            this.$rootScope.overlay = false;


            if ($location.$$path == "/welcome") {
                $rootScope.slider = true;
            } else {
                $rootScope.slider = false;
            }
        }

        closeOverlay() {
            this.$rootScope.$emit('closeDialog');
        }

        static controllerId:string = "MainCtrl";
    }
}
