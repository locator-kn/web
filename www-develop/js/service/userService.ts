module Service {
    export class UserService {

        facebook;
        google;
        usersIdCache;
        usersMeCache;


        constructor(private Upload, private $http, private $q, private basePath, private HelperService, private CacheFactory) {
            this.facebook = this.basePath + '/loginFacebook';
            this.google = this.basePath + '/loginGoogle';

            this.usersIdCache = CacheFactory.createCache('usersId');
            this.usersMeCache = CacheFactory.createCache('usersMe');

        }

        sendNewPassword(mail) {
            return this.$http.get(this.basePath + '/forgot/' + mail);
        }

        getUser(_Id) {
            return this.$q((resolve, reject) => {

                this.$http.get(this.basePath + '/users/' + _Id, {cache: this.usersIdCache})
                    .then(data => {
                        return this.decorateUserImage(data);
                    })
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });

        }

        decorateUserImage = (data) => {
            return this.$q((resolve, reject) => {
                if (!data.data.picture) {
                    data.data.picture = {
                        picture: '/images/profile.jpg',
                        thumbnail: '/images/profile.jpg'
                    }
                }
                resolve(data);
            });
        };

        getMe() {
            return this.$q((resolve, reject) => {

                this.$http.get(this.basePath + '/users/me', {cache: this.usersIdCache})
                    .then(data => {
                        return this.decorateUserImage(data);
                    })
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
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
                    "birthdate": newUserData.birthdate
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
            this.usersIdCache.remove();
            this.usersMeCache.remove();

            return this.$http.get(this.basePath + '/logout');
        }

        register(name, mail, password) {
            this.usersIdCache.remove();
            this.usersMeCache.remove();

            return this.$http.post(this.basePath + '/users',
                {
                    "name": name,
                    "mail": mail,
                    "password": password
                }
            )
        }

        uploadImage(formData, file) {
            // To be sure keys don't exist
            delete formData._id;
            delete formData._rev;
            return this.Upload.upload({
                url: this.basePath + '/users/my/picture',
                fields: formData,
                file: file
            });
        }

        setNewPassword(newPassword) {
            return this.$http.put(this.basePath + '/users/my/password',
                {
                    "password": newPassword

                });
        }

        static serviceId:string = "UserService";
    }
}
