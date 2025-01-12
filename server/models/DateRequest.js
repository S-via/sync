const {Schema,model} = require('mongoose');

const dateRequestSchema = new Schema (
    {

    }
);

const DateRequest = model('DateRequest',dateRequestSchema);
module.exports = DateRequest;