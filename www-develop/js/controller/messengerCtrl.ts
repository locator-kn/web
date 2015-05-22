module Controller {
    export class MessengerCtrl {

        overlay:boolean;

        constructor(private MessengerService) {

        }

        static controllerId:string = "MessengerCtrl";
    }
}
