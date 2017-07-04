(function (angular) {
	"use strict";
	angular
		.module("todoApp", ["ngRoute", "serviceApp"])
		.config(["$routeProvider", function ($routeProvider) {
			$routeProvider
				.when("/:status?", {
				templateUrl: "./app.html",
				controller:"todoController"
			})
			.otherwise({
				redirectTo:"/"
			})

		}])
		.controller("todoController", ["$scope", "$location", "$routeParams","todoService", Controller]);


	function Controller($scope, $location, $routeParams,todoService) {
		var vm = $scope;
		var todoList = todoService.getData();
		vm.todoList = todoList;
		//1.添加任务
		vm.taskName = "";
		vm.add = function () {
			if (vm.taskName.trim() === "") {
				return;
			}
			//处理id  数组的最后一项的id+1
			todoService.addData(vm.taskName);
			vm.taskName = "";
		}
		//2.删除任务
		vm.del = todoService.del;

		//3.修改任务
		vm.editingId = -1;
		vm.edit = function (id) {
			vm.editingId = id;

		}

		vm.update = function () {
			vm.editingId = -1;
			todoService.save();
		}


		//4.切换任务的选中状态
		vm.isCheckAll = false;
		vm.checkAll = function () {
			todoService.checkAll(vm.isCheckAll);
		}

		//5.清除已完成的任务
		vm.clearCompleted = function () {
			todoService.clearCompleted(vm.todoList)
		}

		//6.处理清除按钮任务的显示和隐藏
		vm.isShow = todoService.isShow;

		//7.显示未完成的任务数
		vm.getUnCompletedCount = todoService.getUnCompletedCount;

		//8.显示不同状态的任务以及高亮处理
		vm.status = undefined;

		//9.根据hash值，设置status的状态
		vm.location = $location;
		vm.$watch("location.url()", function (curVal) {
			switch (curVal) {
				case "/completed":
					vm.status = true;
					break;
				case "/active":
					vm.status = false;
					break;
				default:
					vm.status = undefined;
			}
		})
	}
})(angular);
