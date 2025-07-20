// Mock data for Netflix Detergent

export const products = [
  {
    id: 1,
    name: "Action Apple Rush",
    genre: "Action",
    description: "Explosive scent with high-adrenaline freshness. Perfect for action-packed wash cycles.",
    price: 299,
    image: "https://images.unsplash.com/photo-1655357443997-f38efd09885b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxkZXRlcmdlbnQlMjBib3R0bGVzfGVufDB8fHxyZWR8MTc1MzAxNjkzOXww&ixlib=rb-4.1.0&q=85",
    soundEffect: "explosive-wash.mp3",
    color: "bg-red-600"
  },
  {
    id: 2,
    name: "Romantic Rose Rinse",
    genre: "Romance",
    description: "A passionate floral ride that makes your clothes fall in love with freshness.",
    price: 349,
    image: "https://images.unsplash.com/photo-1631521316445-f044306e6d1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxkZXRlcmdlbnQlMjBib3R0bGVzfGVufDB8fHxyZWR8MTc1MzAxNjkzOXww&ixlib=rb-4.1.0&q=85",
    soundEffect: "romantic-rinse.mp3",
    color: "bg-pink-600"
  },
  {
    id: 3,
    name: "Suspense Citrus Soak",
    genre: "Thriller",
    description: "Keeps your clothes — and you — on edge with mysterious citrus freshness.",
    price: 329,
    image: "https://images.unsplash.com/photo-1646678186353-3fae446d787c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxkZXRlcmdlbnQlMjBib3R0bGVzfGVufDB8fHxyZWR8MTc1MzAxNjkzOXww&ixlib=rb-4.1.0&q=85",
    soundEffect: "suspense-soak.mp3",
    color: "bg-orange-600"
  },
  {
    id: 4,
    name: "Comedy Cotton Cleanse",
    genre: "Sitcom",
    description: "Bursts of citrus and unexpected laughs. Your laundry has never been this funny.",
    price: 279,
    image: "https://images.unsplash.com/photo-1655357443997-f38efd09885b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxkZXRlcmdlbnQlMjBib3R0bGVzfGVufDB8fHxyZWR8MTc1MzAxNjkzOXww&ixlib=rb-4.1.0&q=85",
    soundEffect: "comedy-cleanse.mp3",
    color: "bg-yellow-600"
  },
  {
    id: 5,
    name: "Drama Deep Clean",
    genre: "Drama",
    description: "Emotional intensity meets deep cleaning power. Perfect for life's dramatic moments.",
    price: 399,
    image: "https://images.unsplash.com/photo-1631521316445-f044306e6d1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxkZXRlcmdlbnQlMjBib3R0bGVzfGVufDB8fHxyZWR8MTc1MzAxNjkzOXww&ixlib=rb-4.1.0&q=85",
    soundEffect: "drama-deep.mp3",
    color: "bg-purple-600"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "I cried during the rinse cycle. 10/10. Best detergent series I've ever binged!",
    avatar: "SM"
  },
  {
    id: 2,
    name: "Mike R.",
    rating: 5,
    text: "Smells like plot twists and closure. My clothes have never had such character development.",
    avatar: "MR"
  },
  {
    id: 3,
    name: "Jessica L.",
    rating: 5,
    text: "Better than season finales. Fresher too. Can't wait for the next episode... I mean wash.",
    avatar: "JL"
  },
  {
    id: 4,
    name: "David K.",
    rating: 5,
    text: "Finally, a detergent with a compelling storyline. My washing machine has become a home theater.",
    avatar: "DK"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "The Casual Binger",
    price: 499,
    duration: "month",
    features: [
      "6 Genre Wash Packs",
      "Basic Sound Effects",
      "Standard Freshness",
      "Mobile App Access"
    ],
    popular: false
  },
  {
    id: 2,
    name: "The Premium Watcher",
    price: 899,
    duration: "month",
    features: [
      "12 Genre Wash Packs",
      "Premium Sound Library",
      "HD Freshness Quality",
      "Priority Customer Support",
      "Bonus Seasonal Scents"
    ],
    popular: true
  },
  {
    id: 3,
    name: "The Binge God",
    price: 1499,
    duration: "month",
    features: [
      "Unlimited Genre Access",
      "4K Ultra Freshness",
      "Early Access to New Scents",
      "Limited Edition Merch",
      "Personal Wash Consultant",
      "Behind-the-Scenes Content"
    ],
    popular: false
  }
];

export const moods = [
  {
    emoji: "😍",
    name: "Excited",
    scent: "Action Apple Rush",
    description: "High-energy freshness for your adventurous moments"
  },
  {
    emoji: "😴",
    name: "Relaxed",
    scent: "Romantic Rose Rinse",
    description: "Soothing floral notes for your peaceful evenings"
  },
  {
    emoji: "😡",
    name: "Frustrated",
    scent: "Suspense Citrus Soak",
    description: "Intense citrus to clear your mind and clothes"
  },
  {
    emoji: "😂",
    name: "Happy",
    scent: "Comedy Cotton Cleanse",
    description: "Bright and cheerful scents for joyful moments"
  },
  {
    emoji: "😢",
    name: "Emotional",
    scent: "Drama Deep Clean",
    description: "Deep, meaningful freshness for life's big moments"
  }
];

export const features = [
  {
    id: 1,
    title: "Binge-Wash SoundFX™",
    description: "Every wash is accompanied by Netflix-style soundtracks that make laundry cinematic.",
    icon: "🎬",
    demo: true
  },
  {
    id: 2,
    title: "Genre-Scented Washes",
    description: "Each detergent bottle represents a different entertainment genre with unique scents.",
    icon: "🧼",
    demo: true
  },
  {
    id: 3,
    title: "MoodMatch™ AI Scent Selector",
    description: "Our AI matches your current mood to the perfect scent, just like Netflix recommendations.",
    icon: "🧠",
    demo: true
  },
  {
    id: 4,
    title: "Smart Laundry Companion App",
    description: "Control your washing machine like a Netflix interface with Continue Washing and Skip Intro.",
    icon: "📱",
    demo: false
  }
];

// Audio simulation data
export const audioEffects = {
  "netflix-intro": {
    name: "Netflix Intro",
    duration: 2000,
    description: "The iconic Netflix 'ta-dum' sound"
  },
  "bubble-pop": {
    name: "Bubble Pop",
    duration: 500,
    description: "Satisfying bubble popping sounds"
  },
  "washing-cycle": {
    name: "Washing Cycle",
    duration: 3000,
    description: "Cinematic washing machine sounds"
  }
};