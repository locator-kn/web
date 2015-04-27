module Service {
    export class UserService {
        constructor(private $http) {
        }

        getUser(_Id) {
            return this.$http.get('/users/' + _Id);
        }

        static serviceId:string = "UserService";
    }
}
