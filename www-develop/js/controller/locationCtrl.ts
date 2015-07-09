module Controller {

    export class LocationCtrl {

        locations;


        constructor(private LocationService) {
            this.getMyLocations();
        }

        getMyLocations() {
            this.LocationService.getMyLocations()
                .then(result => {
                    this.locations = result.data;
                    console.info(this.locations);
                });
        }


        static controllerId:string = "LocationCtrl";
    }
}
