module Service {
    export class FeedbackService {

        constructor(private $http, private basePath) {

        }

        saveLocation(data) {
            var doveBasePath = 'http://locator-app.com';
            return this.$http.post(doveBasePath + '/mail/feedback', data);
        }


        static serviceId:string = "FeedbackService";
    }
}
