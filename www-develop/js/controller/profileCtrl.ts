module Controller {
    export class ProfileCtrl {

        user;
        textMessage;

        constructor(private UserService, private $state, private $stateParams, private $rootScope, private $element, private MessengerService) {
            this.getUser($stateParams.profileId);
        }

        getUser(_id) {
            this.UserService.getUser(_id)
                .then(result => {
                    this.user = result.data;
                    console.info(this.user);
                });
        }

        updateProfile() {
            this.UserService.updateProfile(this.user)
                .error(result => {
                    console.info('error during update');
                })
                .then(result => {
                    console.info('updated profile');
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


        static controllerId:string = "ProfileCtrl";
    }
}
