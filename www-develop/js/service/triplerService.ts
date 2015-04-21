module Service {
    export class TripService {
        constructor(private $q) {

        }

        cities() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            "_id": "551bd8d98fe8ee54fe79fbe0",
                            "name": "Konstanz",
                            "plz": 78764
                        },
                        {
                            "_id": "551bd8d96ac6271311173b03",
                            "name": "Berlin",
                            "plz": 13545
                        },
                        {
                            "_id": "551bd8d9c528474af52dbd7e",
                            "name": "Hamburg",
                            "plz": 24567
                        }
                    ]);
                }, 500);
            });
        }
        static serviceId:string="TripService";
    }
}
