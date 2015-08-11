module Controller {
    export class WelcomeFeedCtrl {

        latestLocations;
        disableLoadMore:boolean = false;

        static $inject = ['LocationService', 'UserService'];

        constructor(private LocationService, private UserService) {

            this.getLatestLocations();

        }

        getLatestLocations() {

            this.LocationService.getLatestLocations(6, 0)
                .then(result => {
                    this.decorateLocationsWithUser(result.data);
                    this.latestLocations = result.data;


                });
        }

        loadMoreLocations() {
            // calculate next page number
            var newPage = Math.round(this.latestLocations.length / 7);
            this.LocationService.getLatestLocations(6, newPage)
            .then(result => {
                    if(!result.data.length) {
                        return this.disableLoadMore = true;
                    }
                    this.decorateLocationsWithUser(result.data);
                    this.latestLocations = this.latestLocations.concat(result.data);
                });
        }

        private decorateLocationsWithUser(locations:any) {
            locations.forEach((item:any) => {
                item.city.title = item.city.title.split(',')[0];
                this.UserService.getUser(item.userid).then(result => {
                    item.user = result.data;
                });
            });
        }

        static controllerId:string = "WelcomeFeedCtrl";
    }
}
