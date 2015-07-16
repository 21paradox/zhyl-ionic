angular.module('zhyl.controllers', ['zhyl.services','zhyl.captcha'])

.config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
}])

.controller('DashCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  $scope.slideHasChanged =  function(){
    
  };
  
  dataService.new_list().success(function(d){
       var data = angular.copy(d);

        data.forEach(function (val) {
           
            val.content = val.content.replace(/<img[^>]+src="?([^"\s]+)"?\s*\/>/g, function (a, imgUrl) {
                if (imgUrl) {
                    return '<img src = "http://images.weserv.nl/?url=admin.sx96345.com' + imgUrl +'&w=280">';
                }
            });
 
            val.content = val.content.replace(/&nbsp;/g, '');
            val.image_url = 'http://7xijqe.com1.z0.glb.clouddn.com/img/upload/' + encodeURIComponent(encodeURIComponent(val.image_url));
        });
        
        $scope.new_list = data; // data.reverse();
  });
  
}])


.controller('NewsDetailCtrl', ['$scope', '$stateParams', 'dataService',
  function($scope, $stateParams, dataService){
  
  var news_index = $stateParams.newsIndex || 0;
	
	 dataService.new_list().success(function (data) {
 
 		   var val = angular.copy(data[news_index]);
           
        val.content = val.content.replace(/<img[^>]+src="?([^"\s]+)"?\s*\/>/g, function (a, imgUrl) {
            if (imgUrl) {
                return '<img src = "http://images.weserv.nl/?url=admin.sx96345.com' + imgUrl +'&w=280">';
            }
        });
        
        val.content = val.content.replace(/&nbsp;/g, '');
        val.image_url = 'http://7xijqe.com1.z0.glb.clouddn.com/img/upload/' + encodeURIComponent(encodeURIComponent(val.image_url));
   
   		 $scope.title = val.title;
       $scope.imgUrl = val.image_url;
		$scope.content =  val.content;
    });
 
}])



.controller('OrderCtrl', ['$scope','$stateParams', 'dataService', 'captcha' ,
    function($scope,$stateParams, dataService, captcha) {
  
   function generateCaptcha(captchaNum) {
        captcha({
            context: document.querySelector('.checkcode-img').getContext('2d'),
            style: '#0208fc',
            text: captchaNum
        });
    }
  
     generateCaptcha('1234');
  
}])


.controller('MapCtrl',['$scope', function($scope) {
    
    $script(['http://api.map.baidu.com/getscript?v=2.0&ak=ZusobXS8IsrXqnprYgmTlOQ3&services'], function () {

        var map = new BMap.Map("allmap");
        var point = new BMap.Point(120.606000, 30.036519);
        
        map.centerAndZoom(point, 14);
        window.map =map;
        
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});// 左上角，添加比例尺
	    var top_left_navigation = new BMap.NavigationControl(); 
         
        map.addControl(top_left_control);        
		map.addControl(top_left_navigation);   
          
          
        ['120.615307,30.027678'].forEach(function(value){
            
            var x = parseFloat(value.split(',')[0]);
            var y = parseFloat(value.split(',')[1]);
            
            var point = new BMap.Point(x,y);
            
            var marker = new BMap.Marker(point);  // 创建标注
        	map.addOverlay(marker);              // 将标注添加到地图中
        
        	var label = new BMap.Label("东湖镇便民服务中心",{offset:new BMap.Size(20,-10)});
        	marker.setLabel(label);
            
        });
          
    });
   

}])


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
