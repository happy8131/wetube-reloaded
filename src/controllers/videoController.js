import Video from "../models/Video";

/*
console.log("start")
Video.find({}, (error, videos) => {
  if(error){
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" }); //desc 내림차순 , asc 오름차순
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;

  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); //true false로 리턴해준다

  if (video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags
  //   .split(",")
  //   .map((word) => (word.startsWith("#") ? word : `#${word}`)); //해시태그로 시작하면 그냥 word로 리턴할 거고 아닐 경우 #을 붙여 리턴할거다
  // await video.save();
  return res.redirect(`/videos/${id}`); //redirect()는, 브라우저가 redirect(자동으로 이동)하도록 하는 거다, /videos/id페이지로 리다이렉트 시켜줄거다
};

export const getUpload = (req, res) => {
  const { id } = req.params;
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  // here we will add a video to the videos array.
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }

  //"food,movies,music".split(",").map(word=>`#${word}`) =>["#food","#movies","#music"] // 베열을 만들어 단어별 분리를 시킨 다음 #을 붙여준다
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Video.findByIdAndDelete(id);
  //delete video
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
    console.log(videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
};
/*async(비동기) -- await(수행될 때까지 기다려준다)
=> 데이터베이스가 데이터 찾을때까지 기다려준다(다음 것이 먼저 수행되는 것을 막음)
에러는 try-catch문으로 잡는다.*/
//- pug로 파일을 보내면 pug가 이 파일을 평범한 html로 변환해줄거다
