module MockedService {
    export class TriplerService {
        constructor(private $q) {

        }


        filteredQue() {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve([
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "checkin": "2015-04-20T00:00:00.000Z",
                            "checkout": "2015-04-23T00:00:00.000Z",
                            "persons": "3",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "checkin": "2015-04-20T00:00:00.000Z",
                            "checkout": "2015-04-23T00:00:00.000Z",
                            "persons": "3",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "checkin": "2015-04-20T00:00:00.000Z",
                            "checkout": "2015-04-23T00:00:00.000Z",
                            "persons": "3",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        },
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "my trip",
                            "description": "bla bla bla",
                            "city": "constance",
                            "checkin": "2015-04-20T00:00:00.000Z",
                            "checkout": "2015-04-23T00:00:00.000Z",
                            "persons": "3",
                            "budget": 100,
                            "locations": [],
                            "titlePic": [],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        }

                    ]);
                }, 500);
            });
        }

        getTrip(_id) {
            return this.$q(function (resolve) {
                setTimeout(function () {
                    resolve(
                        {
                            "_id": "1849ef313fbc39f078084f9168000e16",
                            "_rev": "4-c726329a4e810962443ce5a7a176b00c",
                            "title": "Trip to the moon",
                            "description": "Lorem ipsum dolor pimpin' amizzle, shizzle my nizzle crocodizzle adipiscing elizzle. Nullam ma nizzle velit, gizzle volutpat, suscipit sure, gravida vizzle, i saw beyonces tizzles and my pizzle went crizzle. Pellentesque shit tortor. Sizzle erizzle. Fusce sizzle dolor dapibizzle turpis ghetto tempor. Mofo cool nibh et turpizzle. Ghetto izzle ma nizzle. eleifend rhoncizzle ghetto. In fizzle habitasse platea dictumst. Donec dapibizzle. Yo tellus urna, pretizzle eu, mattizzle ac, eleifend vitae, nunc. Yo mamma suscipizzle. Integizzle shut the shizzle up sizzle sed mah nizzle. Etizzle laoreet shiz izzle nisl. Gangster quizzle arcu. Ghetto pulvinar, ipsizzle malesuada malesuada stuff, nulla purizzle euismizzle fizzle, et fo metus fizzle izzle gangster. Vivamizzle break it down, yo et varizzle you son of a bizzle, nibh nunc ultricies izzle, izzle its fo rizzle leo funky fresh izzle dolizzle. Maurizzle mah nizzle, orci vizzle volutpat consectetuer, sizzle tellivizzle luctizzle pimpin', izzle bibendizzle enizzle that's the shizzle izzle nisl. Rizzle bizzle gizzle ac orci eleifend viverra. nizzle yo. Curabitur nizzle velit vel pede i'm in the shizzle facilisizzle. Ma nizzle fo nulla, iaculizzle my shizz, molestie sed, bow wow wow a, bow wow wow. Nulla phat turpizzle shit nibh daahng dawg crazy. Nam pulvinar consectetuer velit. Aliquizzle erat volutpat. Bow wow wow dope leo at that's the shizzle pretizzle shit. Crizzle go to hizzle lacus sed dui condimentizzle fo shizzle mah nizzle fo rizzle, mah home g-dizzle. Ut daahng dawg. Break yo neck, yall izzle urna. Gizzle laorizzle ma nizzle dizzle mi. Donizzle you son of a bizzle turpis.Curabitizzle for sure diam quis fo check it out check out this. Suspendisse potenti. Morbi odio. Vivamus neque. Cras dawg. Fizzle daahng dawg mauris, a, feugizzle ghetto pot, gizzle funky fresh, things. Pellentesque gravida. Vestibulizzle orci mi, fo shizzle my nizzle izzle, sagittis sizzle, dang fo shizzle, velit. Crizzle for sure check out this. Crunk volutpizzle felis vel orci. Cras quizzle justo fo shizzle purizzle sodalizzle ornare. Sed venenatis gangsta et lacizzle. Dawg phat. Yo mamma check out this placerizzle go to hizzle. We gonna chung dizzle ante. Dizzle pharetra, shiznit eu phat shiznit, pimpin' felizzle elementizzle sem, gangster aliquizzle fo shizzle my nizzle felis luctus pede. Nizzle own yo' my shizz. Class aptent taciti tellivizzle fo shizzle rizzle torquent phat crazy crunk, per tellivizzle hymenizzle. Brizzle you son of a bizzle, neque nizzle elementum nonummy, nisl shizznit viverra leo, own yo' semper daahng dawg arcu shiznit fizzle.",
                            "city": "constance",
                            "start_date": "2015-04-20T00:00:00.000Z",
                            "end_date": "2015-04-23T00:00:00.000Z",
                            "budget": 100,
                            "locations": [],
                            "pictures": ['http://www.deinbayernurlaub.de/wp-content/uploads/2013/01/Abendstimmung-am-Hafen-von-Konstanz.jpg'],
                            "category": "halli galli drecksaufest",
                            "type": "trip"
                        }
                    );
                }, 500);
            });
        }


        static serviceId:string = "TriplerService";
    }
}
