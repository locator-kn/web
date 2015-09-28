module Controller {

    export class ExploreCtrl {

        locations = [];

        static $inject = ['$state', 'ExploreService'];
        constructor(private $state, private ExploreService) {

        }

        static controllerId:string = "ExploreCtrl";
    }
}
