module Controller {
    export class ProfileCtrl {

        // general user variables
        user;
        textMessage;
        me:boolean;
        edit:boolean = false;

        //image variables
        showImageUploadModal:boolean = false;
        imagePath:any;
        selectedImage:any;
        imageCropData:any;
        imageHasBeenUploaded:boolean;
        profileImagePath:string;
        uploadIsDone:boolean = true;
        progressPercentage:number;

        constructor(private $scope, private UserService, private $state, private $stateParams, private $rootScope, private $element, private MessengerService) {
            this.getUser($stateParams.profileId);

            this.$rootScope.$on('login_success', () => {
                this.me = this.isItMe();
            });

            if(this.$rootScope.authenticated) {
                this.me = this.isItMe();
            }
        }

        editTrigger() {
            this.edit = !this.edit;
        }

        isItMe() {
            return this.$rootScope.userID === this.$stateParams.profileId;
        }

        getUser(_id) {
            this.UserService.getUser(_id)
                .then(result => {
                    this.user = result.data;
                    this.profileImagePath = result.data.picture.picture;
                    this.user.age = new Date(result.data.age);
                });
        }

        updateProfile() {
            this.UserService.updateProfile(this.user)
                .error(result => {
                    console.info('error during update');
                })
                .then(result => {
                    console.info('updated profile');
                    this.editTrigger();
                });
        }


        startConversation() {
            this.textMessage = '';

            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#conversationModal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });
        }

        closeDialog() {
            this.$rootScope.overlay = false;
            angular.element(this.$element).find('.moodal.active').removeClass('active');
        }

        submitConversation() {
            this.MessengerService.startConversation(this.textMessage, this.user._id)
                .error(result => {
                    console.info("Oops");
                    console.info(result);

                    if (result.statusCode === 409) {
                        this.closeDialog();
                        this.$state.go("messenger.opponent", {opponentId: result.data.id});

                    }
                })
                .then(result => {
                    console.info("Started Conversation");
                    this.closeDialog();
                    this.$state.go("messenger.opponent", {opponentId: result.data.id});
                });

        }


        addImage() {
            this.$rootScope.overlay = true;
            this.imageChoice();
        }

        selectImage(file) {
            this.$rootScope.overlay = true;
            this.showImageUploadModal = true;
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                var image = new Image();
                this.selectedImage = file.files[0];
                reader.readAsDataURL(file.files[0]);
                reader.onload = (_file) => {

                    this.imagePath = _file.target;
                    this.$scope.$apply();
                    this.addImage();
                }
            }
        }

        showImageChooser() {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }
            $('#image-upload').click();
        }

        imageChoice() {
            var cropperElem = $('#cropping-preview');
            cropperElem.cropper({
                aspectRatio: 1,
                modal: false,
                rotatable: false,
                crop: (data) => {
                    console.log(data)
                    this.imageCropData = data
                }
            });
        }

        uploadImage() {
            this.uploadIsDone = false;
            var file = this.selectedImage;
            var formData = {
                width: Math.round(this.imageCropData.width),
                height: Math.round(this.imageCropData.height),
                xCoord: Math.round(this.imageCropData.x),
                yCoord: Math.round(this.imageCropData.y),
            };


            this.UserService.uploadImage(formData, file)
                .progress(evt => {
                    var perc:number = evt.loaded / evt.total;
                    this.progressPercentage = perc;
                    console.log('progress:', this.progressPercentage * 100, '% ', evt.config.file.name);
                }).success((data, status, headers, config) => {
                    console.log('file', config.file.name, 'uploaded. Response:', data);
                    this.clearFileSelection();
                    this.showNewImage(data);
                    this.uploadIsDone = true;
                });

            //this.InsertTripService.uploadImage(formData);
        }

        clearFileSelection() {
            this.showImageUploadModal = false;
            this.$rootScope.overlay = false;
            this.selectedImage = null;
            this.imagePath = '';
            $('#cropping-preview').removeData('cropper');
            $('.cropper-container').remove()
        }

        showNewImage(data) {
            this.imageHasBeenUploaded = true;
            this.profileImagePath = data.imageLocation.picture;
        }


        static controllerId:string = "ProfileCtrl";
    }
}
