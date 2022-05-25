const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({

gmail:{
type:String,
default:""
},

gmail_id:{
    type:String,
    default:""
},

fullname:{
    type:String,
    default:""
},

browser_history:{
    type:Array,
    default:[]
},

metamask_accounts:{
    type: Array,

  default:[]

},

location:{
    type: Object,
      default:{},
},


status:{
    type:String,
    default:0
}



},

{timestamps:true}
);


module.exports = mongoose.model("User", UserSchema);
