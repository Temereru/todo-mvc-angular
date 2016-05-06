/*
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, todoStorage, userServ) {
  var todos = todoStorage.get();
  todos.then(function(recieved){
    $scope.todos = recieved.data;
    $scope.idCounter = $scope.todos[$scope.todos.length-1] ? $scope.todos[$scope.todos.length-1].id+1 : 0;
  });;  
  $scope.newTodo = '';
  $scope.editedTodo = null;
  $scope.isLogged = userServ.isLogged();

  userServ.subscribe($scope, function userChange() {
    $scope.isLogged = userServ.isLogged();
  });

  // TODO: Create a new todo from $scope.newTodo
  // User todoStorage.out to save it
  // Clear the input afterwardc
  $scope.addTodo = function () {
    var todo = {
      id: $scope.idCounter,
      title: $scope.newTodo,
      completed: false
    }
    $scope.idCounter++;
    $scope.todos.push(todo);
    todoStorage.post(todo);
    $scope.newTodo = '';
  };

  // Setting '$scope.editedTodo' so we can add our 'editing' class
  // Setting '$scope.originalTodo' to the original todo in case we want to restore later
  $scope.editTodo = function (todo) {
    if($scope.isLogged){
      $scope.editedTodo = todo;
      $scope.originalTodoTitle = todo.title;
    }
  };

  // invoked on 'blur' and hitting the 'enter key'
  // TODO: set $scope.editedTodo to null (we wont need it now because we're done editing)
  // TODO: Set the title to the 'new' todo title
  // TODO: Put it in todoStorage
  $scope.doneEditing = function (todo) {
    $scope.editedTodo = null;
    for(var i = 0; i < $scope.todos.length; i++){
      if($scope.todos[i].id === todo.id){
        $scope.todos[i] === todo;
        todoStorage.put(todo);
        break;
      }
    }
    
  };

  // TODO: Revert the todo with in our todos array whos index matches the one passed
  // into this function back to $scope.originalTodo.
  // TODO: Invoke doneEditing with our $scope.originalTodo
  $scope.revertEditing = function (todo) {
    todo.title = $scope.originalTodoTitle
    $scope.doneEditing(todo);
  };

  // TODO: Remove the todo from the todos array
  // TODO: Update todoStorage with this change
  $scope.removeTodo = function (todo) {
    for(var i = 0; i < $scope.todos.length; i++){
      if($scope.todos[i].id === todo.id){
        $scope.todos.splice(i,1);
        todoStorage.delete(todo);
        break;
      }
    }
    
  };

  // TODO: Update localStorage with the change
  $scope.todoCompleted = function (todo) {
    for(var i = 0; i < $scope.todos.length; i++){
      if($scope.todos[i].id === todo.id){
        $scope.todos[i] === todo;
        todoStorage.put(todo);
        break;
      }
    }
  };
});
