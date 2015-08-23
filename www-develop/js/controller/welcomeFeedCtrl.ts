module Controller {
    export class WelcomeFeedCtrl {

        latestLocations;
        disableLoadMore:boolean = false;
        isLoading:boolean = false;

        static $inject = ['LocationService', 'UserService', '$analytics'];

        constructor(private LocationService, private UserService, private $analytics) {

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
            if(!this.isLoading) {

            }
            this.isLoading = true;
            // calculate next page number
            var newPage = Math.round(this.latestLocations.length / 7);
            this.$analytics.eventTrack('welcome/loadMoreLocatons, page:' + newPage);
            this.LocationService.getLatestLocations(6, newPage)
            .then(result => {
                    if(result.data.length < 6) {
                        this.$analytics.eventTrack('welcome/loadMoreLocatons, reached the end');
                        this.disableLoadMore = true;
                    }
                    this.decorateLocationsWithUser(result.data);
                    this.latestLocations = this.latestLocations.concat(result.data);
                    this.isLoading = false;
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
