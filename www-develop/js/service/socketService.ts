module Service {
    declare
    var io;
    export class SocketService {

        socket = null;

        constructor(private $http, private $q, private basePath, private $rootScope, private socketFactory) {
            this.socketInit();
        }

        getSocket() {
            return this.$q((resolve, reject) => {
               if(this.socket) {
                   resolve(this.socket);
               } else {
                   this.$http.get('http://localhost:3002/api/v1/connect/me')
                       .error(err => {
                           reject(err);
                       })
                       .then(response => {
                           var myIoSocket = io.connect(':3002' + response.data.namespace);
                           this.socket = this.socketFactory({ioSocket: myIoSocket});
                           resolve(this.socket)
                       });
               }
            });
        }

        onEvent(event, fn) {
            this.getSocket().then(socket => {
                socket.on(event, fn);
            })
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
