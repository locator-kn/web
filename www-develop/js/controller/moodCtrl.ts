module Controller {
    export class MoodCtrl {

        moods;

        constructor($scope) {
            this.moods = [
                {
                    _id: '1',
                    title: 'Mod1',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '2',
                    title: 'Mod2',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '3',
                    title: 'Mod3',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '4',
                    title: 'Mod4',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '5',
                    title: 'Mod5',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '6',
                    title: 'Mod6',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '7',
                    title: 'Mod7',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                },
                {
                    _id: '8',
                    title: 'Mod8',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: '',
                    selected: false
                }
            ];
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

        //trigger selection
        selectMood(_id) {
            if (this.isSelected(_id)) {
                this.deSelectMood((_id));
            } else {
                this.moods[_id - 1].selected = true;
            }

            console.info('ID: ' + _id + 'selected');
            console.info(this.getSelectedMoods());
        }

        deSelectMood(_id) {
            this.moods[_id - 1].selected = false;
        }

        isSelected(_id) {
            return this.moods[_id - 1].selected;
        }

        static controllerId:string = "MoodCtrl";
    }
}
