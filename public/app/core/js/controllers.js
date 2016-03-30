'use strict';

/* Controllers */
angular.module('jp.co.japacom.myapp')
    .controller('LoginController', ['$state', 'AuthService', LoginController])
    .controller('NavbarController', ['$state', '$scope', 'AuthService', NavbarController])
    .controller('ProfileController', ['$state', 'AuthService', 'ModelService', ProfileController])
    .controller('PasswordController', ['$state', 'AuthService', 'ModelService', PasswordController])
    .controller('UserController', ['$state', '$stateParams','ModelService', UserController])
    .controller('HomeController', HomeController)
;

/**
 * 
 * @param {type} $state
 * @param {type} AuthService
 * @returns {undefined}
 */
function LoginController($state, AuthService){
    var vm = this;
    
    vm.login = function(){
        vm.disabled = true;
        AuthService.login(vm.userid, vm.password)
            .then(function(){
                $state.go('root');
            })
            .catch(function(){
                vm.alert = { msg: AuthService.getMessage() };
            })
            .finally(function(){
                vm.password = "";
                vm.disabled = false;
            })
        ;
    };
}

/**
 * 
 * @param {type} $state
 * @param {type} $scope
 * @param {type} AuthService
 * @param {type} SystemInfo
 * @returns {undefined}
 */
function NavbarController($state, $scope, AuthService, SystemInfo) {
    var vm = this;

    // 共通情報の設定
    vm.module = 'core';
    
    $scope.$watch(
        function(){ return AuthService.getUser() },
        function(newVal, oldVal){
            vm.user = newVal;
        }
    );
    
    vm.logout = function () {
        AuthService.logout().finally(
            function(){
                $state.go('login');
            });
    };
}

/**
 * 
 * @param {type} $state
 * @param {type} AuthService
 * @param {type} ModelService
 * @returns {undefined}
 */
function ProfileController($state, AuthService, ModelService) {
    var vm = this;
    
    vm.user = AuthService.getUser();
    
    vm.update = function() {

        // モデルを指定
        vm.user.models = 'user';
 
        ModelService.update( vm.user, function(result) {
        });

        $state.go('action', { module: 'core', page: 'home' });        
    }
}

/**
 * 
 * @param {type} $state
 * @param {type} AuthService
 * @param {type} ModelService
 * @returns {undefined}
 */
function PasswordController($state, AuthService, ModelService) {
    var vm = this;
    
    vm.update = function() {

        vm.user = AuthService.getUser();

        vm.user.password = vm.newPassword;
        vm.user.models = 'users';
        
        ModelService.update( vm.user, function(result) {
        });
        $state.go('action', { module: 'core', page: 'home' });        
    }
}

/**
 * 
 * @returns {undefined}
 */
function HomeController() {
    var vm = this;
    vm.msg = 'Home';
}

/**
 * UserController
 * @param {type} $state
 * @param {type} $stateParams
 * @param {type} ModelService
 * @returns {undefined}
 */
function UserController($state, $stateParams, ModelService) {
    var vm = this;

    // モジュール・モデルを指定する
    vm.models = "users";
    vm.module = "core";

    // _id パラメータ指定有無分岐
    if ( !angular.equals($stateParams._id, null) ) {
        
        // 指定 _id のオブジェクト取得
        ModelService.one(
            { models: vm.models, _id: $stateParams._id },
            function(user) {
                vm.user = user;
            }
        );
        
    } else {
        // オブジェクトリストの取得
        vm.users = ModelService.query({ models: vm.models });    
    }
    
    /**
     * ユーザ新規登録
     * @returns {undefined}
     */
    vm.insert = function() {
        var item = vm.user;
        
        item.models = vm.models;
        
        ModelService.save(item, function(result) {
            console.log(result);
        });
        $state.go('action', { module: vm.module, page: 'index', _id: null });
    }
    
    vm.update = function() {
        var item = vm.user;
        
        item.models = vm.models;
        
        ModelService.update( item, function(result) {
            console.log(result);
        });
        $state.go('action', { module: vm.module, page: 'index', _id: null });        
    }

    /**
     * ユーザ削除
     * @param {type} user 削除ユーザオブジェクト
     * @returns {undefined}
     */
    vm.delete = function(user) {
        ModelService.delete({ models: vm.models, _id: user._id }, function(result) {
            console.log(result);
        });
        vm.users = ModelService.query({ models: vm.models });
    }
}
