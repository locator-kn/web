module Controller {


    export class ContextCtrl {

        context:string;

        constructor(private $scope, private basePath) {
            this.context = localStorage.getItem('location');

            if (this.context == null) {
                window.location.href = '/';
                console.info('missing context, redirecting to root');
            } else {
                window.location.href = this.context;
            }
        }

        static controllerId:string = "ContextCtrl";
    }
}
