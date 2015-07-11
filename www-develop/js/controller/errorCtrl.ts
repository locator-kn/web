module Controller {

    export class ErrorCtrl {
        params:any;
        static $inject = ['$state'];
        constructor(private $state) {
            this.params = this.$state.params;
        }

        static controllerId:string = "ErrorCtrl";
    }
}
