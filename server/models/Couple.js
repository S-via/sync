const {Schema,model} = require('mongoose');

const coupleSchema = new Schema (
    {
       partner1:{type: Schema.Types.ObjectId, ref:'User'},
       partner2:{type: Schema.Types.ObjectId,ref:'User'},
       anniveristy:{type:Date,required:true},
       nextDate:{type:Date},

    }
);

const Couple = model('Couple',coupleSchema);

module.exports = Couple;