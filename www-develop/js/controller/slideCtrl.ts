module Controller {
    export class SlideCtrl {

        constructor($scope) {
            $scope.slides = [
                'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
                'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
                'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
                'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
            ];
        }

        static controllerId:string = "SlideCtrl";
    }
}
