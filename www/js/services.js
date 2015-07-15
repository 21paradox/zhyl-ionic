angular.module('zhyl.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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
        url: baseUrl + '/sx_app_servers/new_list',
        method: 'GET',
        params: { noCache: current },
        cache: true,
        responseType: 'json'
      });
    };

    return  dataService;

  }]);
