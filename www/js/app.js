/// <reference path="../vendors/bower_components/angular/angular.js" />

const resizeImage = function (img, resizeWidth, callback) {
    var img = document.getElementById('avatar');
    var type = 'image/jpeg';
    var quality = 0.92;

    img.onload = function () {
        var oc = document.createElement('canvas'), octx = oc.getContext('2d');
        oc.width = img.width;
        oc.height = img.height;
        octx.drawImage(img, 0, 0);
        while (oc.width * 0.5 > resizeWidth) {
            oc.width *= 0.5;
            oc.height *= 0.5;
            octx.drawImage(oc, 0, 0, oc.width, oc.height);
        }

        oc.width = resizeWidth;
        oc.height = oc.width * img.height / img.width;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        callback(oc.toDataURL(type, quality));

    };

};

var sentNotifications = [];


swal.setDefaults({ confirmButtonText: 'بسیار خب' });

phoneService = false;

document.addEventListener("deviceready", onDeviceReady, false);
//http://192.168.2.200:9090
//http://localhost:56824

apiBase = 'http://bazarsoo.com';



//Notification.requestPermission(function (permission) {
//    // If the user accepts, let’s create a notification
//    if (permission === 'granted') {
//        var notification = new Notification('My title', {
//            tag: 'message1',
//            body: 'My body'
//        });
//       // notification.onshow = function () { alert('show'); };
//       // notification.onclose = function () { alert('close'); };
//      //  notification.onclick = function () { alert('click'); };
//    }
//});


function onDeviceReady() {

    cordova.plugins.backgroundMode.setDefaults({ silent: true })
    cordova.plugins.backgroundMode.configure({})

    cordova.plugins.backgroundMode.on('activate', function () {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

    cordova.plugins.backgroundMode.on('deactivate', function () {
        cordova.plugins.backgroundMode.enableWebViewOptimizations();
    });

    cordova.plugins.backgroundMode.on('enable', function () {
    });


    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.excludeFromTaskList();

    cordova.plugins.backgroundMode.enable();

    Notification.requestPermission(function (permission) {

    });
    //    if (permission === "granted") {
    //        var notification = new Notification("My title", {
    //            tag: "message1", 
    //            body: "My body" 
    //        });


    //        notification.onshow  = function() { console.log("show"); };
    //        notification.onclose = function() { console.log("close"); };
    //        notification.onclick = function() { console.log("click"); };
    //    }
    //});
    //window.FirebasePlugin.getToken(function (token,err) {

    //    // save this server-side and use it to push notifications to this device
    //    console.log('firebase !!!!!!!!',token,err);
    //}, function (error) {
    //    console.error(error);
    //});
    //window.FirebasePlugin.hasPermission(function (data) {
    //    console.log('zzzzz firebase ' ,data.isEnabled);
    //});



    $('body').addClass('phonegap').addClass(device.platform);
    phoneService = {};
    phoneService.vibrate = navigator.vibrate;
    //window.plugin.notification.local.hasPermission(function (granted) {
    //    console.log('Permission has been granted: ' + granted);
    //});
    //console.warn("testNotifications Started");
    //console.warn(cordova.plugins.notification);
    //// Checks for permission
    //cordova.plugins.notification.local.hasPermission(function (granted) {

    //    console.warn("Testing permission");

    //    if (granted == false) {

    //        console.warn("No permission");
    //        // If app doesnt have permission request it
    //        cordova.plugins.notification.local.registerPermission(function (granted) {

    //            console.warn("Ask for permission");
    //            if (granted == true) {

    //                console.warn("Permission accepted");
    //                // If app is given permission try again
    //                testNotifications();

    //            } else {
    //                alert("We need permission to show you notifications");
    //            }

    //        });

    //    } else {

    //        var pathArray = window.location.pathname.split("/www/"),
    //            secondLevelLocation = window.location.protocol + "//" + pathArray[0],
    //            now = new Date();


    //        console.warn("sending notification", cordova.plugins.notification.local);

    //        var isAndroid = false;

    //        if (device.platform === "Android") {
    //            isAndroid = true;
    //        }

    //        cordova.plugins.notification.local.schedule({
    //            id: 2,
    //            title: "Test notification 9",
    //            text: "This is a test notification",
    //            // sound: isAndroid ? "file://sounds/notification.mp3" : "file://sounds/notification.caf",
    //            // at: new Date(new Date().getTime())
    //            // data: { secret:key }
    //        });

    //    }

    //});

}

$(function () {

    $(document).on("click touchstart", '#changePasswordWithCode', function () {
        var model = {};
        swal({
            title: "تغییر رمز عبور !",
            text: "درصورتی که از قبل درخواست فراموشی رمز داده اید و کد پیامک شده را دریافت کرده اید شماره موبایل خود را وارد کنید :",
            type: "input",
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "آدرس ایمیل یا شماره موبایل"
        },
         function (inputValue) {
             if (inputValue === false) return false;

             model.Email = inputValue;


             swal({
                 title: "تغییر رمز عبور !",
                 text: "کد دریافتی را وارد کنید",
                 type: "input",
                 showCancelButton: true,
                 cancelButtonText: 'انصراف',
                 closeOnConfirm: false,
                 animation: "slide-from-top",
                 inputPlaceholder: "کد دریافتی"
             }, function (inputValue) {
                 if (inputValue === false) return false;

                 model.Code = inputValue;


                 swal({
                     title: "تغییر رمز عبور !",
                     text: "رمز عبور جدید را وارد کنید",
                     type: "input",
                     showCancelButton: true,
                     cancelButtonText: 'انصراف',
                     closeOnConfirm: false,
                     animation: "slide-from-top",
                     inputPlaceholder: "رمز جدید",
                     inputType: 'password'

                 }, function (inputValue) {

                     if (inputValue === false) return false;

                     model.Password = inputValue;
                     model.ConfirmPassword = inputValue;


                     $.ajax({
                         url: apiBase + "/manage/auth/ResetPassword",
                         type: 'POST',
                         data: model
                     }).done(function (data) {
                         if (data.result)
                             swal("با تشکر", data.msg);
                         else {
                             var error = data.msg;

                             if (Array.isArray(data.msg)) {
                                 error = "";
                                 $.each(data.msg,
                                     function (index, item) {
                                         error += item + ". ";
                                     });
                             }
                             swal({ title: "خطا !", text: error, type: "error" });
                         }
                     }).error(function (data) {

                         console.log(data.msg);
                         swal({ title: "خطا !", text: data.msg, type: "error" });
                     });


                 });



             });



         });

    });


    $(document).on('change', " .sp-pic input[type=file]", function (e) {
        console.log('onnnnnnn');
        var reader = new FileReader();
        $('.sp-pic a.btn').toggle();

        reader.onload = function (loadEvent) {
            $('.sp-pic .avatar').attr('src', loadEvent.target.result);

            resizeImage(document.getElementById('avatar'), 120, function (dataURI) {

                $('.sp-pic .avatar').attr('src', dataURI);


            });



        }

        reader.readAsDataURL(this.files[0]);
    });



    setInterval(function () {

        if ($('.suggestions')[0] != undefined) {
            $('.suggestions').css('bottom', ($('.search-box').height() + 55) + "px");

        }

    }, 500);
    //$.ajaxSetup({
    //    headers: { 'X-CSRF-Token': tokenValue }
    //});

    //$.connection.hub.url = 'http://localhost:56824/signalr';
    //var myHub = $.connection.chatHub;

    //myHub.client.broadcastMessage = function (data) {
    //  console.log(data);
    //}

    //$.connection.hub.start({ transport: 'longPolling' }).done(function () {

    //    console.log('connected fro qqq');
    //});






    $.support.cors = true;
    $(document).on('click', 'a.external', function (e) {

        e.preventDefault();
        window.open($(this).attr('href'), "_system", "location=yes,enableViewportScale=yes,hidden=no");

    });

    $(document).on("click touchstart", '#fgpassword', function () {

        swal({
            title: "فراموشی رمز عبور !",
            text: "لطفا ایمیل یا شماره موبایل خود را وارد کنید",
            type: "input",
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "ایمیل یا شماره موبایل"
        },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("لطفا ایمیل خود را وارد کنید !");
                    return false;
                }

                $.ajax({
                    url: apiBase + "/manage/auth/ForgotPasswordAjax",
                    type: 'POST',
                    data: { email: inputValue }
                })
                    .done(function (data) {
                        if (data.result)
                            swal("با تشکر", data.msg);
                        else {
                            var error = data.msg;

                            if (Array.isArray(data.msg)) {
                                error = "";
                                $.each(data.msg,
                                    function (index, item) {
                                        error += item + "</br>";
                                    });
                            }
                            swal({ title: "خطا !", text: error, type: "error" });
                        }
                    }).error(function () {
                        swal({ title: "خطا !", text: "ارسال ایمیل/پیامک ناموفق بود لطفا بعدا دوباره تلاش کنید", type: "error" });
                    });

            });
    });

    $(document).on("click touchstart", '#confirmPassword', function () {
        swal({
            title: "فعال سازی اکانت !",
            text: "لطفا ایمیل یا شماره موبایل خود را جهت فعال سازی وارد کنید",
            type: "input",
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "ایمیل یا شماره موبایل"
        },
          function (inputValue) {
              if (inputValue === false) return false;

              if (inputValue === "") {
                  swal.showInputError("لطفا ایمیل خود را وارد کنید !");
                  return false;
              }

              $.ajax({
                  url: apiBase + "/manage/auth/VerifyEmail",
                  type: 'POST',
                  data: { email: inputValue }
              })
                  .done(function (data) {
                      if (data.result)
                          swal("با تشکر", data.msg);
                      else {


                          swal({ title: "خطا !", text: data.msg, type: "error" });
                      }
                  }).error(function () {
                      swal({ title: "خطا !", text: "ارسال ایمیل/پیامک ناموفق بود لطفا بعدا دوباره تلاش کنید", type: "error" });
                  });

          });
    });



});


