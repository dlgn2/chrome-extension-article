const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({

email:{
type:String,
required:true,
unique:true,
},

password:{
    type:String,
    required:true,
    min:8,
    max:30 

},

fullname:{
    type:String,
    default:""
},

phoneNumber:{
    type:String,
    default:""
},

user_role:{
    type: Number,
  //++++1 0 -> Yardım Alıcak Kisi , 1->Yardım Sever , 2-> Kurye  3-> Admin

  default:0

},


profile_photo:{
    type: String,
      default:
        "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
},

adress:{
    type:String,
    default:""
},
ilce:{
    type:Array,
    default:[]
},

geoLocation:{
    type:String
},

belge:{
    type:String
},
// yoksulluk belgesi için status
status:{
    type:String,
    default:0
}



},

{timestamps:true}
);


module.exports = mongoose.model("User", UserSchema);
