module Controller {


    export class ContextCtrl {

        context:string;

        constructor(private HelperService, private $state) {
            //debugger;
            var state = this.HelperService.getContext();
            this.$state.go(state.name, state.params);


        }

        static controllerId:string = "ContextCtrl";
    }
}
