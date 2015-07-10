module Controller {
    export class WelcomeCreateCtrl {

        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;

        dataAvailable:boolean = false;

        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        static $inject = ['$state', '$rootScope', 'DataService', '$q'];
        constructor(private $state, private $rootScope, private DataService, private $q) {

            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = false;

            this.getData();

        }

        getData() {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getFixedCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.selectedMood = this.moods[Math.floor((Math.random() * this.moods.length))];

                    this.cities = responsesArray[1].data;
                    this.selectedCity = this.cities[Math.floor((Math.random() * this.cities.length))];

                    this.days = responsesArray[2].data;
                    this.selectedDay = this.days[Math.floor((Math.random() * this.days.length))];

                    this.dataAvailable = true;
                    angular.element('.welcome_container .logocontainer').addClass('visible');
                });


        }


        create() {
            this.$state.go('insertTrip', {
                city: this.selectedCity.title,
                moods: this.selectedMood.query_name,
                days: this.selectedDay.id
            });

        }

        static controllerId:string = "WelcomeCreateCtrl";
    }
}
