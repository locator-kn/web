module Controller {
    export class UserCtrl {

        // general user variables
        user;
        birthdate;

        textMessage;
        me:boolean;
        edit:boolean = false;
        conversationId;

        //image variables
        showImageUploadModal:boolean = false;
        imagePath:any;
        selectedImage:any;
        imageCropData:any;
        imageHasBeenUploaded:boolean;
        profileImagePath:string;
        uploadIsDone:boolean = true;
        isUploading:boolean = false;
        cropperCanvas:any;

        showImageTooLargeModal:boolean = false;

        progressPercentage:number = 0;
        availableMoods;
        birthAvailable:boolean = true;

        infoForm;
        accountForm;

        trips;
        locations;
        defaultLocation;

        tab:string;
        possibleTabs = ['info', 'account', 'locations', 'trips', 'conversation'];

        password:string;
        passwordRepeat:string;
        errormsg = '';
        successmsg = '';

        locationSearch:string;
        tripSearch:string;
        locationReallyDelete:boolean = false;

        static $inject = ['hotkeys', 'lodash', 'DataService', '$location', 'TripService', 'LocationService', '$scope', 'UserService', '$state', '$stateParams', '$rootScope', '$element', 'MessengerService'];
        constructor(private hotkeys, private lodash, private DataService, private $location, private TripService, private LocationService, private $scope, private UserService, private $state, private $stateParams, private $rootScope, private $element, private MessengerService) {

            this.hotkeys.add({
                combo: 'esc',
                description: 'escape',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: () => {
                    this.reset();
                }
            });

            this.hotkeys.add({
                combo: 'return',
                description: 'save',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: () => {
                    if (this.tab === 'info') {
                        this.updateProfile();
                    } else if (this.tab === 'account') {
                        this.setNewPassword();
                    }
                }
            });

            this.DataService.getMoods().then(result => {
                this.availableMoods = result.data;
            });

            this.getUser($stateParams.profileId);

            this.$rootScope.$on('login_success', () => {
                this.me = this.isItMe;
            });

            if (this.$rootScope.authenticated) {
                this.me = this.isItMe;
            }


            if ($state.params.tab === undefined) {
                this.switchTab('info');
            }

            this.tab = $state.params.tab;

            $rootScope.showSearchButton = true;
            $rootScope.showCreateButton = true;

            this.$rootScope.breadcrumb = 'Profil | ' + this.tab;


        }

        getTrips() {
            if (this.me) {

                this.TripService.getMyTrips(this.user._id)
                    .then(result => {
                        this.trips = result.data;
                    })

            } else {

                this.TripService.getTripsByUser(this.user._id)
                    .then(result => {
                        this.trips = result.data;
                        this.trips.forEach((entry:any) => {
                            entry.username = this.user.name + ' ' + this.user.surname;
                        })
                    })

            }

        }

        getLocations() {
            if (this.me) {
                this.LocationService.getMyLocations()
                    .then(result => {
                        this.locations = result.data;
                        // extract possible default location
                        if (this.locations.length && this.locations[0].isDefault) {
                            this.defaultLocation = this.locations[0];
                            this.locations.splice(0, 1);
                        }
                    });

            } else {

                this.LocationService.getLocationsByUser(this.user._id)
                    .then(result => {
                        console.info(result.data);
                        this.locations = result.data;
                    });

            }

        }

        editTrigger() {
            this.edit = !this.edit;
        }

        get isItMe() {
            return this.$rootScope.userID === this.$stateParams.profileId;
        }

        getUser(_id) {
            this.UserService.getUser(_id)
                .then(result => {
                    this.user = result.data;
                    if (!result.data.picture) {
                        this.profileImagePath = "/images/profile.png"
                    } else {
                        this.profileImagePath = result.data.picture;
                    }

                    this.getTrips();
                    this.getLocations();

                    if (!this.me) {

                        this.MessengerService.getConversations()
                            .then(result => {
                                var user = this.lodash.findWhere(result.data, {'opponent': this.user._id});
                                if (!user) {
                                    return;
                                }
                                this.conversationId = user._id || '';
                            });
                    }

                    this.user.birthdate = new Date(result.data.birthdate);

                    var ageDifMs = Date.now() - new Date(result.data.birthdate).getTime() + 86400000;
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    this.birthdate = Math.abs(ageDate.getUTCFullYear() - 1970);

                    if (isNaN(this.birthdate)) {
                        this.birthAvailable = false;
                    }

                });
        }

        updateProfile() {

            // remove keys form user object when undefined or empty string
            for (var property in this.user) {

                if (this.user.hasOwnProperty(property)) {
                    this.user[property] = this.user[property] || ''
                }
            }


            if (!this.user.birthdate || isNaN(this.user.birthdate)) {
                this.user.birthdate = '';
            }


            if (this.user.birthdate > new Date()) {
                this.errormsg = 'Datum muss in der Vergangenheit liegen';
                return;
            }

            this.UserService.updateProfile(this.user)

                .then(result => {
                    console.info('updated profile');
                    this.editTrigger();

                    this.infoForm.$setPristine();
                })
                .catch(result => {
                    console.info(this.user);
                    console.info('error during update');
                });
        }

        reset() {
            this.edit = false;
            this.getUser(this.$stateParams.profileId);
        }


        startConversation() {
            this.textMessage = '';

            this.$rootScope.overlay = true;
            angular.element(this.$element).find('#conversationModal').addClass('active');

            angular.element('.overlay').bind('click', () => {
                this.closeDialog();
            });

            this.$rootScope.$emit('new_conversation');

        }

        closeDialog() {
            this.$rootScope.overlay = false;
            angular.element(this.$element).find('.moodal.active').removeClass('active');
        }

        submitConversation() {
            this.MessengerService.startConversation(this.textMessage, this.user._id)

                .then(result => {
                    console.info("Started Conversation");
                    this.closeDialog();
                    this.$state.go("messenger.opponent", {opponentId: result.data.id});
                })
                .catch(result => {
                    console.info("Oops");
                    console.info(result);

                    if (result.statusCode === 409) {
                        this.closeDialog();
                        this.$state.go("messenger.opponent", {opponentId: result.data.id});

                    }
                });

        }


        addImage() {
            this.$rootScope.overlay = true;
            this.imageChoice();
        }

        selectImage(file) {
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                var image = new Image();
                this.selectedImage = file.files[0];

                if (this.selectedImage.size >= 6291456) {
                    this.$rootScope.overlay = true;
                    this.showImageTooLargeModal = true;
                    this.$rootScope.$apply();
                    return
                }

                this.$rootScope.overlay = true;
                this.showImageUploadModal = true;

                reader.readAsDataURL(file.files[0]);
                reader.onload = (_file) => {

                    this.imagePath = _file.target;
                    this.$scope.$apply();
                    this.addImage();
                }
            }
        }

        showImageChooser() {

            if (!this.me) {
                return;
            }

            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }

            this.clearFileSelection();
            $('#image-upload-profile').click();
        }

        imageChoice() {
            var cropperElem:any = $('#cropping-preview');
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
            this.isUploading = true;
            var file = this.selectedImage;
            var formData = {
                width: Math.round(this.imageCropData.width),
                height: Math.round(this.imageCropData.height),
                xCoord: Math.round(this.imageCropData.x),
                yCoord: Math.round(this.imageCropData.y)
            };


            this.UserService.uploadImage(formData, file)
                .progress(evt => {
                    var perc:number = evt.loaded / evt.total;
                    this.progressPercentage = Math.round(perc * 100);
                    console.log('progress:', this.progressPercentage, '% ', evt.config.file.name);
                }).success((data, status, headers, config) => {
                    console.log('file', config.file.name, 'uploaded. Response:', data);
                    this.clearFileSelection();
                    this.showNewImage(data);
                    this.uploadIsDone = true;
                    this.isUploading = false;
                    this.progressPercentage = 0;
                });

            //this.InsertTripService.uploadImage(formData);
        }

        clearFileSelection() {
            this.showImageUploadModal = false;
            this.$rootScope.overlay = false;
            this.showImageTooLargeModal = false;
            this.selectedImage = null;
            this.imagePath = '';
            $('#cropping-preview').removeData('cropper');
            $('.cropper-container').remove();
            $('#image-upload-profile').val('');
        }

        showNewImage(data) {
            this.imageHasBeenUploaded = true;
            this.profileImagePath = data.imageLocation + '?' + Date.now();
            debugger;
        }

        setNewPassword() {

            if (!this.password) {
                this.password = '';
                this.passwordRepeat = '';
            }
            if (this.password != this.passwordRepeat) {
                this.errormsg = 'Passwörter stimmen nicht überein.';
                return;
            } else if (this.password.length == 0 || this.passwordRepeat.length == 0) {
                this.editTrigger();
                this.errormsg = '';
                return;

            } else if (this.password.length < 5) {
                this.errormsg = 'Passwort muss länger als 4 Zeichen sein.';
                return;
            }


            this.UserService.setNewPassword(this.password)
                .then(result => {
                    console.info('updated password');
                    this.errormsg = '';
                    this.editTrigger();
                    this.successmsg = 'Passwort erfolgreich geändert.';
                    //this.accountForm.$setPristine();
                })
                .catch(result => {
                    this.errormsg = 'Fehler';
                    console.info('error');
                });
        }

        switchTab(name) {
            this.errormsg = '';
            this.successmsg = '';
            this.edit = false;

            if (this.possibleTabs.indexOf(name) != -1) {

                if (name == 'conversation' && !this.$rootScope.authenticated) {
                    return this.$rootScope.$emit('openLoginDialog');
                }

                if (name == 'conversation' && this.conversationId) {
                    this.$state.go('messenger.opponent', {opponentId: this.conversationId});
                    return;
                }

                this.tab = name;
                this.$location.search({tab: name});


            }

        }

        togglePublicLocation(id) {
            this.LocationService.togglePublicLocation(id);
        }

        togglePublicTrip(id) {
            this.TripService.togglePublicTrip(id);
        }

        showDelete(item) {
            item.showdelete = true;
            item.locationReallyDelete = false;
        }

        showLocation(location) {
            this.$state.go('locationView', {
                locationId: location._id
            })
        }

        deleteLocation(location) {
            this.LocationService.deleteLocation(location._id)
                .then(result => {
                    location.showdelete = false;

                    //remove location from outdated view
                    this.locations.splice(this.lodash.indexOf(this.locations, location), 1);
                })
                .catch(result => {
                    //location is used in trip
                    if (result.data.message === 'Location in use') {
                        location.showdelete = false;
                        location.locationReallyDelete = true;
                    }
                })
        }

        deleteLocationForce(location) {
            this.LocationService.deleteLocationForce(location._id)
                .then(result => {
                    location.locationReallyDelete = false;
                    location.showdelete = false;
                    console.log('Hard deletion success');
                    //remove location from outdated view
                    this.locations.splice(this.lodash.indexOf(this.locations, location), 1);
                })
                .catch(result => {
                    location.locationReallyDelete = false;
                    location.showdelete = false;
                    console.log('Hard deletion error');
                    //remove location from outdated view
                    this.locations.splice(this.lodash.indexOf(this.locations, location), 1);
                })
        }

        deleteTrip(trip) {
            this.TripService.deleteTrip(trip._id)
                .then(result => {

                    //hide delete panel
                    trip.showdelete = false;

                    //remove trip from outdated view
                    this.trips.splice(this.lodash.indexOf(this.trips, trip), 1);
                })
                .catch(result => {
                    console.info('Deletion Error');
                })
        }

        static
            controllerId:string = "UserCtrl";
    }
}
