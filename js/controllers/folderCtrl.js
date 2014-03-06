/**
 * Created by thecht on 2/28/14.
 */
define(['app', 'services/folderSvc'], function (app) {
    app.controller('folderCtrl', ['$scope', '$http', 'folderSvc', function ($scope, $http, folderSvc) {
        $scope.addFolderBool = false;
        $scope.selected = undefined;
        $scope.Folders = folderSvc.getFolders();
        $scope.newFolder = {
            name: '',
            id: null
        }
        $scope.addFolder = function () {
            $scope.newFolder.id = Math.floor((Math.random() * 100000000) + 1);
            $scope.Folders.data.push($scope.newFolder);
//            folderSvc.postFolders($scope.Folders);
            $scope.newFolder = {};
            $scope.addFolderBool = false;

        }
    }]);
});