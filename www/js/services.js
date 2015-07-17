angular.module('zhyl.services', [])

  .factory('dataService', ['$http', function ($http) {


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

    var dataService = {};

    dataService.services = function () {

      return $http({
        url: baseUrl + '/sx_pension_app/services',
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: { social_id: accountId },
        responseType: 'json'
      })

        .then(function (response) {

          dataService.user = response.data;
          cache.accountId = response.data;
          return response.data;
        });
        
    };
    




    return  dataService;
  
  }]);
