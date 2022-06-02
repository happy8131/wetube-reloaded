import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] }); //존재 하는지
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    //check if account exists
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  console.log(user.password);
  // check if password correct
  const ok = await bcrypt.compare(password, user.password); //DB에 있는 해싱값 과 비교한다
  //비밀번호 체크
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  console.log("LOG USER IN! Coming soon");

  //유저가 로그인하면 그 유저에 대한 정보를 세션에 담을거다. (세션에 정보를 추가한다.)
  //req.session 객체에 정보를 저장하고 한다.
  req.session.loggedIn = true;
  req.session.user = user; //DB에서 찾은 user를 쓸거다 (각 브라우저마다 서로 다른 세션을 가지고 있다는걸 꼭 기억하자.)
  return res.redirect("/"); //로그인이되면 홈으로 이동한다.
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "9fac726866be2ff14f36",
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString(); //url 주소가 인코딩 된다.
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = (req, res) => {};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");

/*
깃헙 로그인
1. 사용자들은 깃헙 신원을 요청하기 위해 redirect 됩니다
2. 인증한다


scope는 유저에게서 얼마나 믾이 정보를 읽어내고 어떤 정보를 가져올 것에 대한거다.
*/
