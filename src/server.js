import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express가 views 디렉토리에서 pug 파일을 찾도록 설정되어 있다 render로 home.pug 하면된다
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //form의 value들을 이해할 수 있도록하고 JS 형식으로 번형시켜 줄 거다( express는 form으로 보낸 데이터를 읽지못함)

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
); //middleware 브라우저가 우리의 backend와 상호작용할 때마다 sesstion에 있는 옵션 middleware가 브라우저에 cookie를 전송한다
//쿠키는 백엔드가 브라우저에 주는 정보
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter); // url이 /videos로 시작하면 express는 비디오 라우터 안에 들어가고 그리고 /watch를 찾을거다
app.use("/users", userRouter);
export default app;
/**
1. 서버를 키면 상시로 request를 받을 준비를 함-> listening
2. 브라우저가 서버에 페이지를 request -> 우리가 브라우저에 localhost:4000 (내 서버의 url)을 입력
3. 서버가 listening 상태로 브라우저에게 request를 get 메소드를 통해 받음 -> request 처리
4. 서버가 브라우저의 request에 대한 response를 전달
 
middlware는 중간(req와res의 중간)에 있는 software다.
 * 함수가 next()를 호출하면 그건 middleware다
 * 어떤 함수는 send를 사용하는데, 그렴 그건 middleware가 아니다.
 * logger는 미드웨어를 리턴해준다
 * 
 * 
 pug를 렌더링해주는건 controller!
render는 2개의 argument를 받는다
하나는 view, 다른 하나는 템플릿에 보낼 변수!
템플릿에 변수를 생성하는법 #{}!

req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함합니다.
기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아옵니다.

기본적으로 서버와 유저의 연결은 stateless한 성질을 띈다.(wifi가 쭉 연결되어 있는것과 다르게)
- 이러한 연결 특성으로 인해 매번 연결시 유저는 새로이 서버에 자신을 확인 받아야 함
- 만약 증표(증거)가 있다면 다시 연결시 유저에 대한 확인이 쉬워짐
- 쿠기가 증표 역활을 함. 유저는 서버 연결시 서버에게 증표를 건네받음(쿠키는 유저가 보관)
- 서버는 session으로 해당 증표를 가진 유저의 기록을 저장해둠
- 유저가 증표(쿠키)를 가지고 오면 서버는 저장되어 있는 session을 통해 유저를 쉽게 확인

즉, 브라우져에서 서버에 로그인 요청을 해서 로그인이 되면 서버는 세션id를 response해주고
브라우져는 쿠키스토리지에 그 세션id를 보관하고 있다가 이후 다시 서버에 방문할 시에는 그 세션
id만 보여주면 자동으로 로그인되게 해줘서 계속 로그인할 수고를 덜어준다는 것이겠군요.
 */
