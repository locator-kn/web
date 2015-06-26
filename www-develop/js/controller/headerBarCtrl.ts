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


        constructor(private hotkeys, private $scope, private $state, private $rootScope, private $location, private UserService, private $element, private MessengerService, private SocketService, private $timeout) {

            this.$rootScope.$on('login_success', () => {
                this.registerWebsockets();
            });

            this.$rootScope.$on('new_conversation', () => {
                this.getConversations();
            });

            this.$rootScope.$on('get_me', () => {
                this.getMe();
            });

            this.getConversations();

            this.getMe();

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
                            console.log('there is an unread message from', element);
                            this.showBadge = true;
                        }
                        this.UserService.getUser(element['opponent'])
                            .then(result => {
                                element['opponent'] = result.data;
                            });
                    });
                });
        }

        openPopover() {

            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }

            if (!this.conversations.length) {
                return;
            }

            this.showBadge = false;
            this.unreadMessages = 0;
            if (!this.showMessengerPopover) {
                this.getConversations();
            }
            this.showMessengerPopover = !this.showMessengerPopover
        }

        registerWebsockets() {

            this.SocketService.socketInit().then(() => {
                // it doesnt need to be called after socketInit
                this.$scope.$on('new_message', (evt, newMessage) => {
                    this.showBadge = true;
                    this.unreadMessages += 1;
                    console.info('new message');
                    console.log(newMessage);
                    //this.conversationsHash[newMessage.conversation_id][this.$rootScope.userID + '_read'] = false;
                });
            });


        }


        getMe() {
            this.UserService.getMe()

                .then(result => {
                    this.user = result.data;
                    this.$rootScope.authenticated = true;
                    this.$rootScope.userID = result.data._id;
                    console.info(result.data._id);
                    this.$rootScope.$emit('login_success');
                    this.getConversations();
                    // TODO: getMe maps currently to user_public view. So we cant get this info
                    //if(this.user.isAdmin) {
                        this.getStats();
                    //}
                }).catch(() => {
                    this.$rootScope.authenticated = false;
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

        static controllerId:string = "HeaderBarCtrl";
    }
}
