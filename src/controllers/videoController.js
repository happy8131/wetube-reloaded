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
  const videos = await Video.find();
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;

  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //app.use(express.urlencoded({ extended: true })); 이거 덕분에 req.body를 받을 수 있다

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
      hashtags: hashtags.split(",").map((word) => `#${word}`),
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

/*async(비동기) -- await(수행될 때까지 기다려준다)
=> 데이터베이스가 데이터 찾을때까지 기다려준다(다음 것이 먼저 수행되는 것을 막음)
에러는 try-catch문으로 잡는다.*/
//- pug로 파일을 보내면 pug가 이 파일을 평범한 html로 변환해줄거다
