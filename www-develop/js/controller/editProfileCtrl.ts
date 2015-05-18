module Controller {
    export class EditProfileCtrl {

        userProfile;
        uploader;
        //myImage;
        //myCroppedImage;

        constructor(private $scope, private $rootScope, /*private EditProfileService,*/ private FileUploader) {
            //this.getUserProfile();
            $scope.uploader = new FileUploader();

            $rootScope.showSearchButton = true;
            $rootScope.showCreateButton = true;

            //console.log($scope.uploader)
            //this.upload();
            /*angular.element(document.querySelector('#fileInput')).on('change', (evt) => {
                this.handleFileSelect(evt);
            });*/
            //debugger
            //$('.cropper-example-1 > img').cropper({
            //        aspectRatio: 16/9,
            //        autoCropArea: 0.65,
            //        strict: false,
            //        guides: false,
            //        highlight: false,
            //        dragCrop: false,
            //        movable: false,
            //        resizable: false
            //});
        }

        fileNameChanged() {
            console.log("select file");
        }

        //getUserProfile() {
        //    this.EditProfileService.getUserProfile().then(result => {
        //        this.userProfile = result;
        //    });
        //}

        previewImage() {

        }





        /*upload() {
            this.uploader = new this.FileUploader();
            //this.uploader.url = "hans";
        }*/

        //cropImage(evt) {
        /*handleFileSelect(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = (evt) => {
                this.$scope.$apply(($scope) =>{
                    this.$scope.myImage=evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }*/




        static controllerId:string="EditProfileCtrl";
    }
}
