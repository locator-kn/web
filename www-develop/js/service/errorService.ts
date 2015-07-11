module Service {
    export class ErrorService {

        errorHashMap:any = {};
        staticErrorHashMap:any = {
            emailTaken: {
                message: 'Es scheint, als hättest du bereits einen Account mit dieser E-Mail registriert.'
            }
        };

        static $inject = [];
        constructor() {

        }

        setError(timestamp, error) {
            this.errorHashMap[timestamp] = error;
        }

        getError(timestamp) {
            return this.errorHashMap[timestamp];
        }

        getStaticError(reason) {
            return this.staticErrorHashMap[reason];
        }

        static serviceId:string = "ErrorService";
    }
}
