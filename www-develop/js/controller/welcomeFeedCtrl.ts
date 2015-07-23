module Controller {
    export class WelcomeFeedCtrl {

        latestLocations;

        static $inject = ['LocationService', 'UserService'];

        constructor(private LocationService, private UserService) {

            this.getLatestLocations();

        }

        getLatestLocations() {

            this.LocationService.getLatestLocations(6, 0)
                .then(result => {


                    result.data.forEach((item:any) => {

                        item.city.title = item.city.title.split(',')[0];
                        this.UserService.getUser(item.userid).then(result => {
                            item.user = result.data;
                        });

                    });

                    this.latestLocations = result.data;


                });
        }

        static controllerId:string = "WelcomeFeedCtrl";
    }
}
