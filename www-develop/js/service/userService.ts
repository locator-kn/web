module Service {
    export class UserService {
        constructor(private $http, private basePath) {
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

        logout() {
            return this.$http.get(this.basePath + '/logout');
        }

        register(name, mail, password) {
            return this.$http.post(this.basePath + '/users',
                {
                    "name": name,
                    "mail": mail,
                    "password": password,
                    "type": "user"
                }
            )
        }

        static serviceId:string = "UserService";
    }
}
