module Controller {
    export class WelcomeCtrl {

        mood:any;
        moods:any;
        open:any;
        defaultMood:any;
        selectedMood:any;

        constructor(private $scope, private $element, private DataService) {

            this.mood = "Initial";

            this.DataService.getMoods().then(result => {
                this.moods = result.data;
                this.selectedMood = this.moods[0];
            })

        }


        static controllerId:string = "WelcomeCtrl";
    }
}
