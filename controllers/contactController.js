const logger = require("../config/logger");
const conn = require("../config/db");
const { sendContactEmail } = require("../services/emailService");
const {t} = require("../services/i18nMessages");

exports.submitContactForm = async (req, res) => {
  //console.log("REQUEST BODY:", req.body);

const lang = req.headers["accept-language"]?.split(",")[0] 

  let { name, email, comments, website } = req.body;

  if (website) {
    return res.status(400).json({
      success: false,
      message: t("BOT_DETECTED", lang),
    });
  }

  name = name?.normalize("NFKC").trim();
  email = email?.normalize("NFKC").trim();
  comments = comments?.normalize("NFKC").trim();

  if (!name || !email || !comments) {
    return res.status(400).json({
      success: false,
      message: t("REQUIRED_FIELDS", lang),
    });
  }

  //5000 instead of 1000 for sending contact messages
  const MAX_COMMENT_LENGTH = 5000;
  if (name.length > 100 || email.length > 100 || comments.length > MAX_COMMENT_LENGTH) {
    return res.status(400).json({
      success: false,
      message: t("TOO_LONG", lang),
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: t("INVALID_EMAIL", lang),
    });
  }

  conn.execute(
    "INSERT INTO users (name,email,comments) VALUES (?,?,?)",
    [name, email, comments],
    async (err) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).json({
          success: false,
          message: t("DB_ERROR", lang),
        });
      }

      try {
        await sendContactEmail({ name, email, comments });

        res.json({
          success: true,
          message: t("EMAIL_SENT", lang),   // "Your message has been sent"
        });
      } catch (err) {
        console.error("EMAIL ERROR:", err);

        res.json({
          success: true,
          message: t("EMAIL_SAVED", lang)   //"Your message has been saved",
        });
      }
    }
  );
};
