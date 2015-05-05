module Controller {
    export class UserHeaderCtrl {
        user:any;
        constructor(private $scope, private $location) {
            this.user = 'asdlkjklasdjl';
        }

        static controllerId:string = "UserHeaderCtrl";
    }
}
