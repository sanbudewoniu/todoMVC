(function (angular) {
	"use strict";
	angular
		.module("todoApp", [])
		.controller("todoController", ["$scope", "$location", Controller]);


	function Controller($scope, $location) {
		var vm = $scope;

		//任务列表的数据结构
		var todoList = [
			{id: 1, name: '抽烟', isCompleted: false},
			{id: 2, name: '喝酒', isCompleted: false},
			{id: 3, name: '烫头', isCompleted: true},
		];

		vm.todoList = todoList;
		//1.添加任务
		vm.taskName = "";
		vm.add = function () {
			if (vm.taskName.trim() === "") {
				return;
			}
			//处理id  数组的最后一项的id+1
			var id;
			if (todoList.length == 0) {
				id = 1;
			} else {
				id = todoList[todoList.length - 1].id + 1;
				todoList.push({
					id: id,
					name: vm.taskName,
					isComplete: false
				});
				vm.taskName = "";
			}

		}

		//2.删除任务
		vm.del = function (id) {
			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].id == id) {
					todoList.splice(i, 1);
					break;
				}
			}
		}

		//3.修改任务
		vm.editingId = -1;
		vm.edit = function (id) {
			console.log(11);
			vm.editingId = id;
		}

		vm.update = function () {
			vm.editingId = -1;
		}

		//4.切换任务的选中状态
		vm.isCheckAll = false;
		vm.checkAll = function () {
			todoList.forEach(function (value) {
				value.isCompleted = vm.isCheckAll;
			})
		}

		//5.清除已完成的任务
		vm.clearCompleted = function () {
			var temArr = [];
			todoList.forEach(function (value, index) {
				if (!value.isCompleted) {
					temArr.push(value);
				}
			})
			vm.todoList = temArr;
			todoList = vm.todoList;
		}

		//6.处理清除按钮任务的显示和隐藏
		vm.isShow = function () {
			return todoList.some(function (value) {
				if (value.isCompleted) {
					return true;
				}
			})
		}

		//7.显示未完成的任务数
		vm.count = 0;
		vm.getUnCompletedCount = function () {
			var count = vm.count;
			for (var i = 0; i < todoList.length; i++) {
				if (!todoList[i].isCompleted) {
					count++;
				}
			}
			return count;
		}

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
