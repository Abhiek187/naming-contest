import data from "../src/testData";
import express from "express";

const router = express.Router();

router.get("/contests", (req, res) => {
	res.send({ contests: data.contests });
});

export default router;
