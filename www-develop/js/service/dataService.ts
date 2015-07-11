module Service {
    export class DataService {

        checkinDate;
        checkoutDate;

        dataCitiesCache;
        dataAccommodationsCache;
        dataMoodsCache;
        dayCache;
        fixedCitiesCache;

        availableMoods = [{
            id: "buddytrip",
            query_name: "buddytrip",
            title: "Buddytrip",
            icon: "buddytrip.png",
            icon_grey: "buddytrip_grey.png",
            description: ''
        }, {
            id: "girlsontour",
            query_name: "girls_on_tour",
            title: "Girls on Tour",
            icon: "girls_on_tour.png",
            icon_grey: "girls_on_tour_grey.png",
            description: ""
        }, {
            id: "halligalli",
            query_name: "halligalli_drecksau",
            title: "Halligalli Drecksau",
            icon: "halligalli_drecksau.png",
            icon_grey: "halligalli_drecksau_grey.png",
            description: ""
        }, {
            id: "muskelkater",
            query_name: "muskelkater",
            title: "Muskelkater",
            icon: "muskelkater.png",
            icon_grey: "muskelkater_grey.png",
            description: ""
        }, {
            id: "sturmderliebe",
            query_name: "sturm_der_liebe",
            title: "Sturm der Liebe",
            icon: "sturm_der_liebe.png",
            icon_grey: "sturm_der_liebe_grey.png",
            description: ""
        }, {
            id: "gruenergehtsnicht",
            query_name: "gruener_gehts_nicht",
            title: "Grüner gehts nicht",
            icon: "gruener_gehts_nicht.png",
            icon_grey: "gruener_gehts_nicht_grey.png",
            description: ""
        }, {
            id: "hastenichtgesehen",
            query_name: "haste_nicht_gesehen",
            title: "Haste nicht gesehen",
            icon: "haste_nicht_gesehen.png",
            icon_grey: "haste_nicht_gesehen_grey.png",
            description: ""
        }, {
            id: "singlesuntersich",
            query_name: "singles_unter_sich",
            title: "Singles unter sich",
            icon: "singles_unter_sich.png",
            icon_grey: "singles_unter_sich_grey.png",
            description: ""
        }, {
            id: "familyfun",
            query_name: "family_fun",
            title: "Family Fun",
            icon: "family_fun.png",
            icon_grey: "family_fun_grey.png",
            description: ""
        }, {
            query_name: "kultur_und_sightseeing",
            title: "Kultur und Sightseeing",
            icon: "kultur_und_sightseeing.png",
            icon_grey: "kultur_und_sightseeing_grey.png",
            description: ""
        }, {
            id: "leckermaeulchen",
            query_name: 'leckermaeulchen',
            title: 'Leckermäulchen',
            icon: 'leckermaeulchen.png',
            icon_grey: 'leckermaeulchen_grey.png',
            description: ''
        }, {
            id: "entspannung",
            query_name: "entspannung_pur",
            title: "Entspannnung pur",
            icon: "entspannung_pur.png",
            icon_grey: "entspannung_pur_grey.png",
            description: ""
        }];

        static $inject = ['$http', 'basePath', 'CacheFactory', '$q'];
        constructor(private $http, private basePath, private CacheFactory, private $q) {
            this.checkinDate = new Date();
            this.checkoutDate = moment(this.checkinDate).add(3, 'days').toDate();


            this.dataCitiesCache = CacheFactory.createCache('dataCities');
            this.fixedCitiesCache = CacheFactory.createCache('dataFixCities');
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

        getFixedCities() {
            return this.$http.get(this.basePath + '/data/fixCities', {cache: this.fixedCitiesCache});
        }

        getAccomodations() {
            return this.$http.get(this.basePath + '/data/accommodations', {cache: this.dataAccommodationsCache});
        }

        getMoods() {
            return this.$q((resolve) => {
                resolve({
                    data: angular.copy(this.availableMoods)
                });

            });
        }

        getAvailableCities() {
            return this.$http.get(this.basePath + '/data/cities');
        }

        getAvailableAmountOfDays() {
            return this.$q((resolve) => {
                resolve({
                    data: [
                        {"id": "1", "title": "1 Tag", "query_name": "1"},
                        {"id": "2", "title": "2 Tage", "query_name": "2"},
                        {"id": "3", "title": "3 Tage", "query_name": "3"},
                        {"id": "4", "title": "3 Tage +", "query_name": "3plus"}
                    ]
                });
            }, {cache: this.dayCache});
        }

        static serviceId:string = "DataService";
    }
}
