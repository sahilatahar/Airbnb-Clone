export interface Photo {
    id: number;
    src: string;
    title: string;
    category:
        "Living room" | "Bedroom" | "Patio & Jacuzzi" | "Exterior" | "Amenities" | "All";
    description?: string;
}

export interface TourCategory {
    id: string;
    title: string;
    subtitle: string;
    photos: Photo[];
}

export interface Review {
    id: string;
    name: string;
    avatar?: string;
    initial?: string;
    avatarBg?: string;
    tenure: string;
    rating: number;
    date: string;
    comment: string;
    longComment?: string;
}

export interface CoHost {
    name: string;
    avatar?: string;
    initial?: string;
    avatarBg?: string;
}

export interface NearbyStay {
    id: string;
    title: string;
    image: string;
    price: string;
    rating: number;
}

export interface AmenityItem {
    icon: string;
    name: string;
    description?: string;
    available: boolean;
}

export interface AmenityCategory {
    category: string;
    items: AmenityItem[];
}

export interface ListingData {
    id: string;
    title: string;
    location: string;
    propertyType: string;
    specs: {
        guests: number;
        bedrooms: number;
        beds: number;
        bathrooms: number;
    };
    rating: number;
    reviewsCount: number;
    isGuestFavourite: boolean;
    host: {
        name: string;
        yearsHosting: number;
        avatar: string;
        badgeAvatar: string;
        totalReviews: number;
        rating: number;
        responseRate: string;
        responseTime: string;
        bornIn: string;
        school: string;
        coHosts: CoHost[];
    };
    pricing: {
        pricePerNight: number;
        currency: string;
        currencySymbol: string;
        defaultNights: number;
        totalBasePrice: number;
        discountNotice: string;
        freeCancellationDate: string;
    };
    highlights: {
        icon: string;
        title: string;
        description: string;
    }[];
    translationNotice: {
        text: string;
        action: string;
    };
    description: {
        preview: string;
        full: string[];
    };
    sleepingArrangements: {
        room: string;
        bedType: string;
        image: string;
    }[];
    categoryRatings: {
        category: string;
        score: number;
        icon: string;
    }[];
    ratingDistribution: {
        stars: number;
        percentage: number;
    }[];
    reviewTags: {
        label: string;
        icon?: string;
        count: number;
    }[];
    reviews: Review[];
    locationDetails: {
        area: string;
        city: string;
        state: string;
        country: string;
        mapImage: string;
        neighbourhoodHighlights: string;
    };
    thingsToKnow: {
        cancellationPolicy: {
            title: string;
            details: string[];
        };
        houseRules: {
            title: string;
            rules: string[];
        };
        safetyAndProperty: {
            title: string;
            items: string[];
        };
    };
    photos: Photo[];
    tourCategories: TourCategory[];
    amenityCategories: AmenityCategory[];
    nearbyStays: NearbyStay[];
}

const livingRoom1Photos: Photo[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=1000&fit=crop&q=85",
        title: "Grand Living Durbar",
        category: "Living room",
        description:
            "16-foot vaulted ceilings with Belgian crystal chandeliers, custom diwan seating, and floor-to-ceiling garden views.",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop&q=85",
        title: "Plush Velvet Seating & Teak Coffee Table",
        category: "Living room",
        description:
            "Comfortable deep-cushioned velvet sofa with handcrafted sheesham wood coffee table and Rajasthani brass decor.",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=85",
        title: "Handcrafted Heritage Armchairs",
        category: "Living room",
        description:
            "Cozy reading nook with ergonomic upholstered heritage chairs and warm ambient lamp lighting.",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=1000&fit=crop&q=85",
        title: "Evening Ambient Illumination in Main Hall",
        category: "Living room",
        description:
            "Soft mood lighting highlighting Mewari stone arches and curated contemporary Indian artwork.",
    },
];

