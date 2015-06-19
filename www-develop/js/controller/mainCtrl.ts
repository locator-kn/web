module Controller {
    export class MainCtrl {

        overlay:boolean;
        openElement:string = '';

        constructor(private $scope, private $rootScope, private $location, private $window) {
            this.$rootScope.overlay = false;
            this.$rootScope.openElement = this.openElement;

            $window.onclick = (e) => {
                if(this.openElement) {
                    this.openElement = '';
                    this.$scope.$apply();
                }
            };

            $rootScope.$on('newPopoverSelected', (e, clickValue)=> {
                if(this.$rootScope.openElement === clickValue)
                    clickValue = '';
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
