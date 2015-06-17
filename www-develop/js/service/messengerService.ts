module Service {
    export class MessengerService {
        myConversationsCache;
        messagesIdCache;

        constructor(private $http, private $q, private basePathRealtime, private CacheFactory) {
            this.myConversationsCache = this.CacheFactory.createCache('myConversations');
            this.messagesIdCache = this.CacheFactory.createCache('messagesId');
        }


        getConversations() {
            return this.$http.get(this.basePathRealtime + '/my/conversations');
        }

        getConversation(id) {
            return this.$http.get(this.basePathRealtime + '/messages/' + id, {cache: this.messagesIdCache});
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

        static serviceId:string = "MessengerService";
    }
}
