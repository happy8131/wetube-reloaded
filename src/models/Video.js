import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, minlength: 20 },
  createdAt: { type: Date, required: true, default: Date.now() },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema); //Video 모델 완성

export default Video;
/*
model의 형태를 정의해 줄 필요가 있다.
schema 로 해준다
언제든지 데이터를 추가하고 수정할 수 있다.
db를 mongoose와 연결시켜거 cideo model을 인식시킨다
*/
//trim 양쪽의 공백을 없애준다
