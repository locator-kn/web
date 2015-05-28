module Service {
    declare
    var io;
    export class SocketService {

        socket;

        constructor(private $http, private basePath, private $rootScope, private socketFactory) {
            this.socketInit();
        }

        socketInit() {
            if (!this.$rootScope.authenticated) {
                return;
            }

            return this.$http.get('http://localhost:3002/api/v1/connect/me').then(response => {
                var myIoSocket = io.connect(':3002' + response.data.namespace);
                this.socket = this.socketFactory({ioSocket: myIoSocket});
            });

        }

        static serviceId:string = "SocketService";
    }
}
