module Service {
    export class TripService {

        constructor(private $http, private basePath, private Upload) {
        }

        saveTrip(newTrip, documentMetaData) {
            if(documentMetaData._id && documentMetaData._rev ) {
                // extend new trip with meta data id and rev
                newTrip._id = documentMetaData._id;
                newTrip._rev = documentMetaData._rev;

                return this.$http.put(this.basePath + '/trips/' + documentMetaData._id, newTrip);
            }
            // To be sure keys don't exist
            delete documentMetaData._id;
            delete documentMetaData._rev;
            return this.$http.post(this.basePath + '/trips', newTrip);
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
        static serviceId:string = "TripService";
    }
}
