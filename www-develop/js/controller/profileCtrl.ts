module Controller {
    export class ProfileCtrl {

        user;
        textMessage;

        constructor(private UserService, private $stateParams, private $rootScope, private $element, private MessengerService) {
            this.getUser($stateParams.profileId);

        }

        getUser(_id) {
            this.UserService.getUser(_id)
                .then(result => {
                    this.user = result.data;
                    console.info(this.user);
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
                })
                .then(result => {
                    console.info("Started Conversation");
                });

        }


        static controllerId:string = "ProfileCtrl";
    }
}
