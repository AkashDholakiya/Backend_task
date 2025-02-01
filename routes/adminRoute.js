import express from "express";
import { admin, adminRouter } from "../admin/admin.js";

const router = express.Router();

router.use(admin.options.rootPath, adminRouter);

export default router;