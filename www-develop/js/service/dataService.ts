module Service {
    export class DataService {

        checkinDate;
        checkoutDate;

        dataCitiesCache;
        dataAccommodationsCache;
        dataMoodsCache;
        dayCache;

        constructor(private $http, private basePath, private CacheFactory, private $q) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();


            this.dataCitiesCache = CacheFactory.createCache('dataCities');
            this.dataAccommodationsCache = CacheFactory.createCache('dataAccommodations');
            this.dataMoodsCache = CacheFactory.createCache('dataMoods');
            this.dayCache = CacheFactory.createCache('dataDay');

        }

        getDates() {
            return {
                "checkinDate": this.checkinDate,
                "checkoutDate": this.checkoutDate
            }
        }

        getCities() {
            return this.$http.get(this.basePath + '/data/cities', {cache: this.dataCitiesCache});
        }

        getAccomodations() {
            return this.$http.get(this.basePath + '/data/accommodations', {cache: this.dataAccommodationsCache});
        }

        getMoods() {
            return this.$http.get(this.basePath + '/data/moods', {cache: this.dataMoodsCache});
        }

        getAvailableCities() {
            return this.$http.get(this.basePath + '/data/cities');
        }

        getAvailableAmountOfDays() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            data: [
                                {"id": "1", "title": "1 Tag"},
                                {"id": "2", "title": "2 Tage"},
                                {"id": "3", "title": "3 Tage"},
                                {"id": "4", "title": "3+ Tage"},
                            ]
                        });
                }, 0);
            }, {cache: this.dayCache});
        }

        static serviceId:string = "DataService";
    }
}
