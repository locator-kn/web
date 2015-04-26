module Service {
    export class DataService {
        constructor(private $q) {

        }

        getAccomodations() {
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


        getMoods() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            _id: '1',
                            title: 'Family Fun',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '2',
                            title: 'Girls on Tour',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: ['4', '5'],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '3',
                            title: 'Buddytrip',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '4',
                            title: 'Singles unter sich',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '5',
                            title: 'Sturm der Liebe',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '6',
                            title: 'Halligalli Drecksaufest',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '7',
                            title: 'Muskelkater',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '8',
                            title: 'Leckermäulchen',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '9',
                            title: 'Grüner gehts nicht',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '10',
                            title: 'Entspannung pur',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '11',
                            title: 'Kultur und Sightseeing',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        },
                        {
                            _id: '12',
                            title: 'Haste nicht gesehn',
                            icon: '',
                            image: '',
                            description: '',
                            excludes: [],
                            selected: false,
                            excluded: 0
                        }
                    ]);
                }, 500);
            });
        }

        static serviceId:string = "DataService";
    }
}