function splitBy3_core(x) {
    x += '';
    x = x.replace(/ /g, "");
    var isManfi = false;
    if (x.toString().substr(0, 1) == "-") {
        isManfi = true;
        x = x.replace(/-/g, "");
    }

    if (x.length < 3) { var parts = [x]; return parts; }
    var startPos = (x.length % 3);
    var newStr = x.substr(startPos);
    var remainingStr = x.substr(0, startPos);

    var parts = newStr.match(/.{1,3}/g);
    if (remainingStr != '') { var length = parts.unshift(remainingStr); }

    if (isManfi)
        return "-" + parts;

    return parts;

}
function splitBy3() {
    $("span.splitBy3").not('.splited').each(function (index, elem) {
        $(elem).addClass('splited').text(splitBy3_core($(elem).text()));
    });
}

setInterval(function () {

    splitBy3();

}, 1000);











var bazarsooAng = angular.module('bazarsoo', ['ngAnimate', 'ngMaterial', 'ngRoute', 'ngSanitize']);


bazarsooAng.factory('chatHub', function () {

    var authInterceptorServiceFactory = {};



    return authInterceptorServiceFactory;
});

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
function registerHomeController($rootScope, $timeout, $http, $rootScope, $window, $location) {





    $rootScope.goProduct = function (productId) {

        $location.path('/product');
        $location.hash(productId);

    };

    $rootScope.goVitrin = function (vitrinId) {

        $location.path('/home');
        $location.hash(vitrinId);
    };

    var getColumns = function () {

        var columnWidth = 180;

        if ($rootScope.windowWidth <= 380) {
            columnWidth = 160;
        }

        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);


        var eachColumnHeight = _.reduce($rootScope.vitrins, function (memo, item) {

            return memo + item.BlockCount;

        }, 0) / columnCount;


        var columns = []; for (var i = 0; i < columnCount; i++) { columns[i] = []; }

        var cPointer = 0;
        $rootScope.vitrins.forEach(function (item, index) {

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

        if (!$rootScope.vitrin)
            return;


        var products = $rootScope.vitrin.products;

        var columnWidth = 180;
        if ($rootScope.windowWidth <= 380) {
            columnWidth = 160;
        }

        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);

        var columns = []; for (var i = 0; i < columnCount; i++) { columns[i] = []; }

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

        if ($rootScope.vitrins)
            $rootScope.columns = getColumns();

        if ($rootScope.vitrin)
            $rootScope.vitrin.productColumns = getProductColumns();

    });

    $rootScope.goProduct = function (product) {

        $location.path('/product');
        $location.hash(product.rid);

    };


    $rootScope.$watch(function () {
        return $location.hash();
    }, function (newVal) {


        $rootScope.vitrin = $rootScope.getVitrin();
        if ($rootScope.vitrin)
            $rootScope.vitrin.productColumns = getProductColumns();

        $timeout(function () {
            $rootScope.loaded = true;
        });



    });

    $rootScope.getVitrin = function () {
        var model = _.find($rootScope.vitrins, function (item) {
            return item.Id == $location.hash();
        });
        return model;
    };

    $rootScope.columns = getColumns();


}
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

    _getAccount = function () {

        var deferred = $q.defer();


        $http.get(apiBase + '/vitrin/api/account').then(function (res2) {
            if (res2.data.Id) {

                var account = _.extend(JSON.parse(localStorage.getItem('user')), res2.data);

                localStorage.setItem('user', JSON.stringify(account));

            }

            deferred.resolve();

        });

        return deferred.promise;


    };

    var init = function () {

        userServiceFactory = {
            cart: false,
            invoices: false,
            favorites: false,
            findFavorite: false
        };

        var deferred = $q.defer();

        if (!localStorage.user)
            deferred.reject();
        else
            $q.all(
                _getAccount(),
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

    return { init: init };


});

