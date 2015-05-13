module Controller {
    export class MainCtrl {

        overlay:boolean;

        constructor(private $rootScope) {
            this.$rootScope.overlay = false;
        }

        static controllerId:string = "MainCtrl";
    }
}
