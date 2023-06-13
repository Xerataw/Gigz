import express from "express";


const router = express.Router();

router.get("/status", (_, res) => {
	res.status(200).json({
		status: 200,
		message: "Welcome to the api!"
	})
});

export default router;
