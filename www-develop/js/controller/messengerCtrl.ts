module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations;
        selectedConversation;
        messages;
        textbox;

        constructor(private MessengerService, private UserService, private $rootScope) {
            this.getConversations();
        }

        // conversationlist
        getConversations() {
            this.MessengerService.getConversations()
                .then(result => {
                    this.conversations = result.data;
                    this.conversations.forEach((element) => {

                        this.UserService.getUser(element.opponent)
                            .then(result => {
                                element.opponent = result.data;
                            });
                    });
                    console.info(this.conversations);
                });
        }

        // one single conversation
        getConversation(conversation) {
            this.MessengerService.getConversation(conversation._id)
                .then(result => {

                    this.messages = result.data;
                    console.info(this.messages);

                });
        }

        // select a conversation to show message content
        select(conversation) {
            this.selectedConversation = conversation;
            this.getConversation(this.selectedConversation);
            console.info('select conversation with ' + this.selectedConversation.opponent.name);
        }

        sendMessage() {
            console.info('SelectedID: ' + this.selectedConversation._id);
            this.MessengerService.sendMessage(this.textbox, this.selectedConversation._id, this.selectedConversation.opponent._id, this.$rootScope.userID)
                .then(result => {
                    console.info("Msg Success");
                }).then(error => {
                    console.info("Error");
                });
        }


        static controllerId:string = "MessengerCtrl";
    }
}
