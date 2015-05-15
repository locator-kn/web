module Controller {
    export class WelcomeCtrl {

        mood:any;
        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        constructor(private $scope, private $rootScope, private $element, private DataService) {
            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = false;
            this.mood = "Initial";

            this.DataService.getMoods().then(result => {
                this.moods = result.data;
                this.selectedMood = this.moods[0];
            })

            this.DataService.getCities().then(result => {
                this.cities = result.data;
                this.selectedCity = this.cities[0];
            })

        }


        static controllerId:string = "WelcomeCtrl";
    }
}
