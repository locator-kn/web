module Service {
    declare var Keen;
    export class KeenService {


        keenEvents:any = {
        'pv': 'page_view',
        'v': 'visit',
        'sh': 'schoen_hier',
        'lu': 'location_update',
        'pu': 'profile_update',
        'tu': 'trip_update'
    };

        client:any;
        doNothing:boolean = false;

        static $inject = ['KEEN_PROJECT_ID', 'KEEN_WRITE_KEY'];

        constructor(private KEEN_PROJECT_ID, private KEEN_WRITE_KEY) {

            this.doNothing = window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf('amazonaws') >= 0

            this.client = new Keen({
                projectId: this.KEEN_PROJECT_ID,
                writeKey: this.KEEN_WRITE_KEY
            });

        }

        static serviceId:string = "KeenService";
    }
}
