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
            localStorage.setItem('location', this.$location.$$absUrl);
        }

        getContext() {
            console.info('Get Context: ' + localStorage.getItem('location'));
            return localStorage.getItem('location');
        }

        static serviceId:string = "HelperService";
    }
}

