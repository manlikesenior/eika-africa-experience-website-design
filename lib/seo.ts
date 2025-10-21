export const siteConfig = {
  name: "Eika Africa Experience",
  description:
    "Tailor-made safaris and immersive travel experiences across Kenya and East Africa. Expert guides, private vehicles, and authentic cultural encounters.",
  url: "https://www.eikafricaexperience.com",
  ogImage: "https://www.eikafricaexperience.com/og-image.png",
  links: {
    twitter: "https://twitter.com/eikaafrika",
    instagram: "https://www.instagram.com/eikaafricaexperience/",
    facebook: "https://www.facebook.com/profile.php?id=61575977277555",
  },
  keywords: [
    "Kenya safari tours",
    "Tanzania beach holidays",
    "East Africa travel",
    "Masai Mara safari",
    "safari packages Kenya",
    "wildlife viewing Kenya",
    "cultural tours Kenya",
    "adventure safari",
    "Zanzibar vacation",
    "tailor-made safari",
  ],
}

export const generateSchemaMarkup = (type: string, data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
  }

  switch (type) {
    case "organization":
      return {
        ...baseSchema,
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Nairobi",
          addressCountry: "KE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+254116735102",
          email: "inquiries@eikafricaexperience.com",
        },
        sameAs: [siteConfig.links.facebook, siteConfig.links.instagram, siteConfig.links.twitter],
      }

    case "tour":
      return {
        ...baseSchema,
        "@type": "TouristAttraction",
        name: data.title,
        description: data.description,
        image: data.image,
        location: {
          "@type": "Place",
          name: data.location,
          address: {
            "@type": "PostalAddress",
            addressCountry: "KE",
          },
        },
        offers: {
          "@type": "Offer",
          price: data.price.replace("From $", ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: data.rating || 4.9,
          reviewCount: data.reviews || 100,
        },
      }

    case "localBusiness":
      return {
        ...baseSchema,
        "@type": "LocalBusiness",
        name: siteConfig.name,
        image: `${siteConfig.url}/logo.png`,
        "@id": siteConfig.url,
        url: siteConfig.url,
        telephone: "+254116735102",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Nairobi",
          addressCountry: "KE",
        },
        areaServed: ["KE", "TZ", "UG"],
        serviceType: ["Safari Tours", "Travel Planning", "Hotel Booking"],
      }

    case "faq":
      return {
        ...baseSchema,
        "@type": "FAQPage",
        mainEntity: data.questions.map((q: any) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }

    default:
      return baseSchema
  }
}
