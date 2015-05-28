module Service {
    export class MessengerService {


        constructor(private $http, private $q, private basePath) {

        }


        getConversations() {
            return this.$http.get('http://localhost:3002/api/v1' + '/my/conversations');
        }

        getConversation(id) {
            return this.$http.get('http://localhost:3002/api/v1' + '/messages/' + id);
        }

        sendMessage(msg, conversationID, toID, fromID) {

            return this.$http.post('http://localhost:3002/api/v1' + '/messages/' + conversationID,
                {
                    "from" : fromID,
                    "to" : toID,
                    "message": msg
                }
            )
        }

        static
            serviceId:string = "MessengerService";
    }
}
