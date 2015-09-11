module Service {
    declare var Keen;
    export class KeenService {

        static $inject = [];

        keenEvents:any = {
            'pv': 'page_view',
            'v': 'visit',
            'sh': 'schoen_hier',
            'lu': 'location_update',
            'pu': 'profile_update',
            'tu': 'trip_update'
        };

        client:any;

        constructor() {

            this.client = new Keen({
                projectId: "YOUR_PROJECT_ID",
                writeKey: "YOUR_WRITE_KEY",
                readKey: "YOUR_READ_KEY"

            });

        }

        static serviceId:string = "KeenService";
    }
}
