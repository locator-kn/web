module Service {
    export class HelperService {
        constructor(private $http, private basePath, private $location) {

        }

        getMoodQuery(moods) {
            var moodQuery = [];
            moods.forEach(function (entry) {
                moodQuery.push(entry.query_name);
            });

            return moodQuery.join('.');
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

