/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/jqueryui/jqueryui.d.ts" />

/// <reference path="./controller/slideCtrl.ts" />

/// <reference path="./controller/searchCtrl.ts" />
/// <reference path="./controller/searchResultCtrl.ts" />

/// <reference path="./controller/headerBarCtrl.ts" />

/// <reference path="./controller/userCtrl.ts" />

/// <reference path="./controller/welcomeFeedCtrl.ts" />

/// <reference path="./controller/welcomeCtrl.ts" />

/// <reference path="./controller/static/staticButtonCtrl.ts" />
/// <reference path="./controller/insertLocationCtrl.ts" />
/// <reference path="./controller/locationCtrl.ts" />
/// <reference path="./controller/locationViewCtrl.ts" />
/// <reference path="./controller/errorCtrl.ts" />

/// <reference path="./controller/mainCtrl.ts" />

/// <reference path="./service/userService.ts" />
/// <reference path="./service/feedbackService.ts" />
/// <reference path="./service/dataService.ts" />
/// <reference path="./service/searchService.ts" />
/// <reference path="./service/tripService.ts" />
/// <reference path="./service/LocationService.ts" />
/// <reference path="./service/insertTripService.ts" />
/// <reference path="./service/errorService.ts" />

/// <reference path="./controller/feedbackCtrl.ts" />


/// <reference path="./service/helperService.ts" />
/// <reference path="./service/utilityService.ts" />

/// <reference path="./controller/contextCtrl.ts" />
/// <reference path="./service/socketService.ts" />
/// <reference path="./service/messengerService.ts" />
/// <reference path="./controller/messengerCtrl.ts" />
/// <reference path="./controller/tripCtrl.ts" />
/// <reference path="./controller/editTripCtrl.ts" />


var deps = [
    'locator.moodselection',
    'locator.selection',
    'cfp.hotkeys',
    'ngDialog',
    'angular-flexslider',
    'smoothScroll',
    'ui.router',
    'pascalprecht.translate',
    'base64',
    'angularFileUpload',
    'ngMapAutocomplete',
    'ngFileUpload',
    'angular-progress-arc',
    'ngLodash',
    'btford.socket-io',
    'angular-cache',
    'locator.datepicker',
    'locator.scrollfix',
    'locator.accommodation-equipment-chooser',
    'dbaq.emoji',
    'uiGmapgoogle-maps',
    'luegg.directives',
    'monospaced.elastic',
    //'ngFx', 'ngAnimate',
    'geolocation',
    'ngTagsInput',
    'matchMedia',
    'ngDialog',
    'angulartics',
    'angulartics.google.analytics',
    'truncate'
];

