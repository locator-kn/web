module Controller {
    declare var io;
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


        constructor(private hotkeys, private $scope, private $state, private $rootScope, private $location, private UserService, private $element, private MessengerService, private SocketService, private $timeout) {
            this.$rootScope.$on('login_success', () => {
                this.registerWebsockets();
            });
            this.getMe();


            this.hotkeys.add({
                combo: 'esc',
                description: 'Close the Modal',
                callback: () => {
                    this.closeDialog();
                }
            });

            $rootScope.$on('openLoginDialog', () => {
                this.openLoginDialog();
            });

            $rootScope.$on('closeDialog', () => {
                this.closeDialog();
            });
        }

        openPopover() {
            this.showBadge = false;
            this.unreadMessages = 0;
            if (!this.showMessengerPopover) {
                this.MessengerService.getConversations()
                    .then(conversations => {
                        this.conversations = conversations.data;
                        this.conversations.forEach(element => {
                            this.UserService.getUser(element['opponent'])
                                .then(result => {
                                    element['opponent'] = result.data;
                                });
                        });
                        console.log(this.conversations)
                    });

            }
            this.showMessengerPopover = !this.showMessengerPopover
        }

        registerWebsockets() {

            this.SocketService.onEvent('new_message', (newMessage) => {
                this.showBadge = true;
                this.unreadMessages += 1;
                console.info('new message');
                console.log(newMessage);
            });

        }


        login(form) {
            if (form.$invalid) {
                return;
            }


            console.info('Login ' + this.mail);

            this.UserService.login(this.mail, this.password)

                .then(result => {
                    console.info("Login Success");
                    this.errormsg = '';

                    this.getMe();
                    this.$rootScope.authenticated = true;
                    this.closeDialog();

                }).catch(resp => {
                    if (resp.status === 401) {
                        this.errormsg = "Falsche Mail oder falsches Passwort angegeben.";
                        return;
                    }
                    console.info("Login Error");
                    this.errormsg = "Oops, da lief etwas falsch";
                });
        }

        register(form) {
            if (form.$invalid) {
                return;
            }

            this.UserService.register(this.name, this.mail, this.password)
                .then(result => {
                    console.info("Register Success");
                    this.getMe();

                    //close the dialog after success
                    this.closeDialog();

                })
                .catch(resp => {
                    if(resp.statusCode === 409) {
                        this.errormsg ='Diese Mail gibts schon'
                        return;
                    }
                    console.info("Register Error");
                    console.info(resp);
                    this.errormsg = "Oops, da lief etwas falsch";
                });


        }

        openLoginDialog() {
            this.forgotPassword = false;
            this.resetInput();
            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#loginmodal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });

        }

        openRegisterDialog() {
            this.resetInput();
            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#registermodal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });

        }

        resetInput() {
            this.errormsg = '';
            this.successmsg = '';
            this.user = '';
            this.name = '';
            this.password = '';
            this.mail = '';
        }

        loginFacebook() {
            this.UserService.loginFacebook();
        }

        loginGoogle() {
            this.UserService.loginGoogle();
        }

        closeDialog() {
            this.$rootScope.overlay = false;
            angular.element(this.$element).find('.moodal.active').removeClass('active');
        }


        logout() {
            console.info('Logout');
            this.UserService.logout()
                .then(() => {
                    console.info("Logout Success");
                    this.$rootScope.authenticated = false;
                    this.$rootScope.userID = '';
                    this.$state.go('welcome');
                }).catch(() => {
                    console.info("Logout Error");
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
                }).catch(() => {
                    this.$rootScope.authenticated = false;
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
