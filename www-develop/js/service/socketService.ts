module Service {
    declare
    var io;
    export class SocketService {

        socket = null;

        constructor(private $http, private $q, private basePathRealtime, private $rootScope, private socketFactory) {
            this.socketInit();
            this.registerEvents();
        }

        getSocket() {
            return this.$q((resolve, reject) => {
                if(this.socket) {
                    resolve(this.socket);
                } else {
                    this.$http.get(this.basePathRealtime + '/connect/me')
                        .error(err => {
                            reject(err);
                        })
                        .then(response => {
                            var myIoSocket = io.connect(response.data.namespace);
                            this.socket = this.socketFactory({ioSocket: myIoSocket});
                            resolve(this.socket)
                        });
                }
            });
        }

        registerEvents() {
            this.getSocket().then(socket => {
                socket.on('new_message', newMessage => {
                    this.$rootScope.$broadcast('new_message', newMessage);
                });
            });
        }

        emit(event, data) {
            this.getSocket().then(socket => {
                socket.emit(event, data);
            });
        }

        /*onEvent(event, fn) {
            this.getSocket().then(socket => {
                socket.on(event, fn);
            })
        }*/

        offEvent(event) {
            this.getSocket().then(socket => {
                socket.removeListener(event);
            })
        }

        socketInit() {
            if (!this.$rootScope.authenticated) {
                return;
            }

            return this.getSocket();

        }

        static serviceId:string = "SocketService";
    }
}
