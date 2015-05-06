module Controller {
    export class SlideCtrl {

        constructor($scope) {
            $scope.slides = [
                './images/konstanz_background01.jpg',
                './images/konstanz_background02.jpg',
                './images/konstanz_background03.jpg'
                //'https://ununsplash.imgix.net/photo-1429043794791-eb8f26f44081?fit=crop&fm=jpg&h=775&q=75&w=1050',
                //'https://unsplash.imgix.net/photo-1428908799722-0a74e26ce7f6?fit=crop&fm=jpg&h=700&q=75&w=1050',
            ];
        }

        static controllerId:string = "SlideCtrl";
    }
}
