/**
 * Created by thecht on 2/28/14.
 */
require.config({
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'angular': 'libs/angular/angular',
        'angular-bootstrap': 'libs/angular-bootstrap/ui-bootstrap-tpls',
        'angular-ui': 'libs/angular-ui/build/angular-ui',
        'bootstrap': 'libs/bootstrap/dist/js/bootstrap',
        'underscore': 'libs/underscore/underscore',
        'angular-strap': 'libs/angular-strap/angular-strap',
        'angular-route': 'libs/angular-route/angular-route',
        'angular-resource': 'libs/angular-resource/angular-resource'
    },
    baseUrl: 'js',
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'angular': {
            exports: 'angular'
        },
        'bootstrap': {
            exports: 'bootstrap',
            deps: ['jquery']
        },
        'angular-bootstrap': {
            deps: ['angular', 'bootstrap'],
            exports: 'angular-bootstrap'
        },
        'underscore': {
            exports: 'underscore'
        },
        'angular-ui': {
            exports: 'angular-ui',
            deps: ['angular']
        },
        'angular-strap': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        }
    },
    dep: ['app'],
    priority: 'angular'
});

require(['angular', 'jquery', 'bootstrap', 'angular-bootstrap', 'angular-ui', 'underscore', 'routers/appRouter'], function (angular, $) {
    $(function () {
        angular.bootstrap(document, ['nested']);
    })
})
