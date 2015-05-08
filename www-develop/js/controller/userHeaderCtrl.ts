module Controller {
    export class UserHeaderCtrl {
        user:any;

        mail:any;
        password:any;
        facebook:any;
        google:any;


        constructor(private $scope, private $rootScope, private $location, private UserService, private $element, private basePath) {
            this.getMe();
            this.facebook = this.basePath + '/loginFacebook';
            this.google = this.basePath + '/loginGoogle';
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

                    angular.element('.overlay').removeClass('active');
                    angular.element(this.$element).find('.moodal').removeClass('active');

                });
        }

        openLoginDialog() {
            angular.element('.overlay').addClass('active');
            angular.element(this.$element).find('.moodal').addClass('active');
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
                    console.info(this.user);
                });
        }

        static controllerId:string = "UserHeaderCtrl";

    }
}
