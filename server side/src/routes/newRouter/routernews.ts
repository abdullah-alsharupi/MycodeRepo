import { Router } from "express";
import { addNews, deleteAllnews, deletNewsById, getallnews, updatenews } from "../../controllers/newsController/newsController";
const routernews:Router=Router();

routernews.post('/add_news',addNews);
routernews.get("/get_news",getallnews)
routernews.post("/update_news/:id",updatenews)
routernews.post("/deletenews_id/:id",deletNewsById)
routernews.post("/delete_news",deleteAllnews)
export default routernews