export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  console.log("localsMiddleware", req.locals);
  next();
};
/*
1. backend browser가 소통하는 방식
backend와 browser는 session ID를 저장하는데
browser는 cookie라는 것에 저장을 하고 다닌다 그래서 browser가 backend에 요청할때는 cookie를 보내고 backend에서 session ID의 유무를 확인한후 응답을 해주는 방식

2. 로그인 하는 방법
req.session을 통해 session(object로 이루어져있음)에 접근이 가능하다
loggedIn = true , user = user(앞서 변수로 선언한) 를 넣어줌으로 res.local으로 접근해서 가져올 수가 있다!
*/
