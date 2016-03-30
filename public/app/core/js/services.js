'use strict';

angular.module('jp.co.japacom.myapp')
    .factory('AuthService', ['$q','ModelService', AuthService])
    .factory('ModelService', ['$resource', ModelService])
;

function AuthService($q, ModelService){
    var _user = null;
    var _message = "";
    
    return {
        isLogged: function(){ return !!_user; },
        getUser: function(){ return _user; },
        setUser: function(user){ _user = user; },
        getMessage: function() { return _message; },
        login: function(userid, password){
            var deferred = $q.defer();
            
            ModelService.query({ models: 'users', userid: userid },function(result) {
                if (angular.isUndefined(result[0])) {
                    _message = '指定したユーザIDは登録されていません。';
                    deferred.reject();
                }
                else if (result[0].password == password) {
                    _message = '';
                    _user = result[0];
                    deferred.resolve();
                } 
                else {
                    _message = 'パスワードが異なります。';
                    deferred.reject();
                }
            });

            return deferred.promise;
        },
        logout: function(){
            _user = null;
            return $q.all();
        }
    };
}

/**
 * モデルオブジェクトサービス
 * @param {type} $resource
 * @returns {unresolved}
 */
function ModelService($resource) {
    return $resource('/api/:models/:_id', { _id: '@_id', models: '@models' }, {
      'one': { method: 'GET', params:{ models: '@models' }, isArray:false },
      'query': { method: 'GET', params:{ models: '@models' }, isArray:true },
      'save': { method: 'POST', params:{ models: '@models' } },
      'update': { method: 'PUT', params:{ models: '@models' } },
      'delete': { method: 'DELETE', params:{ models: '@models' } }
    });
}
