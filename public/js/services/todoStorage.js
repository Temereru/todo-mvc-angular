/*
 * Services that persists and retrieves TODOs from localStorage
*/
todomvc.factory('todoStorage', function ($http) {

  return {
    get: function () {
      return $http.get('/todos');
    },

    post: function (todo){
      var token = localStorage['passportJWT'];
      token = token.slice(1, token.length - 1);
      $http.post('/todos', todo, {headers: {Authorization: 'Bearer ' + token}});
    },

    put: function (todo) {
      var token = localStorage['passportJWT'];
      token = token.slice(1, token.length - 1);
      $http.put('/todos/'+todo.id, todo, {headers: {Authorization: 'Bearer ' + token}});
    },

    delete: function(todo){
      var token = localStorage['passportJWT'];
      token = token.slice(1, token.length - 1);
      $http.delete('/todos/'+todo.id, {headers: {Authorization: 'Bearer ' + token}});
    }
  };
});
