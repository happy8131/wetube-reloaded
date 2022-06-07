import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});
//email, username은 딱 하나만 존재하게 만들거다 unique 해준다

userSchema.pre("save", async function () {
  console.log("Users apswwowrd", this.password);
  this.password = await bcrypt.hash(this.password, 1);
  console.log(this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
/*
해싱은 일방향 함수이다 
DB에 해싱된 패스워드를 저장할거다
bcrybt(비크립)로 해싱한다
user를 저장하기 전에 해싱을 해줄거다(pre('save'))
hash에 2번째 인자는 몇 번 해싱을 할건지 알려준다
 */
