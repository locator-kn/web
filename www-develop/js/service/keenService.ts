module Service {
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

        constructor() {

        }

        static serviceId:string = "KeenService";
    }
}
