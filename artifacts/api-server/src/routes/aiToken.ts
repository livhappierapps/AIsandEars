import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/ai-token", async (_req, res) => {
  res.status(410).json({
    error: "deprecated",
    message: "This endpoint is no longer used in AIs&Ears.",
  });
});

export default router;
