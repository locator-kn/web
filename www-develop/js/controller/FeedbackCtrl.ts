
module Controller {


    export class FeedbackCtrl {

        feedback = {
            name: '',
            mail: '',
            subject: 'empty subject',
            message:''
        };

        constructor(private $scope, private FeedBackService) {

        }

        static controllerId:string = "FeedbackCtrl";
    }
}
