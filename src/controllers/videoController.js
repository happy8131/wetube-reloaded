let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //app.use(express.urlencoded({ extended: true })); 이거 덕분에 req.body를 받을 수 있다
  videos[id - 1].title = title; //form  name에서 오는 body에서 title얻었고 req.body 에서 오는 새로운 title로 수정 될거다
  return res.redirect(`/videos/${id}`); //redirect()는, 브라우저가 redirect(자동으로 이동)하도록 하는 거다, /videos/id페이지로 리다이렉트 시켜줄거다
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array.
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 5,
    comments: 2,
    createdAt: "just now",
    views: 59,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
