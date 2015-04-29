module MockedService {
    export class DataService {

        checkinDate;
        checkoutDate;

        constructor(private $q) {
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
                                    "name": "couch",
                                    "query_name": 'couch'
                                },
                                {
                                    "_id": "2",
                                    "name": "room",
                                    "query_name": 'room'
                                },
                                {
                                    "_id": "3",
                                    "name": "holiday_flat",
                                    "query_name": 'holiday_flat'
                                },
                                {
                                    "_id": "4",
                                    "name": "none",
                                    "query_name": 'none'
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
                                    query_name: 'family_fun',
                                    excludes: []
                                },
                                {
                                    _id: '2',
                                    title: 'Girls on Tour',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'girls_on_tour',
                                    excludes: ['4', '5']
                                },
                                {
                                    _id: '3',
                                    title: 'Buddytrip',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'buddytrip',
                                    excludes: []
                                },
                                {
                                    _id: '4',
                                    title: 'Singles unter sich',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'singles',
                                    excludes: []
                                },
                                {
                                    _id: '5',
                                    title: 'Sturm der Liebe',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'liebe',
                                    excludes: []
                                },
                                {
                                    _id: '6',
                                    title: 'Halligalli Drecksaufest',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'drecksaufest',
                                    excludes: []
                                },
                                {
                                    _id: '7',
                                    title: 'Muskelkater',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'muskelkater',
                                    excludes: []
                                },
                                {
                                    _id: '8',
                                    title: 'Leckermäulchen',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'lecker',
                                    excludes: []
                                },
                                {
                                    _id: '9',
                                    title: 'Grüner gehts nicht',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'gruen',
                                    excludes: []
                                },
                                {
                                    _id: '10',
                                    title: 'Entspannung pur',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'entspannung',
                                    excludes: []
                                },
                                {
                                    _id: '11',
                                    title: 'Kultur und Sightseeing',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'kultur',
                                    excludes: []
                                },
                                {
                                    _id: '12',
                                    title: 'Haste nicht gesehn',
                                    icon: '',
                                    image: '',
                                    description: '',
                                    query_name: 'haste_nicht_gesehen',
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
