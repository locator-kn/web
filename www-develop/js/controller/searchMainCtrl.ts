module Controller {
    export class SearchMainCtrl {
        query:any;

        constructor() {
            this.query = {};
            this.query.city = '';
            this.query.dateFrom = '';
            this.query.dateTo = '';
            this.query.range = 3;
        }

        static controllerId:string = "SearchMainCtrl";
    }
}
