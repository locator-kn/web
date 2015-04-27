module Controller {
    export class MoodCtrl {

        moods;

        constructor($scope, private DataService) {
            this.getMoods();
        }

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
                if (this.isSelected(i + 1)) {
                    selectedMoods.push(this.moods[i]);
                }
            }
            return selectedMoods;
        }

        deselectAll() {
            for (var i = 0; i < this.moods.length; i++) {
                this.deSelectMood(i);
            }
        }

        /*
         triggers selection of the mood with _id.
         */
        selectMood(_id) {

            if (this.isExcluded(_id)) {
                return;
            }

            if (this.isSelected(_id)) {
                this.deSelectMood((_id));

                // include the excludes again from Mood with _id
                for (var i = 0; i < this.getExcludes(_id).length; i++) {
                    this.include(this.getExcludes(_id)[i]);
                }


            } else {
                this.getMoodById(_id).selected = true;

                // exclude the excludes from Mood with _id
                for (var i = 0; i < this.getExcludes(_id).length; i++) {
                    this.exclude(this.getExcludes(_id)[i]);
                }
            }

            console.info('ID: ' + _id + 'selected');
            console.info(this.getSelectedMoods());
        }

        deSelectMood(_id) {
            this.getMoodById(_id).selected = false;
        }

        isSelected(_id) {
            if (!this.isExcluded(_id)) {
                return this.getMoodById(_id).selected;
            }

        }

        isExcluded(_id) {

            return this.getMoodById(_id).excluded > 0;

        }

        exclude(_id) {
            this.getMoodById(_id).excluded += 1;
        }

        include(_id) {

            if (this.getMoodById(_id).excluded > 0) {
                this.getMoodById(_id).excluded -= 1;
            }

        }

        getExcludes(_id) {
            return this.getMoodById(_id).excludes;
        }

        getMoodById(_id) {
            return this.moods[_id - 1];
        }


        static controllerId:string = "MoodCtrl";
    }
}
