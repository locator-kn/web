module Controller {
    export class WelcomeCtrl {

        searchHelp:boolean = false;
        createHelp:boolean = false;

        search:any = {
            moods: [],
            open: '',
            selectedMood: '',
            cities: [],
            selectedCity: '',
            days: [],
            selectedDays: '',

            showCities: 'showCitiesSearch',
            showMoods: 'showMoodsSearch',
            showDays: 'showDaysSearch'

        };

        create:any = {
            moods: [],
            open: '',
            selectedMood: '',
            cities: [],
            selectedCity: '',
            days: [],
            selectedDays: '',

            showCities: 'showCitiesCreate',
            showMoods: 'showMoodsCreate',
            showDays: 'showDaysCreate'
        };

        latestLocations;

        dataAvailable:boolean = false;


        static $inject = ['$scope', '$state', '$rootScope', 'DataService', '$q'];

        constructor(private $scope, private $state, private $rootScope, private DataService, private $q) {

            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = false;

            this.getData();
            this.$rootScope.breadcrumb = '';

            //default title
            this.$scope.$emit('updateTitle', '');
            this.$scope.$emit('updateOgElements', '');


        }

        getData() {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getFixedCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.search.moods = responsesArray[0].data;
                    this.create.moods = responsesArray[0].data;

                    this.search.selectedMood = this.search.moods[Math.floor((Math.random() * this.search.moods.length))];
                    this.create.selectedMood = this.create.moods[Math.floor((Math.random() * this.create.moods.length))];

                    this.search.cities = responsesArray[1].data;
                    this.create.cities = responsesArray[1].data;

                    this.search.selectedCity = this.search.cities[Math.floor((Math.random() * this.search.cities.length))];
                    this.create.selectedCity = this.create.cities[Math.floor((Math.random() * this.create.cities.length))];

                    this.search.days = responsesArray[2].data;
                    this.create.days = responsesArray[2].data;

                    this.search.selectedDay = this.search.days[Math.floor((Math.random() * this.search.days.length))];
                    this.create.selectedDay = this.create.days[Math.floor((Math.random() * this.create.days.length))];

                    this.dataAvailable = true;
                    angular.element('.welcome_container .logocontainer').addClass('visible');

                    //open login modal when url param 'login' is set
                    if (this.$state.current.name === 'login') {
                        setTimeout(this.$rootScope.$emit('openLoginDialog'), 1000);
                    }
                });


        }

        startSearch() {
            this.$state.go('search', {
                city: this.search.selectedCity.title,
                moods: this.search.selectedMood.query_name,
                days: this.search.selectedDay.query_name
            });
        }


        startCreate() {

            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }


            this.$state.go('insertTrip', {
                city: this.create.selectedCity.title,
                moods: this.create.selectedMood.query_name,
                days: this.create.selectedDay.query_name
            });

        }


        static controllerId:string = "WelcomeCtrl";
    }
}
