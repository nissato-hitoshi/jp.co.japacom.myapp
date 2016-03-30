'use strict';

/* App Module */
angular.module('jp.co.japacom.myapp', ['ui.router', 'ngResource'])
    .config(['$stateProvider', '$urlRouterProvider', appConfig])
    .run(['$state', '$rootScope', 'AuthService', appRun])
;

/**
 * 
 * @param {type} $stateProvider
 * @param {type} $urlRouterProvider
 * @returns {undefined}
 */
function appConfig($stateProvider, $urlRouterProvider) {
    
    // 以下のステートに該当しない場合
    $urlRouterProvider.otherwise('/');

    // ステートによるルーティング指定
    $stateProvider
        .state('login', { url: '/login', templateUrl: 'app/core/login.html' })
        .state('root', { url: '/', templateUrl: 'app/core/home.html', isLoginRequired: true } )
        .state('action', { 
            url: '/:module/:page',
            isLoginRequired: true,
            params: { _id: null },
            templateUrl: function($stateParams) {
                return 'app/' + $stateParams.module + '/' + $stateParams.page + '.html';
            }
        })
    ;
}

/**
 * 
 * @param {type} $state
 * @param {type} $rootScope
 * @param {type} AuthService
 * @returns {undefined}
 */
function appRun($state, $rootScope, AuthService){
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
        if ( toState.isLoginRequired )
        {
            if (!AuthService.isLogged())
            {
                e.preventDefault();
                $state.go('login');
            }
        }
    });
}
