module Controller {

    export class ExploreCtrl {

        locations = [];

        static $inject = ['$state', 'ExploreService'];
        constructor(private $state, private ExploreService) {


            this.ExploreService.searchLocations('ChIJWx8MOBv2mkcR0JnfpbdrHwQ', 'gastro').then(result => {
                this.locations = result.data;
            });

        }

        static controllerId:string = "ExploreCtrl";
    }
}
