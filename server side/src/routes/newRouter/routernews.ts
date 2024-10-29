import { Router } from "express";
import { addNews, deleteAllnews, deletNewsById, getallnews, updatenews } from "../../controllers/newsController/newsController";
const routernews:Router=Router();

routernews.post('/add_news',addNews);
routernews.get("/get_news",getallnews)
routernews.put("/update_news/:id",updatenews)
routernews.delete("/deletenews_id/:id",deletNewsById)
routernews.delete("/delete_news",deleteAllnews)
export default routernews