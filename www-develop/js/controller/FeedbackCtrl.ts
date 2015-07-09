module Controller {


    export class FeedbackCtrl {

        feedback = {
            name: '',
            mail: '',
            subject: '',
            message: ''
        };

        feedbacksent = false;
        feedbackerror = false;

        mailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;


        constructor(private FeedbackService) {
        }

        submitFeedback(invalid) {
            if (invalid) {
                return;
            }
            this.FeedbackService.sendFeedback(this.feedback)
                .then(() => {
                    this.feedbacksent = true;
                }).catch(() => {
                    this.feedbackerror = true;
                });
        }

        static controllerId:string = "FeedbackCtrl";
    }
}
