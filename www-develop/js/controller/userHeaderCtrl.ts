module Controller {
    export class UserHeaderCtrl {
        user:any;

        inputMail:any;
        inputPassword:any;

        constructor(private $scope, private $rootScope, private $location, private UserService, private ngDialog) {
        }

        openLoginDialog() {
            console.info('hey');
            this.ngDialog.open({
                template: './templates/modal/login.html'
            });
        }

        login() {
            console.info('heyxd');
            this.UserService.login(this.inputMail, this.inputPassword)
                .error(function (resp) {
                    console.info("Login Error");
                    this.$rootScope.authenticated = false;
                })

                .then(result => {
                    console.info("Login Success");
                    this.getMe();
                    this.$rootScope.authenticated = true;
                });
        }

        getMe() {
            this.UserService.getMe()

                .error(function (resp) {
                    this.$rootScope.authenticated = false;
                })

                .then(result => {
                    this.user = result.data;
                    this.$rootScope.authenticated = true;
                });
        }

        static controllerId:string = "UserHeaderCtrl";

    }
}
