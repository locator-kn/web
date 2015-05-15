module Controller {
    export class InsertTripCtrl {

        activeItem:string = '';
        persons:number = 1;
        days:number = 1;

        constructor(private $scope) {

        }

        isActive(item) {
            return item == this.activeItem;
        }

        static controllerId:string="InsertTripCtrl";
    }
}
