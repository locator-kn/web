module Controller {
    export class MainCtrl {

        overlay:boolean;

        constructor(private $rootScope) {
            this.$rootScope.overlay = false;
        }

        closeOverlay() {
            this.$rootScope.$emit('closeDialog');
        }

        static controllerId:string = "MainCtrl";
    }
}
