🧠 Purpose of this project
This project (A) is the learning and development source.
It evolves over time and is used to generate updates for Project B.
________________________________________
🟢 CORE (shared system code)
These files define how the application works.
They are intended to be reused or synced into Project B.
Backend (Node/Express logic)
•	server.js 
•	config/db.js 
•	config/logger.js 
•	config/session.js 
________________________________________
Controllers (application logic)
•	controllers/adminController.js 
•	controllers/authController.js 
•	controllers/contactController.js 
________________________________________
Middleware (security / request handling)
•	middleware/adminAuth.js 
•	middleware/authMiddleware.js 
•	middleware/csrf.js 
________________________________________
Routes (API / navigation logic)
•	routes/adminRoutes.js 
•	routes/authRoutes.js 
•	routes/contactRoutes.js 
•	routes/protectedRoutes.js 
________________________________________
Services (backend utilities)
•	services/csvEmailService.js 
•	services/csvService.js 
•	services/emailService.js 
________________________________________
Frontend logic (CORE JS inside public)
These are application behavior scripts, not content:
•	public/assets/js/login_logout.js 
•	public/assets/js/protected_page_advice_link.js 
•	public/assets/js/script.js 
•	public/assets/js/script_Carousel.js 
•	public/assets/js/slideshow_responsiveCarousel.js 
________________________________________
Styling system (CORE CSS)
•	public/assets/css/styles_Dark_Chocolate_0f_login.css 
•	public/assets/css/styles_Form_0b.css 
•	public/assets/css/styles_modern_reset_0c.css 
•	public/assets/css/slideshow_responsiveCarousel.css 
________________________________________
🟡 CONTENT (project-specific / business data)
These files define what the website says and shows, not how it works.
Pages (HTML content)
•	public/about.html 
•	public/contact_info.html 
•	public/Chocolate_Brands.html 
•	public/Chocolate_Eating_Advice.html 
•	public/why_cocoa_is_dangerous.html 
•	public/index.html (depends: CORE or CONTENT depending on usage) 
________________________________________
Images (visual content)
•	public/assets/images/cacao_pods.jpeg 
•	public/assets/images/cacao_pod_with_beans.jpeg 
•	public/assets/images/dark_chocolate.jpeg 
•	public/assets/images/dark_chocolate2.jpeg 
•	public/assets/images/dark_chocolate3.jpeg 
•	public/assets/images/dark_chocolate4.jpeg 
________________________________________
🟠 MIXED / FUTURE DECISION AREA
These may move later depending on architecture:
•	index.html → could become CORE template or CONTENT homepage 
•	Any HTML files that later become dynamic/templates 
________________________________________
⚙️ Important rule for Project A
CORE code should evolve carefully and intentionally.
CONTENT files can change freely (text, images, structure).
