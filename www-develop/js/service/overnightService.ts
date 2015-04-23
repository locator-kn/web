module Service {
    export class OvernightService {
        constructor(private $q) {

        }

        sleepplace() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            "_id": "1",
                            "name": "couch",
                            selected: false
                        },
                        {
                            "_id": "2",
                            "name": "room",
                            selected: false
                        },
                        {
                            "_id": "3",
                            "name": "holiday_flat",
                            selected: false
                        }
                    ]);
                }, 500);
            });
        }

        static serviceId:string = "OvernightService";
    }
}