bazarsooAng.factory('authService', ['$http', '$q', function ($http, $q) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };


    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(apiBase + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (res) {

            var account = res.data;
            _authentication.isAuth = true;
            _authentication.userName = account.userName;

            document.cookie = "BearerToken=" + account.access_token + "; path=/";




            localStorage.setItem('user', JSON.stringify(account));

            $http.get(apiBase + '/vitrin/api/account').then(function (res2) {
                if (res2.data.Id) {

                    account = _.extend(account, res2.data);
                    account = _.omit(account, ['UserName', 'PasswordHash']);
                    localStorage.setItem('user', JSON.stringify(account));

                }

                deferred.resolve(res);

            });







        }, function (err, status) {

            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorage.removeItem('user');
        localStorage.removeItem('account');
        document.cookie = "BearerToken=" + '' + "; path=/";
        _authentication.isAuth = false;
        _authentication.userName = "";
        location.reload();
    };

    var _fillAuthData = function () {

        var authData = localStorage.getItem('user');
        if (authData) {
            authData = JSON.parse(authData);
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);

bazarsooAng.filter('orderContacts', function () {

    function myValueFunction(item) {
        return item.timestamp;
    }

    return function (obj) {

        if (obj) {

            var array = [];
            Object.keys(obj).forEach(function (key) {
                // inject key into each object so we can refer to it from the template
                obj[key].name = key;
                array.push(obj[key]);
            });
            // apply a custom sorting function
            array.sort(function (a, b) {
                return myValueFunction(b) - myValueFunction(a);
            });
            return array;
        } else {
            return false;
        }
    };
});

function scrollChat() {

    setTimeout(function () {

        var objDiv = $("#discussion")[0];
        if (objDiv)
            objDiv.scrollTop = 9999;

    }, 100);

};

bazarsooAng.filter('orderChatMessages', function () {

    function myValueFunction(item) {
        return parseInt(item.CreateDate.toString().replace(/\D/g, ''));

    }

    return function (obj) {

        if (obj) {

            var array = [];
            Object.keys(obj).forEach(function (key) {
                // inject key into each object so we can refer to it from the template
                obj[key].name = key;
                array.push(obj[key]);
            });
            // apply a custom sorting function
            array.sort(function (a, b) {
                return myValueFunction(a) - myValueFunction(b);
            });
            return array;
        } else {
            return false;
        }
    };
});


bazarsooAng.run(function ($location, $rootScope, $timeout, $http, $q, $window, userService, authService) {


    if (location.host == "m.bazarsoo.com")
        $http.get('http://bazarsoo.com/contents/application?ajax=true').then(function (res) {

            swal({
                title: '',
                type: 'info',
                html: true,
                text: res.data
            });


        });

    $rootScope.goChat = function (userId, productId) {
        $location.path('/chat');
        $location.hash(userId);
        if (productId)
            $location.search('product', productId)

    };

    $rootScope.goBack = function () {
        console.log('go back', $rootScope.history);
        var hrefToGo = $rootScope.history.splice(-1);

        if (hrefToGo == location.href.toLowerCase())
            return $rootScope.goBack();

        if (hrefToGo == false || $rootScope.history.length == 0) {
            $location.path('/home');
            $location.hash('');

        } else {
            location.href = hrefToGo;
        }


    };
    // registerHomeController($rootScope, $timeout, $http, $rootScope, $window, $location);
    $rootScope.isInFav = function (vid) {

        if (!$rootScope.userService)
            return false;

        return _.findWhere($rootScope.userService.favorites, { VitrinId: vid });

    };

    $rootScope.toggleFav = function (vid) {

        $http.post(apiBase + '/Vitrin/Ui/VitrinAddToFavorit', { vitrinId: vid }).then(function () {


            userService.init().then(function (_userService) {
                $rootScope.userService = _userService;



            }, function () {
            });

        }, function () { });

    };

    $(function () {


        $(document).on('click', ".sp-pic a", function (e) {


            jQuery.ajax({
                url: apiBase + '/vitrin/register/saveAvatar',
                method: 'POST',
                data: {
                    avatar: $('.sp-pic .avatar').attr('src')
                },
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token);
                }
            }).done(function () {


                swal({
                    type: 'success',
                    title: '',
                    text: 'تصویر پروفایل شما ذخیره شد !'
                }, function () {
                    $('.sp-pic a').hide();

                });



                userService.init().then(function (_userService) {
                    $rootScope.userService = _userService;

                }, function () {
                });



            });
        });

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
            $(e.target).on('touchmove mousemove', onMove);
            $(e.target).on('mouseup mouseout touchend', function (e) {
                var vBlock = $(e.target).parents('.v-block');
                vBlock.removeClass('touchstart');
                $('.v-block .more').unbind('mousemove');
                $('.v-block  .icon').removeClass('show');
                $('.v-block').removeClass('transparent');
                clearTimeout(vibTimeout);
                var activeIcon = $('.v-block  .icon.active');
                if (activeIcon.length != 0) {
                    if (activeIcon.hasClass('icon-1')) {
                        window.location.hash = '!/chat#' + vBlock.data('uid');
                    }
                    if (activeIcon.hasClass('icon-2')) {
                        window.location.hash = '!/home#' + vBlock.data('id');
                    }
                    if (activeIcon.hasClass('icon-3')) {

                        $http.post(apiBase + '/Vitrin/Ui/VitrinAddToFavorit', { vitrinId: vBlock.data('id') }).then(function () {


                            userService.init().then(function (_userService) {
                                $rootScope.userService = _userService;

                            }, function () {
                            });

                        }, function () { });


                    }
                }
                $('.v-block  .icon').removeClass('active');
            });
        });
    });


    $rootScope.getUser = function () {

        return JSON.parse(localStorage.getItem('user'));
    };

    function getVitrins() {

        var deferred = $q.defer();
        var lastUpdate = localStorage.getItem("lastVitrinRequest");
        if (!lastUpdate)
            lastUpdate = 1004151373875;

        var duration = moment.duration(moment().diff(parseInt(lastUpdate)));
        var hours = duration.asHours();


        if (hours < 1) {

            var vitrins = _.shuffle(JSON.parse(localStorage.getItem("vitrins")));

            var res = {
                data: vitrins
            };

            deferred.resolve(res);

        } else {

            $http.get(apiBase + '/vitrin/api/vitrins').then(function (res) {

                localStorage.setItem("lastVitrinRequest", Date.now());
                localStorage.setItem("vitrins", JSON.stringify(res.data));

                deferred.resolve(res);

            });

        }


        return deferred.promise;


    }

    getVitrins().then(function (res) {

        $rootScope.vitrins = res.data;

        $rootScope.vitrins.forEach(function (item, index) {
            item.colorId = _.random(1, 5);
        });

        $rootScope.getVitrin = function (id) {

            return _.findWhere($rootScope.vitrins, { Id: id });

        };

        if ($location.path() == "/home") {
            registerHomeController($rootScope, $timeout, $http, $rootScope, $window, $location);
        }

        $timeout(function () {

            $rootScope.loaded = true;

        }, 500);

    });


    $rootScope.apiBase = apiBase;



    $rootScope.contacts = [];
    $rootScope.msgCount = function () {
        return false;
    };

    $http.get(apiBase + '/onlinechat/chat/ContactHistory').then(function (res) {
        // console.log(Array.isArray(res.data));
        if (Array.isArray(res.data)) {

            $rootScope.msgCount = function () {
                return _.reduce(res.data, function (memo, item) { return memo + item.count; }, 0);
            };

            $rootScope.contacts = res.data;

        }

    }, function () {



    });




    var ChatUrl = apiBase + "/signalr";

    //$.connection.hub.logging = true;

    var access_token = '';
    if ($rootScope.getUser())
        access_token = $rootScope.getUser().access_token;

    SignalrConnection = $.hubConnection(ChatUrl, {
        useDefaultPath: false,
        qs: { 'access_token': access_token }
    });

    //if (access_token)
    //    $.ajaxSetup({
    //        headers: { 'Authorization': 'Bearer ' + access_token }
    //    });

    var chub = SignalrConnection.createHubProxy('chatHub');

    chub.on("agreeProductPrice", function (model) {

        console.log("agreeProductPrice", model);

        var agreement = _.findWhere($rootScope.activeContact.agreements, { ID: model.ID });


        //    if (!model.agree) {
        agreement.user1Agree = false;
        agreement.user2Agree = false;
        agreement.count = model.count;
        agreement.price = model.price;


        agreement.total = agreement.count * agreement.price;


        // }

        $timeout(function () {

            $rootScope.$apply();

        });


    });

    chub.on("addAgreement", function (model, fromUserId) {


        if ($rootScope.activeContact.userid == model.user1 || $rootScope.activeContact.userid == model.user2) {




            if (_.findWhere($rootScope.activeContact.agreements, { ID: model.ID }))
                return;

            $http.post(apiBase + '/vitrin/ui/products', { pid: model.productId }).then(function (res2) {

                model.product = res2.data;
                $http.post(apiBase + '/OnlineChat/Chat/DefaultPrice', { pid: model.productId }).then(function (res3) {

                    model.product.defaultPrice = res3.data;

                    if (model.price == 0)
                        model.price = model.product.defaultPrice;

                    if (model.count == 0)
                        model.count = 1;

                    model.total = model.count * model.price;

                    $rootScope.activeContact.agreements.push(model);


                }, function () { });





            }, function () {
            });
            $rootScope.$apply();

        }

    });

    chub.on("deleteAgreement", function (agreeId, fromUserId) {

        console.log('deleteAgreement', agreeId);

        var agreement = _.findWhere($rootScope.activeContact.agreements, { ID: agreeId });
        var index = $rootScope.activeContact.agreements.indexOf(agreement);
        $rootScope.activeContact.agreements.splice(index, 1);
        $rootScope.$apply();

    });

    chub.on("chatDeleted", function (name, contact) {

        console.log('chatDeleted', name, contact);
        swal({
            title: 'توجه',
            text: name + ' تاریخچه گفت و گو را حذف کرد . در صورت نیاز با مدیریت سایت در تماس باشید .',
            type: 'warning'
        });

    });


    chub.on("newInvoice", function () {


        userService.init().then(function (_userService) {
            $rootScope.userService = _userService;
            $rootScope.$apply();
        }, function () {
        });

    });


    chub.on("addedToInvoice", function () {

        userService.init().then(function (_userService) {
            $rootScope.userService = _userService;
            $rootScope.$apply();
        }, function () {
        });

    });

    chub.on("seen", function (GuidId, userId, contactId) {

        console.log('seen', contactId, $rootScope.activeContact.userid == contactId);

        if ($rootScope.activeContact.userid == contactId) {

            $rootScope.activeContact.messages.forEach(function (item) {

                item.Status = 2;

            });

            $rootScope.$apply();
        }


    });


    var lastNotifyTimeout = 0;

    chub.on("broadcastMessage", function (userId, message, username, date, guid) {

   
        if ($location.path() != '/chat') {

            clearTimeout(lastNotifyTimeout);

            lastNotifyTimeout = setTimeout(function () {

                sentNotifications.forEach(function (item, index) {
                    item.close();
                });

                sentNotifications = [];
                $http.get(apiBase + '/onlinechat/chat/ContactHistory').then(function (res) {


                    if (Array.isArray(res.data)) {

                        var _msgCount = _.reduce(res.data, function (memo, item) { return memo + item.count; }, 0);


                        var notification = new Notification('گفت و گوی بر خط بازارسو', {
                            tag: "message_" + _msgCount,
                            body: "شما " + _msgCount + " پیام خوانده نشده دارید !"
                        });

                        notification.onclick = function () {

                            $location.path('/chat');

                        };

                        sentNotifications.push(notification);
                    }


                }, function () {
                });

            }, 2000);



         

        }

        // console.log("broadcastMessage", userId, message, date);

        $http.get(apiBase + '/OnlineChat/Chat/UserArrived');

        var contact = _.findWhere($rootScope.contacts, { userid: userId });

        //  console.log(contact);

        if (contact == undefined)
            contact = {};

        contact.timestamp = Date.now();
        contact.date = date;
        contact.userid = userId;

        if ($rootScope.activeContact.userid != userId)
            contact.count += 1;


        if (!contact)
            if ($rootScope.contacts.push)
                $rootScope.contacts.push(contact);


        if (contact == $rootScope.activeContact) {
            $http.get(apiBase + '/OnlineChat/Chat/Seen?guid=' + message.GuidId);
        }


        message.CreateDate = Date.now();

        if (!contact.messages)
            contact.messages = [];

        contact.messages.push(message);

        scrollChat();

        $rootScope.$apply();


    });



    SignalrConnection.start().done(function (data) {

        console.info("connected to the signalr server");


    }).fail(function (data) {
        console.error("failed in connecting to the signalr server", data);
    });

    angLocation = $location;



    $rootScope._ = _;
    $rootScope.moment = moment;
    $rootScope.windowWidth = window.innerWidth;

    $(window).resize(function () {
        $rootScope.windowWidth = window.innerWidth;
        $rootScope.$apply();
    });

    $rootScope.setLocation = function (path) {


        $location.hash('');
        $location.path(path);

        if (path == 'home')
            $timeout(function () {
                location.reload();
            }, 100);


    };
    $rootScope.location = $location;


    userService.init().then(function (_userService) {
        $rootScope.userService = _userService;
    }, function () { });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        if (!$rootScope.history)
            $rootScope.history = [];

        if ($rootScope.history[$rootScope.history.length - 1] != location.href.toString())
            $rootScope.history.push(location.href.toString());



        console.log($rootScope.history);

        $rootScope.showAuth = false;

        var requireLogin = false;

        $rootScope.user = $rootScope.getUser();

        if ($rootScope.user) {
            var expireIn = $rootScope.user['.expires'];
            var miliSecondToExpire = moment.duration(moment(expireIn).diff())._milliseconds
            if (miliSecondToExpire < 60000) {

                console.log('token expired');
                authService.logOut();

            }

        }

        if (next.templateUrl == "views/home.html") {
            // already going to #login, no redirect needed
            $rootScope.loaded = false;

        }

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


bazarsooAng.controller('authController', function ($scope, $http, $q, $timeout, $rootScope, $location, authService) {

    $scope.loginModel = {};
    $scope.registerModel = {
        isAjax: true,
        inapp: true
    };

    $scope.message = "";

    $scope.register = function () {

        $rootScope.loaded = false;


        $http.post(apiBase + '/manage/auth/register', $scope.registerModel).then(function (res) {

            $rootScope.loaded = true;


            if (res.data.length == 0) {

                swal({
                    title: "ثبت نام شما با موفقیت انجام شد. !",
                    text: "لینک فعال سازی حساب کاربری شما به ایمیل وارد شده ارسال گردید. لطفا فعال کردن حساب کاربری خود بر روی آن کلیک نمایید.",
                    type: "success",
                    showConfirmButton: false
                });

                $timeout(function () {

                    $location.path('account');
                    location.reload();

                }, 5000);

            } else {

                var ul = $("<ul />");
                res.data.forEach(function (err, index) {
                    ul.append($("<li />").text(err));
                });

                swal({
                    title: "",
                    text: ul.html(),
                    type: 'warning',
                    html: true
                });

            }


        }, function (res) {

            $rootScope.loaded = true;
        });

    };

    $scope.login = function () {

        authService.login($scope.loginModel).then(function (res) {

            location.reload();

        },
         function (err) {
             $scope.error = err;

             $timeout(function () {
                 $scope.error = "";
             }, 3000);

         });
    };

});

bazarsooAng.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);


