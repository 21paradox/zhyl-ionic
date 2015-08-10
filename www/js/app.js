// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('zhyl', ['ionic', 'zhyl.controllers', 'zhyl.services', 'zhyl.captcha', 'toaster'])


  .config(['$httpProvider', function ($httpProvider) {
       
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

  }])


  .run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
           cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      
      if (window.StatusBar) {
            // webView 在状态栏下面
          //StatusBar.overlaysWebView(false);

          // 配合iframe的header颜色
         // StatusBar.styleLightContent();
          StatusBar.backgroundColorByHexString("#387ef5;");
          StatusBar.overlaysWebView(true);
      }
  
    });
  
  
    // 第三方登录配置信息
    var AK = 'ZusobXS8IsrXqnprYgmTlOQ3';

    // 初始化 frontia
    baidu.frontia.init(AK);
 

    baidu.frontia.social.setLoginCallback({
      success: function (user) {
        console.log('success');
        $rootScope.$broadcast('login');
      },
      error: function (error) {
        console.log('error');
        console.log(error)
      }
    });

  
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

    // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.newsdetail', {
        url: '/news/:newsIndex',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-newsdetail.html',
            controller: 'NewsDetailCtrl'
          }
        }
      })

      .state('tab.order', {
        url: '/order',
        views: {
          'tab-order': {
            templateUrl: 'templates/tab-order.html',
            controller: 'OrderCtrl'
          }
        }
      })

      .state('tab.orderWithData', {
        url: '/orderWithData/{service_id}',
        views: {
          'tab-order': {
            templateUrl: 'templates/tab-order.html',
            controller: 'OrderCtrl'
          }
        }
      })



      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'templates/tab-map.html',
            controller: 'MapCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account?login',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })


      .state('tab.accountEdit', {
        url: '/accountEdit',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account-edit.html',
            controller: 'AccountEditCtrl'
          }
        }
      })
      
       .state('tab.orderList', {
        url: '/orderList',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-order-list.html',
            controller: 'orderListCtrl'
          }
        }
      });
  
   

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
