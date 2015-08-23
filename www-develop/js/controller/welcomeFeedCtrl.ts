module Controller {
    export class WelcomeFeedCtrl {

        latestLocations;
        disableLoadMore:boolean = false;
        currentPage:number = 0;

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

            this.$analytics.eventTrack('welcome/loadMoreLocatons, page:' + this.currentPage);
            this.LocationService.getLatestLocations(6, this.currentPage)
            .then(result => {
                    if(result.data.length < 6) {
                        this.$analytics.eventTrack('welcome/loadMoreLocatons, reached the end');
                        this.disableLoadMore = true;
                    }
                    this.decorateLocationsWithUser(result.data);
                    this.latestLocations = this.latestLocations.concat(result.data);
                    this.currentPage++;
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
