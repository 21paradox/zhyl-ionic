angular.module('zhyl.controllers', ['zhyl.services'])

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



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
