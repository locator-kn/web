module Service {
    export class DataService {

        checkinDate;
        checkoutDate;

        dataCitiesCache;
        dataAccommodationsCache;
        dataMoodsCache;

        constructor(private $http, private basePath, private CacheFactory) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();


            this.dataCitiesCache = CacheFactory.createCache('dataCities');
            this.dataAccommodationsCache = CacheFactory.createCache('dataAccommodations');
            this.dataMoodsCache = CacheFactory.createCache('dataMoods');

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
            return this.$http.get(this.basePath + '/data/cities', {cache: this.dataCitiesCache});
        }

        static serviceId:string = "DataService";
    }
}
