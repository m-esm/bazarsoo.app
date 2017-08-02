/// <reference path="../vendors/bower_components/angular/angular.js" />


phoneService = false;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {


    $('body').addClass('phonegap').addClass(device.platform);
    phoneService = {};
    phoneService.vibrate = navigator.vibrate;
    
}

$(function () {



    var vibTimeout = 0;
    var littleVibTimeout = 0;
    $(document).on('touchstart mousedown', '.v-block .more', function (e) {

        vibTimeout = setTimeout(function () {

            phoneService.vibrate(30);

        }, 300);

        $('.v-block').not($(e.target).parents('.v-block')).addClass('transparent');
        $(e.target).parents('.v-block').addClass('touchstart');

        $('.v-block .icon').removeClass('active');



        $('.icon', $(e.target).parents('.v-block')).addClass('show');

        blockTouchScroll = true;

        e.preventDefault();

        var start = {
            x: e.originalEvent.touches[0].clientX,
            y: e.originalEvent.touches[0].clientY
        };
        var lastActive;
        var onMove = function (e) {


            var end = {
                x: e.clientX ? e.clientX : e.originalEvent.touches[0].clientX,
                y: e.clientY ? e.clientY : e.originalEvent.touches[0].clientY
            };

            var line = (start.x - end.x) + (start.y - end.y);



            if (line < 20) {


                $('.v-block .icon').removeClass('active');

                return;

            }

            var m = (end.y - start.y) / (end.x - start.x);



            $('.v-block .icon').removeClass('active');

            function then(icon) {
                lastActiveIndex = 0;
                if (lastActive)
                    lastActiveIndex = lastActive.index();


                lastActive = $(icon, $(e.target).parents('.v-block')).addClass('active');
               
                
                if (lastActiveIndex != lastActive.index())
                    littleVibTimeout = setTimeout(function () {

                        if (phoneService)
                            phoneService.vibrate(30);

                    },100);

            }

            if (m < 1.4 && m > 0.53) {
                then('.icon-2');
            }

            if (m > 2 || m < -1) {
                then('.icon-1');
            }

            if (m < 0.5 && m > -1) {
                then('.icon-3');
            }



        };
        //.parents('.v-block')

        $(e.target).on('touchmove mousemove', onMove);




        $(e.target).on('mouseup mouseout touchend', function (e) {
            $('.v-block .more').unbind('mousemove');
            $('.v-block  .icon').removeClass('show');

            $(e.target).parents('.v-block').removeClass('touchstart');
            $('.v-block').removeClass('transparent');
            clearTimeout(vibTimeout);

            //do stuff


            //then
            $('.v-block  .icon').removeClass('active');
        });


    });





});




var bazarsooAng = angular.module('bazarsoo', ['ngAnimate', 'ngRoute']);



bazarsooAng.factory('authInterceptorService', ['$q', '$location', function ($q, $location) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorage.getItem('token');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/auth');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);

bazarsooAng.config(function ($locationProvider, $httpProvider, $routeProvider) {


    $httpProvider.interceptors.push('authInterceptorService');


    $routeProvider.
        when('/auth', {
            templateUrl: 'views/auth.html',
            controller: 'authController'
        }).when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchController'
        }).when('/account', {
            templateUrl: 'views/account.html',
            controller: 'accountController',
            data: {
                requireLogin: true
            }
        }).when('/chat', {
            templateUrl: 'views/chat.html',
            controller: 'chatController',
            data: {
                requireLogin: true
            }
        }).otherwise({ redirectTo: '/home' });

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

});
bazarsooAng.factory('authService', ['$http', '$q', function ($http, $q) {

    var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);


bazarsooAng.run(function ($location, $rootScope, $timeout, $http) {

    $rootScope._ = _;
    $rootScope.moment = moment;
    $rootScope.windowWidth = window.innerWidth;
    $(window).resize(function () {
        $rootScope.windowWidth = window.innerWidth;
        $rootScope.$apply();
    });

    $rootScope.location = $location;

    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        var requireLogin = false;

        if (next.data) {
            requireLogin = next.data.requireLogin;

            if (requireLogin && !localStorage.user) {

                // no logged user, we should be going to #login
                if (next.templateUrl == "views/auth.html") {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/auth");
                }


            }
        }
    });


    if ($location.path() == "/" || !$location.path())
        $location.path('/home');



});

bazarsooAng.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);

bazarsooAng.controller('authController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.loginModel = {};
    $scope.signupModel = {};

    $scope.message = "";

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

            $location.path('/orders');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);

bazarsooAng.controller('searchController', function ($scope, $http, $rootScope, $window) {

});

bazarsooAng.controller('chatController', function ($scope, $http, $rootScope, $window) {

});


bazarsooAng.controller('accountController', function ($scope, $http, $rootScope, $window) {

});

bazarsooAng.controller('homeController', function ($scope, $http, $rootScope, $window) {


    var getColumns = function () {

        var columnWidth = 180;
        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);


        var eachColumnHeight = _.reduce($scope.vitrins, function (memo, item) {

            return memo + item.BlockCount;

        }, 0) / columnCount;


        var columns = new Array(columnCount);

        var cPointer = 0;
        $scope.vitrins.forEach(function (item, index) {

            if (!columns[cPointer])
                columns[cPointer] = [];


            columns[cPointer].push(item);

            if (cPointer < columnCount - 1) {

                cPointer++;

            } else {
                cPointer = 0;

            }


        });

        return columns;



    };

    $rootScope.$watch('windowWidth', function (newVal) {

        if ($scope.vitrins)
            $scope.columns = getColumns();


    });

    $http.get('http://bazarsoo.com/vitrin/api/vitrins').then(function (res) {

        $scope.vitrins = res.data;


        $scope.columns = getColumns();

    });

});
