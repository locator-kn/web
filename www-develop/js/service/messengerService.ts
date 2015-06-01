module Service {
    export class MessengerService {


        constructor(private $http, private $q, private basePathRealtime) {

        }


        getConversations() {
            return this.$http.get(this.basePathRealtime + '/my/conversations');
        }

        getConversation(id) {
            return this.$http.get(this.basePathRealtime + '/messages/' + id);
        }

        sendMessage(msg, conversationID, toID, fromID) {

            return this.$http.post(this.basePathRealtime + '/messages/' + conversationID,
                {
                    "from": fromID,
                    "to": toID,
                    "message": msg
                }
            )
        }

        startConversation(msg, userId) {
            return this.$http.post(this.basePathRealtime + '/conversations',
                {
                    "message": msg,
                    "user_id": userId
                }
            )
        }

        static
            serviceId:string = "MessengerService";
    }
}