const livingRoom2Photos: Photo[] = [
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop&q=85",
        title: "Sunken Fireplace Lounge & Jharokha",
        category: "Living room",
        description:
            "Intimate sunken living salon featuring an indoor modern fireplace, teak ceiling fan, and garden veranda access.",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop&q=85",
        title: "Private Hydrotherapy Jacuzzi Hot Tub",
        category: "Patio & Jacuzzi",
        description:
            "Adjacent private temperature-controlled hydrotherapy hot tub with evening LED lighting and mountain views.",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&fit=crop&q=85",
        title: "Relaxation Recliner Corner",
        category: "Living room",
        description:
            "Reclining leather lounge chairs overlooking the tranquil central water fountain.",
    },
];

const fullKitchenPhotos: Photo[] = [
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&h=1000&fit=crop&q=85",
        title: "Chef's Gourmet Kitchen & Island",
        category: "Amenities",
        description:
            "Italian marble countertops, Sub-Zero refrigerator, gas cooktop, microwave oven, and complete culinary cookware.",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop&q=85",
        title: "10-Seater Solid Wood Dining Durbar",
        category: "Amenities",
        description:
            "Custom solid sheesham dining table set with handmade ceramic dinnerware and brass cutlery.",
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&q=85",
        title: "Artisanal Espresso & Masala Chai Bar",
        category: "Amenities",
        description:
            "Dedicated beverage station with Italian espresso machine, electric kettle, and organic Rajasthani teas.",
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&h=1000&fit=crop&q=85",
        title: "Pantry & Wine Storage",
        category: "Amenities",
        description:
            "Fully stocked pantry with wine glasses, decanter set, and refrigerator beverage cooler.",
    },
];

const bedroomPhotos: Photo[] = [
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&h=1000&fit=crop&q=85",
        title: "Maharaja Master King Suite",
        category: "Bedroom",
        description:
            "Four-poster carved teak king bed, private sunrise balcony overlooking the Aravalli hills, and organic cotton linens.",
    },
    {
        id: 13,
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop&q=85",
        title: "Aravalli View Balcony Suite",
        category: "Bedroom",
        description:
            "Second plush king bedroom with ensuite marble bathroom, dressing alcove, and private mountain-facing terrace.",
    },
    {
        id: 14,
        src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop&q=85",
        title: "Courtyard Garden Suite",
        category: "Bedroom",
        description:
            "Ground-floor bedroom opening directly to the private fountain courtyard and fragrant frangipani trees.",
    },
    {
        id: 15,
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&h=1000&fit=crop&q=85",
        title: "Lotus Pavilion Double Room",
        category: "Bedroom",
        description:
            "Spacious guest suite featuring two comfortable double beds, reading lamps, and heavy silk blackout drapery.",
    },
];

const fullBathroomPhotos: Photo[] = [
    {
        id: 16,
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=1000&fit=crop&q=85",
        title: "Carved Stone Soaking Tub & Garden View",
        category: "Amenities",
        description:
            "Hand-carved sandstone soaking tub with natural botanical bath salts, rain shower, and outdoor greenery vistas.",
    },
    {
        id: 17,
        src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=85",
        title: "Regal Double Vanity & Backlit Mirrors",
        category: "Amenities",
        description:
            "Italian marble double vanity equipped with Dyson Supersonic hair dryer and Forest Essentials toiletries.",
    },
    {
        id: 18,
        src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop&q=85",
        title: "Walk-in Thermostatic Rain Shower",
        category: "Amenities",
        description:
            "Spacious walk-in shower with overhead ceiling rain head, handheld wand, and frameless glass partition.",
    },
];

const gymPhotos: Photo[] = [
    {
        id: 19,
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=1000&fit=crop&q=85",
        title: "Private Fitness & Yoga Studio",
        category: "Amenities",
        description:
            "Air-conditioned private fitness studio with floor-to-ceiling mirrors, rubber shock flooring, and garden view.",
    },
    {
        id: 20,
        src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop&q=85",
        title: "Cardio & Free Weights Equipment",
        category: "Amenities",
        description:
            "Commercial treadmill, stationary spin bike, kettlebells, dumbbells (5-50 lbs), and resistance bands.",
    },
    {
        id: 21,
        src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=800&fit=crop&q=85",
        title: "Cedar Dry Sauna & Wellness Lounge",
        category: "Amenities",
        description:
            "Traditional cedar wood thermal dry sauna with aromatherapy infusion and post-workout relaxation bench.",
    },
];

