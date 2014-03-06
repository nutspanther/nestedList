/**
 * Created by thecht on 2/28/14.
 */
define(['app', 'start'], function (app) {
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {controller: 'folderCtrl'})
            .when('/index.html', {controller: 'folderCtrl', redirectTo: '/'})
            .otherwise({redirectTo:'/'});
    }])

})