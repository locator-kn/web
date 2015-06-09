module Controller {
    export class SlideCtrl {

        slides:string[];

        constructor($scope, private $state) {
            this.slides = [
                './images/konstanz_background01.jpg',
                './images/konstanz_background02.jpg',
                './images/konstanz_background03.jpg',
                './images/konstanz_background05.jpg',
                './images/konstanz_background08.jpg'
                //'https://ununsplash.imgix.net/photo-1429043794791-eb8f26f44081?fit=crop&fm=jpg&h=775&q=75&w=1050',
                //'https://unsplash.imgix.net/photo-1428908799722-0a74e26ce7f6?fit=crop&fm=jpg&h=700&q=75&w=1050',
            ];
        }

        get showSlider() {
            return this.$state.includes('welcome');
        }

        static controllerId:string = "SlideCtrl";
    }
}
