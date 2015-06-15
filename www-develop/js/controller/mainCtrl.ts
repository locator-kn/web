module Controller {
    export class MainCtrl {

        overlay:boolean;
        openElement:string = 'user';

        constructor(private $rootScope, private $location) {
            this.$rootScope.overlay = false;
            this.$rootScope.openElement = this.openElement;


            $rootScope.$on('newPopoverSelected', (e, clickValue)=> {
                debugger
                this.openElement = this.$rootScope.openElement = clickValue;
            });

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
