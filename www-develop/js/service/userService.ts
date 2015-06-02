module Service {
    export class UserService {

        facebook;
        google;
        usersIdCache;
        usersMeCache;


        constructor(private $http, private $rootScope, private basePath, private $location, private HelperService, private CacheFactory) {
            this.facebook = this.basePath + '/loginFacebook';
            this.google = this.basePath + '/loginGoogle';

            this.usersIdCache = CacheFactory.createCache('usersId');
            this.usersMeCache = CacheFactory.createCache('usersMe');

        }

        getUser(_Id) {
            return this.$http.get(this.basePath + '/users/' + _Id, {cache: this.usersIdCache});
        }

        getMe() {
            return this.$http.get(this.basePath + '/users/me', {cache: this.usersMeCache});
        }

        login(mail, password) {
            return this.$http.post(this.basePath + '/login',
                {
                    "mail": mail,
                    "password": password
                })
        }

        updateProfile(newUserData) {
            return this.$http.put(this.basePath + '/users/my/profile',
                {
                    "name": newUserData.name,
                    "surname": newUserData.surname,
                    "description": newUserData.description,
                    "residence": newUserData.residence,
                    "age": newUserData.age
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
