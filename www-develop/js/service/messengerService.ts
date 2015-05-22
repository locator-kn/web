module Service {
    export class MessengerService {


        constructor(private $http, private $q) {

        }


        getConversations() {
            return this.$q(function (resolve) {
                    setTimeout(function () {
                        resolve(
                            {
                                data: [
                                    {
                                        "_id": "1",
                                        "user_1": 'dewdewdewdwed',
                                        "user_2": 'dewewfewf',
                                        "user_1_read": true,
                                        "user_2_read": true,
                                        "lastMessage": 'Ich bin Steffanie'
                                    }
                                ]
                            });
                    }, 500);
                }
            );
        }

        getConversation() {
            return this.$q(function (resolve) {
                    setTimeout(function () {
                        resolve(
                            {
                                data: [
                                    {
                                        "_id": "1",
                                        "sender": 'userid',
                                        "timestamp" : 'erster Timestamp',
                                        "message": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "2",
                                        "sender": 'userid',
                                        "timestamp" : 'zweiter Timestamp',
                                        "message": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "3",
                                        "sender": 'userid',
                                        "timestamp" : 'später',
                                        "message": 'Ich bin Steffanie'
                                    }
                                ]
                            });
                    }, 500);
                }
            );
        }

        static
            serviceId:string = "MessengerService";
    }
}
