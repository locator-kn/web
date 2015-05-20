module Service {
    export class InsertTripService {

        constructor(private $http, private basePath, private Upload) {
        }

        saveTrip(newTrip, documentMetaData) {
            if(documentMetaData._id && documentMetaData._rev ) {
                // extend new trip with meta data id and rev
                newTrip._id = documentMetaData.id;
                newTrip._rev = documentMetaData._rev;

                return this.$http.put(this.basePath + '/trips/' + documentMetaData.id, newTrip);
            }
            return this.$http.post(this.basePath + '/trips', newTrip);
        }
        uploadImage(formData, file) {
            return this.Upload.upload({
                url: this.basePath + '/trips/image',
                fields: formData,
                file: file
            });
        }
        static serviceId:string = "InsertTripService";
    }
}
