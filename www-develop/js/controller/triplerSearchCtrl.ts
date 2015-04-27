module Controller {
    export class TriplerSearchCtrl {

        cities;
        sleepPlaces;
        moods;

        //params for result state
        params = {
            city: undefined,
            budget: undefined,
            persons: undefined,
            checkin: undefined,
            checkout: undefined,
            accomodations: undefined,
            moods: undefined
        };

        constructor(private $scope, private TriplerService, private DataService, private $location) {
            this.getCities();
            this.getAccomodations();
            this.getMoods();
        }

        getCities() {
            this.DataService.getCities().then(result => {
                this.cities = result;
            });
        }

        setCity(value) {
            return this.params.city = value;
        }

        setBudget(value) {
            return this.params.budget = value;
        }

        setPersons(value) {
            return this.params.persons = value;
        }

        setAccomodation(value) {
            return this.params.accomodations = value;
        }


        // accomodation begin //

        getAccomodations () {
            this.DataService.getAccomodations().then(result => {
                this.sleepPlaces = result;
            })
            console.info(this.sleepPlaces);
        }

        selectSleepPlace(_id) {

            if (this.isSelected(_id)) {
                this.deSelectSleepPlace((_id));
            } else {
                this.getSleepPlaceById(_id).selected = true;
            }

            console.info('ID: ' + _id + ' selected');
            console.info(this.getSelectedSleepPlaces());

        }

        deSelectSleepPlace(_id) {
            this.getSleepPlaceById(_id).selected = false;
        }

        isSelected(_id) {
            return this.getSleepPlaceById(_id).selected;
        }


        getSleepPlaceById(_id) {
            return this.sleepPlaces[_id - 1];
        }

        getSelectedSleepPlaces() {
            var selectedSleepPlaces = []
            for (var i = 0; i < this.sleepPlaces.length; i++) {
                if (this.isSelected(i + 1)) {
                    selectedSleepPlaces.push(this.sleepPlaces[i]._id);
                }
            }
            this.params.accomodations = selectedSleepPlaces.join('.');
            return selectedSleepPlaces;
        }

        // accomodation end //


        // moods begin //

        getMoods() {
            this.DataService.getMoods().then(result => {
                this.moods = result;

                //exclude initial
                for (var i= 0; i < this.moods.length; i++) {
                    this.moods[i].excluded = 0;
                }

            });
        }

        getSelectedMoods() {
            var selectedMoods = []
            for (var i = 0; i < this.moods.length; i++) {
                if (this.moodIsSelected(i + 1)) {
                    selectedMoods.push(this.moods[i]._id);
                }
            }
            //this.$location.search('test', selectedMoods.join('.'))
            this.params.moods = selectedMoods.join('.');
            return selectedMoods;
        }

        deselectAllMoods() {
            for (var i = 0; i < this.moods.length; i++) {
                this.deSelectMood(i);
            }
        }

        /*
         triggers selection of the mood with _id.
         */
        selectMood(_id) {

            if (this.moodIsExcluded(_id)) {
                return;
            }

            if (this.moodIsSelected(_id)) {
                this.deSelectMood((_id));

                // include the excludes again from Mood with _id
                for (var i = 0; i < this.getMoodExcludes(_id).length; i++) {
                    this.includeMood(this.getMoodExcludes(_id)[i]);
                }


            } else {
                this.getMoodById(_id).selected = true;

                // exclude the excludes from Mood with _id
                for (var i = 0; i < this.getMoodExcludes(_id).length; i++) {
                    this.excludeMood(this.getMoodExcludes(_id)[i]);
                }
            }

            console.info('ID: ' + _id + 'selected');
            console.info(this.getSelectedMoods());
        }

        deSelectMood(_id) {
            this.getMoodById(_id).selected = false;
        }

        moodIsSelected(_id) {
            if (!this.moodIsExcluded(_id)) {
                return this.getMoodById(_id).selected;
            }

        }

        moodIsExcluded(_id) {

            return this.getMoodById(_id).excluded > 0;

        }

        excludeMood(_id) {
            this.getMoodById(_id).excluded += 1;
        }

        includeMood(_id) {

            if (this.getMoodById(_id).excluded > 0) {
                this.getMoodById(_id).excluded -= 1;
            }

        }

        getMoodExcludes(_id) {
            return this.getMoodById(_id).excludes;
        }

        getMoodById(_id) {
            return this.moods[_id - 1];
        }

        // moodctrl end //
        static controllerId:string = "TriplerSearchCtrl";
    }
}
