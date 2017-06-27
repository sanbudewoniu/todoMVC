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


		//添加任务
		vm.taskName = "";
		vm.add = function () {
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
		vm.todoList = todoList;

	}
})(angular);
