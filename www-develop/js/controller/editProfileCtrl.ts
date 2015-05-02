module Controller {
    export class EditProfileCtrl {

        userProfile;
        uploader;

        constructor(private $scope, private EditProfileService, private FileUploader) {
            this.getUserProfile();
            this.upload();
        }

        getUserProfile() {
            this.EditProfileService.getUserProfile().then(result => {
                this.userProfile = result;
            });
        }

        upload() {
            this.uploader = new this.FileUploader();
        }


        static controllerId:string="EditProfileCtrl";
    }
}
