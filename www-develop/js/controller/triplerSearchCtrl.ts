
module Controller {

    export class TriplerSearchCtrl {

        cities;
        accomodations;
        moods;
        selectedMoods = {};
        selectedAccomodations = {};

        //params for result state
        params = {
            city: undefined,
            budget: undefined,
            travellersCount: undefined,
            checkin: undefined,
            checkout: undefined,
            accomodation: undefined,
            moods: undefined
        };

        constructor(private $scope, private TriplerService, private DataService, private $location) {
            this.getCities();
            this.getAccomodations();
            this.getMoods();
        }

        getCities() {
            this.DataService.getCities().then(result => {
                this.cities = result.data;
            });
        }

        setCity(value) {
            return this.params.city = value;
        }

        setBudget(value) {
            return this.params.budget = value;
        }

        setPersons(value) {
            return this.params.travellersCount = value;
        }

        setAccomodation(value) {
            return this.params.accomodation = value;
        }


        // accomodation begin //

        getAccomodations () {
            this.DataService.getAccomodations().then(result => {
                this.accomodations = result.data;
            })
        }

        toggleAccomodation(accomodation) {
            this.selectedAccomodations[accomodation.query_name] = !!!this.selectedAccomodations[accomodation.query_name];
        }


        // accomodation end //


        // moods begin //
        getMoods() {
            this.DataService.getMoods().then(result => {
                this.moods = result.data;
                console.info(this.moods)
            });
        }

        toggleMood(mood) {
            this.selectedMoods[mood.query_name] = !!!this.selectedMoods[mood.query_name];
        }

        // moodctrl end //
        static controllerId:string = "TriplerSearchCtrl";
    }
}
