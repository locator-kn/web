module Service {
    export class OvernightService {
        constructor(private $q) {

        }

        sleepplace() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            "_id": "551bd8d98fe8ee54fe79fbe0",
                            "name": "couch"
                        },
                        {
                            "_id": "551bd8d96ac6271311173b03",
                            "name": "room"
                        },
                        {
                            "_id": "551bd8d9c528474af52dbd7e",
                            "name": "holiday_flat"
                        }
                    ]);
                }, 500);
            });
        }

        static serviceId:string = "OvernightService";
    }
}
