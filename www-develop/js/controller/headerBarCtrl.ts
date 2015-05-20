module Controller {
    export class HeaderBarCtrl {
        user:any;
        name:any;
        mail:any;
        password:any;


        constructor(private hotkeys, private $scope, private $state, private $rootScope, private $location, private UserService, private $element, private basePath) {
            this.getMe();

            this.hotkeys.add({
                combo: 'esc',
                description: 'Close the Modal',
                callback: () => {
                    this.closeDialog();
                }
            });
        }

        login() {
            console.info('Login ' + this.mail);

            this.UserService.login(this.mail, this.password)

                .error((resp) => {
                    console.info("Login Error");
                })

                .then(result => {
                    console.info("Login Success");
                    this.getMe();
                    this.$rootScope.authenticated = true;

                    //close the dialog after success
                    this.closeDialog();

                });
        }

        register() {
            console.info('Register' + this.name);
            this.UserService.register(this.name, this.mail, this.password)

                .error((resp) => {
                    console.info("Register Error");
                })

                .then(result => {
                    console.info("Register Success");
                    this.getMe();

                    //close the dialog after success
                    this.closeDialog();

                });


        }

        openLoginDialog() {
            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#loginmodal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });

        }

        openRegisterDialog() {
            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#registermodal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });

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
                .error((resp) => {
                    console.info("Logout Error");
                })

                .then(result => {
                    console.info("Logout Success");
                    this.$rootScope.authenticated = false;
                    this.$state.go('welcome');
                });
        }

        getMe() {
            this.UserService.getMe()

                .error((resp) => {
                    this.$rootScope.authenticated = false;
                })

                .then(result => {
                    this.user = result.data;
                    this.$rootScope.authenticated = true;
                    console.info(this.user);
                });
        }

        static controllerId:string = "HeaderBarCtrl";

    }
}
