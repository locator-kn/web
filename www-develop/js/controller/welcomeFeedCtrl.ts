
module Controller {
    export class WelcomeFeedCtrl {

        latestLocations;

        static $inject = ['LocationService'];
        constructor(private LocationService) {

            this.getLatestLocations();

        }

        getLatestLocations() {

            this.LocationService.getLatestLocations(12, 0)
                .then(result => {
                    this.latestLocations = result.data;
                });
        }

        static controllerId:string = "WelcomeFeedCtrl";
    }
}
