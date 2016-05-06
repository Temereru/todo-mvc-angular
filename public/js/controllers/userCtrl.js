todomvc.controller('UserCtrl', ['$scope', '$location', '$window', 'userServ', function UserCtrl($scope, $location, $window, userServ) {
  $scope.usernameInput = '';
  $scope.passwordInput = '';
  $scope.loggedIn = false;
  $scope.username = '';

  $scope.setToken = function(token){
    var token = JSON.stringify(token);
    localStorage['passportJWT'] = token;
  };

  $scope.signup = function(){
    var user = {
      username: $scope.usernameInput,
      password: $scope.passwordInput
    };

    var signupPromise = userServ.signup(user);
    signupPromise.then(function(response){
      $scope.setToken(response.data.token);
      userServ.setUser(false);
      $location.url('/');
    })
  };

  $scope.login = function(){
    var user = {
      username: $scope.usernameInput,
      password: $scope.passwordInput
    };
    var loginPromise = userServ.login(user);
    loginPromise.then(function(response){
      $scope.setToken(response.data.token);
      userServ.setUser(false);
      $location.url('/');
    })
  };

  $scope.logout = function(){
    userServ.logout();
  }

  

}]);

