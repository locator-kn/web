module Service {
    export class InsertTripService {
        days:any = 1;

        constructor(private $rootScope) {
        }

        setDays(days) {
            this.days = days;
            this.$rootScope.$emit('newInsertTrip');
        }

        getDays() {
            return this.days;
        }


        static serviceId:string = "InsertTripService";
    }
}

