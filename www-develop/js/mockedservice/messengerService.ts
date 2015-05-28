module MockedService {
    export class MessengerService {


        constructor(private $http, private $q, private basePath) {

        }


        getConversations() {
            return this.$q(function (resolve) {
                    setTimeout(function () {
                        resolve(
                            {
                                data: [
                                    {
                                        "_id": "1",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "2",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "3",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
                                        "lastMessage": 'Ich bin Steffanie'
                                    },
                                    {
                                        "_id": "4",
                                        "from": 'Steffen Gorenflo',
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
                                        "sender": '4833d8e586f84e2160d154f3b865a7c0',
                                        "timestamp": 'erster Timestamp',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    },
                                    {
                                        "_id": "2",
                                        "sender": 'userid',
                                        "timestamp": 'zweiter Timestamp',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    },
                                    {
                                        "_id": "3",
                                        "sender": '4833d8e586f84e2160d154f3b865a7c0',
                                        "timestamp": 'später',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    },
                                    {
                                        "_id": "3",
                                        "sender": 'userid',
                                        "timestamp": 'später',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    },
                                    {
                                        "_id": "3",
                                        "sender": '4833d8e586f84e2160d154f3b865a7c0',
                                        "timestamp": 'später',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    },
                                    {
                                        "_id": "3",
                                        "sender": 'userid',
                                        "timestamp": 'später',
                                        "content": 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                                    }
                                ]
                            });
                    }, 500);
                }
            );
        }

        sendMessage(msg, conversationID, toID, fromID) {
            return this.$http.post(this.basePath + '/messages/' + conversationID,
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
