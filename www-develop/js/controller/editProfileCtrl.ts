module Controller {
    export class EditProfileCtrl {

        userProfile;

        constructor(private $scope, private EditProfileService) {
            this.getUserProfile();
        }

        getUserProfile() {
            this.EditProfileService.getUserProfile().then(result => {
                this.userProfile = result;
            });
        }


        static controllerId:string="EditProfileCtrl";
    }
}
