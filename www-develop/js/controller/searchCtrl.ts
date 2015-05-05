module Controller {
    export class SearchCtrl {
        query:any;
        constructor(private $scope, private $location) {
            this.query = $location.search();

            console.log(this.query);
            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.city;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.dateFrom;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.dateTo;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.range;
            }), () => {
                this.updateUrl()
            });

        }

        updateUrl() {
            this.$location.search(this.query);
        }

        static controllerId:string = "SearchCtrl";
    }
}
