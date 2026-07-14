/**************************************************************************
 * SEO / Structured Data
 *
 * This script creates JSON-LD schemas for:
 *
 * 1. LearningResource
 * 2. FAQPage
 *
 * The FAQ is generated automatically from the visible page.
 **************************************************************************/
/**********************************************************************
 * BASIC PAGE INFORMATION
 *
 * Read information that already exists inside the HTML page.
 **********************************************************************/
const seoData = {
    // <title>...</title>
    headline: document.title,

    // <meta name="description"...>
    description:
        document.querySelector('meta[name="description"]')?.content || "",

    // Current page URL
    url: window.location.href,

    // <html lang="...">
    language:
        document.documentElement.lang || "sr",

    author: "LanaP",

    // Change these when you publish or edit the page.
    datePublished: "2026-06-25",
    dateModified: "2026-06-25"
};

/**********************************************************************
 * LEARNING RESOURCE SCHEMA
 **********************************************************************/
const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    headline: seoData.headline,
    description: seoData.description,
    inLanguage: seoData.language,
    educationalLevel: "Beginner",
    learningResourceType: "Lesson",
    author: {
        "@type": "Person",
        name: seoData.author
    },
    datePublished: seoData.datePublished,
    dateModified: seoData.dateModified,
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": seoData.url
    }
};

/**********************************************************************
 * BUILD FAQ AUTOMATICALLY
 *
 * Every visible
 *
 * class="faq-question"
 *
 * and
 *
 * class="faq-answer"
 *
 * becomes JSON-LD automatically.
 **********************************************************************/
const questions =
    document.querySelectorAll(".faq-question");
const answers =
    document.querySelectorAll(".faq-answer");
const faqItems = [];
for (let i = 0; i < questions.length; i++) {
    faqItems.push({
        "@type": "Question",
        name: questions[i].textContent.trim(),
        acceptedAnswer: {
            "@type": "Answer",
            text: answers[i]?.textContent.trim() || ""
        }
    });
}

/**********************************************************************
 * FAQ SCHEMA
 **********************************************************************/
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems
};

/**********************************************************************
 * Helper function
 *
 * Adds one JSON-LD script to the page.
 **********************************************************************/
function addJsonLd(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document
        .getElementById("ld-json-container")
        .appendChild(script);
}

/**********************************************************************
 * Create schemas
 **********************************************************************/
addJsonLd(learningResourceSchema);
addJsonLd(faqSchema);
