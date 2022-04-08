import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //form submit post 요청할때 post실횅이된다
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo); //form submit post 요청할때 post실횅이된다
videoRouter.route("/upload").get(getUpload).post(postUpload);

// \\d+: 모든 숫자 선택
export default videoRouter;
