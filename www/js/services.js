angular.module('zhyl.services', [])

  .factory('dataService', ['$http', '$q', function ($http, $q) {


    var current = new Date().getTime();
    var dataService = {};

    //把所有接口的http://admin.sx96345.com替换成http://218.244.139.213:9000，这是测试用的服务器

    var baseUrl;
    var debug = document.cookie.replace(/(?:(?:^|.*;\s*)debug\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (debug) {
      baseUrl = 'http://218.244.139.213:9000';
    } else {
      baseUrl = 'http://admin.sx96345.com';
    }
    baseUrl = 'http://218.244.139.213:9000';

    dataService.services = function () {

      return $http({
        url: baseUrl + '/sx_pension_app/services',
        method: 'GET',
        params: { noCache: current },
        cache: true,
        responseType: 'json'
      });
    };
  
    //1、服务列表
    //请求链接：http://admin.sx96345.com/sx_app_servers/services
    //参数：无
    //返回结果：
    // [{
    //     "data_config_id":1,
    //     "data_config_name":"服务分类名",
    //     "services":
    //      [{
    //          "service_id":1,
    //          "service_name":"服务名"
    //      },
    //       ...
    //      ]
    // },
    //   ...
    //]

    dataService.getAllservices = function () {

      return $http({
        url: baseUrl + '/sx_app_servers/services',
        method: 'GET',
        params: { noCache: current },
        cache: true,
        responseType: 'json'
      });
    };
  
  
    //3、新闻列表数据
    //请求链接：http://admin.sx96345.com/sx_app_servers/new_list
    //参数：无
    //返回结果：
    // [{
    //     "new_id":4,
    //     "title":"标题",
    //     "image_url":"/system/n_photos/4/original/4.n_photo",
    //     "content":"新闻内容"
    // },
    //   ...
    //]

    dataService.new_list = function () {

      return $http({
        url: baseUrl + '/sx_pension_app/new_list',
        method: 'GET',
        params: { noCache: current },
        cache: true,
        responseType: 'json'
      });
    };


    var cache = {};

    dataService.cache = cache;

    // 获取手机号码和地址 用户信息, 根据 百度登陆的 socialId
    dataService.getAccountInfo = function (accountId) {

      if (cache.accountId) {
        var deferred = $q.defer();
        deferred.resolve(cache.accountId);
        return deferred.promise;
      }

      return $http({
        method: 'POST',
        url: baseUrl + '/sx_app_servers/third_login',
        data: { social_id: accountId },
        responseType: 'json'
      })

        .then(function (response) {

          dataService.user = response.data;
          cache.accountId = response.data;
          return response.data;
        });

    };
    
 
  
    //var lock = false;
    dataService.updateAccountInfo = function (id, accountId, name, phone, address) {

      return $http({
        url: baseUrl + '/sx_app_servers/update_user',
        method: 'POST',
        data: {
          id: id,
          name: name,
          telephone: phone,
          address: address
        },
        responseType: 'json'
      });

    };


    dataService.order = function (config) {
      // return $http.post(baseUrl + '/sx_app_servers/save_order', {
      //    order: config
      // });
       
      return $http({
        url: baseUrl + '/sx_app_servers/save_order',
        method: 'POST',
        data: {
          order: config
        },
        responseType: 'json'
      });
    };


    dataService.getOrders = function (id) {

      return $http({
        url: baseUrl + '/sx_app_servers/order_list',
        method: 'GET',
        params: { noCache: new Date().getTime(), user_id: id },
        cache: false,
        responseType: 'json'
      });
    }
    
     // 地址
     dataService.getLocation = function () {

        return $http({
          url: baseUrl + '/sx_pension_app/care_centers',
          method: 'GET',
          cache: false,
          responseType: 'json'
        });
    }
     

    return dataService;

  }]);
