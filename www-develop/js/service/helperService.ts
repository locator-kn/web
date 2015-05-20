module Service {
    export class HelperService {
        constructor(private $http, private basePath, private $location, private DataService) {
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
            return _.findWhere(array, {'query_name': queryName});
        }


        saveContext() {
            localStorage.setItem('locationContext', this.$location.$$absUrl);
        }

        getContext() {

            var context = localStorage.getItem('locationContext');

            if (context == null) {
                return '/';
            } else {
                return context;
            }

        }

        static serviceId:string = "HelperService";
    }
}

