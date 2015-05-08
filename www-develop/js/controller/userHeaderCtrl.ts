module Controller {
    export class UserHeaderCtrl {
        user:any;



        constructor(private $scope, private $rootScope, private $location, private UserService, private ngDialog) {
            this.getMe();

            $scope.password = '';
            $scope.mail = '';

            this.$scope.login = () => {
                debugger
                console.info('Login ' + this.$scope.mail);

                this.UserService.login(this.$scope.mail, this.$scope.password)

                    .error((resp) => {
                        console.info("Login Error");
                    })

                    .then(result => {
                        console.info("Login Success");
                        this.getMe();
                        this.$rootScope.authenticated = true;
                    });
            }


        }

        openLoginDialog() {
            console.info('hey');
            this.ngDialog.open({
                template: './templates/modal/login.html',
                scope: this.$scope

            });
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
                });
        }

        static controllerId:string = "UserHeaderCtrl";

    }
}
