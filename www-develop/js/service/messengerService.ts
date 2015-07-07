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

        getMessagesCacheById(id) {
            return this.messagesIdCache.get(this.basePathRealtime + '/messages/' + id);
        }

        putMessageByConversationId(id, data) {
            var cacheData = this.getMessagesCacheById(id);
            if(cacheData) {
                var parsedData = JSON.parse(cacheData[1])
                parsedData.push(data);
                cacheData[1] = JSON.stringify(parsedData);
                console.log('update cache for:', this.basePathRealtime + '/messages/' + id);

                this.messagesIdCache.put(this.basePathRealtime + '/messages/' + id, cacheData);
            }
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

        startConversation(msg:string, userId:string, tripId?:string) {
            var newCon:any = {
                user_id: userId,
                message: msg
            };
            newCon.trip = tripId;

            return this.$http.post(this.basePathRealtime + '/conversations', newCon);
        }

        getInitMessage(userOwner, trip, participator) {
            var tripUsername = userOwner.name;
            return 'Ahoi '+tripUsername+'! '+
                    participator.name+' hat deinen Trip "'+
                    trip.title+'" gefunden und möchte gerne teilnehmen. '+
                    'Ihr wollt bestimmt noch ein paar Details des Trips besprechen. '+
                    'Viel Spaß wünscht euer Locator Team.';

        }

        static serviceId:string = "MessengerService";
    }
}
