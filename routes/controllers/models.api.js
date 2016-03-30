'use strict';
/**
 * Models Restful API
 */
var mongo = require('../../libs/mongodb.js');

module.exports = {
    /**
     * one : 指定IDのデータを取得
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    one : function (req, res) {
        mongo.find(
            req.params.models,
            { _id: mongo.ObjectID(req.params._id) },
            {},
            {},
            function(item) {
                res.json( item[0] );
            }
        );
    },

    /**
     * query : 登録データをリスト形式で取得
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    query : function (req, res) {
        mongo.find(
            req.params.models,
            req.query,
            {},
            {},
            function(items) {
                res.json( items );
            }
        );
    },    
    /**
     *  save : 指定データを登録
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    save : function (req, res) {
        var item = req.body;
        var models = req.body.models;
        
        // 登録日時を設定
        item.registeredDate = new Date();
        
        // models 属性を削除
        delete item.models;

        mongo.insert(
            models,
            item,
            {},
            function(result) {
                res.json(result);
            }
        );
    },
    /**
     * update : データの更新
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    update : function (req, res) {
        var item = req.body;
        var models = req.body.models;
        
        // オブジェクトIDを再設定＆更新日時設定
        item._id = mongo.ObjectID(req.body._id);
        item.lastUpdated = new Date();
        
        // models 属性を削除
        delete item.models;
        
        mongo.update(
            models,
            { _id: mongo.ObjectID(item._id) },
            item,
            { upsert: false },
            function(result) {
                res.json(result);
            }
        );
    },
    /**
     * delete : 指定IDデータを削除
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    delete : function (req, res) {
        mongo.remove(
            req.params.models,
            { _id: mongo.ObjectID(req.params._id) },
            function(result) {
                res.json(result);
            }
        );
    }
};
