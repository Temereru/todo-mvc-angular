/*
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $filter, todoStorage) {
	var todos = todoStorage.get();
	$scope.todos = todos;

	$scope.newTodo = '';
	$scope.editedTodo = null;

	// TODO: Create a new todo from $scope.newTodo
	// User todoStorage.out to save it
	// Clear the input afterward
	$scope.addTodo = function () {
		var newTodo = $scope.newTodo;

		if (newTodo.length === 0) {
			return;
		}

		todos.push({
			title: newTodo,
			completed: false
		});

		todoStorage.put(todos);

		$scope.newTodo = '';
	};

	// Setting '$scope.editedTodo' so we can add our 'editing' class
	// Setting '$scope.originalTodo' to the original todo in case we want to restore later
	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	// invoked on 'blur' and hitting the 'enter key'
	// TODO: set $scope.editedTodo to null (we wont need it now because we're done editing)
	// TODO: Set the title to the 'new' todo title
	// TODO: Put it in todoStorage
	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title;

		if (!todo.title) {
			$scope.removeTodo(todo);
		}

		todoStorage.put(todos);
	};

	// TODO: Revert the todo with in our todos array whos index matches the one passed
	// into this function back to $scope.originalTodo.
	// TODO: Invoke doneEditing with our $scope.originalTodo
	$scope.revertEditing = function (todo) {
		todos[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.doneEditing($scope.originalTodo);
	};

	// TODO: Remove the todo from the todos array
	// TODO: Update todoStorage with this change
	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
		todoStorage.put(todos);
	};

	// TODO: Update localStorage with the change
	$scope.todoCompleted = function (todo) {
		todoStorage.put(todos);
	};
});
