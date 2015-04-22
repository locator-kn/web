module Controller {
    export class SlideCtrl {

        constructor($scope) {
            $scope.slides = [
                'https://download.unsplash.com/photo-1428591501234-1ffcb0d6871f',
                'https://download.unsplash.com/photo-1428342319217-5fdaf6d7898e',
                'https://download.unsplash.com/photo-1422433555807-2559a27433bd',
            ];
        }

        static controllerId:string = "SlideCtrl";
    }
}
