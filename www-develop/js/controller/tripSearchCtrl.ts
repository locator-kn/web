module Controller {

    export class TripSearchCtrl {

        cities;
        accomodations;
        moods;
        selectedMoods = {};
        selectedMoods_querys = []
        selectedAccomodations = {};
        selectedAccomodations_querys = []


        //params for result state
        params = {
            city: undefined,
            budget: undefined,
            travellersCount: undefined,
            checkin: undefined,
            checkout: undefined,
            accomodations: undefined,
            moods: undefined
        };

        constructor(private $scope, private TriplerService, private DataService, private $location) {
            this.getCities();
            this.getAccomodations();
            this.getMoods();

            // initial loading of todays and todays + 3 date
            this.params.checkin = DataService.getDates().checkinDate;
            this.params.checkout = DataService.getDates().checkoutDate;
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


        // accomodation begin //

        getAccomodations() {
            this.DataService.getAccomodations().then(result => {
                this.accomodations = result.data;
            })
        }

        toggleAccomodation(accomodation) {
            var querystring = this.toggle(this.selectedAccomodations, accomodation);
            this.$location.search('accomodation', querystring);
            this.params.accomodations = querystring;
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
            var querystring = this.toggle(this.selectedMoods, mood);
            this.$location.search('moods', querystring);
            this.params.moods = querystring;

        }


        toggle(selection, item) {
            selection[item.query_name] = !!!selection[item.query_name];
            var querystring = '';
            for (var key in selection) {
                if (selection.hasOwnProperty(key)) {
                    var obj = selection[key];
                    if (obj === true) {
                        querystring += key + '.'
                    }
                }
            }
            querystring = querystring.substring(0, querystring.length - 1);
            querystring = querystring || null;

            return querystring;
        }

        // moodctrl end //
        static controllerId:string = "TripSearchCtrl";
    }
}
