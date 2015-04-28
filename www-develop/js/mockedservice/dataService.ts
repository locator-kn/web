module MockedService {
    export class DataService {
        constructor(private $q) {

        }

        getCities() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            data: [
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
                            ]
                        });
                }, 500);
            });
        }

        getAccomodations() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            data: [
                                {
                                    "_id": "1",
                                    "name": "couch"
                                },
                                {
                                    "_id": "2",
                                    "name": "room"
                                },
                                {
                                    "_id": "3",
                                    "name": "holiday_flat"
                                }
                            ]
                        });
                }, 500);
            });
        }


        getMoods() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            data: [
                                {
                                    _id: '1',
                                    title: 'Family Fun',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '2',
                                    title: 'Girls on Tour',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: ['4', '5']
                                },
                                {
                                    _id: '3',
                                    title: 'Buddytrip',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '4',
                                    title: 'Singles unter sich',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '5',
                                    title: 'Sturm der Liebe',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '6',
                                    title: 'Halligalli Drecksaufest',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '7',
                                    title: 'Muskelkater',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '8',
                                    title: 'Leckermäulchen',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '9',
                                    title: 'Grüner gehts nicht',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '10',
                                    title: 'Entspannung pur',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '11',
                                    title: 'Kultur und Sightseeing',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                },
                                {
                                    _id: '12',
                                    title: 'Haste nicht gesehn',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    excludes: []
                                }]
                        }
                    );
                }, 500);
            });
        }

        static serviceId:string = "DataService";
    }
}
