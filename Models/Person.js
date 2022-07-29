const mongoose = require ('mongoose')
const  Schema = mongoose.Schema;
const PersonSchema  = new Schema ({

    name:{
        type: String,
        required: true
    },
    age:Number,
    favoriteFoods:[String]


})
module.exports =mongoose.model('Person',PersonSchema )