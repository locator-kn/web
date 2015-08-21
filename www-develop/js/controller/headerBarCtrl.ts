module Controller {
    declare
    var io;
    export class HeaderBarCtrl {
        user:any;
        name:any;
        mail:any;
        password:any;
        socket:any;
        showBadge:boolean;
        unreadMessages:number = 0;
        showMessengerPopover:boolean = false;
        conversations:any = [];
        conversationTeaser:any = [];
        forgotPassword:boolean = false;

        openUser:string = 'user';
        openMessages:string = 'messages';

        // no error if empty string
        errormsg:string = '';

        // success message
        successmsg:string = '';

        conversationsHash:any = {};

        usersOnline:number = 0;
        lastMessageIn:string = '';

        $audio_elem:any = angular.element('#incoming_message')[0];

        localStorageAvailble:boolean;

        static $inject = ['$scope', '$state', '$rootScope', 'UserService', 'MessengerService', 'SocketService', '$timeout', 'HelperService', '$analytics'];
        constructor(private $scope, private $state, private $rootScope, private UserService, private MessengerService, private SocketService, private $timeout, private HelperService, private $analytics) {

            this.$rootScope.$on('login_success', () => {
                this.registerWebsockets();
                this.getConversations();
            });

            this.$rootScope.$on('new_conversation', () => {
                this.getConversations();
            });

            this.$rootScope.$on('get_me', () => {
                this.getMe();
            });

            this.getMe();

            this.$rootScope.$on('updateProfileImage', (s, newPath) => {
                if(this.user && this.user.picture) {
                    this.user.picture = newPath + '&c=' + Date.now();
                }
            });

            this.localStorageAvailble = this.HelperService.lsAvailable();

        }

        getConversations() {
            this.MessengerService.getConversations()
                .then(conversations => {
                    this.conversations = conversations.data;
                    if (!this.conversations.length) {
                        return;
                    }
                    this.conversations.forEach((element:any) => {
                        this.conversationsHash[element._id] = element;
                        if (this.$rootScope.userID && !element[this.$rootScope.userID + '_read']) {
                            this.showBadge = true;
                        }
                        this.UserService.getUser(element['opponent'])
                            .then(result => {
                                element['opponent'] = result.data;
                            });
                    });
                });
        }

        redirectToMessenger() {

            // do nothing if current state is messenger
            if (this.$state.opponentId) {
                return;
            }

            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }

            if (!this.conversations.length) {
                return;
            }
            if (this.lastMessageIn) {
                this.$state.go('messenger.opponent', {
                    opponentId: this.lastMessageIn
                });
            } else {
                this.$state.go('messenger');
            }

            this.showBadge = false;
            this.$scope.$emit('updateTitle', '');
        }

        registerWebsockets() {
            this.SocketService.socketInit().then(() => {
                // it doesnt need to be called after socketInit
                this.$rootScope.$on('new_message', (evt, newMessage) => {
                    if (this.$state.params.opponentId) {
                        return;
                    }
                    this.MessengerService.clearAll();
                    if (!this.conversationsHash[newMessage.conversation_id]) {
                        this.conversationsHash[newMessage.conversation_id] = {};
                    }
                    this.conversationsHash[newMessage.conversation_id][this.$rootScope.userID + '_read'] = false;
                    if (this.$rootScope.userID !== newMessage.from) {
                        if(this.$audio_elem.paused) {
                            this.$audio_elem.play();
                        }
                        this.showBadge = true;
                        this.unreadMessages = 1;
                        this.lastMessageIn = newMessage.conversation_id;
                        var newTitle = {
                            add: true,
                            text: '(' + this.unreadMessages + ')'
                        };
                        this.$scope.$emit('updateTitle', newTitle);
                    }
                });
            });

        }


        getMe() {
            this.UserService.getMe()

                .then(result => {
                    this.user = result.data;
                    this.$rootScope.authenticated = true;
                    this.$rootScope.userID = result.data._id;
                    this.$rootScope.userName = result.data.name + ' ' + result.data.surname;
                    this.$rootScope.userImageUrl = result.data.picture || '';

                    this.$rootScope.$broadcast('login_success');
                    this.$analytics.eventTrack('visit from logged in user');

                    this.getConversations();
                    // TODO: getMe maps currently to user_public view. So we cant get this info
                    if(this.user.isAdmin) {
                        this.getStats();
                    }
                }).catch(() => {
                    this.$rootScope.authenticated = false;
                    this.$analytics.eventTrack('visit from not logged in user');
                });
        }

        getStats() {
            this.UserService.getUsersOnline().then((response) => {
                this.usersOnline = response.data.usersOnline;
            });
        }

        sendNewPassword(mail, form) {
            this.errormsg = '';
            if (form.$invalid) {
                return;
            }

            this.UserService.sendNewPassword(mail)
                .then(() => {
                    console.info("Success");
                    this.successmsg = 'Email wurde an dich verschickt';

                    this.$timeout(() => {

                        this.successmsg = '';
                        this.forgotPassword = false;
                        // this.openLoginDialog();
                    }, 2000)

                }).catch(() => {
                    console.info("Error");
                    this.errormsg = "Mail nicht gefunden";
                })
        }

        triggerforgotPassword() {
            this.errormsg = '';
            this.forgotPassword = true;
        }

        searchWithContext() {
            if(this.localStorageAvailble) {
                this.$state.go('search', this.HelperService.getSearchContext());
            } else {
                this.$state.go('search');
            }

        }

        static controllerId:string = "HeaderBarCtrl";
    }
}
