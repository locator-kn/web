module Controller {
    export class WelcomeSearchCtrl {

        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;
        showCities:string = 'showCitiesSearch';
        showMoods:string = 'showMoodsSearch';
        showDays:string = 'showDaysSearch';

        dataAvailable:boolean = false;

        constructor(private $rootScope, private DataService, private $q, private $state) {
            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = false;

            this.getData();

            this.$rootScope.breadcrumb = '';

        }

        getData() {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();
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

                }).catch(() => {
                    this.$rootScope.showSteffen = true;
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
