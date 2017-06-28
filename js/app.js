//(function(angular) {
//	'use strict';
//
//	angular
//		.module('todoApp', [])
//		.controller('TodoController', ['$scope', TodoController]);
//
//
//	// 控制器函数
//	function TodoController($scope) {
//		var vm = $scope;
//
//		// 代码写在此处！
//
//		// 1 展示任务列表
//		// 抽象数据结构
//		var todoList = [
//			{ id: 1, name: '抽烟', isCompleted: false },
//			{ id: 2, name: '喝酒', isCompleted: false },
//			{ id: 3, name: '烫头', isCompleted: true },
//		];
//
//		vm.todoList = todoList;
//	}
//
//})(angular);
(function (angular) {
	"use strict";
	angular
		.module("todoApp", [])
		.controller("todoController", ["$scope", Controller]);


	function Controller($scope) {
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
				console.log(todoList[i].id, id);
				if (todoList[i].id == id) {
					todoList.splice(i, 1);
					break;
				}
			}
		}

		//3.修改任务
		vm.editingId=-1;
			vm.edit=function(id){
				console.log(11);
				vm.editingId=id;
		}

		vm.update=function(){
			vm.editingId=-1;
		}

	}
})(angular);
