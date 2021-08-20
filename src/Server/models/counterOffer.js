const sql = require('./db')
const config = require('../config/config')
const CounterOffer = function(){};

CounterOffer.postOffer = function(data,resultCallback) {
    sql.query("INSERT INTO COUNTER_OFFER SET ?",
        data,
        function(err,res){
            if (err) {
                console.log("Fail to create: ",err);
                resultCallback(err,null);
                return;
            }
            resultCallback(null,res)
        }
    );
}

CounterOffer.getByRequest = function(data,resultCallback) {
    sql.query("SELECT * FROM COUNTER_OFFER WHERE task_id=?",
        data.task_id,
        function(err,res){
            if (err) {
                console.log("Fail to get: ",err);
                resultCallback(err,null);
                return;
            }
            resultCallback(null,res)
        }
    );
}

CounterOffer.decline = function(data,resultCallback) {
    sql.query("DELETE FROM COUNTER_OFFER WHERE task_id=? AND lancer_id=?",
        [data.task_id,data.lancer_id],
        function(err,res){
            if (err) {
                console.log("Fail to make decline request: ",err);
                resultCallback(err,null);
                return;
            }
            resultCallback(null,res)
        }
    );
}

CounterOffer.accept = function(data,resultCallback) {
    values = [data.lancer_id, data.task_id, config.constant.STATUS.ACCEPTED]

    sql.query("UPDATE TASK SET status=$3, lancer_id=$1 WHERE task_id=$2; DELETE FROM COUNTER_OFFER WHERE task_id=$2",values,(err,res)=>{
        if (err) {
            console.log("Fail to make accept request: ",err);
            resultCallback(err,null);
            return;    
        }
        resultCallback(null,res)
    })
}

module.exports = CounterOffer