import express from "express";
import weatherService from "./services/weatherService";

const router = express.Router();

// 获取用户信息
router.get('/get_weather', weatherService.get_weather_validate ,weatherService.get_weather);


export default router;