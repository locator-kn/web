module Service {
    export class ErrorService {

        errorHashMap:any = {};

        static $inject = [];
        constructor() {

        }

        setError(timestamp, error) {
            this.errorHashMap[timestamp] = error;
        }

        getError(timestamp) {
            return this.errorHashMap[timestamp];
        }

        static serviceId:string = "ErrorService";
    }
}
