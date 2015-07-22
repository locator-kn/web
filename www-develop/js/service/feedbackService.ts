module Service {
    export class FeedbackService {


        static $inject = ['$http'];
        constructor(private $http) {

        }

        sendFeedback(data) {
            return this.$http.post('/mail/feedback', data);
        }


        static serviceId:string = "FeedbackService";
    }
}
