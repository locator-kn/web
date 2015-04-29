module Service {
    export class DataService {

        checkinDate;
        checkoutDate;

        constructor(private $http, private basePath) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add('days', 3).toDate();
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

        static serviceId:string = "DataService";
    }
}
