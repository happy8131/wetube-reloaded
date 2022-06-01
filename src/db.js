import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

//database에게 data가 어떻게 생겼는지 알려줘야 , model을 만들고 검색하고 삭제하고 수정하고 해줄 수 있다
