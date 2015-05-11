module Controller {
    export class SearchMainCtrl {
        query:any;

        activeItem = '';

        constructor(private $scope, private $location) {
            this.query = {};
            this.query.city = '';
            this.query.dateFrom =  '';
            this.query.dateTo = '';
            this.query.range = 3;
        }

        isActive(item) {
            return this.activeItem == item;
        }

        static controllerId:string = "SearchMainCtrl";
    }
}
