const seoData = {
  headline: document.title,
  description: document.querySelector('meta[name="description"]').content,
  url: window.location.href,
  author: "LanaP",

  // Keep these fixed unless you actually edit the article
    datePublished: "2026-06-25",
    dateModified: "2026-06-25"
};


// ===== Article schema =====

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: seoData.headline,
  description: seoData.description,
  author: {
    "@type": "Person",
    name: seoData.author
  },
  datePublished: seoData.datePublished,  //new Date().toISOString().split("T")[0],
  dateModified: seoData.dateModified,  //new Date().toISOString().split("T")[0],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": seoData.url
  }
};

// ===== FAQ schema =====

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Is dark chocolate healthy?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Dark chocolate contains antioxidants and flavonoids that may support heart health when consumed in moderation."
            }
        },
        {
            "@type": "Question",
            name: "How much dark chocolate is safe to eat daily?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most studies recommend about 30 to 60 grams of dark chocolate per day."
            }
        }
    ]
};


// ===== Function that inserts one JSON-LD script =====

function addJsonLd(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document
        .getElementById("ld-json-container")
        .appendChild(script);
}

// ===== Generate all schemas =====

addJsonLd(articleSchema);
addJsonLd(faqSchema);


/* these are from the previous version
const scriptTag = document.getElementById("ld-json");
scriptTag.type = "application/ld+json";
scriptTag.textContent = JSON.stringify(jsonLd, null, 2);
*/


const questions = document.querySelectorAll(".faq-question");
const answers = document.querySelectorAll(".faq-answer");

const faqItems = [];

for (let i = 0; i < questions.length; i++) {

    const questionText = questions[i].textContent.trim();
    const answerText = answers[i]?.textContent.trim() || "";

    faqItems.push({
        "@type": "Question",
        name: questionText,
        acceptedAnswer: {
            "@type": "Answer",
            text: answerText
        }
    });
}
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems
};
function addJsonLd(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.getElementById("ld-json-container").appendChild(script);
}

addJsonLd(faqSchema);

