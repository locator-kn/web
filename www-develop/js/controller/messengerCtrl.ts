module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations = [];
        selectedConversation;
        messages = [];
        textbox = '';

        constructor(private MessengerService, private UserService, private $rootScope, private SocketService) {
            this.getConversations();

            $rootScope.$on('login_success', () => {
                this.registerSocketEvent();
            });
        }

        registerSocketEvent() {
            this.SocketService.onEvent('new_message', (newMessage) => {
                this.messages.push(newMessage);
            });
        }

        // conversationlist
        getConversations() {
            this.MessengerService.getConversations()
                .then(result => {
                    this.conversations = result.data;
                    this.conversations.forEach(element => {

                        this.UserService.getUser(element['opponent'])
                            .then(result => {
                                element['opponent'] = result.data;
                            });
                    });
                });
        }

        // one single conversation
        getConversation(conversation) {
            this.MessengerService.getConversation(conversation._id)
                .then(result => {
                    this.messages = result.data;
                });
        }

        // select a conversation to show message content
        select(conversation) {
            this.selectedConversation = conversation;
            this.getConversation(this.selectedConversation);
        }

        sendMessage() {
            this.MessengerService.sendMessage(this.textbox, this.selectedConversation._id, this.selectedConversation.opponent._id, this.$rootScope.userID)
                .error(result => {
                    console.info("Error");
                })
                .then(result => {
                    console.info("Msg Success");
                });
        }

        static controllerId:string = "MessengerCtrl";
    }
}
