interface SelectedConversation {
    _id:string;
    opponent:any;
    trip?:string;
    tripObject?:any;
}


module Controller {
    export class MessengerCtrl {

        overlay:boolean;
        conversations = [];
        conversationsHash = {};
        selectedConversation:SelectedConversation = null;
        messages = [];
        messagesHash = {};

        textbox = '';
        messagesIdCache;
        showEmojis:boolean;
        debouncedAck:any;
        initialLoad:boolean = false;

        emojis = [":smile:", ":blush:", ":kissing_heart:", ":hear_no_evil:", ":speak_no_evil:", ":see_no_evil:"];

        static $inject = ['screenSize', 'smoothScroll', '$filter', '$scope', '$sce', 'MessengerService', '$state', 'UserService', '$rootScope', 'SocketService', 'CacheFactory', 'UtilityService', 'TripService'];

        constructor(private screenSize, private smoothScroll, private $filter, private $scope, private $sce, private MessengerService, private $state, private UserService, private $rootScope, private SocketService, private CacheFactory, private UtilityService, private TripService) {

            this.$rootScope.breadcrumb = 'Messenger';

            this.$scope.$emit('updateTitle', '');

            this.getConversations();

            $scope.$on('login_success', () => {
                this.registerSocketEvent();
            });
            if (this.$rootScope.authenticated) {
                this.registerSocketEvent();
            } else {
                this.$state.go('welcome');
                this.$rootScope.$emit('openLoginDialog');
            }

            this.messagesIdCache = this.CacheFactory.get('messagesId');

            this.debouncedAck = this.UtilityService.debounce(this.emitAck, 1000, false);

        }

        toTrusted(html_code) {
            return this.$sce.trustAsHtml(this.$filter('emoji')(html_code));
        }

        selectEmoji(item) {
            this.textbox = this.textbox + ' ' + item + ' ';
            this.showEmojis = false;
            angular.element('#chat_box').focus();
        }

        registerSocketEvent() {
            //this.SocketService.offEvent('new_message');
            this.$scope.$on('new_message', (evt, newMessage) => {
                console.log('neWmEssage');
                if (this.$state.params.opponentId === newMessage.conversation_id) {

                    this.debouncedAck(newMessage.from, newMessage.conversation_id);
                } else {
                    this.conversationsHash[newMessage.conversation_id][this.$rootScope.userID + '_read'] = false;
                }
                if (!this.messagesHash[newMessage.conversation_id]) {
                    this.messagesHash[newMessage.conversation_id] = [];
                }
                this.messagesHash[newMessage.conversation_id].push(newMessage);
                this.MessengerService.putMessageByConversationId(newMessage.conversation_id, newMessage);

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

                        this.MessengerService.getConversation(element._id).then((result) => {
                            this.messagesHash[element._id] = result.data;
                        })
                    });
                    if (this.$state.params.opponentId) {
                        var con = this.getConversationById(this.$state.params.opponentId);
                        this.select(con);
                    } else {
                        this.$state.go('messenger.opponent', {opponentId: this.conversations[0]._id});
                        var con = this.getConversationById(this.conversations[0]._id);
                        this.select(con);
                    }
                });
        }

        getConversationById(id:string) {
            return this.conversationsHash[id];
        }

        // one single conversation
        getConversation(conversation) {
            return this.MessengerService.getConversation(conversation._id)
                .then(result => {
                    this.messagesHash[conversation._id] = result.data;
                });
        }

        // select a conversation to show message content
        select(conversation:SelectedConversation) {
            if (!conversation) {
                return;
            }
            this.selectedConversation = conversation;

            if (this.selectedConversation.opponent.name) {
                this.$rootScope.breadcrumb = 'Messenger | ' + this.selectedConversation.opponent.name;
            }

            this.getConversation(this.selectedConversation).then(result => {
                // if the clicked conversation is unread, send ack to server
                if (!this.selectedConversation[this.$rootScope.userID + '_read']) {
                    this.emitAck(conversation.opponent._id, conversation._id)
                }
                if (this.selectedConversation.trip) {
                    this.TripService.getTripById(this.selectedConversation.trip).then(result => {
                        this.selectedConversation.tripObject = result.data;
                    })
                }
            });

            // scroll to chat
            console.info(this.screenSize);
            if (this.screenSize.is('xs')) {

                if (this.initialLoad) {
                    var element = document.getElementById('chat');
                    this.smoothScroll(element, {offset: 60});
                } else {
                    this.initialLoad = true;
                }
            }


        }

        emitAck(from, conversation_id) {

            if (from === this.$rootScope.userID) {
                return
            }
            console.log('send ack for received message', {
                from: this.$rootScope.userID,
                opponent: from,
                conversation_id: conversation_id
            });
            setTimeout(() => {
                this.SocketService.emit('message_ack', {
                    from: this.$rootScope.userID,
                    opponent: from,
                    conversation_id: conversation_id
                });
            }, 10);
            this.conversationsHash[conversation_id][this.$rootScope.userID + '_read'] = true;
        }

        _sendMessage = () => {

            this.textbox = this.textbox.replace(/<\/?[^>]+(>|$)/g, "");
            var newMessage = {
                message: this.textbox,
                from: this.$rootScope.userID,
                timestamp: Date.now()
            };
            //this.MessengerService.putMessageByConversationId(this.selectedConversation._id, newMessage);
            //this.messagesHash[this.selectedConversation._id].push(newMessage);

            this.MessengerService.sendMessage(this.textbox, this.selectedConversation._id, this.selectedConversation.opponent._id, this.$rootScope.userID)

                .then(result => {
                    console.info("Msg Success");
                    this.textbox = '';
                })
                .catch(result => {
                    console.info("Error", result);
                });
        };

        sendMessage(event) {

            if (event && event.keyCode !== 13 || !this.textbox) {
                return;
            }
            this._sendMessage();
            event.preventDefault();
        }

        static controllerId:string = "MessengerCtrl";
    }
}
