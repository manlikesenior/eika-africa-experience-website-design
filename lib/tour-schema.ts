export const createTourSchema = (tour: any, baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${baseUrl}/experiences/${tour.id}`,
    name: tour.title,
    description: tour.overview,
    image: tour.heroImage,
    url: `${baseUrl}/experiences/${tour.id}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: tour.location,
      addressCountry: "KE",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: tour.price.replace("From $", ""),
      highPrice: tour.price.replace("From $", ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/booking?tourId=${tour.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating || 4.9,
      reviewCount: tour.reviews || 100,
      bestRating: "5",
      worstRating: "1",
    },
    duration: `P${tour.duration.split(" ")[0]}D`,
    itinerary: tour.itinerary?.map((day: any) => ({
      "@type": "Place",
      name: day.title,
      description: day.description,
    })),
  }
}

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
