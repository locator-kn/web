module Service {
    export class HelperService {

        constructor(private $http, private basePath) {

        }

        getMoodQuery(moods) {
            var moodQuery = [];
            moods.forEach(function(entry) {
                moodQuery.push(entry.query_name);
            });

            return moodQuery.join('.');
        }

        static serviceId:string = "HelperService";
    }
}

