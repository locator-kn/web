module Controller {
    export class InsertTripCtrl {

        activeItem:string = '';

        constructor(private $scope) {

        }

        isActive(item) {
            return item == this.activeItem;
        }

        static controllerId:string="InsertTripCtrl";
    }
}
