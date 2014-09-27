(function(){
	var app = angular.module('sortingapp', []);

	app.controller('UsersController', ['$scope', function($scope){
		$scope.users = userList;
		$scope.redTeam = [];
		$scope.blueTeam= [];
		$scope.sortingMode = false;

		$scope.switchModes = function(){
			$scope.sortingMode = ($scope.sortingMode ? false : true);
			if($scope.sortingMode){
				$scope.sortTeams();
			} else {
				$scope.redTeam = [];
				$scope.blueTeam= [];
				$scope.users.forEach(function(user) {
					$scope.hideUserTeam(user);
				});
			}
		};

		$scope.switchModesButtonText = function(){
			return ($scope.sortingMode ? 'Add More Users' : 'Begin Sorting');
		};

		$scope.addUser = function(user){
			if(user && user.name){
				var newUser = {name: user.name,
					leader: false,
					showTeam: false
				};
				$scope.users.push(newUser);
				user.name = '';
			}
		};

		$scope.showUserTeam = function(user){
			if(user && $scope.sortingMode){
				user.showTeam = true;
			}
		};

		$scope.hideUserTeam = function(user){
			if(user){
				user.showTeam = false;
			}
		};

		$scope.sortTeams = function(){
			if($scope.users.length < 2){
				return -1;
			}
			$scope.redTeam = [];
			$scope.blueTeam= [];

			var tempUserList = [];
			$scope.users.forEach(function(user) {
					tempUserList.push(user);
				});
			var randomSeed = Math.floor((Math.random() * 2));
			while(tempUserList.length > 0) {
				var randomUserIdx = Math.floor((Math.random() * tempUserList.length));

				if((tempUserList.length + randomSeed) % 2 !== 0){
					$scope.blueTeam.push(tempUserList[randomUserIdx]);
				} else{
					$scope.redTeam.push(tempUserList[randomUserIdx]);
				}
				tempUserList.splice(randomUserIdx,1);
			}
		};
	}]);

	var userList = [
		{
			name: 'Leader A',
			leader: true,
			showTeam: false
		},
		{
			name: 'Leader B',
			leader: true,
			showTeam: false
		},
		{
			name: '2',
			leader: false,
			showTeam: false
		},
		{
			name: '3',
			leader: false,
			showTeam: false
		},
	];
})();