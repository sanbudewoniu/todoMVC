(function (angular) {
	"use strict";
	angular
		.module("serviceApp", [])
		.service("todoService", ["$window", todoService])

	function todoService($window) {
		var that = this;
		//任务列表的数据结构
		var todoList;
		todoList = JSON.parse($window.localStorage.getItem("todo")) || [];
		this.save = function () {
			$window.localStorage.setItem("todo", JSON.stringify(todoList));
		}
		//给view提供数据
		this.getData = function () {
			return todoList;
		}
		//1.添加任务
		this.addData = function (taskName) {
			var id;
			if (todoList.length == 0) {
				id = 1;
			} else {
				id = todoList[todoList.length - 1].id + 1;
			}
			todoList.push({
				id: id,
				name: taskName,
				isComplete: false
			});
			that.save();

		}

		//2.删除任务
		this.del = function (id) {
			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].id == id) {
					todoList.splice(i, 1);
					break;
				}
			}
			that.save();
		}

		//4.切换任务的选中状态
		this.checkAll = function (isCheckAll) {
			todoList.forEach(function (value) {
				value.isCompleted = isCheckAll;
			})
			that.save();
		}

		//5.清除已完成的任务
		this.clearCompleted = function (list) {
			var temArr = [];
			todoList.forEach(function (value, index) {
				if (!value.isCompleted) {
					temArr.push(value);
				}
			})
			list = temArr;
			todoList = list;
			that.save();
		}

		//6.处理清除按钮任务的显示和隐藏
		this.isShow = function () {
			return todoList.some(function (value) {
				if (value.isCompleted) {
					return true;
				}
			})
			that.save();
		}

		//7.显示未完成的任务数
		this.getUnCompletedCount=function () {
			var count = 0;
			for (var i = 0; i < todoList.length; i++) {
				if (!todoList[i].isCompleted) {
					count++;
				}
			}
			return count;
		}
	}

})(angular);
