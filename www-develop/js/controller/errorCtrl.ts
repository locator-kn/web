module Controller {

    export class ErrorCtrl {
        params:any;
        currentError:any;

        static $inject = ['$state', 'ErrorService'];
        constructor(private $state, private ErrorService) {
            this.params = this.$state.params;

            if(this.params.t) {
                this.currentError = this.ErrorService.getError(this.params.t);
            } else if(this.params.r) {
                this.currentError = this.ErrorService.getStaticError(this.params.r);
            }

        }

        static controllerId:string = "ErrorCtrl";
    }
}
