module Service {
    export class FeedbackService {

        constructor(private $http, private basePath) {

        }

        saveLocation(data) {
            return this.$http.put(this.basePath + '/mail/feedback' + data);
        }


        static serviceId:string = "FeedbackService";
    }
}