bazarsooAng.controller('searchController', function ($scope, $location, $mdConstant, $timeout, $q, $http, $rootScope, $window) {

    $scope.keys = [$mdConstant.KEY_CODE.ENTER];
    $scope.searchWords = [];
    $scope.searchMode = 'products';

    var getColumns = function () {

        var columnWidth = 180;

        if ($rootScope.windowWidth <= 380) {
            columnWidth = 160;
        }

        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);


        var eachColumnHeight = _.reduce($scope.searchVitrins, function (memo, item) {

            return memo + item.BlockCount;

        }, 0) / columnCount;


        var columns = []; for (var i = 0; i < columnCount; i++) { columns[i] = []; }

        var cPointer = 0;
        $scope.searchVitrins.forEach(function (item, index) {

            if (!columns[cPointer])
                columns[cPointer] = [];



            columns[cPointer].push(item);

            if (cPointer < columnCount - 1) {

                cPointer++;

            } else {
                cPointer = 0;

            }


        });


        if (!columns[0])
            return [];


        return columns;



    };
    var getProductColumns = function () {

        if (!$scope.products)
            return;

        var products = $scope.products;

        var columnWidth = 180;
        if ($rootScope.windowWidth <= 380) {
            columnWidth = 160;
        }

        var columnCount = Math.floor($rootScope.windowWidth / columnWidth);

        var columns = []; for (var i = 0; i < columnCount; i++) { columns[i] = []; }

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

        if ($scope.products)
            $scope.productColumns = getProductColumns();

        if ($scope.searchVitrins)
            $scope.columns = getColumns();

    });

    $scope.goProduct = function (product) {

        $location.path('/product');
        $location.hash(product.rid);

    };


    $scope.goVitrin = function (vitrinId) {

        $location.path('/home');
        $location.hash(vitrinId);
    };


    $scope.$watch('vitrinInput', function (term) {



        $http.get(apiBase + '/vitrin/api/vitrins?term=' + term).then(function (res) {
            $scope.searchVitrins = [];
            $scope.searchVitrins = res.data;
            $scope.columns = getColumns();

        }, function () {

        });

    }, true);

    $scope.vitrinInput = ' ';

    $scope.$watch('searchWords', function (searchWords) {

        $('input[type=search]').blur();

        $scope.suggestions = false;
        $scope.products = [];

        if (searchWords != '')
            $http.post(apiBase + '/vitrin/ui/searchProducts?suggestions=true&term=' + searchWords).then(function (res) {

                $scope.suggestions = res.data;

            }, function () {

            });


        $http.get(apiBase + '/vitrin/ui/searchProducts?json=true&term=' + searchWords).then(function (res) {


            $http.post(apiBase + '/vitrin/ui/products', { pids: res.data.Result }).then(function (res2) {

                res2.data.forEach(function (product, index) {

                    if (!_.findWhere($scope.products, { rid: product.rid }))
                        $scope.products.push(product);

                });

                $scope.productColumns = getProductColumns();

            }, function () {

            });

        }, function () {

        });

    }, true);


});



