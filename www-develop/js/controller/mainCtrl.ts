module Controller {
    export class MainCtrl {

        overlay:boolean;

        constructor(private $rootScope, private $location) {
            this.$rootScope.overlay = false;


            this.$rootScope.$on("$locationChangeStart", () => {
                $rootScope.slider = $location.$$path === '/welcome';
            });
        }

        closeOverlay() {
            this.$rootScope.$emit('closeDialog');
        }

        static controllerId:string = "MainCtrl";
    }
}
