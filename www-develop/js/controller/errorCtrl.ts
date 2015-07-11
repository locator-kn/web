module Controller {

    export class ErrorCtrl {
        params:any;
        static $inject = ['$state', 'ErrorService'];
        constructor(private $state, private ErrorService) {
            this.params = this.$state.params;
        }

        static controllerId:string = "ErrorCtrl";
    }
}
