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

        constructor(private KEEN_PROJECT_ID, private KEEN_WRITE_KEY) {

            this.client = new Keen({
                projectId: this.KEEN_PROJECT_ID,
                writeKey: this.KEEN_WRITE_KEY
            });

        }

        static serviceId:string = "KeenService";
    }
}
