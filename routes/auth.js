import express from "express";
import passport from "passport";

const router = express.Router();

const githubAuth = passport.authenticate("github", { scope: ["profile", "email"] });
const githubCallback = passport.authenticate("github", {
  failureRedirect: "/",
});

router.get("/login", githubAuth);
router.get("/github", githubAuth);

router.get("/callback", githubCallback, (req, res) => {
  res.redirect("/api-docs");
});
router.get("/github/callback", githubCallback, (req, res) => {
  res.redirect("/api-docs");
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
