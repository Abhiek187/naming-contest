import data from "../src/testData";
import express from "express";

const router = express.Router();
// Create a new object with keys of the contest IDs
const contests = data.contests.reduce((obj, contest) => {
	obj[contest.id] = contest;
	return obj;
}, {});

router.get("/contests", (req, res) => {
	res.send({
		contests
	});
});

// Get a dynamic contest ID route
router.get("/contests/:contestId", (req, res) => {
	const contest = contests[req.params.contestId];
	contest.description = "Chrysno's compiler error";

	res.send(contest);
});

export default router;
