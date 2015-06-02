module Service {
    export class UserService {

        facebook;
        google;

        constructor(private $http, private basePath, private $location, private HelperService) {
            this.facebook = this.basePath + '/loginFacebook';
            this.google = this.basePath + '/loginGoogle';
        }

        getUser(_Id) {
            return this.$http.get(this.basePath + '/users/' + _Id);
        }

        getMe() {
            return this.$http.get(this.basePath + '/users/me');
        }

        login(mail, password) {
            return this.$http.post(this.basePath + '/login',
                {
                    "mail": mail,
                    "password": password
                })
        }

        loginFacebook() {
            this.HelperService.saveContext();
            window.location = this.facebook;
        }

        loginGoogle() {
            this.HelperService.saveContext();
            window.location = this.google;
        }

        logout() {
            return this.$http.get(this.basePath + '/logout');
        }

        register(name, mail, password) {
            return this.$http.post(this.basePath + '/users',
                {
                    "name": name,
                    "mail": mail,
                    "password": password
                }
            )
        }

        static serviceId:string = "UserService";
    }
}
