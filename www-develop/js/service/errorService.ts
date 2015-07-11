module Service {
    export class ErrorService {

        errorHashMap:any = {};

        static $inject = [];
        constructor() {

        }

        setError(timestamp, error) {
            this.errorHashMap[timestamp] = error;
        }

        static serviceId:string = "ErrorService";
    }
}
