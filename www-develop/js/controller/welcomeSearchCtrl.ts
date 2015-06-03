module Controller {
    export class WelcomeSearchCtrl {

        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        dataAvailable:boolean = false;

        constructor(private HelperService, private $scope, private $rootScope, private $element, private DataService, private $q, private $state) {
            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = false;

            this.getData();

        }

        getData() {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();

            this.$q.all([moods, cities])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.selectedMood = this.moods[Math.floor((Math.random() * this.moods.length))];

                    this.cities = responsesArray[1].data;
                    this.selectedCity = this.cities[Math.floor((Math.random() * this.cities.length))];

                    this.dataAvailable = true;

                    console.info(this.selectedCity);
                });


        }

        search() {
            this.$state.go('search', {
                city: this.selectedCity.title,
                moods: this.selectedMood.query_name
            });
        }


        static controllerId:string = "WelcomeSearchCtrl";
    }
}
