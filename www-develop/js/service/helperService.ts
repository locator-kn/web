
module Service {
    export class HelperService {
        constructor(private $http, private basePath, private $state, private DataService, private lodash,private $q) {
        }

        getMoodQuery(moods) {
            var moodQuery = [];
            moods.forEach(function (entry) {
                moodQuery.push(entry.query_name);
            });

            return moodQuery.join('.');
        }

        getMoodsByQueryString(moodqueryString) {
            return this.$q((resolve,reject) => {

                if (!moodqueryString) {
                    // resolve with empty array if moodqueryString is not defined
                    return reject('no moods inserted')
                }
                this.DataService.getMoods().then(result => {
                    var allMoods = result.data;
                    var res:any = [];
                    var moods = moodqueryString.split('.');
                    moods.forEach((entry) => {
                        res.push(this.getObjectByQueryName(allMoods, entry));
                    });
                    resolve(res);
                });
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

        saveSearchContext() {
            localStorage.setItem('searchContext', JSON.stringify(this.$state.params));
        }

        getSearchContext() {
            return JSON.parse(localStorage.getItem('searchContext'));
        }


        static serviceId:string = "HelperService";
    }
}

