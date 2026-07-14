if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const DEBUG_MODE = process.env.DEBUG_MODE === "true";

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const sessionMiddleware = require("./config/session");
const csrfProtection = require("./middleware/csrf");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const isAuthenticated = require("./middleware/authMiddleware");

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 8080;

// =======================
// STATIC FILES
// =======================

app.use(express.static(
    path.join(__dirname, "public"),
    {
        etag: false,
        lastModified: false,
        setHeaders: (res) => {
            res.set("Cache-Control", "no-store");
        }
    }
));

// =======================
// SECURITY
// =======================

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"]
        }
    }
}));

// =======================
// BODY PARSERS & COOKIE
// =======================

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(cookieParser());

app.use(sessionMiddleware);
app.use("/members", isAuthenticated);

// =======================
// ROUTES
// =======================

app.use("/", contactRoutes);
app.use("/api", authRoutes);
app.use("/", adminRoutes);
app.use("/", protectedRoutes);

// =======================
// CSRF TOKEN ROUTE
// =======================

app.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({
        csrfToken: req.csrfToken()
    });
});

// =======================
// PROTECTED ROUTE
// =======================

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.send(`Welcome ${req.session.username}! You are logged in.`);
});

// =======================
// MAIN PAGE code
// =======================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// START SERVER
// =======================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// =======================
// LOG ENV VARIABLES (DEBUG)
// =======================
/*
console.log("=== ENV DEBUG START ===")
console.log("DB CONFIG:");
console.log("DB_HOST =", "process.env.DB_HOST");
console.log("DB_USER =", "process.env.DB_USER");
console.log("DB_NAME =", "process.env.DB_NAME");
console.log("DB_PORT =", "process.env.DB_PORT");

console.log("AUTH / ADMIN:")
console.log("ADMIN_USER=", "process.env.ADMIN_USER");//no quotes to get
console.log("ADMIN_PASSWORD=", "process.env.ADMIN_PASSWORD");

console.log("EMAIL:");
console.log("SMTP_USER =", process.env.SMTP_USER ? "***SET***" : "NOT SET");
console.log("SMTP_PASS =", process.env.SMTP_PASS ? "***SET***" : "NOT SET");

console.log("RESEND_API_KEY =", process.env.RESEND_API_KEY ? "***SET***" : "NOT SET");

console.log("NODE_ENV =", "process.env.NODE_ENV");

console.log("=== ENV DEBUG END ===");

*/
