/// <reference path="../vendors/bower_components/angular/angular.js" />


phoneService = false;

document.addEventListener("deviceready", onDeviceReady, false);

apiBase = 'http://localhost:56824';

function onDeviceReady() {


    $('body').addClass('phonegap').addClass(device.platform);
    phoneService = {};
    phoneService.vibrate = navigator.vibrate;

}



$(function () {

    //$.connection.hub.url = apiBase + '/signalr/hubs';
    //var chat = $.connection.chatHub;
    //$.connection.hub.start().done(function (data) {
    //    alert();
    //});



    var vibTimeout = 0;
    var littleVibTimeout = 0;
    $(document).on('touchstart mousedown', '.v-block .more', function (e) {

        if (phoneService)
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
            x: e.clientX ? e.clientX : e.originalEvent.touches[0].clientX,
            y: e.clientY ? e.clientY : e.originalEvent.touches[0].clientY
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

                    }, 100);

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

            var vBlock = $(e.target).parents('.v-block');
            vBlock.removeClass('touchstart');

            $('.v-block .more').unbind('mousemove');
            $('.v-block  .icon').removeClass('show');
            $('.v-block').removeClass('transparent');
            clearTimeout(vibTimeout);

            var activeIcon = $('.v-block  .icon.active');
            //do stuff

            if (activeIcon.length != 0) {


                if (activeIcon.hasClass('icon-1')) {

                }


                if (activeIcon.hasClass('icon-2')) {

                    window.location.hash = '!/home#' + vBlock.data('id');

                }


                if (activeIcon.hasClass('icon-3')) {

                }

            } else {


                //then

            }

            $('.v-block  .icon').removeClass('active');






        });


    });





});




var bazarsooAng = angular.module('bazarsoo', ['ngAnimate', 'ngRoute', 'ngSanitize']);



bazarsooAng.factory('authInterceptorService', ['$q', '$location', function ($q, $location) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorage.getItem('user');


        if (authData) {
            authData = JSON.parse(authData);

            if (authData.access_token)
                config.headers.Authorization = 'Bearer ' + authData.access_token;
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
.when('/product', {
    templateUrl: 'views/product.html',
    controller: 'productController'
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

bazarsooAng.factory('userService', function ($http, $q) {

    var userServiceFactory = {
        cart: false,
        invoices: false,
        favorites: false,
        findFavorite: false
    };

    _findFavorite = function (vid) {



    };
    _getInvoices = function () {


        var deferred = $q.defer();

        if (userServiceFactory.invoices)
            deferred.resolve(userServiceFactory.invoices);


        $http.post(apiBase + '/vitrin/api/invoices').then(function (res) {

            userServiceFactory.invoices = res.data;

            deferred.resolve(res.data);


        }, function (res) {
            deferred.reject(res);
        });

        return deferred.promise;

    };
    _getCart = function () {


        var deferred = $q.defer();

        if (userServiceFactory.cart)
            deferred.resolve(userServiceFactory.cart);


        $http.post(apiBase + '/vitrin/api/cart').then(function (res) {

            userServiceFactory.cart = res.data;
            deferred.resolve(res.data);

        }, function (res) {
            deferred.reject(res);
        });

        return deferred.promise;

    };
    _getFavorites = function () {


        var deferred = $q.defer();

        if (userServiceFactory.favorites)
            deferred.resolve(userServiceFactory.favorites);


        $http.post(apiBase + '/vitrin/api/favorites').then(function (res) {

            userServiceFactory.favorites = res.data;
            deferred.resolve(res.data);

        }, function (res) {
            deferred.reject(res);
        });

        return deferred.promise;

    };

    return function () {

        var deferred = $q.defer();

        if (!localStorage.user)
            deferred.reject();
        else
            $q.all(
               _getInvoices(),
               _getCart(),
               _getFavorites()).then(function () {


                   userServiceFactory.findFavorite = _findFavorite;

                   deferred.resolve(userServiceFactory);



               }, function () {
                   deferred.reject();
               });

        return deferred.promise;


    };

});

bazarsooAng.factory('authService', ['$http', '$q', function ($http, $q) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(apiBase + '/api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(apiBase + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (res) {


            localStorage.setItem('user', JSON.stringify(res.data));

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(res);

        }, function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorage.removeItem('user');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorage.getItem('user');
        if (authData) {
            authData = JSON.parse(authData);
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


bazarsooAng.run(function ($location, $rootScope, $timeout, $http, userService) {

    angLocation = $location;
    $rootScope._ = _;
    $rootScope.moment = moment;
    $rootScope.windowWidth = window.innerWidth;

    $(window).resize(function () {
        $rootScope.windowWidth = window.innerWidth;
        $rootScope.$apply();
    });

    $rootScope.setLocation = function (path) {

        $location.path(path);
        $location.hash('');

    };
    $rootScope.location = $location;


    userService().then(function (_userService) {

        $rootScope.userService = _userService;
        setTimeout(function () {
            console.log($rootScope.userService);

        }, 5);

    }, function () {

    });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {


        $rootScope.showAuth = false;

        var requireLogin = false;

        if (next.data) {
            requireLogin = next.data.requireLogin;

            if (requireLogin && !localStorage.user) {


                $rootScope.showAuth = true;
                //    $location.path(current);
                //// no logged user, we should be going to #login
                //if (next.templateUrl == "views/auth.html") {
                //    // already going to #login, no redirect needed
                //} else {
                //    // not going to #login, we should redirect now
                //    $location.path("/auth");
                //}


            } else {
            }
        } else {

        }
    });


    if ($location.path() == "/" || !$location.path())
        $location.path('/home');



});


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

        authService.login($scope.loginModel).then(function (res) {


            location.reload();



        },
         function (err) {
             $scope.error = err;

         });
    };

}]);

bazarsooAng.controller('searchController', function ($scope, $http, $rootScope, $window) {

});

bazarsooAng.controller('chatController', function ($scope, $http, $rootScope, $window) {

});


bazarsooAng.controller('accountController', function ($scope, $http, $rootScope, $location, $window, authService) {
    $scope.logout = function () {
        authService.logOut();
        $location.path('home');
    };
});

bazarsooAng.controller('homeController', function ($scope, $http, $rootScope, $window, $location) {



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

    var getProductColumns = function () {
        if (!$scope.vitrin)
            return;

        var products = $scope.vitrin.products;

        var columnWidth = 180;
        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);

        var columns = new Array(columnCount);

        var cPointer = 0;

        products.forEach(function (item, index) {

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

        if ($scope.vitrin)
            $scope.vitrin.productColumns = getProductColumns();

    });

    $scope.goProduct = function (product) {

        $location.path('/product');
        $location.hash(product.rid);

    };

    $http.get(apiBase + '/vitrin/api/vitrins').then(function (res) {

        $scope.vitrins = res.data;

        $rootScope.$watch(function () {
            return $location.hash();
        }, function (newVal) {


            $scope.vitrin = $scope.getVitrin();
            if ($scope.vitrin)
                $scope.vitrin.productColumns = getProductColumns();

        });

        $scope.getVitrin = function () {
            var model = _.find($scope.vitrins, function (item) {
                return item.Id == $location.hash();
            });
            return model;
        };

        $scope.columns = getColumns();

    });

});
bazarsooAng.controller('productController', function ($scope, $http, $rootScope, $window, $location) {

    $rootScope.$watch(function () {
        return $location.hash();
    }, function (newVal) {

        $http.get(apiBase + '/vitrin/ui/product?ajax=true&mobile=true&rid=' + newVal).then(function (res) {

            $scope.productView = res.data;

        }, function () {

        });

    });

});


