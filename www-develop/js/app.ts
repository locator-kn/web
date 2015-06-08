/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/jqueryui/jqueryui.d.ts" />


/// <reference path="./controller/slideCtrl.ts" />

/// <reference path="./controller/searchMainCtrl.ts" />
/// <reference path="./controller/searchCtrl.ts" />
/// <reference path="./controller/searchResultCtrl.ts" />

/// <reference path="./controller/headerBarCtrl.ts" />

/// <reference path="./controller/insertTripCtrl.ts" />

/// <reference path="./controller/profileCtrl.ts" />
/// <reference path="./controller/editProfileCtrl.ts" />
/// <reference path="./service/editProfileService.ts" />

/// <reference path="./controller/welcomeSearchCtrl.ts" />
/// <reference path="./controller/welcomeCreateCtrl.ts" />

/// <reference path="./controller/static/staticButtonCtrl.ts" />

/// <reference path="./controller/mainCtrl.ts" />


/// <reference path="./service/userService.ts" />
/// <reference path="./service/dataService.ts" />
/// <reference path="./service/searchService.ts" />
/// <reference path="./service/insertTripService.ts" />

/// <reference path="./mockedservice/userService.ts" />
/// <reference path="./mockedservice/dataService.ts" />

/// <reference path="./service/helperService.ts" />


/// <reference path="./controller/contextCtrl.ts" />
/// <reference path="./service/socketService.ts" />
/// <reference path="./service/messengerService.ts" />
/// <reference path="./controller/messengerCtrl.ts" />


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//set to true if backend is running on localhost:3001
var live = '<%= live %>';

var deps = [
    'locator.moodselection',
    'locator.selection',
    'cfp.hotkeys',
    'ngDialog',
    'angular-flexslider',
    'smoothScroll',
    'ui.router',
    'pascalprecht.translate',
    'emoji', 'base64',
    'angularFileUpload',
    'ngMapAutocomplete',
    'ngFileUpload',
    'angular-progress-arc',
    'ngLodash',
    'btford.socket-io',
    'angular-cache',
    'locator.datepicker',
    'locator.scrollfix',
    'emoji'
];

var app = angular.module('starter', deps)

    .constant('basePath', '<%= basePath %>')
    .constant('basePathRealtime', '<%= basePathRealtime %>')

    .config(function (CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {maxAge: 15 * 60 * 1000});
    })

    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider


            .state('welcome', {
                url: "/welcome",
                templateUrl: "../templates/welcome/welcome.html",
            })

            .state('context', {
                url: "/context",
                controller: "ContextCtrl"
            })

            .state('search', {
                url: "/search?city&start_date&end_date&range&persons&moods&accomodations&o",
                templateUrl: "../templates/search/search.html",
                reloadOnSearch: false
            })

            .state('tripresults', {
                url: "/trips?city&budget&checkin&checkout&travellersCount&moods&accomodations",
                templateUrl: "../templates/tripresults.html"
            })

            .state('messenger', {
                url: "/messenger",
                templateUrl: "../templates/messenger/messenger.html"
            })

            .state('messenger.opponent', {
                url: "/{opponentId}",
                templateUrl: "../templates/messenger/messenger.html"
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "../templates/login.html"
                    }
                }
            })

            .state('user', {
                url: "/user/{profileId}",
                templateUrl: "../templates/userProfile/profile.html",
            })

            .state('insertTrip', {
                url: "/insertTrip/?city&moods",
                templateUrl: "../templates/insertTrip/insertTrip.html"
            })

            .state('editProfile', {
                url: "/editProfile",
                templateUrl: "../templates/userProfile/editProfile.html"
            });

        $urlRouterProvider.otherwise('welcome')
    })

    .
    controller(Controller.SlideCtrl.controllerId, Controller.SlideCtrl)
    .controller(Controller.EditProfileCtrl.controllerId, Controller.EditProfileCtrl)
    .controller(Controller.SearchMainCtrl.controllerId, Controller.SearchMainCtrl)
    .controller(Controller.SearchCtrl.controllerId, Controller.SearchCtrl)
    .controller(Controller.SearchResultCtrl.controllerId, Controller.SearchResultCtrl)
    .controller(Controller.HeaderBarCtrl.controllerId, Controller.HeaderBarCtrl)
    .controller(Controller.WelcomeSearchCtrl.controllerId, Controller.WelcomeSearchCtrl)
    .controller(Controller.WelcomeCreateCtrl.controllerId, Controller.WelcomeCreateCtrl)
    .controller(Controller.StaticButtonCtrl.controllerId, Controller.StaticButtonCtrl)
    .controller(Controller.InsertTripCtrl.controllerId, Controller.InsertTripCtrl)
    .controller(Controller.MainCtrl.controllerId, Controller.MainCtrl)
    .controller(Controller.ContextCtrl.controllerId, Controller.ContextCtrl)
    .controller(Controller.MessengerCtrl.controllerId, Controller.MessengerCtrl)
    .controller(Controller.ProfileCtrl.controllerId, Controller.ProfileCtrl)


    .directive('megadate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope) {
                var date = new Date($scope.date);
                $scope.date = moment(date).startOf('minute').fromNow();
            },
            template: '<span class="megadate">{{date}}</span>',
            replace: true
        };
    })

    .directive('resultdate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope) {
                var date = new Date($scope.date);
                $scope.date = moment(date).format('L');
            },
            template: '{{date}}'
        };
    })

    .directive('chatScroller', function () {
        return {
            scope: {
                chatScroller: "="
            },
            link: (scope:any, element) => {
                scope.$watchCollection(angular.bind(scope, (query) => {
                    return scope.chatScroller;
                }), newValue => {
                    if (newValue) {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })


    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'locale/locale-',
            suffix: '.json'
        }).preferredLanguage('de');
    });

if (live) {
    app.service(Service.DataService.serviceId, Service.DataService)
        .service(Service.UserService.serviceId, Service.UserService)
        .service(Service.SearchService.serviceId, Service.SearchService)
        .service(Service.HelperService.serviceId, Service.HelperService)
        .service(Service.InsertTripService.serviceId, Service.InsertTripService)
        .service(Service.MessengerService.serviceId, Service.MessengerService)
        .service(Service.SocketService.serviceId, Service.SocketService)

} else {
    app.service(MockedService.DataService.serviceId, MockedService.DataService)
        .service(MockedService.UserService.serviceId, MockedService.UserService)
        .service(MockedService.EditProfileService.serviceId, MockedService.EditProfileService)
        .service(Service.SearchService.serviceId, Service.SearchService)
}



