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

        static $inject = ['KEEN_PROJECT_ID', 'KEEN_WRITE_KEY', '$rootScope'];

        constructor(private KEEN_PROJECT_ID, private KEEN_WRITE_KEY, private $rootScope) {

            this.doNothing = window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf('amazonaws') >= 0;

            this.client = new Keen({
                projectId: this.KEEN_PROJECT_ID,
                writeKey: this.KEEN_WRITE_KEY
            });

        }

        add(evName:string, type:string, data) {
            var _data = {};
            if(!this.keenEvents[evName]) {
                return;
            }

            _data = this.getDataByType(data, type);
            _data = this.decorateWithVisitorData(_data);
            //this.client.addEvent(this.keenEvents[evName], data,(err, res) => {
            //    debugger
            //});
        }

        getDataByType(data, type) {
            var _data = {};

            if(type === 'location') {
                _data = this.getLocationData(data);
            }

            return _data;
        }

        getLocationData(data) {
            var _data = {
                id: data.id || data._id,
                page_type: 'location',
                city: data.city,
                title: data.title,
                creator_id: data.userid
            };
            return _data;
        }

        decorateWithVisitorData(data) {
            var _data = data;

            _data.visitor = {
                authenticated: this.$rootScope.authenticated,
                user_id: this.$rootScope.userID || 'unknown',
                user_name: this.$rootScope.userName || 'unknown'
            };


            if(!_data.keen) {
                _data.keen = {};
                if(!_data.keen.addons) {
                    _data.keen.addons = [];
                }
            }

            // bad hack to prevent lodash-template from freaking out
            _data.ip_address = ['$', '{keen.ip}'].join('');
            _data.keen.addons.push({
                "input" : {
                    "ip" : "ip_address"
                },
                "output" : "ip_geo_info"
            });

            // bad hack to prevent lodash-template from freaking out
            _data.user_agent = ['$','{keen.user_agent}'].join('');
            _data.keen.addons.push({
                "input" : {
                    "ua_string" : "user_agent"
                },
                "output" : "parsed_user_agent"
            });


            return _data;
        }

        static serviceId:string = "KeenService";
    }
}