const exteriorPoolPhotos: Photo[] = [
    {
        id: 22,
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=1000&fit=crop&q=85",
        title: "Temperature-Controlled Heated Pool",
        category: "Exterior",
        description:
            "Private stone plunge pool with crystal-clear heated water, submerged seating steps, and night illumination.",
    },
    {
        id: 23,
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=85",
        title: "Poolside Sun Loungers & Cabanas",
        category: "Exterior",
        description:
            "Cushioned poolside sun loungers under shaded jharokha pavilions with fresh poolside towel service.",
    },
    {
        id: 24,
        src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=85",
        title: "Traditional Mewari Arches & Courtyard",
        category: "Exterior",
        description:
            "Carved sandstone jharokhas, heritage archways, and vibrant flowering bougainvillea lining the villa walls.",
    },
    {
        id: 25,
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&h=1000&fit=crop&q=85",
        title: "Fountain Courtyard & Frangipani Garden",
        category: "Exterior",
        description:
            "Central courtyard garden featuring a tranquil stone fountain, evening candle lanterns, and fragrant blossoms.",
    },
];

const additionalPhotos: Photo[] = [
    {
        id: 26,
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop&q=85",
        title: "Rooftop Stargazing Machan at Twilight",
        category: "Patio & Jacuzzi",
        description:
            "Elevated rooftop viewing deck offering unobstructed 360° panoramic vistas of the sunset and evening stars.",
    },
    {
        id: 27,
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&q=85",
        title: "Scenic Aravalli Mountain Sunset Panorama",
        category: "Exterior",
        description:
            "Spectacular golden-hour sunset over the majestic Aravalli hills visible right from the villa terrace.",
    },
    {
        id: 28,
        src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop&q=85",
        title: "Private Gated Estate Grand Entrance",
        category: "Exterior",
        description:
            "Secure private entrance with handcrafted wrought-iron gates, security checkpoint, and covered parking.",
    },
];

const allPhotos: Photo[] = [
    ...livingRoom1Photos,
    ...livingRoom2Photos,
    ...fullKitchenPhotos,
    ...bedroomPhotos,
    ...fullBathroomPhotos,
    ...gymPhotos,
    ...exteriorPoolPhotos,
    ...additionalPhotos,
];

const tourCategoriesList: TourCategory[] = [
    {
        id: "living-room-1",
        title: "Living room 1",
        subtitle:
            'Sofa · Air conditioning · Ceiling fan · 65" 4K TV · Belgian crystal chandelier',
        photos: livingRoom1Photos,
    },
    {
        id: "living-room-2",
        title: "Living room 2",
        subtitle:
            "Ceiling fan · Private hot tub & jacuzzi · Recliner seating · Fireplace lounge",
        photos: livingRoom2Photos,
    },
    {
        id: "full-kitchen",
        title: "Full kitchen",
        subtitle:
            "Sub-Zero refrigerator · Microwave · Dishwasher · Gas stove · Espresso bar",
        photos: fullKitchenPhotos,
    },
    {
        id: "bedroom",
        title: "Bedroom",
        subtitle:
            "King bed · Ensuite bath · Mountain view balcony · Room-darkening shades",
        photos: bedroomPhotos,
    },
    {
        id: "full-bathroom",
        title: "Full bathroom",
        subtitle:
            "Carved stone soaking tub · Rain shower · Double vanity · Forest Essentials toiletries",
        photos: fullBathroomPhotos,
    },
    {
        id: "gym",
        title: "Gym & Wellness",
        subtitle: "Treadmill · Yoga mats & blocks · Dumbbells · Cedar dry sauna",
        photos: gymPhotos,
    },
    {
        id: "exterior-pool",
        title: "Exterior & Pool",
        subtitle:
            "Heated plunge pool · Sun loungers · Jharokha cabanas · Landscaped courtyards",
        photos: exteriorPoolPhotos,
    },
    {
        id: "additional-photos",
        title: "Additional photos",
        subtitle:
            "Aravalli sunset terrace · Night illumination · Bonfire lounge · Private entrance",
        photos: additionalPhotos,
    },
];

