module Service {
    export class HelperService {
        constructor(private $http, private basePath, private $state, private DataService, private lodash) {
        }

        getMoodQuery(moods) {
            var moodQuery = [];
            moods.forEach(function (entry) {
                moodQuery.push(entry.query_name);
            });

            return moodQuery.join('.');
        }

        getMoods(moodqueryString, callback) {
            this.DataService.getMoods()
                .then(result => {
                    var allMoods = result.data;
                    var result:any = [];
                    var moods = moodqueryString.split('.');
                    moods.forEach((entry) => {
                        result.push(this.getObjectByQueryName(allMoods, entry));
                    });
                    callback(result);

                });
        }

        getObjectByQueryName(array, queryName) {
            return this.lodash.findWhere(array, {'query_name': queryName});
        }


        saveContext() {
            localStorage.setItem('state', this.$state.current.name);
            localStorage.setItem('stateParams', JSON.stringify(this.$state.params));
        }

        getContext() {
            var state = {
                name: undefined,
                params: undefined
            };

            state.name = localStorage.getItem('state');
            state.params = JSON.parse(localStorage.getItem('stateParams'));

            return state;

        }

        static serviceId:string = "HelperService";
    }
}

