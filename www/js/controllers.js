angular.module('zhyl.controllers', ['zhyl.services', 'zhyl.captcha'])

    .config(['$sceProvider', function ($sceProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects.
        $sceProvider.enabled(false);
    }])

    .controller('DashCtrl', ['$scope', 'dataService', '$location', function ($scope, dataService, $location) {

        $scope.slideHasChanged = function () {

        };

        dataService.new_list().success(function (d) {
            var data = angular.copy(d);

            data.forEach(function (val) {

                val.content = val.content.replace(/<img[^>]+src="?([^"\s]+)"?\s*\/>/g, function (a, imgUrl) {
                    if (imgUrl) {
                        return '<img src = "http://images.weserv.nl/?url=admin.sx96345.com' + imgUrl + '&w=280">';
                    }
                });

                val.content = val.content.replace(/&nbsp;/g, '');
                val.image_url = 'http://7xijqe.com1.z0.glb.clouddn.com/img/upload/' + encodeURIComponent(encodeURIComponent(val.image_url));
            });

            $scope.new_list = data; // data.reverse();
        });
        
        
        dataService.services().success(function(d){
           
           
           console.log(d);
            
        });
        
        $scope.goto = function (path) {
            $location.path(path);
        }


    }])


    .controller('NewsDetailCtrl', ['$scope', '$stateParams', 'dataService',
        function ($scope, $stateParams, dataService) {



            var news_index = $stateParams.newsIndex || 0;

            dataService.new_list().success(function (data) {

                var val = angular.copy(data[news_index]);

                val.content = val.content.replace(/<img[^>]+src="?([^"\s]+)"?\s*\/>/g, function (a, imgUrl) {
                    if (imgUrl) {
                        return '<img src = "http://images.weserv.nl/?url=admin.sx96345.com' + imgUrl + '&w=280">';
                    }
                });

                val.content = val.content.replace(/&nbsp;/g, '');
                val.image_url = 'http://7xijqe.com1.z0.glb.clouddn.com/img/upload/' + encodeURIComponent(encodeURIComponent(val.image_url));

                $scope.title = val.title;
                $scope.imgUrl = val.image_url;
                $scope.content = val.content;
            });

        }])



    .controller('OrderCtrl', ['$scope', '$stateParams', 'dataService', 'captcha', '$timeout',  'toaster', '$location'
        , function ($scope, $stateParams, dataService, captcha, $timeout, toastr, $location) {
    
    
            // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function generateCaptcha(captchaNum) {
                
                var i = document.querySelectorAll('.checkcode-img').length;
                
                captcha({
                    context: document.querySelectorAll('.checkcode-img')[i-1].getContext('2d'),
                    style: '#0208fc',
                    text: captchaNum
                });
            }


            $scope.captchaNum = getRandomInt(5000, 9999).toString();

 


            $timeout(function () {
                generateCaptcha($scope.captchaNum);
            });

            $scope.changeCaptcha = function () {

                var num = getRandomInt(5000, 9999).toString();
                $scope.captchaNum = num;
                generateCaptcha(num);
            };

            $scope.curService = null;

 
            dataService.services().success(function (data) {
                
                $scope.services = data;

                data.forEach(function (val) {
                    if (val.service_id == $stateParams.service_id) {
                        $scope.curService = val;
                    }
                });
            });
     

            // 获取当前用户
            var user = baidu.frontia.getCurrentAccount();
            var isLogined = false;

            if (user && user.getType() === 'user') {
                isLogined = true;

                dataService.getAccountInfo(user.accountId).then(function (data) {
                    $scope.tel = data.telephone;
                    $scope.name = data.name;
                    $scope.street = data.address;
                });


            } else {
                toastr.warning('请切换到个人中心登录', '您还未登录', { timeOut: null });
            }

            $scope.$on('$destroy', function () {
                toastr.clear();
            });

            $scope.submit = function () {

                if (!isLogined) {
                    $location.path('/tab/account');
                    return;
                }
               
                if (!$scope.curService ) {
                    toastr.error('请选择服务类型');
                    return;
                }

                if (!$scope.tel) {
                    toastr.error('请输入联系电话');
                    return;
                }

                if (!$scope.name) {
                    toastr.error('请输入您的真实姓名');
                    return;
                }

                if (!$scope.street) {
                    toastr.error('请输入地址');
                    return;
                }

                if ($scope.checkcode != $scope.captchaNum) {
                    toastr.error('验证码不正确')
                    return;
                }

                toastr.info('开始下单...');

                return dataService.getAccountInfo(user.accountId)

                    .then(function (data) {

                        return dataService.order({
                            user_id: data.id,
                            service_id: $scope.curService.service_id,
                            linkphone: $scope.tel,
                            linkman: $scope.name,
                            address: $scope.street,
                            note: $scope.additional || '未填写'
                        })

                            .then(function (response) {

                                if (response.data.flag === true) {

                                    toastr.clear();
                                    toastr.success('订单保存成功！');

                                    $timeout(function () {
                                        $location.path('/view5.orders');
                                    }, 400);

                                }

                            });

                    });
                }

            }])
            
            


    .controller('MapCtrl', ['$scope', function ($scope) {

        $script(['http://api.map.baidu.com/getscript?v=2.0&ak=ZusobXS8IsrXqnprYgmTlOQ3&services'], function () {

            var map = new BMap.Map("allmap");
            var point = new BMap.Point(120.564651,30.012551);

            map.centerAndZoom(point, 12);
            window.map = map;

            var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT });// 左上角，添加比例尺
            var top_left_navigation = new BMap.NavigationControl();

            map.addControl(top_left_control);
            map.addControl(top_left_navigation);

            // http://admin.sx96345.com/sx_pension_app/care_centers
            // 目前 写死 
            // 去 http://api.map.baidu.com/lbsapi/getpoint/ 转化

             

            [
                [120.553651,30.012551, '绍兴市社会福利中心愉康苑'],
                [120.597965,29.962141, '绍兴市社会福利院']
                
                ].forEach(function (value) {

                var x =value[0];
                var y = value[1];

                var point = new BMap.Point(x, y);

                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);              // 将标注添加到地图中
        
                var label = new BMap.Label(value[2], { offset: new BMap.Size(0, 0) });
                marker.setLabel(label);

            });

        });


    }])


    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })



    .controller('AccountCtrl', function ($scope, $stateParams, $location, dataService, $ionicLoading) {

        var uri = window.location.href.split("#")[0];

        // 在应用管理页面下的 社会化服务 - 基础设置中设置该地址
        var redirect_url = 'http://www.21paradox.com/zhyl/redirect.html';
    
        // 获取当前用户
        var user = baidu.frontia.getCurrentAccount();

        $scope.isLogined = false;

        if (user || $stateParams.login == 1) {

            $scope.isLogined = true;

            if (user) {

                getAccountInfo(user.accountId);
                $scope.name = user.accountName;

            } else {

                $scope.$on('login', function () {
                    user = baidu.frontia.getCurrentAccount();
                    $scope.name = user.accountName;
                    getAccountInfo(user.accountId);
                });

            }
        }


        $scope.accountInfo = null;

        function getAccountInfo(accountId) {

            dataService.getAccountInfo(accountId).then(function (data) {

                $scope.accountInfo = data;

                if (data.name) {
                    $scope.name = data.name;
                }
            });
        }


        $scope.loginBaidu = function () {

            baidu.frontia.social.login({
                response_type: 'token',
                media_type: 'baidu',  // 登录百度帐号
                redirect_uri: redirect_url,
                client_type: 'web',
                scope: 'netdisk'
            });
            
            $ionicLoading.show();
        }


        $scope.loginQQ = function () {

            baidu.frontia.social.login({
                response_type: 'token',
                media_type: 'qqdenglu', // 登录 QQ 帐号
                redirect_uri: redirect_url,
                client_type: 'web'
            });
            $ionicLoading.show();
        }


        $scope.logout = function () {
            baidu.frontia.logOutCurrentAccount();
            //$rootScope.user = null;
            $scope.isLogined = false;

            $location.url($location.path());
        }


        $scope.goto = function (path) {
            $location.path(path);
        }

    })
    
    
    
     .controller('AccountEditCtrl', function ($scope, dataService, $timeout, $location, toaster) {
        
        var accountId = baidu.frontia.getCurrentAccount().accountId;

        dataService.getAccountInfo(accountId).then(function (data) {
            
            
            $scope.id = data.id;
            $scope.name = data.name;
            $scope.phone = data.telephone;
            $scope.address = data.address;
        });
    
        $scope.update = function () {
    
            dataService.updateAccountInfo($scope.id, accountId, $scope.name, $scope.phone, $scope.address).then(function (data) {
                
                delete dataService.cache.accountId;
                
                toaster.success('修改成功', '', {
                    timeOut: 1000
                });
    
                $timeout(function () {
                    $location.path('/view5');
                }, 1000);
    
            });
        }
        
    })



.controller('orderListCtrl', function ($scope, dataService) {
      
    var accountId = baidu.frontia.getCurrentAccount().accountId;

    dataService.getAccountInfo(accountId).then(function (data) {
        var id = data.id;

        dataService.getOrders(id).success(function (data) {

            $scope.orders = data;
        });
    });
      
        
  })