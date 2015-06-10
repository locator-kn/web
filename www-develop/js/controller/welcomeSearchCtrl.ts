module Controller {
    export class WelcomeSearchCtrl {

        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        days = [
            {"id": "1", "title": "1 Tag"},
            {"id": "2", "title": "2 Tage"},
            {"id": "3", "title": "3 Tage"},
            {"id": "4", "title": "3+ Tage"},
        ];
        
        selectedDay:any = this.days[2];

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

                });


        }

        search() {
            this.$state.go('search', {
                city: this.selectedCity.title,
                moods: this.selectedMood.query_name,
                days: this.selectedDay.id
            });
        }


        static controllerId:string = "WelcomeSearchCtrl";
    }
}
