import express from "express";


const router = express.Router();

router.get("/", (_req, res) => {
  try {
    console.log("someone pinged here");
    res.send("pong");
  }
  catch (e) {
    let message = "An unexpected error occurred.";
    if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).send(message);
  }
});

export default router;