bazarsooAng.controller('chatController', function ($scope, $http, $timeout, $q, $rootScope, $window, $location) {

    sentNotifications.forEach(function (item, index) {

        item.close();

    });
    sentNotifications = [];

    $scope.calcPriceFields = function (item, field) {

        // console.log(item, field);

        if (parseInt(item.count) <= 0)
            item.count = 1;

        if (field == 'total') {

            item.price = parseInt(item.total / item.count);

        } else {
            item.total = item.count * item.price;
        }


    };


    $scope.deleteChat = function () {

        swal({
            title: "حذف گفت و گو",
            text: "در صورت تایید کلیه تاریخچه گفت و گوی شما با کاربر فعلی حذف می شود .", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "تایید",
            cancelButtonText: "انصراف",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {

                var index = $rootScope.contacts.indexOf($rootScope.activeContact);
                $rootScope.contacts.splice(index, 1);
                var contact = $rootScope.activeContact.userid;
                $rootScope.activeContact = false;

                $location.hash('');

                $rootScope.$apply();

                jQuery.ajax({
                    url: apiBase + '/onlinechat/chat/deleteChat',
                    data: {
                        contact: contact
                    },
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + $rootScope.getUser().access_token);
                    }
                });




            }
        });


    };

    $scope.blockChat = function () {

        swal({
            title: "مسدود سازی کاربر",
            text: "در صورت تایید کاربر مسدود میشود .", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "تایید",
            cancelButtonText: "انصراف",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {

                jQuery.ajax({
                    url: apiBase + '/onlinechat/chat/BlockChat',
                    data: {
                        contact: $rootScope.activeContact.userid
                    },
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + $rootScope.getUser().access_token);
                    }
                }).done(function () {
                    var index = $rootScope.contacts.indexOf($rootScope.activeContact);


                    $rootScope.contacts.splice(index, 1);
                    $rootScope.activeContact = false;

                    $rootScope.$apply();
                });


                //$.get(apiBase + '/onlinechat/chat/BlockChat', {
                //    contact: $rootScope.activeContact.userid
                //}, {
                //    beforeSend: function (xhr, settings) {
                //        xhr.setRequestHeader('Authorization', 'Bearer ' + $rootScope.getUser().access_token);
                //    }
                //}, function () {



                //});



            }
        });
    };

    $scope.reportChat = function () {


        swal({
            title: "گزارش سوء استفاده",
            text: "لطفا توضیحات خود را بنویسید .",
            type: "input",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "تایید",
            cancelButtonText: "انصراف",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (input) {
            if (input) {

                jQuery.ajax({
                    method: 'post',
                    url: apiBase + '/onlinechat/chat/reportchat',
                    data: {
                        contact: $rootScope.activeContact.userid,
                        report: input
                    },
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + $rootScope.getUser().access_token);
                    }
                }).done(function () {
                    swal('گزارش شما ثبت گردید .', 'شماره پیگیری : ' + res.data, 'success');

                });


                //$http.post(apiBase + '/onlinechat/chat/reportchat', {
                //    contact: $rootScope.activeContact.userid,
                //    report: input
                //}).then(function (res) {

                //    swal('گزارش شما ثبت گردید .', 'شماره پیگیری : ' + res.data, 'success');

                //}, function () { });



            }
        });


    };

    $scope.agreementWaiting = function (agrm) {

        var cuserId = $rootScope.getUser().Id;

        if (agrm.user2Agree > agrm.user1Agree && agrm.user2 == cuserId)
            return true;

        if (agrm.user1Agree > agrm.user2Agree && agrm.user1 == cuserId)
            return true;

        return false;







    };
    //setTimeout(function () {
    //    window.open('http://192.168.2.200:9090/vitrin/ui/pay?id=10021', "_system", "location=yes,enableViewportScale=yes,hidden=no");
    //}, 500);

    $scope.isInAgreements = function (product) {

        return _.findWhere($rootScope.activeContact.agreements, { productId: product.rid });

    };
    $scope.agreePrice = function (agreement) {

        if (agreement.user1 == $rootScope.getUser().Id)
            agreement.user1Agree = true;
        else
            agreement.user2Agree = true;

        agreement.contact = $rootScope.activeContact.userid;

        $http.post(apiBase + "/OnlineChat/Chat/AgreeProductPrice", agreement).then(function () {



        }, function () { });

    };
    $scope.refreshAgreemnet = function (agreement) {

        $scope.chooseProduct(agreement.product).then(function () {

            $scope.chooseProduct(agreement.product);

        });

    };




    $scope.chooseProduct = function (product) {

        var deferred = $q.defer();


        var agreement = _.findWhere($rootScope.activeContact.agreements, { productId: product.rid });

        if (agreement) {
            // console.log(agreement.ID);
            $http.post(apiBase + "/OnlineChat/Chat/DeletePriceAgreement", {
                ID: agreement.ID
            }).then(function () {

                var index = $rootScope.activeContact.agreements.indexOf(agreement);
                $rootScope.activeContact.agreements.splice(index, 1);



                setTimeout(function () {
                    deferred.resolve();
                    $rootScope.$apply();
                    scrollChat();
                });


            });


        } else {


            $http.post(apiBase + '/OnlineChat/Chat/ChatProductPrice', {
                contact: $rootScope.activeContact.userid,
                productId: product.rid,
                price: 0,
                count: 0
            }).then(function (res) {

                $http.post(apiBase + '/OnlineChat/Chat/DefaultPrice', { pid: product.rid }).then(function (res3) {

                    product.defaultPrice = res3.data;
                    var agreement = {
                        ID: res.data,
                        user1: $rootScope.getUser().Id,
                        user1Agree: false,
                        user2: $rootScope.activeContact.userid,
                        user2Agree: false,
                        productId: product.rid,
                        product: product,
                        count: 1,
                        price: product.defaultPrice
                    };


                    $rootScope.activeContact.agreements.push(agreement);
                    $scope.showChoose = false;

                    setTimeout(function () {
                        deferred.resolve();

                        $rootScope.$apply();
                        scrollChat();
                    }, 200);

                });




            }, function () {
                alert('err');
            });


        }

        return deferred.promise;
    };




    $scope.attach = function () {

        console.log($scope.attachFile);

    };

    $timeout(function () {

        $rootScope.$watch(function () {
            return $location.hash();
        }, function (newVal) {

            if (!newVal || newVal.length < 20)
                $rootScope.activeContact = false;
            else {

                if (!$rootScope.contacts.push)
                    return;

                var userId = newVal;

                var contact = _.findWhere($rootScope.contacts, { userid: userId });

                if (contact == undefined)
                    contact = {};

                contact.timestamp = Date.now();
                contact.userid = userId;
                contact.count = 0;
                contact.messages = [];



                if (!_.findWhere($rootScope.contacts, { userid: userId }))

                    $rootScope.contacts.push(contact);




                $rootScope.activeContact = contact;


                $http.get(apiBase + '/onlinechat/chat/getFullName?uid=' + contact.userid).then(function (res) {

                    contact.username = res.data;
                    $rootScope.activeContact.userName = res.data;

                }, function () { });


                $http.get(apiBase + '/onlinechat/chat/GetHistory?userid=' + newVal).then(function (res) {

                    $rootScope.activeContact.messages = JSON.parse(JSON.stringify(res.data).replace(/\/Date/g, "\\\/Date").replace(/\)\//g, "\)\\\/"));
                    $rootScope.activeContact.count = 0;
                    scrollChat();


                    $http.post(apiBase + '/vitrin/ui/products', { uid: newVal }).then(function (res2) {



                        $rootScope.activeContact.products = res2.data;
                        //$rootScope.activeContact.products.forEach(function (item, index) {


                        //    $http.post(apiBase + '/OnlineChat/Chat/DefaultPrice', { pid: item.rid }).then(function (res3) {
                        //        item.defaultPrice = res3.data;
                        //    });

                        //});



                    });
                    $http.get(apiBase + '/onlinechat/chat/GetProductPriceHistory?contact=' + newVal).then(function (res2) {

                        $rootScope.activeContact.agreements = res2.data;
                        if ($rootScope.activeContact.agreements)
                            $rootScope.activeContact.agreements.forEach(function (item, index) {

                                $http.post(apiBase + '/vitrin/ui/products', { uid: newVal, pid: item.productId }).then(function (res2) {

                                    item.product = res2.data;
                                    $http.post(apiBase + '/OnlineChat/Chat/DefaultPrice', { pid: item.productId }).then(function (res3) {

                                        item.product.defaultPrice = res3.data;

                                        if (item.price == 0)
                                            item.price = item.product.defaultPrice;

                                        if (item.count == 0)
                                            item.count = 1;

                                        $scope.calcPriceFields(item, '');



                                    }, function () { });





                                }, function () {
                                });

                            });


                        if ($location.search()) {

                            if ($location.search().product) {

                                $scope.chooseProduct({ rid: $location.search().product });
                                $location.search('product', '');



                            }

                        }

                    });


                }, function () {

                });

            }


        }, function () {

        });

    }, 500);

    $scope.isImage = function (fileName) {

        var imgExtensions = ["jpg", "png", "tif", "gif", "jpeg"];

        return imgExtensions.indexOf(fileName.split('.')[fileName.split('.').length - 1]) != -1;

    };

    $scope.sendMessage = function () {


        if (!$scope.input)
            return;



        var contact = _.findWhere($rootScope.contacts, { userid: $rootScope.activeContact.userid });

        console.log('contact', $rootScope.contacts, $rootScope.activeContact.userid);

        $http.post(apiBase + '/OnlineChat/Chat/SendMsg', {
            userId: contact.userid,
            message: $scope.input
        }).then(function (res) {

            contact.timestamp = Date.now();
            console.log(res.data);

            $rootScope.activeContact.messages.push({
                FromUserId: $rootScope.getUser().id,
                Status: 3,
                GuidId: res.data,
                MessageDescrp: $scope.input,
                CreateDate: Date.now()
            });



            setTimeout(function () {
                $scope.input = '';
                $scope.$apply();
                scrollChat();
            });


        }, function () {
        });

    };


    $(document).on('change', '#attach-file', function (e) {

        var file = this.files[0];

        var allowedAttachExtensions = ["jpg", "png", "jpeg", "doc", "pdf", "docx", "xls", "xlsx", "tif", "gif"];

        var fileExt = $(file.name.split('.')).last()[0].toLowerCase();

        if (allowedAttachExtensions.indexOf(fileExt) == -1) {
            swal({
                title: 'فایل غیر مجاز',
                text: 'کاربر گرامی تنها فایل های تصویری , Word و Excel قابل آپلود هستند .',
                type: 'warning'
            });

            return;
        }


        var sizeInKB = parseFloat((file.size / 1024).toFixed(2));
        var MaximumFileInMB = 10;
        if (sizeInKB > 1024 * MaximumFileInMB) {
            swal({
                title: 'حجم غیر مجاز',
                text: 'حجم فایل انتخاب شده بیشتر از ' + MaximumFileInMB + ' مگابایت می باشد .',
                type: 'warning'
            });
        } else {

            var confirmText = $('<div />')
                                .append($('<p />').text('آیا از ارسال این فایل اطمینان دارید ؟'));



            var reader = new FileReader();

            reader.onload = function (e) {

                if (file.type.startsWith('image/'))
                    confirmText.append($('<img class="swal-file-attach-confirm" />').attr('src', e.target.result));

                confirmText
                    .append($('<div />')
                    .text('نام فایل : ')
                    .append($('<label class="swal-file-name" />').text(file.name)));



                swal({
                    title: 'تایید فایل',
                    text: confirmText.html(),
                    html: true,
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonColor: "#3498db",
                    cancelButtonText: 'انصراف',
                    confirmButtonText: "بله !",
                    closeOnConfirm: true
                },
                   function (isConfirm) {
                       if (isConfirm) {

                           var dataToSend = new FormData();
                           dataToSend.append("image", file);
                           dataToSend.append("uid", $rootScope.activeContact.userid);

                           jQuery.ajax({
                               url: apiBase + "/OnlineChat/Chat/AttachFile",
                               type: 'POST',
                               data: dataToSend,
                               cache: false,
                               processData: false,
                               contentType: false,
                               beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + $rootScope.getUser().access_token); },
                               success: function (model) {


                                   if (model.result == "success") {

                                       console.log(model.URL);

                                       $rootScope.activeContact.messages.push({
                                           FromUserId: $rootScope.getUser().id,
                                           Status: 3,
                                           FileAttachmentUrl: model.URL,
                                           CreateDate: Date.now()
                                       });


                                       setTimeout(function () {

                                           $rootScope.$apply();
                                           scrollChat();
                                       });



                                       scrollChat();


                                   }

                               }

                           });

                       }
                   });

            };

            reader.readAsDataURL(file);



        }


    });

});





