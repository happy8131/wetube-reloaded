import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express가 views 디렉토리에서 pug 파일을 찾도록 설정되어 있다 render로 home.pug 하면된다
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //form의 value들을 이해할 수 있도록하고 JS 형식으로 번형시켜 줄 거다( express는 form으로 보낸 데이터를 읽지못함)
app.use("/", globalRouter);
app.use("/videos", videoRouter); // url이 /videos로 시작하면 express는 비디오 라우터 안에 들어가고 그리고 /watch를 찾을거다
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
/**
1. 서버를 키면 상시로 request를 받을 준비를 함-> listening
2. 브라우저가 서버에 페이지를 request -> 우리가 브라우저에 localhost:4000 (내 서버의 url)을 입력
3. 서버가 listening 상태로 브라우저에게 request를 get 메소드를 통해 받음 -> request 처리
4. 서버가 브라우저의 request에 대한 response를 전달
 
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
 */
