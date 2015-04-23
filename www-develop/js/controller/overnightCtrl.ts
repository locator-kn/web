module Controller {
    export class OvernightCtrl {

        sleepPlaces;

        constructor(private $scope, private OvernightService) {
            this.getSleepplaces();
        }

        getSleepplaces () {
            this.OvernightService.sleepplace().then(result => {
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
            var selectedMoods = []
            for (var i = 0; i < this.sleepPlaces.length; i++) {
                if (this.isSelected(i + 1)) {
                    selectedMoods.push(this.sleepPlaces[i]);
                }
            }
            return selectedMoods;
        }


        static controllerId:string = "OvernightCtrl";
    }
}
