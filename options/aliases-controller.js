(function (angular) {
    'use strict';
    angular.module('ngRepeat', ['ngAnimate']).controller('repeatController', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.itemns = [];

        $scope.q = "";

        $scope.error = null;

        $scope.originalName = "";

        $scope.aliasName = "";

        $scope.button = "Add"

        $scope.editingIndex = -1;

        $scope.delete = function (item) {
            const index = $scope.items.indexOf(item);
            if (index > -1) {
                $scope.items.splice(index, 1);
            }
            console.log('List after delete: ', $scope.items);
            $timeout(function () {
                $scope.storeData($scope.items);
            })
        }

        $scope.edit = function (item) {
            $scope.editingIndex = $scope.items.indexOf(item);
            $scope.originalName = $scope.items[$scope.editingIndex].originalName;
            $scope.aliasName = $scope.items[$scope.editingIndex].aliasName;
            $scope.button = "Edit"
        };

        $scope.add = function add() {
            const editingIndex = $scope.editingIndex;
            const originalName = $scope.originalName.trim();
            const aliasName = $scope.aliasName.trim();
            if (editingIndex !== -1) {
                console.log('Edit');
                $scope.items[editingIndex].originalName = originalName;
                $scope.items[editingIndex].aliasName = aliasName;
                $scope.originalName = '';
                $scope.aliasName = '';
            } else {
                console.log('Add');
                const dup = !!(($scope.items).filter(it => (it.originalName === originalName)).length)
                if (!dup) {
                    $scope.items.push({originalName: originalName, aliasName: aliasName});
                    $scope.originalName = '';
                    $scope.aliasName = '';
                } else {
                    $timeout(function () {
                        $scope.error = "This Name already exist please click Edit from list"
                    })
                }
            }
            $scope.toAddType();
            $timeout(function () {
                $scope.storeData($scope.items);
            })
        };

        $scope.toAddType = function () {
            $scope.button = "Add"
        }

        $scope.rmError = function () {
            $timeout(function () {
                $scope.error = null
            })
        }

        $scope.storeData = function (items) {
            console.log(items)
            chrome.storage.sync.set({aliases: []}, function () {
                chrome.storage.sync.set({aliases: items}, function () {
                    console.log('Done')
                });
            });
        }

        $scope.getData = function () {
            chrome.storage.sync.get(['aliases'], function (result) {
                $scope.items = result.aliases || [];
                console.log(' $scope.items : ', $scope.items);
            });
        }

        $scope.storeData();


        $timeout(function () {
            $scope.items = []
            $scope.temp = 'a';
            $scope.temp = undefined;
        })
    }]);
})(window.angular);
