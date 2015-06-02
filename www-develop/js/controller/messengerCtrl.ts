interface SelectedConversation {
    _id:string;
    opponent:any;
}

module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations = [];
        conversationsHash = {};
        selectedConversation:SelectedConversation = null;
        messages = [];
        textbox = '';
        messagesIdCache;

        constructor(private MessengerService, private $state, private UserService, private $rootScope, private SocketService, private CacheFactory, private basePathRealtime ) {
            this.getConversations();


            $rootScope.$on('login_success', () => {
                this.registerSocketEvent();
            });
            if(this.$rootScope.authenticated) {
                this.registerSocketEvent();
            }

            this.messagesIdCache = this.CacheFactory.get('messagesId');
        }

        registerSocketEvent() {
            this.SocketService.onEvent('new_message', (newMessage) => {
                this.messages.push(newMessage);
                this.messagesIdCache.remove(this.basePathRealtime + '/messages/' + this.selectedConversation._id);
            });
        }

        // conversationlist
        getConversations() {
            this.MessengerService.getConversations()
                .then(result => {
                    this.conversations = result.data;
                    this.conversations.forEach(element => {
                        this.conversationsHash[element._id] = element;
                        this.UserService.getUser(element['opponent'])
                            .then(result => {
                                element['opponent'] = result.data;
                            });
                    });
                    if(this.$state.params.opponentId) {
                        var con = this.getConversationById(this.$state.params.opponentId);
                        this.select(con);
                    }
                });
        }

        getConversationById(id:string) {
            return this.conversationsHash[id];
        }

        // one single conversation
        getConversation(conversation) {
            this.MessengerService.getConversation(conversation._id)
                .then(result => {
                    this.messages = result.data;
                });
        }

        // select a conversation to show message content
        select(conversation:SelectedConversation) {
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
