/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />

/// <reference path="./controller/slideCtrl.ts" />

/// <reference path="./controller/searchMainCtrl.ts" />
/// <reference path="./controller/searchCtrl.ts" />

/// <reference path="./controller/userHeaderCtrl.ts" />

/// <reference path="./controller/modusChooserCtrl.ts" />


/// <reference path="./controller/tripSearchCtrl.ts" />
/// <reference path="./controller/tripResultsCtrl.ts" />

/// <reference path="./controller/editProfileCtrl.ts" />
/// <reference path="./service/editProfileService.ts" />

/// <reference path="./controller/tripCtrl.ts" />

/// <reference path="./controller/createTripCtrl.ts" />


/// <reference path="./service/userService.ts" />
/// <reference path="./service/triplerService.ts" />
/// <reference path="./service/dataService.ts" />

/// <reference path="./mockedservice/userService.ts" />
/// <reference path="./mockedservice/triplerService.ts" />
/// <reference path="./mockedservice/dataService.ts" />


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//set to true if backend is running on localhost:3001
var live = '<%= live %>';

var app = angular.module('starter', ['ngDialog', 'angular-flexslider', 'smoothScroll', 'ui.router', 'pascalprecht.translate', 'emoji', 'base64', 'angularFileUpload'])

    .constant('basePath', '/api/v1')

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true
            })

            .state('welcome', {
                url: "/welcome",
                templateUrl: "../templates/welcome.html"

            })

            .state('search', {
                url: "/search?city&dateFrom&dateTo&range",
                templateUrl: "../templates/search/search.html",
                controller: 'SearchCtrl',
                controllerAs: 'sc'

            })

            .state('tripresults', {
                url: "/trips?city&budget&checkin&checkout&travellersCount&moods&accomodations",
                templateUrl: "../templates/tripresults.html"
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "../templates/login.html"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "../templates/profile.html"
                    }
                }
            })

            .state('editProfile', {
                url: "/editProfile",
                templateUrl: "../templates/userProfile/editProfile.html"
            });

        $urlRouterProvider.otherwise('/welcome')
    })

    .controller(Controller.TripSearchCtrl.controllerId, Controller.TripSearchCtrl)
    .controller(Controller.TripResultsCtrl.controllerId, Controller.TripResultsCtrl)
    .controller(Controller.SlideCtrl.controllerId, Controller.SlideCtrl)
    .controller(Controller.ModusChooserCtrl.controllerId, Controller.ModusChooserCtrl)
    .controller(Controller.TripCtrl.controllerId, Controller.TripCtrl)
    .controller(Controller.EditProfileCtrl.controllerId, Controller.EditProfileCtrl)
    .controller(Controller.CreateTripCtrl.controllerId, Controller.CreateTripCtrl)
    .controller(Controller.SearchMainCtrl.controllerId, Controller.SearchMainCtrl)
    .controller(Controller.SearchCtrl.controllerId, Controller.SearchCtrl)
    .controller(Controller.UserHeaderCtrl.controllerId, Controller.UserHeaderCtrl)



    .directive('megadate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope) {
                var date = new Date($scope.date);
                $scope.date = moment(date).startOf('minute').fromNow();
            },
            template: '<p>{{date}}</p>'
        };
    })

    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'locale/locale-',
            suffix: '.json'
        }).preferredLanguage('de');
    });

if (live) {
    app.service(Service.TriplerService.serviceId, Service.TriplerService)
        .service(Service.DataService.serviceId, Service.DataService)
        .service(Service.UserService.serviceId, Service.UserService)
} else {
    app.service(MockedService.TriplerService.serviceId, MockedService.TriplerService)
        .service(MockedService.DataService.serviceId, MockedService.DataService)
        .service(MockedService.UserService.serviceId, MockedService.UserService)
        .service(MockedService.EditProfileService.serviceId, MockedService.EditProfileService)
}






