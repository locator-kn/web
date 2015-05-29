module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations = [];
        selectedConversation = null;
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

        _sendMessage = () => {
            this.MessengerService.sendMessage(this.textbox, this.selectedConversation._id, this.selectedConversation.opponent._id, this.$rootScope.userID)
                .error(result => {
                    console.info("Error");
                })
                .then(result => {
                    this.messages.push({message: this.textbox, from: this.$rootScope.userID});
                    this.textbox = '';
                    console.info("Msg Success");
                });
        };

        sendMessage(event) {
            if (event && event.keyCode !== 13) {
                return;
            }
            this._sendMessage();
        }

        static controllerId:string = "MessengerCtrl";
    }
}
