module Service {
    export class DataService {

        checkinDate;
        checkoutDate;
        private citiesCache:Object = {};

        constructor(private $http, private basePath, private $q) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();
        }

        getDates() {
            return {
                "checkinDate": this.checkinDate,
                "checkoutDate": this.checkoutDate
            }
        }

        getCities() {
            return this.$http.get(this.basePath + '/data/cities');
        }

        getAccomodations() {
            return this.$http.get(this.basePath + '/data/accommodations');
        }

        getMoods() {
            return this.$http.get(this.basePath + '/data/moods');
        }

        getAvailableCities() {
            return this.getCachePromise(this.basePath + '/data/cities', 'citiesCache');
        }

        getCachePromise(requestUri: string, cacheObjName) {
            return this.$q((resolve, reject) => {

                if (!this[cacheObjName].hasOwnProperty('status')) {
                    console.log('do the request')
                    this.$http.get(requestUri).then(response => {
                        // set/update cache
                        this[cacheObjName] = response;
                        resolve(response);
                    }).catch(reject);
                } else {
                    console.log('serve cities from cache');
                    resolve(this[cacheObjName]);
                }
            });
        }

        static serviceId:string = "DataService";
    }
}
