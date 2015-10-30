module Service {
    declare var Keen;
    export class KeenService {


        keenEvents:any = {
            'pv': 'page_view',
            'v': 'visit',
            'sh': 'schoen_hier',
            'lu': 'location_update',
            'pu': 'profile_update',
            'tu': 'trip_update',
            'r': 'registrations',
            'li': 'login',
            'lo': 'logout',
            'lc': 'location_create',
            'tc': 'trip_create'
        };

        client:any;
        doNothing:boolean = false;

        static $inject = ['KEEN_PROJECT_ID', 'KEEN_WRITE_KEY', '$rootScope'];

        constructor(private KEEN_PROJECT_ID, private KEEN_WRITE_KEY, private $rootScope) {

            // decide if we disable tracking
            this.doNothing = window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf('amazonaws') >= 0;

            this.client = new Keen({
                projectId: this.KEEN_PROJECT_ID,
                writeKey: this.KEEN_WRITE_KEY
            });

        }

        add(evName:string, data, type?:string) {
            var _data;
            if (!this.keenEvents[evName]) {
                console.info('implementation error; event', evName, 'is not defined');
                return;
            }
            
            var keenEventHandlers = {
                'pv': this.getDataByType,
                'v': data => data,
                'sh': this.getSchoenHierData,
                'r': this.getRegistrationData,
                'lc': this.getCreateLocationData
            }
            
            var eventFunction = keenEventHandlers[evName];
            if(eventFunction){
                _data = eventFunction();
            } else {
                _data = data;
            }

            _data = this.decorateWithVisitorData(_data);
            this.client.addEvent(this.keenEvents[evName], _data, (err, res) => {
                if (err) {
                    return console.error(err);
                }
            });
        }

        getDataByType(data, type) {
            var _data = {};

            if (type === 'location') {
                _data = this.getLocationData(data);
            } else if (type === 'trip') {
                _data = this.getTripData(data);
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

        getTripData(data) {
            var _data = {
                id: data.id || data._id,
                page_type: 'trip',
                city: data.city,
                title: data.title,
                creator_id: data.userid
            };
            return _data;
        }

        getCreateLocationData(data) {
            return {
                id: data.create_info.id || data.create_info._id,
                title: data.title,
                city: data.city,
                geo_choords: data.geotag,
                tags: data.tags
            }
        }

        getSchoenHierData(data) {
            return {
                id: data.id || data._id,
                city: data.city,
                title: data.title,
                creator_id: data.userid,
                action: data.mode
            }
        }

        getRegistrationData(data) {
            return {
                id: data.id || data._id,
                strategy: 'default'
            }
        }

        decorateWithVisitorData(data) {
            var _data = data;

            _data.visitor = {
                authenticated: this.$rootScope.authenticated,
                user_id: this.$rootScope.userID || 'unknown',
                user_name: this.$rootScope.userName || 'unknown'
            };

            _data.timeSinceStart = Date.now() - this.$rootScope.sessionStart;


            if (!_data.keen) {
                _data.keen = {};
                if (!_data.keen.addons) {
                    _data.keen.addons = [];
                }
            }

            // bad hack to prevent lodash-template from freaking out
            _data.ip_address = ['$', '{keen.ip}'].join('');
            _data.keen.addons.push({
                "name": 'keen:ip_to_geo',
                "input": {
                    "ip": "ip_address"
                },
                "output": "ip_geo_info"
            });

            // bad hack to prevent lodash-template from freaking out
            _data.user_agent = ['$', '{keen.user_agent}'].join('');
            _data.keen.addons.push({
                "name": 'keen:ua_parser',
                "input": {
                    "ua_string": "user_agent"
                },
                "output": "parsed_user_agent"
            });


            return _data;
        }

        static serviceId:string = "KeenService";
    }
}
