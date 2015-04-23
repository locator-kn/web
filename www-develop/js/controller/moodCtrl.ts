module Controller {
    export class MoodCtrl {

        moods;

        constructor($scope) {
            this.moods = [
                {
                    _id: '1',
                    title: 'Family Fun',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '2',
                    title: 'Girls on Tour',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: ['4', '5'],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '3',
                    title: 'Buddytrip',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '4',
                    title: 'Singles unter sich',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '5',
                    title: 'Sturm der Liebe',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '6',
                    title: 'Halligalli Drecksaufest',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '7',
                    title: 'Muskelkater',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '8',
                    title: 'Leckermäulchen',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '9',
                    title: 'Grüner gehts nicht',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '10',
                    title: 'Entspannung pur',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '11',
                    title: 'Kultur und Sightseeing',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
                },
                {
                    _id: '12',
                    title: 'Haste nicht gesehn',
                    icon: '',
                    image: '',
                    description: '',
                    excludes: [],
                    selected: false,
                    excluded: 0
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
            return this.getMoodById(_id).selected;
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
