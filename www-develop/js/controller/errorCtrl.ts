module Controller {

    export class ErrorCtrl {
        params:any;
        currentError:any;

        static $inject = ['$state', 'ErrorService'];
        constructor(private $state, private ErrorService) {
            this.params = this.$state.params;

            if(this.params.t) {
                this.currentError = this.ErrorService.getError(this.params.t);
            }

        }

        static controllerId:string = "ErrorCtrl";
    }
}
