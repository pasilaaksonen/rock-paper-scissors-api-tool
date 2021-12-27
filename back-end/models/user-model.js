import mongoose from 'mongoose';

const userModelSchema = mongoose.Schema({
   data: {
      type: Array,
      required: true
   },
   recentDate: {
      type: Number,
      required: true
   }
 });
 
 const UserData = mongoose.model('userdata', userModelSchema);
 
 export default UserData;