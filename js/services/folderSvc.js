/**
 * Created by thecht on 2/28/14.
 */
define(['app'], function (app) {
    app.factory('folderSvc', function ($http) {
        var folderSvc = {};
        folderSvc.data = {};
        folderSvc.getFolders = function () {
            $http.get('content/folders.json')
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    folderSvc.data = data;
                });
            return folderSvc;
        };


        folderSvc.deleteFolders = function () {
            $http.delete('content/folders.json')
                .success(function (data, status) {
                })
        };


        folderSvc.postFolders = function (postData) {
            $http.post('content/folders.json', postData)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    folderSvc.data = data;
                });
            return folderSvc;
        };
        folderSvc.randomNumber = function () {
            return Math.floor((Math.random() * 100000000) + 1);
        }
        return folderSvc;
    })
});