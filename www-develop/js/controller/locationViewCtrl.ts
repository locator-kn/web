module Controller {

    export class LocationViewCtrl {

        constructor(private $scope, private $stateParams) {
            debugger;
            console.log($stateParams);
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
