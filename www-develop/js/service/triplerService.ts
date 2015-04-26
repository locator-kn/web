module Service {
    export class TriplerService {
        constructor(private $q) {

        }


        filteredQue() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        }

                    ]);
                }, 500);
            });
        }

        getTrip(_id) {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        }
                    );
                }, 500);
            });
        }


        static serviceId:string = "TriplerService";
    }
}