export const listingData: ListingData = {
    id: "the-royal-aravalli-pavilion-udaipur",
    title: "The Royal Aravalli Pavilion – Luxury Pool Villa & Spa",
    location: "Udaipur, Rajasthan, India",
    propertyType: "Entire luxury heritage villa in Udaipur, India",
    specs: {
        guests: 8,
        bedrooms: 4,
        beds: 4,
        bathrooms: 4.5,
    },
    rating: 4.96,
    reviewsCount: 86,
    isGuestFavourite: true,
    host: {
        name: "Maharaj Ranveer & Gayatri Singh",
        yearsHosting: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80",
        badgeAvatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80",
        totalReviews: 540,
        rating: 4.96,
        responseRate: "100%",
        responseTime: "Responds within an hour",
        bornIn: "Born in Rajasthan",
        school: "Where I went to school: Mayo College, Ajmer",
        coHosts: [
            {
                name: "Harshvardhan",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            },
            {
                name: "Radhika",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
            },
            {
                name: "Vikram",
                initial: "V",
                avatarBg: "bg-avatar-amber text-white",
            },
            {
                name: "Priya",
                initial: "P",
                avatarBg: "bg-avatar-purple text-white",
            },
            {
                name: "Ananya",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
            },
            {
                name: "Devika",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
            },
            {
                name: "Kunal",
                initial: "K",
                avatarBg: "bg-avatar-teal text-white",
            },
            {
                name: "Sameer",
                initial: "S",
                avatarBg: "bg-avatar-red text-white",
            },
        ],
    },
    pricing: {
        pricePerNight: 24500,
        currency: "INR",
        currencySymbol: "₹",
        defaultNights: 5,
        totalBasePrice: 122500,
        discountNotice: "Get 10% off your next stay. Terms apply",
        freeCancellationDate: "14 October",
    },
    highlights: [
        {
            icon: "umbrella",
            title: "Private heated pool & courtyard",
            description:
                "Private stone plunge pool, heated hydrotherapy jacuzzi, and traditional jharokha sun loungers.",
        },
        {
            icon: "wind",
            title: "Designed for royal comfort",
            description:
                "Multi-zone air conditioning, thick heritage stone insulation, and custom teak ceiling fans.",
        },
        {
            icon: "key",
            title: "Dedicated butler & self check-in",
            description:
                "Personal concierge welcome on arrival with 24/7 estate assistance.",
        },
    ],
    translationNotice: {
        text: "Some info has been automatically translated.",
        action: "Show original",
    },
    description: {
        preview:
            "👑 Experience regal Mewari luxury at The Royal Aravalli Pavilion! 🦚 Nestled against the backdrop of the rugged Aravalli hills and minutes from Udaipur's iconic lakes, this private 4BHK palace villa features a private heated pool 🏊, traditional marble jharokhas, a sunset terrace 🌅, handcrafted teak interiors, and a personal chef upon request. Perfect for families, wedding parties, and travelers seeking an unforgettable royal Rajasthani getaway.",
        full: [
            "👑 Experience regal Mewari luxury at The Royal Aravalli Pavilion! 🦚",
            "Nestled against the backdrop of the rugged Aravalli hills and minutes from Udaipur's iconic lakes, this private 4BHK palace villa features a private heated pool 🏊, traditional marble jharokhas, a sunset terrace 🌅, handcrafted teak interiors, and a personal chef upon request.",
            "The space:",
            "• Maharaja Master Suite: Custom four-poster king bed, private sunrise terrace with hill views, hand-painted Mewari frescoes, and ensuite royal bath with a carved stone tub.",
            "• Aravalli View Suite: Plush king bed, private balcony overlooking the courtyards, dressing area, and rain shower.",
            "• Courtyard Garden Suites: Two private suites with direct access to the lotus pond and fragrant frangipani courtyard.",
            "• Grand Living Durbar: 16-foot vaulted ceilings, Belgian crystal chandeliers, bespoke royal diwan seating, and Bang & Olufsen sound.",
            "• Private Pool & Spa: Temperature-controlled courtyard pool, heated jacuzzi, and rooftop stargazing machan.",
            "• Gourmet Kitchen & Dining: Fully equipped modern kitchen with a 10-seater solid sheesham dining table.",
            "Guest access:",
            "Guests enjoy exclusive private access to the entire 6,000 sq ft gated estate, private pool, landscaped gardens, private parking, and rooftop terrace.",
        ],
    },
    sleepingArrangements: [
        {
            room: "Maharaja Master Suite",
            bedType: "1 king bed",
            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=85",
        },
        {
            room: "Aravalli View Suite",
            bedType: "1 king bed",
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop&q=85",
        },
        {
            room: "Courtyard Garden Suite",
            bedType: "1 queen bed",
            image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop&q=85",
        },
        {
            room: "Lotus Pavilion Room",
            bedType: "2 double beds",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop&q=85",
        },
    ],
    categoryRatings: [
        { category: "Cleanliness", score: 5.0, icon: "sparkles" },
        { category: "Accuracy", score: 5.0, icon: "check-circle" },
        { category: "Check-in", score: 5.0, icon: "key" },
        { category: "Communication", score: 5.0, icon: "message-square" },
        { category: "Location", score: 4.9, icon: "map-pin" },
        { category: "Value", score: 4.9, icon: "tag" },
    ],
    ratingDistribution: [
        { stars: 5, percentage: 96 },
        { stars: 4, percentage: 4 },
        { stars: 3, percentage: 0 },
        { stars: 2, percentage: 0 },
        { stars: 1, percentage: 0 },
    ],
    reviewTags: [
        { icon: "🛋", label: "Royal Comfort", count: 32 },
        { icon: "✓", label: "Accuracy", count: 24 },
        { icon: "♨", label: "Private Pool", count: 38 },
        { icon: "★", label: "Hill Views", count: 45 },
        { icon: "♥", label: "Hospitality", count: 56 },
        { icon: "✧", label: "Cleanliness", count: 36 },
        { icon: "✦", label: "Heritage Decor", count: 29 },
    ],
    reviews: [
        {
            id: "rev-1",
            name: "Aditya",
            initial: "A",
            avatarBg: "bg-avatar-amber text-white",
            tenure: "3 years on Airbnb",
            rating: 5,
            date: "1 week ago",
            comment:
                "An unforgettable royal experience! The heated pool and mountain views in Udaipur are sublime. Ranveer and the staff treated us like royalty.",
        },
        {
            id: "rev-2",
            name: "Meera & Siddharth",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
            tenure: "5 years on Airbnb",
            rating: 5,
            date: "2 weeks ago",
            comment:
                "This villa exceeded all our expectations. The heritage architecture combined with modern luxury amenities made our family holiday truly special. The courtyard breakfast was delicious and the sunset over the Aravalli hills from the rooftop is breathtaking.",
            longComment:
                "This villa exceeded all our expectations. The heritage architecture combined with modern luxury amenities made our family holiday truly special. The courtyard breakfast was delicious and the sunset over the Aravalli hills from the rooftop is breathtaking. The caretaker Harshvardhan was prompt and helpful throughout. 10/10 recommendation for Udaipur!",
        },
        {
            id: "rev-3",
            name: "Rohini Sen",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
            tenure: "2 years on Airbnb",
            rating: 5,
            date: "May 2026",
            comment:
                "Spotless cleanliness, peaceful ambiance, and exquisite interiors. Felt completely safe and pampered.",
        },
        {
            id: "rev-4",
            name: "Rohan & Priya",
            initial: "R",
            avatarBg: "bg-avatar-purple text-white",
            tenure: "4 years on Airbnb",
            rating: 5,
            date: "May 2026",
            comment:
                "We celebrated our anniversary at The Royal Pavilion. The private pool and candlelit courtyard dinner arranged by the host made it magical.",
            longComment:
                "We celebrated our anniversary at The Royal Pavilion. The private pool and candlelit courtyard dinner arranged by the host made it magical. The rooms are grand and spacious with top-tier linens and air conditioning. Highly recommended for couples and families alike.",
        },
        {
            id: "rev-5",
            name: "Devansh Mehta",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            tenure: "6 years on Airbnb",
            rating: 5,
            date: "April 2026",
            comment:
                "Magnificent property in a prime yet serene location in Udaipur. Fast Wi-Fi, great food options, and five-star hospitality.",
        },
        {
            id: "rev-6",
            name: "Tanya Kapoor",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
            tenure: "4 years on Airbnb",
            rating: 5,
            date: "April 2026",
            comment:
                "Pictures don't do justice to the scale and beauty of this villa. Looking forward to returning with friends soon!",
        },
    ],
    locationDetails: {
        area: "Lake Pichola & Aravalli Foothills",
        city: "Udaipur",
        state: "Rajasthan",
        country: "India",
        mapImage:
            "https://media.istockphoto.com/id/1365706213/vector/usa-vector-linear-map-thin-line-united-states-map.jpg?s=612x612&w=0&k=20&c=9dCdb_cIEIepz7LPChY-aatYHnSngonNftS8VDDXnfk=",
        neighbourhoodHighlights:
            "Situated in the tranquil foothills of the Aravalli range, enjoy secluded palace privacy while being only 10 minutes from City Palace, Lake Pichola, Saheliyon-ki-Bari, and fine-dining rooftop restaurants.",
    },
    thingsToKnow: {
        cancellationPolicy: {
            title: "Cancellation policy",
            details: [
                "Free cancellation before 14 October. Cancel before check-in on 18 October for a partial refund.",
                "Review the host's full cancellation policy for comprehensive terms.",
            ],
        },
        houseRules: {
            title: "House rules",
            rules: [
                "Check-in after 2:00 pm",
                "Checkout before 11:00 am",
                "8 guests maximum",
                "Smoking allowed in outdoor courtyards only",
            ],
        },
        safetyAndProperty: {
            title: "Safety & property",
            items: [
                "Gated estate with 24/7 security guard on premises",
                "Smoke alarms & fire safety equipment installed",
                "First aid kit and emergency medical support available",
            ],
        },
    },
    photos: allPhotos,
    tourCategories: tourCategoriesList,
    amenityCategories: [
        {
            category: "Scenic views",
            items: [
                {
                    icon: "mountain",
                    name: "Aravalli mountain & valley view",
                    available: true,
                },
                { icon: "sun", name: "Panoramic lake and sunset view", available: true },
                {
                    icon: "waves",
                    name: "Lush courtyard garden & fountain view",
                    available: true,
                },
            ],
        },
        {
            category: "Bathroom",
            items: [
                {
                    icon: "bath",
                    name: "Carved stone soaking tub & rain shower",
                    available: true,
                },
                {
                    icon: "sparkles",
                    name: "Forest Essentials organic ayurvedic bath products",
                    available: true,
                },
                { icon: "wind", name: "Hair dryer & luxury bathrobes", available: true },
                { icon: "droplets", name: "24/7 solar hot water", available: true },
            ],
        },
        {
            category: "Bedroom & Laundry",
            items: [
                {
                    icon: "shirt",
                    name: "Washing machine & ironing service",
                    available: true,
                },
                {
                    icon: "layers",
                    name: "400-thread count pure cotton linens",
                    available: true,
                },
                {
                    icon: "hanger",
                    name: "Handcrafted sheesham wardrobes",
                    available: true,
                },
                { icon: "sun", name: "Heavy silk blackout curtains", available: true },
            ],
        },
        {
            category: "Entertainment",
            items: [
                {
                    icon: "tv",
                    name: '65" 4K Smart TV with Netflix, Prime, Hotstar',
                    available: true,
                },
                {
                    icon: "volume-2",
                    name: "Bang & Olufsen Bluetooth sound system",
                    available: true,
                },
                {
                    icon: "book-open",
                    name: "Heritage Rajasthani art & history library",
                    available: true,
                },
            ],
        },
        {
            category: "Heating and cooling",
            items: [
                {
                    icon: "wind",
                    name: "Daikin multi-zone inverter air conditioning",
                    available: true,
                },
                {
                    icon: "flame",
                    name: "Courtyard bonfire pit for winter evenings",
                    available: true,
                },
                { icon: "fan", name: "Teak architectural ceiling fans", available: true },
            ],
        },
        {
            category: "Home safety",
            items: [
                {
                    icon: "video",
                    name: "24/7 gated security & perimeter cameras",
                    available: true,
                },
                {
                    icon: "flame",
                    name: "Fire extinguishers & smoke detectors",
                    available: true,
                },
                { icon: "first-aid", name: "First aid emergency kit", available: true },
            ],
        },
        {
            category: "Internet and office",
            items: [
                {
                    icon: "wifi",
                    name: "High-speed optical fiber Wi-Fi (300+ Mbps)",
                    available: true,
                },
                {
                    icon: "laptop",
                    name: "Dedicated wooden study desk with mountain view",
                    available: true,
                },
            ],
        },
        {
            category: "Kitchen and dining",
            items: [
                {
                    icon: "utensils",
                    name: "Fully equipped kitchen with chef on request",
                    available: true,
                },
                {
                    icon: "refrigerator",
                    name: "Double door refrigerator & water purifier",
                    available: true,
                },
                {
                    icon: "coffee",
                    name: "Espresso machine & masala chai bar",
                    available: true,
                },
                {
                    icon: "disc",
                    name: "Handmade ceramic pottery & brass serveware",
                    available: true,
                },
            ],
        },
        {
            category: "Outdoor & Wellness",
            items: [
                { icon: "waves", name: "Private heated plunge pool", available: true },
                {
                    icon: "bath",
                    name: "Private heated hydrotherapy jacuzzi",
                    available: true,
                },
                {
                    icon: "flame",
                    name: "Bonfire area & outdoor barbecue grill",
                    available: true,
                },
                {
                    icon: "sun",
                    name: "Rooftop yoga pavilion & meditation terrace",
                    available: true,
                },
            ],
        },
        {
            category: "Parking and facilities",
            items: [
                {
                    icon: "car",
                    name: "Free covered parking on premises (up to 4 cars)",
                    available: true,
                },
                { icon: "building", name: "Gated private compound", available: true },
            ],
        },
        {
            category: "Services",
            items: [
                {
                    icon: "user-check",
                    name: "Dedicated butler & housekeeping staff",
                    available: true,
                },
                {
                    icon: "clock",
                    name: "Luggage assistance & airport transfer on request",
                    available: true,
                },
                { icon: "paw", name: "Pets allowed upon prior notice", available: true },
            ],
        },
    ],
    nearbyStays: [
        {
            id: "stay-1",
            title: "The Pichola Lakefront Royal Residence",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=600&fit=crop&q=85",
            price: "₹34,500 / night",
            rating: 4.97,
        },
        {
            id: "stay-2",
            title: "Fateh Bagh Heritage Palace Suite with Pool",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop&q=85",
            price: "₹18,900 / night",
            rating: 4.95,
        },
        {
            id: "stay-3",
            title: "The Aravalli Cliffside Villa & Infinity Jacuzzi",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop&q=85",
            price: "₹28,000 / night",
            rating: 4.98,
        },
        {
            id: "stay-4",
            title: "Tranquil Courtyard Villa with Plunge Pool",
            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=600&fit=crop&q=85",
            price: "₹22,000 / night",
            rating: 4.94,
        },
        {
            id: "stay-5",
            title: "Mewar Royal Garden Estate & Spa",
            image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=600&fit=crop&q=85",
            price: "₹38,000 / night",
            rating: 4.99,
        },
        {
            id: "stay-6",
            title: "The Oberoi-style Garden Villa & Private Pool",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop&q=85",
            price: "₹42,000 / night",
            rating: 4.99,
        },
        {
            id: "stay-7",
            title: "Sajjangarh Monsoon Palace View Haveli",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=600&fit=crop&q=85",
            price: "₹26,500 / night",
            rating: 4.96,
        },
        {
            id: "stay-8",
            title: "Lake Badi Sunset Hilltop Retreat",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=600&fit=crop&q=85",
            price: "₹24,000 / night",
            rating: 4.93,
        },
        {
            id: "stay-9",
            title: "Royal Rajputana Courtyard Estate",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=600&fit=crop&q=85",
            price: "₹31,000 / night",
            rating: 4.98,
        },
        {
            id: "stay-10",
            title: "Udaipur Heritage Pool Villa & Wellness Spa",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=600&fit=crop&q=85",
            price: "₹35,000 / night",
            rating: 4.97,
        },
    ],
};
