module Controller {
    export class OvernightCtrl {

        sleepplaces;

        constructor(private $scope, private OvernightService) {
            this.getSleepplaces();
        }

        getSleepplaces () {
            this.OvernightService.sleepplace().then(result => {
                this.sleepplaces = result;
            })
        }

        static controllerId:string = "OvernightCtrl";
    }
}