var app = angular.module('locator', deps)

    .constant('basePath', '<%= basePath %>')
    .constant('basePathRealtime', '<%= basePathRealtime %>')

    .config(function (CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {maxAge: 15 * 60 * 1000});
    })
    /*.config(function (GoogleMapApiProvider) {
     GoogleMapApiProvider.configure({
     china: false
     });
     })*/

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider

            .state('welcome', {
                url: "/welcome",
                templateUrl: "templates/welcome/welcome.html"
            })

            .state('context', {
                url: "/context",
                controller: "ContextCtrl"
            })

            .state('search', {
                url: "/search?city&start_date&end_date&days&persons&moods&accomodations",
                templateUrl: "templates/search/search.html",
                reloadOnSearch: false
            })

            .state('trip', {
                url: "/trip/:tripId",
                templateUrl: "templates/search/trip.html"
            })

            .state('messenger', {
                url: "/messenger",
                templateUrl: "templates/messenger/messenger.html"
            })

            .state('messenger.opponent', {
                url: "/:opponentId",
                templateUrl: "templates/messenger/messenger.html"
            })

            .state('user', {
                url: "/user/:profileId?tab",
                templateUrl: "templates/userProfile/user.html"
            })

            .state('insertTrip', {
                url: "/insert-trip/?city&moods&days",
                templateUrl: "templates/editTrip/editTrip.html",
                reloadOnSearch: false
            })

            .state('editTrip', {
                url: "/edit-trip/:tripId?city&tmp",
                templateUrl: "templates/editTrip/editTrip.html",
                reloadOnSearch: false
            })

            .state('editTripSuccess', {
                url: "/edit-trip-success/",
                templateUrl: "templates/editTrip/editTripSuccess.html"
            })

            .state('insertLocation', {
                url: "/insert-location?tmp",
                templateUrl: "templates/location/insertLocation.html"
            })

            .state('locationView', {
                url: "/location/:locationId",
                templateUrl: "templates/location/locationView.html"
            })

            .state('editLocation', {
                url: "/edit-location/:locationId",
                templateUrl: "templates/location/insertLocation.html"
            })

            .state('error', {
                url: "/error?r&t",
                templateUrl: "templates/error/genericLorenz.html"
            })

            .state('impressum', {
                url: "/impressum",
                templateUrl: "templates/static/impressum.html"
            });

        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('welcome');
    })

    .controller(Controller.SlideCtrl.controllerId, Controller.SlideCtrl)
    .controller(Controller.SearchCtrl.controllerId, Controller.SearchCtrl)
    .controller(Controller.SearchResultCtrl.controllerId, Controller.SearchResultCtrl)
    .controller(Controller.HeaderBarCtrl.controllerId, Controller.HeaderBarCtrl)
    .controller(Controller.WelcomeCtrl.controllerId, Controller.WelcomeCtrl)
    .controller(Controller.StaticButtonCtrl.controllerId, Controller.StaticButtonCtrl)
    .controller(Controller.MainCtrl.controllerId, Controller.MainCtrl)
    .controller(Controller.ContextCtrl.controllerId, Controller.ContextCtrl)
    .controller(Controller.MessengerCtrl.controllerId, Controller.MessengerCtrl)
    .controller(Controller.UserCtrl.controllerId, Controller.UserCtrl)
    .controller(Controller.TripCtrl.controllerId, Controller.TripCtrl)
    .controller(Controller.InsertLocationCtrl.controllerId, Controller.InsertLocationCtrl)
    .controller(Controller.LocationCtrl.controllerId, Controller.LocationCtrl)
    .controller(Controller.EditTripCtrl.controllerId, Controller.EditTripCtrl)
    .controller(Controller.LocationViewCtrl.controllerId, Controller.LocationViewCtrl)
    .controller(Controller.FeedbackCtrl.controllerId, Controller.FeedbackCtrl)
    .controller(Controller.ErrorCtrl.controllerId, Controller.ErrorCtrl)
    .controller(Controller.WelcomeFeedCtrl.controllerId, Controller.WelcomeFeedCtrl)


    .filter('truncate', function () {
        return function (value, max) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);

            return value + '…';
        };
    })

    .filter('itemsInHash', function () {
        return function (hashmap) {

            return Object.keys(hashmap).length;
        };

    })

    .directive('goBack', function ($window) {
        return function ($scope, $element) {
            $element.on('click', function () {
                $window.history.back();
            })
        }
    })

    .directive('contenteditable', [($sce) => {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: (scope, element, attrs, ngModel) => {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function () {
                    scope.$evalAsync(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    var html = element.html();
                    html = html.replace(/<\/?[^>]+(>|$)/g, "");
                    ngModel.$setViewValue(html);
                }
            }
        };
    }])

    .directive('backImg', function () {
        return function (scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'cover'
            });
        };
    })

    .directive('megadate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope:any) {
                $scope.$watch('date', (newVal, oldVal, scope) => {
                    if (newVal !== oldVal) {

                        var ageDifMs = Date.now() - new Date(newVal).getTime() + 86400000;
                        var ageDate = new Date(ageDifMs); // miliseconds from epoch
                        $scope.date2 = Math.abs(ageDate.getUTCFullYear() - 1970);

                    }
                })

            },
            template: '<span class="megadate">({{date2}})</span>',
            replace: true
        };
    })

    .directive('resultdate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope) {

                $scope.$watch('date', (newVal, oldVal, scope) => {
                    if (newVal) {

                        var localdate = new Date(newVal);
                        $scope.date2 = moment(localdate).format('L');
                    }
                });

            },
            template: '{{date2}}'
        };
    })

    .directive('messengerDate', function () {
        return {
            scope: {date: '='},
            controller: function ($scope) {

                $scope.$watch('date', (newVal, oldVal, scope) => {
                    var yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
                    yesterday.setHours(0, 0, 0, 0);

                    if (newVal) {
                        var localdate = new Date(newVal);
                        if (moment(localdate).isBefore(yesterday)) {
                            var a = moment(localdate).day();
                            $scope.date2 = moment.weekdays(a);
                        } else {
                            $scope.date2 = moment(localdate).format('HH:mm');
                        }
                    }
                });

            },
            template: '{{date2}}'
        };
    })

    .directive('imgTriplist', () => {
        var tmpl = [
            '<flex-slider prev-text="" next-text="" class="static" control-nav="false" direction-nav="true" animation="fade" animation-loop="true" slideshow="false" slide="s in slides"><li>',
            '<div class="header-image" style="background-image: url({{s}}&key=AIzaSyCveLtBw4QozQIkMstvefLSTd3_opSvHS4);"></div>',
            '</li></flex-slider>'
        ];

        return {
            scope: {
                locations: '=',
                mapwidth: '@',
                mapheight: '@',
                scale: '@',
                size: '='
            },
            link: (scope:any, element) => {
                var slides:string[] = [];
                var l = scope.locations;
                for (var key in l) {
                    if (l.hasOwnProperty(key)) {
                        var selectedObjImages = l[key];
                        if (selectedObjImages.picture) {
                            if (scope.size === 'mid') {
                                slides.push(selectedObjImages.picture + '?size=mid');
                            } else {
                                slides.push(selectedObjImages.picture);
                            }
                        }
                        //slides.push(l[key].googlemap + '&size=' + scope.mapwidth + 'x' + scope.mapheight + '&scale=' + scope.scale);
                        slides.push(l[key].googlemap + '&size=900x900' + '&scale=' + scope.scale);
                    }
                }
                scope.slides = slides;
            },
            template: tmpl.join('')
        }
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

    .directive('activePopover', function ($rootScope) {
        return {
            scope: {
                clickValue: '=',
                compareTo: '=',
                opened: '=?'
            },
            link: (scope:any, element) => {
                element.bind('click', (event) => {
                    // stop event from bubbling up to the body
                    event.stopPropagation();
                    if (scope.compareTo === scope.clickValue) {
                        scope.compareTo = '';
                    } else {
                        scope.compareTo = scope.clickValue;
                    }
                    $rootScope.$emit('newPopoverSelected', scope.clickValue);
                    $rootScope.$apply();
                });
            }
        }
    })

    .directive("sticky", function ($window) {
        return {
            link: function (scope:any, element:any, attrs:any) {

                var $win = angular.element($window);

                if (scope._stickyElements === undefined) {
                    scope._stickyElements = [];

                    $win.bind("scroll.sticky", function (e) {
                        var pos = $win.scrollTop() + 26;
                        for (var i = 0; i < scope._stickyElements.length; i++) {

                            var item = scope._stickyElements[i];

                            if (!item.isStuck && pos > item.start) {
                                item.element.addClass("stuck");
                                item.isStuck = true;

                                if (item.placeholder) {
                                    item.placeholder = angular.element("<div></div>")
                                        .css({height: item.element.outerHeight() + "px"})
                                        .insertBefore(item.element);
                                }
                            }
                            else if (item.isStuck && pos < item.start) {
                                item.element.removeClass("stuck");
                                item.isStuck = false;

                                if (item.placeholder) {
                                    item.placeholder.remove();
                                    item.placeholder = true;
                                }
                            }
                        }
                    });

                    var recheckPositions = function () {
                        for (var i = 0; i < scope._stickyElements.length; i++) {
                            var item = scope._stickyElements[i];
                            if (!item.isStuck) {
                                item.start = item.element.offset().top;
                            } else if (item.placeholder) {
                                item.start = item.placeholder.offset().top;
                            }
                        }
                    };
                    $win.bind("load", recheckPositions);
                    $win.bind("resize", recheckPositions);
                }

                var item = {
                    element: element,
                    isStuck: false,
                    placeholder: attrs.usePlaceholder !== undefined,
                    start: element.offset().top
                };

                scope._stickyElements.push(item);

            }
        };
    })

    .directive('tripMinView', function () {

        return {
            scope: {
                trip: "=",
                mood: "=",
                size: "="
            },
            controller: function ($scope, $rootScope, LocationService, TripService, UserService) {

                $scope.showLocs = false;
                $scope.locations = [];
                $scope.locationCount = Object.keys($scope.trip.locations).length;
                $scope.meId = $rootScope.userID;

                $scope.showLocations = function () {
                    $scope.showLocs = !$scope.showLocs;
                    if ($scope.locations.length == 0) {
                        var locationsHash = $scope.trip.locations;
                        for (var key in locationsHash) {
                            if (locationsHash.hasOwnProperty(key)) {
                                LocationService.getLocationById(key)
                                    .then(result => {
                                        this.locations.push(result.data);
                                    });
                            }
                        }
                    }
                };

                $scope.participate = function () {
                    UserService.getUser($scope.trip.userid).then(result => {
                        var user = result.data;
                        TripService.participate(user, $scope.trip);
                    });
                };

            },
            templateUrl: 'templates/directives/tripMinView.html'
        }
    })

    .directive('moreSettings', function ($rootScope) {
        return {
            link: (scope:any, element) => {
                element.bind('click', (event) => {
                    // stop event from bubbling up to the body
                    event.stopPropagation();
                });
            },
            templateUrl: 'templates/directives/moreSettings.html'
        }
    })

    .directive('focus', function () {
        return function (scope, elem, attr) {
            angular.element(elem).focus();
        };
    })

    .directive('schoenHier', () => {
        return {
            scope: {
                location: "=",
                mySchoenHiers: "="
            },
            controller: function($scope, $rootScope, LocationService) {
                $scope.markedByMe = () => {
                    return $scope.mySchoenHiers.locations[$scope.location._id];
                };

                $scope.onlyMe = () => {
                    return $scope.location.schoenhiers === 1 && $scope.markedByMe();
                };



                $scope.schoenHier = () => {
                    LocationService.schoenHier($scope.location._id)
                        .then(() => {
                            if(!$scope.location.schoenhiers) {
                                $scope.location.schoenhiers = 1;
                            } else {
                                $scope.location.schoenhiers++;
                            }
                            $scope.mySchoenHiers.locations[$scope.location._id] = true;
                        })
                        .catch(() => {
                            debugger
                        });
                }

                $scope.nichtMehrSchoenHier = () => {
                    LocationService.nichtMehrSchoenHier($scope.location._id)
                        .then(() => {
                            $scope.location.schoenhiers--;
                            $scope.mySchoenHiers.locations[$scope.location._id] = false;
                        })
                        .catch(() => {
                            debugger
                        });
                }
            },
            templateUrl: 'templates/directives/schoenHier.html'
        }
    })


    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'locale/locale-',
            suffix: '.json'
        }).preferredLanguage('de');
    })
    .service(Service.DataService.serviceId, Service.DataService)
    .service(Service.UserService.serviceId, Service.UserService)
    .service(Service.SearchService.serviceId, Service.SearchService)
    .service(Service.HelperService.serviceId, Service.HelperService)
    .service(Service.TripService.serviceId, Service.TripService)
    .service(Service.MessengerService.serviceId, Service.MessengerService)
    .service(Service.SocketService.serviceId, Service.SocketService)
    .service(Service.LocationService.serviceId, Service.LocationService)
    .service(Service.InsertTripService.serviceId, Service.InsertTripService)
    .service(Service.UtilityService.serviceId, Service.UtilityService)
    .service(Service.FeedbackService.serviceId, Service.FeedbackService)
    .service(Service.ErrorService.serviceId, Service.ErrorService);

