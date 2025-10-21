import type { Metadata } from "next"
import Script from "next/script"
import ClientPage from "./ClientPage"

// Export metadata for dynamic metadata (server component version)
export const metadata: Metadata = {
  title: "Kenya Safari Tours & African Travel | Eika Africa Experience",
  description:
    "Discover tailor-made safari tours across Kenya, Tanzania, and East Africa. Expert guides, private vehicles, and authentic cultural experiences. Book your unforgettable African adventure today!",
  keywords: ["Kenya safari", "African tours", "Tanzania vacation", "wildlife experience", "travel Kenya"],
}

export default function Page() {
  const faqData = [
    {
      question: "What is the best time to visit Kenya for a safari?",
      answer:
        "The best time for a Kenya safari is during the dry seasons: June to October (long dry season) and January to February (short dry season). During these periods, wildlife is more visible and concentrated around water sources.",
    },
    {
      question: "Do I need a visa to visit Kenya?",
      answer:
        "Visa requirements depend on your nationality. Most visitors need a tourist visa, which can be obtained on arrival or online. We offer visa consultancy assistance to help with your travel documents.",
    },
    {
      question: "What wildlife can I see on a Kenya safari?",
      answer:
        "Kenya is home to the Big Five (lion, leopard, elephant, buffalo, rhino) plus over 60 other large mammals and 600+ bird species. The specific animals you'll see depend on which parks and reserves you visit.",
    },
    {
      question: "Are your safaris suitable for families with children?",
      answer:
        "Yes! We offer family-friendly safari packages with flexible schedules and comfortable accommodations. Children of all ages can participate, though very young children may find some early morning drives challenging.",
    },
    {
      question: "What is included in your safari packages?",
      answer:
        "Our packages typically include accommodation, meals, professional guide services, game drives, park entrance fees, and in-country transportation. Specific inclusions vary by package.",
    },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <ClientPage faqData={faqData} />
    </>
  )
}
