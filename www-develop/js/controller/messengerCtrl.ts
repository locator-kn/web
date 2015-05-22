module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations;
        selectedConversation;
        messages;

        constructor(private MessengerService, private UserService, private $rootScope) {
            this.getConversations();
            this.getConversation();
        }

        // conversationlist
        getConversations() {
            this.MessengerService.getConversations()
                .then(result => {
                    this.conversations = result.data;
                });
        }

        // one single conversation
        getConversation() {
            this.MessengerService.getConversation()
                .then(result => {

                    this.messages = result.data;
                    console.info(this.messages);

                });
        }

        // select a conversation to show message content
        select(conversation) {
            this.selectedConversation = conversation;
        }

        static controllerId:string = "MessengerCtrl";
    }
}
