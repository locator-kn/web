module Controller {


    export class ContextCtrl {

        context:string;

        constructor(private $scope, private basePath, private HelperService) {
            window.location.href = this.HelperService.getContext();
        }

        static controllerId:string = "ContextCtrl";
    }
}
