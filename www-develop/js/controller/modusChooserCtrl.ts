module Controller {
    export class ModusChooserCtrl {

        constructor(private $rootScope) {
            this.$rootScope.showTriplerView = false;
            this.$rootScope.showLocalView = false;
        }

        setTripler() {
            this.$rootScope.showTriplerView = true;
            this.$rootScope.showLocalView = false;
        }

        setLocal(){
            this.$rootScope.showTriplerView = false;
            this.$rootScope.showLocalView = true;
        }

        static controllerId:string = "ModusChooserCtrl";
    }
}
