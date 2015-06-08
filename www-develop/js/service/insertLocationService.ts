module Service {
    export class InsertLocationService {

        constructor(private $http, private basePath, private Upload) {
        }

        uploadImage(formData, file) {

            // To be sure keys don't exist
            delete formData._id;
            delete formData._rev;
            return this.Upload.upload({
                url: this.basePath + '/trips/image',
                fields: formData,
                file: file
            });
        }

        saveLocation(location) {
            return this.$http.post(this.basePath + '/users/my/locations', location)
        }

        static serviceId:string = "InsertLocationService";
    }
}
