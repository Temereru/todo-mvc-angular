todomvc.factory('userServ', function ($http, $rootScope, $window, $location) {
  var user = {username:''};
  var loggedIn = false;
  var setUser = function(remove){
    if(remove){
      user = {username: ''};
      loggedIn = false;
      $rootScope.$emit('user-change-event');
    }else{
      var token = localStorage['passportJWT'];
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      user = JSON.parse($window.atob(base64));
      loggedIn = true;
      $rootScope.$emit('user-change-event');
    }
  }

  if(localStorage['passportJWT']){
    setUser(false);
  }

  return {
    subscribe: function(scope, callback) {
      var handler = $rootScope.$on('user-change-event', callback);
      scope.$on('$destroy', handler);
    },

    signup: function(user){
      return $http.post('/register', user);
    },

    login: function(user){
      return $http.post('/login', user);
    },

    getUsername: function(){
      return user.username;
    },

    getUser: function(){
      return user;
    },

    setUser: setUser,

    isLogged: function(){
      return loggedIn;
    },

    logout: function(){
      localStorage.removeItem('passportJWT');
      setUser(true);
      $location.url('/');
    }
  };
});