import "dotenv/config";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = process.env;

const missingOAuthVars = [
  !GITHUB_CLIENT_ID && "GITHUB_CLIENT_ID",
  !GITHUB_CLIENT_SECRET && "GITHUB_CLIENT_SECRET",
  !CALLBACK_URL && "CALLBACK_URL",
].filter(Boolean);

if (missingOAuthVars.length > 0) {
  throw new Error(
    `Missing required OAuth environment variables: ${missingOAuthVars.join(", ")}`,
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