bazarsooAng.controller('accountController', function ($scope, $timeout, $http, userService, $rootScope, $location, $window, authService) {

    $scope.user = $rootScope.getUser();
    if (!$scope.user)
        return;

    $scope.addressBlocks = ["استان", "شهر", "خیابان اصلی", "خیابان فرعی", "کوچه", "پلاک", "طبقه", "واحد", "توضیحات آدرس"];


    if ($scope.user.Address)
        $scope.user.addressBlocks = $scope.user.Address.split('_');
    else {
        $scope.user.addressBlocks = [];

        $scope.addressBlocks.forEach(function (item, index) {
            $scope.user.addressBlocks.push(' ');

        });
    }
    // changePw


    $scope.changePw = function (pwModel) {

        $http.post(apiBase + '/manage/manage/ChangePswd', pwModel).then(function (res) {
            var model = res.data;

            if (model.result) {


                swal({
                    title: "تغییر رمز",
                    text: model.value,
                    type: "success"
                }, function () {


                });

            } else {

                swal({
                    title: "تغییر رمز",
                    html: true,
                    text: model.value,
                    type: "error"
                });
            }

        });

    };

    $scope.saveProfile = function (user) {

        $http.post(apiBase + '/vitrin/register/personalInformation', user).then(function (res) {
            var model = res.data;

            if (model.result) {


                swal({
                    title: "تکمیل پروفایل",
                    text: model.value,
                    type: "success"
                }, function () {

                    $http.get(apiBase + '/vitrin/api/account').then(function (res2) {

                        if (res2.data.Id) {

                            var userToSave = _.omit($rootScope.getUser(), _.keys(res2.data));


                            userToSave = _.extend(userToSave, res2.data);
                            userToSave = _.omit(userToSave, ['UserName', 'PasswordHash']);

                            localStorage.setItem('user', JSON.stringify(userToSave));

                        }



                    });


                });

            } else {

                swal({
                    title: "تکمیل پروفایل",
                    html: true,
                    text: model.value.join('<br />'),
                    type: "error"
                });
            }

        });

    };

    $scope.$watch('gender', function (newVal) {
        if (newVal)
            $scope.user.Gender = newVal.split(':')[1];
    });

    $scope.$watch('user.addressBlocks', function (newVal) {
        //   console.log(newVal);

        if (newVal) {
            $scope.user.Address = '';

            $scope.addressBlocks.forEach(function (item, index) {
                value = "";
                //   console.log(index, $scope.user.addressBlocks[index]);
                if ($scope.user.addressBlocks[index])
                    value = $scope.user.addressBlocks[index];

                $scope.user.Address += value + '_';

            });



        }

    }, true);


    if ($scope.user.BirthDate) {

        $scope.user.year = parseInt($scope.user.BirthDate.substr(0, 4));
        $scope.user.month = parseInt($scope.user.BirthDate.substr(4, 2));
        $scope.user.day = parseInt($scope.user.BirthDate.substr(6, 2));
    }

    $scope.goProduct = function (productId) {

        $location.path('/product');
        $location.hash(productId);

    };

    $scope.goVitrin = function (vitrinId) {

        $location.path('/home');
        $location.hash(vitrinId);
    };

    $scope.getInvoices = function () {

        $http.get(apiBase + '/vitrin/ui/ajax_invoices?hideButtons=false').then(function (res) {
            $scope.invoices = res.data;

        }, function () { });

    };

    $scope.getInvoices();

    $scope.logout = function () {
        authService.logOut();
        $location.path('home');
    };


    $scope.getProduct = function (rid) {

        var products = _.flatten(_.map($rootScope.vitrins, function (item) {
            return item.products;
        }));

        return _.findWhere(products, { rid: rid });

    };

    $scope.getVitrin = function (vid) {
        return _.findWhere($rootScope.vitrins, { Id: vid });

    };
    //refresh-invoices

    $(document).on("click", ".refresh-invoices", function () {

        $scope.getInvoices();

    });

    $(document).on("click touchstart", "table.invoiceitem-summery .remove-item", function () {

        event.preventDefault();
        var tr = $(this).parents("tr");
        var rowId = tr.find('.id').text().trim();

        swal({
            title: "آیا نسبت به حذف این ردیف اطمینان دارید ؟",
            text: "عملیات برگشت ناپذیر خواهد بود .", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله ! مطمئن هستم ",
            cancelButtonText: "خیر ! انصراف ",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {

            //if (isConfirm)
            //    $.get('/vitrin/ui/removeInvoiceItem', { id: rowId }, function (resp) {
            //        if (resp == "OK")
            //            tr.remove();

            //        $('a.refresh-invoices').trigger("click");
            //    });

            if (isConfirm)
                $http.get(apiBase + '/vitrin/ui/removeInvoiceItem?id=' + rowId).then(function () {

                    userService.init().then(function (_userService) {
                        $rootScope.userService = _userService;

                        $timeout(function () {
                            $rootScope.$apply();
                            $scope.getInvoices();
                        });

                    }, function () {
                    });



                });


        });


    });

    $scope.removeCart = function (cart) {

        $http.get(apiBase + '/vitrin/ui/RemoveFromCart?ajax=true&cid=' + cart.Id).then(function (res) {


            userService.init().then(function (_userService) {
                $rootScope.userService = _userService;
                $rootScope.$apply();

            }, function () {
            });

        }, function () { });
    };

    $scope.removeFav = function (fav) {

        $http.get(apiBase + '/vitrin/ui/RemoveFavVitrin?vid=' + fav.VitrinId).then(function (res) {

            userService.init().then(function (_userService) {
                $rootScope.userService = _userService;
            }, function () { });

        }, function () { });
    };
});


bazarsooAng.controller('homeController', function ($scope, $timeout, $http, $rootScope, $window, $location) {


});
bazarsooAng.controller('productController', function (userService, $scope, $timeout, $http, $rootScope, $window, $location) {

    $scope.isInCart = function (rid) {

        return _.findWhere($rootScope.userService.cart, { ProductId: rid });

    };

    $scope.goVitrin = function (vitrinId) {

        $location.path('/home');
        $location.hash(vitrinId);
    };


    $scope.addCart = function (pid) {

        $http.get(apiBase + '/vitrin/ui/AddToCart?pid=' + pid).then(function (res) {


            userService.init().then(function (_userService) {
                $rootScope.userService = _userService;

                $timeout(function () {
                    $rootScope.$apply();
                }, 10);
            }, function () {
            });



        });

    };




    $rootScope.$watch(function () {
        return $location.hash();
    }, function (newVal) {

        $http.get(apiBase + '/vitrin/ui/product?ajax=true&mobile=true&rid=' + newVal).then(function (res) {

            $scope.productView = res.data;

            $http.post(apiBase + '/vitrin/ui/products', { pid: newVal }).then(function (res2) {
                $scope.product = res2.data;
            });

        }, function () {

        });

    });

});


