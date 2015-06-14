module Controller {
    export class SlideCtrl {

        slides:string[];
        randomLeft:string;
        randomRight:string;

        constructor($scope, private $state) {
            this.slides = [
                './images/konstanz_background01.jpg',
                './images/konstanz_background02.jpg',
                './images/konstanz_background03.jpg',
                './images/konstanz_background05.jpg',
                './images/konstanz_background08.jpg'
            ];

            this.randomLeft = this.getRandomImage();
            do {
                this.randomRight = this.getRandomImage();
            } while (this.randomLeft === this.randomRight);
        }

        getRandomImage() {
            return this.slides[Math.floor((Math.random() * this.slides.length))];
        }

        get showSlider() {
            return this.$state.includes('welcome');
        }

        static controllerId:string = "SlideCtrl";
    }
}
