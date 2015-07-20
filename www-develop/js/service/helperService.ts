
module Service {
    export class HelperService {


        static $inject = ['$state', 'DataService', 'lodash', '$q'];
        constructor(private $state, private DataService, private lodash, private $q) {
        }

        getMoodQuery(moods) {
            var moodQuery = [];
            moods.forEach(function (entry:any) {
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

        getObjectById(array, id) {
            return this.lodash.findWhere(array, {'id': id.toString()});
        }

        getObjectBy_Id(array, _id) {
            debugger;
            return this.lodash.findWhere(array, {'_id': _id});
        }

        getCityByTitle(cities, title) {
            return this.lodash.findWhere(cities, {'title': title});
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

        saveSearchContext(query) {
            localStorage.setItem('searchContext', JSON.stringify(query));

        }

        getSearchContext() {
            return JSON.parse(localStorage.getItem('searchContext'));
        }

        lsAvailable(){
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        }

        getMoodByQueryName(query_name) {
            return this.DataService.getMoods().then(result => {
                    var allMoods = result.data;
                    var res = this.getObjectByQueryName(allMoods, query_name);
                    return res;
            });
        }


        static serviceId:string = "HelperService";
    }
}

