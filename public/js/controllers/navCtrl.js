todomvc.controller('navCtrl', ['$scope', 'userServ' ,function UserCtrl($scope, userServ) {
  $scope.username = userServ.getUsername();
  $scope.loggedIn = userServ.isLogged();
  
  userServ.subscribe($scope, function userChange() {
    $scope.username = userServ.getUsername();
    $scope.loggedIn = userServ.isLogged();
  });

  $scope.logout = function(){
    userServ.logout();
  }
}]);