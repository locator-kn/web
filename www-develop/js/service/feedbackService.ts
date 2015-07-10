module Service {
    export class FeedbackService {


        static $inject = ['$http'];
        constructor(private $http) {

        }

        sendFeedback(data) {
            var doveBasePath = 'http://locator-app.com';
            return this.$http.post(doveBasePath + '/mail/feedback', data);
        }


        static serviceId:string = "FeedbackService";
    }
}