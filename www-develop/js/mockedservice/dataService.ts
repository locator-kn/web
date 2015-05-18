module MockedService {
    export class DataService {

        checkinDate;
        checkoutDate;

        constructor(private $q) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();
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
                                    "title": "Konstanz",
                                    "plz": 78764
                                },
                                {
                                    "_id": "551bd8d96ac6271311173b03",
                                    "title": "Berlin",
                                    "plz": 13545
                                },
                                {
                                    "_id": "551bd8d9c528474af52dbd7e",
                                    "title": "Hamburg",
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
                                    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGJJREFUeNrkGjt200BQVtyjkg5xAsQJULp0UTo6zAlISiqcEygpqeycQM4J4pxA4gQSHZ1FyXsEM5vMmtF4f/qYELPvzVtJuzu789mZ2VmNvAHKwcE4gCoGiADeYB1outcABcAt1su7u5913zWMehKQQPUOIOm5jgXAFRC0+KuEAAETqD4BhJouBeH8d/z2jEgq0oyrAM6BoLm3ywIExAA5wJpBCZCK9pa4UhzL8eVtcLUlIlVMeDPEhEjUjQJ/OiQBgUIKN7vgmIagHI1JL8QRwIogFc+n3o6LmEMxbzQUEWVnZN3nL3sRg+q0GlS8w6j1qtU62OBHIcJATN7FOpWPSQQjpnS2Zmg1+m+w3e0Zqu4Nq3lAX3zfz6B6jq8f24QMIlyB8W8BYoB6vf71TdEnhLYJwBGAB30qV/wCH4z5AY9H+CmCb5+VYQf1Ez39jPQ1gcWhtraEzM9MVB1KndhaGIatUAP7zAx9hLqELZ3mhhFbauEiDeR+LDnNpJgjnoTp8pQteoJ9KANmbC9MsV/gIJWENmQ2aShUY8a+xRrGrFWqwHxVqVjHhnCLVDKKUC0qs35ziDQTrbWWpsnZaRvVY1sh8PFkRw84qnJKTncXWPMiJBTipNTOL8nzB6pCZO4CD2hyjvcA8kwSaA5udK2xzw451yoxktc5mOQzqC8ViAWeEiEiB6UTQniCnBT7kHroS3JIq/BgRdei2ivXjbmpeA0bnIp5yjbqhG3uLdNq2DObja4Ii1ZGM/sw5o+BIgNyg7WaWcxrgKG3NABbFgetUcYInToYiNzB9K/GRGymTMYZij5m5/JDfA4xexKTfVEg3BdQlwImvILHL2S+BWlfQPsJ7i+pZnOc2zNkZB5UzzUQQ66nqIqZtCQGC7UiqhVpzuZrJpWYSK1ECQcuAa6nQugQsFHnxg9fJXuPNXuocTbvqFobk+07RgYzheUI2PcFqMdLAcTkCqllpE+BVkyo5Dkz7zNFOuneIpmYrNr5qUNsk6OvyBScC2mU68JZFuI0PDVqgbOj9mwxFrNYiWahmSUeWuuiXFM/NndkGus3dr66SAS1PJ9AXVGLhHlcXui3QlgtDf4rmmlk/ajTU3n3jcX1yYIiCyF8IUum06r0p2qxplCjUqReZXlhWptPOWc5h/BJQgshtnbpP2rSHrO2SoOPr/V2zCY5ppxmUWfIrEfEFsPLG9K+tNicQuITfoPhqzVqf0zHj5mKJMyTUkJizrEBy1fyLHyOyxi6Z5ZjQT0MXGCD4HosOShqeK8NhuBe5TR2PrSpVZ8cMcEv/Fc9Ihc20oSKG6RDlySAo4Qqy2YX5RXh8JxJyCMLLhRznzSyPW2TD46nxi6QdE4+9EkHOaZt2kDUJR004vE9sUZnILKLPmlOg2/ShuUGx+nhlUZKnOzrvUuZ7mcSe6+uFfbqomdvrt4MxDy9y1DLtcHTup528ORP54cBxYT/5C8ce/NTzf/9m5Mmroq9R/zx7LcAAwDB9Ahp7K0alQAAAABJRU5ErkJggg== ',
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
