module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations;

        constructor(private MessengerService) {
            this.getConversations();

        }

        getConversations() {
            this.MessengerService.getConversations()
                .then(result => {
                    this.conversations = result.data;
                    console.info(this.conversations);
                });
        }

        static controllerId:string = "MessengerCtrl";
    }
}
