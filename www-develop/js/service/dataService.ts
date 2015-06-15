module Service {
    export class DataService {

        checkinDate;
        checkoutDate;

        dataCitiesCache;
        dataAccommodationsCache;
        dataMoodsCache;
        dayCache;

        availableMoods = [{
            query_name: "buddytrip",
            title: "buddytrip",
            icon: "buddytrip.png",
            icon_grey: "buddytrip_grey.png",
            description: ''
        }, {
            query_name: "girls_on_tour",
            title: "girls on tour",
            icon: "girls_on_tour.png",
            icon_grey: "girls_on_tour_grey.png",
            description: ""
        }, {
            query_name: "halligalli_drecksau",
            title: "halligalli drecksau",
            icon: "halligalli_drecksau.png",
            icon_grey: "halligalli_drecksau_grey.png",
            description: ""
        }, {
            query_name: "muskelkater",
            title: "muskelkater",
            icon: "muskelkater.png",
            icon_grey: "muskelkater_grey.png",
            description: ""
        }, {
            query_name: "sturm_der_liebe",
            title: "strum der liebe",
            icon: "sturm_der_liebe.png",
            icon_grey: "sturm_der_liebe_grey.png",
            description: ""
        }, {
            query_name: "gruener_gehts_nicht",
            title: "gruener gehts nicht",
            icon: "gruener_gehts_nicht.png",
            icon_grey: "gruener_gehts_nicht_grey.png",
            description: ""
        }, {
            query_name: "haste_nicht_gesehen",
            title: "haste nicht gesehen",
            icon: "haste_nicht_gesehen.png",
            icon_grey: "haste_nicht_gesehen_grey.png",
            description: ""
        }, {
            query_name: "singles_unter_sich",
            title: "singles unter sich",
            icon: "singles_unter_sich.png",
            icon_grey: "singles_unter_sich_grey.png",
            description: ""
        }, {
            query_name: "family_fun",
            title: "family fun",
            icon: "family_fun.png",
            icon_grey: "family_fun_grey.png",
            description: ""
        }, {
            query_name: "kultur_und_siteseeing",
            title: "kultur und sighteseeing",
            icon: "kultur_und_sighteseeing.png",
            icon_grey: "kultur_und_sighteseeing_grey.png",
            description: ""
        }, {
            query_name: 'leckermaeulchen',
            title: 'leckermaeulchen',
            icon: 'leckermaeulchen.png',
            icon_grey: 'leckermaeulchen_grey.png',
            description: ''
        }, {
            query_name: "entspannung_pur",
            title: "entspannnung pur",
            icon: "entspannung_pur.png",
            icon_grey: "entspannung_pur_grey.png",
            description: ""
        }];

        constructor(private $http, private basePath, private CacheFactory, private $q) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();


            this.dataCitiesCache = CacheFactory.createCache('dataCities');
            this.dataAccommodationsCache = CacheFactory.createCache('dataAccommodations');
            this.dataMoodsCache = CacheFactory.createCache('dataMoods');
            this.dayCache = CacheFactory.createCache('dataDay');

        }

        getDates() {
            return {
                "checkinDate": this.checkinDate,
                "checkoutDate": this.checkoutDate
            }
        }

        getCities() {
            return this.$http.get(this.basePath + '/data/cities', {cache: this.dataCitiesCache});
        }

        getAccomodations() {
            return this.$http.get(this.basePath + '/data/accommodations', {cache: this.dataAccommodationsCache});
        }

        getMoods() {
            return this.availableMoods;
        }

        getAvailableCities() {
            return this.$http.get(this.basePath + '/data/cities');
        }

        getAvailableAmountOfDays() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            data: [
                                {"id": "1", "title": "1 Tag"},
                                {"id": "2", "title": "2 Tage"},
                                {"id": "3", "title": "3 Tage"},
                                {"id": "4", "title": "3+ Tage"},
                            ]
                        });
                }, 0);
            }, {cache: this.dayCache});
        }

        static serviceId:string = "DataService";
    }
}
