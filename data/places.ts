export type Category = 'Adventure' | 'Food' | 'Nightlife' | 'Wellness' | 'Sights' | 'Bars' | 'Stay'

export type Place = {
  id: number
  imageUrl: string
  title: string
  description: string
  hidden?: boolean
  time?: string
  address: string
  location: string
  openingHours: string
  coordinates: { lat: number; lng: number }
  category: Category
  rating?: number
}

export const CATEGORY_STYLE: Record<Category, { bg: string; text: string }> = {
  Adventure: { bg: 'bg-teal-400/15',   text: 'text-teal-400'   },
  Food:      { bg: 'bg-amber-400/15',  text: 'text-amber-400'  },
  Nightlife: { bg: 'bg-purple-400/15', text: 'text-purple-400' },
  Wellness:  { bg: 'bg-blue-400/15',   text: 'text-blue-400'   },
  Sights:    { bg: 'bg-primary/15',    text: 'text-primary'    },
  Bars:      { bg: 'bg-pink-400/15',   text: 'text-pink-400'   },
  Stay:      { bg: 'bg-white/10',      text: 'text-white/60'   },
}

// Airbnb base for distance calculation
const BASE = { lat: 47.4978, lng: 19.0555 }

export function distanceKm(lat: number, lng: number): string {
  const R = 6371
  const dLat = (lat - BASE.lat) * Math.PI / 180
  const dLng = (lng - BASE.lng) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(BASE.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`
}

export const TRIP_DATES = [
  { iso: '2026-03-13', label: '13', day: 'Fri' },
  { iso: '2026-03-14', label: '14', day: 'Sat' },
  { iso: '2026-03-15', label: '15', day: 'Sun' },
  { iso: '2026-03-16', label: '16', day: 'Mon' },
]

export const places: Place[] = [
  {
    id: 1, category: 'Stay', rating: 4.9,
    imageUrl: "https://a0.muscache.com/im/pictures/71e1fb5e-2cbc-49b9-bee4-8ee69806c197.jpg?im_w=1200",
    title: "Our Airbnb",
    description: "Home base for the trip — centrally located on Károly körút in the heart of Budapest's 5th district, just steps from the Jewish Quarter and the city's main attractions.",
    hidden: true, time: "",
    address: "Károly körút 8, 1052 Budapest", location: "Budapest", openingHours: "",
    coordinates: { lat: 47.4978, lng: 19.0555 }
  },
  {
    id: 33, category: 'Adventure', rating: 4.7,
    imageUrl: "https://www.celeritas-sch.com/static/images/packages/16-s.jpg",
    title: "Celeritas Shooting Club",
    description: "Professional indoor shooting range in Budapest offering guided shooting experiences with various firearms under the supervision of certified instructors.",
    hidden: true, time: "2026-03-14T14:00:00",
    address: "1239 Budapest, Grassalkovich út 294", location: "Budapest", openingHours: "10:00 - 20:00",
    coordinates: { lat: 47.3875, lng: 19.0625 }
  },
  {
    id: 34, category: 'Food', rating: 4.6,
    imageUrl: "https://retekbisztro.hu/wp-content/uploads/2024/06/retek-bisztro-bg_copy.jpg",
    title: "Retek Bisztró",
    description: "A beloved neighbourhood bistro known for seasonal Hungarian cuisine and a welcoming atmosphere.",
    hidden: true, time: "2026-03-14T18:00:00",
    address: "Retek u. 3, 1024 Budapest", location: "Budapest", openingHours: "12:00 - 23:00",
    coordinates: { lat: 47.5130, lng: 19.0293 }
  },
  {
    id: 35, category: 'Nightlife', rating: 4.4,
    imageUrl: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/4c/55/00.jpg",
    title: "Budapest Pub Crawl",
    description: "Explore Budapest's famous ruin bars and nightlife scene on a guided pub crawl through the city's best spots.",
    hidden: true, time: "2026-03-14T21:00:00",
    address: "Kazinczy u. 14, 1075 Budapest", location: "Budapest", openingHours: "21:00 - 03:00",
    coordinates: { lat: 47.4992, lng: 19.066 }
  },
  {
    id: 36, category: 'Wellness', rating: 4.7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Budapest_Sz%C3%A9chenyi_Baths_R01.jpg/1280px-Budapest_Sz%C3%A9chenyi_Baths_R01.jpg",
    title: "Széchenyi Thermal Bath",
    description: "Iconic thermal bath complex with large outdoor pools and grand architecture in City Park (Városliget).",
    time: "", address: "Állatkerti krt. 11, 1146 Budapest", location: "Budapest", openingHours: "06:00 - 22:00",
    coordinates: { lat: 47.519, lng: 19.0816 }
  },
  {
    id: 37, category: 'Food', rating: 4.6,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Interior_of_New_York_Palace%2C_Cafe_Budapest_%288344808702%29.jpg/1280px-Interior_of_New_York_Palace%2C_Cafe_Budapest_%288344808702%29.jpg",
    title: "New York Café",
    description: "Famous historic café with lavish interiors—great for coffee, desserts, and a classic Budapest atmosphere.",
    time: "", address: "Erzsébet krt. 9-11, 1073 Budapest", location: "Budapest", openingHours: "08:00 - 24:00",
    coordinates: { lat: 47.4967, lng: 19.0662 }
  },
  {
    id: 38, category: 'Bars', rating: 4.5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpcVL5KV-hwsEVIrI1ZRGQTwo61mtntN3uuxQScr2BToSj91n45x5T30mD8IO-ET4t_xoDTeSf-ljayet-XbvLJDjgjjabteII6M-xDgL-aWg6X02tDu_bzwWYh3vOexv8v1YXVxYhXksycfOGlEPTEtrqrwjaeGkmGWkZI1SwGCPHErB2VlowkNX0SCSQZ636uNN_CBw3uTWFRhaxCfBqyJ0tCfs6134FGcatgA6tPoviCDwyIjjftAUGNS5NCDTdu11-zqZmt65A",
    title: "Szimpla Kert",
    description: "Budapest's most iconic ruin bar — eclectic décor across multiple rooms, lively atmosphere every night, and a beloved Sunday flea market.",
    time: "", address: "Kazinczy u. 14, 1075 Budapest", location: "Budapest", openingHours: "12:00 - 04:00",
    coordinates: { lat: 47.4992, lng: 19.066 }
  },
  {
    id: 43, category: 'Sights', rating: 4.8,
    imageUrl: "https://www.bigbustours.com/media/magefan_blog/f/i/fishermans-bastion-budapest-big-bus-tours-01.17.jpg",
    title: "Fisherman's Bastion",
    description: "A fairytale-like terrace on Buda Castle Hill offering one of the most stunning panoramic views of the Danube and Pest.",
    time: "", address: "Szentháromság tér 5, 1014 Budapest", location: "Budapest", openingHours: "09:00 - 23:00",
    coordinates: { lat: 47.5019, lng: 19.0343 }
  },
  {
    id: 44, category: 'Sights', rating: 4.5,
    imageUrl: "https://www.bigbustours.com/media/magefan_blog/h/e/heroes-square-budapest-big-bus-tours-01.17.jpg",
    title: "Heroes' Square",
    description: "One of Budapest's most iconic landmarks featuring the Millennium Monument.",
    time: "", address: "Hősök tere, 1146 Budapest", location: "Budapest", openingHours: "Open 24/7",
    coordinates: { lat: 47.5145, lng: 19.0793 }
  },
  {
    id: 45, category: 'Sights', rating: 4.8,
    imageUrl: "https://www.bigbustours.com/media/magefan_blog/p/a/parliament-budapest-big-bus-tours-01.17.jpg",
    title: "Hungarian Parliament",
    description: "The iconic Neo-Gothic Parliament building on the banks of the Danube — Budapest's most photographed landmark.",
    time: "", address: "Kossuth Lajos tér 1-3, 1055 Budapest", location: "Budapest", openingHours: "08:00 - 18:00",
    coordinates: { lat: 47.5071, lng: 19.0475 }
  },
  {
    id: 46, category: 'Food', rating: 4.5,
    imageUrl: "https://static.wixstatic.com/media/a1c18f_518f5c352b444143a8e84cae0773b10c~mv2.jpg/v1/fill/w_1347,h_712,q_90,enc_avif,quality_auto/a1c18f_518f5c352b444143a8e84cae0773b10c~mv2.jpg",
    title: "Cafe Brunch Budapest at Anker",
    description: "A popular brunch spot in the heart of Budapest, known for its creative brunch menus and relaxed courtyard atmosphere.",
    hidden: true, time: "2026-03-15T12:30:00",
    address: "Anker köz 1-3, 1061 Budapest", location: "Budapest", openingHours: "09:00 - 17:00",
    coordinates: { lat: 47.4998, lng: 19.0526 }
  },
  {
    id: 47, category: 'Wellness', rating: 4.6,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Budapest%2C_Gell%C3%A9rt_f%C3%BCrd%C5%91.jpg/960px-Budapest%2C_Gell%C3%A9rt_f%C3%BCrd%C5%91.jpg",
    title: "Gellért Thermal Bath",
    description: "One of Budapest's most beautiful thermal baths, housed in a stunning Art Nouveau building on the Buda side of the Danube.",
    time: "", address: "Kelenhegyi út 4, 1118 Budapest", location: "Budapest", openingHours: "06:00 - 20:00",
    coordinates: { lat: 47.4863, lng: 19.0480 }
  },
  {
    id: 48, category: 'Sights', rating: 4.5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Budav%C3%A1ri_Palota%2C_ABCDEF_%C3%A9p%C3%BClet.jpg/1280px-Budav%C3%A1ri_Palota%2C_ABCDEF_%C3%A9p%C3%BClet.jpg",
    title: "Buda Castle",
    description: "The historic royal palace complex perched atop Castle Hill, offering sweeping views over the Danube and Pest.",
    time: "", address: "Szent György tér 2, 1014 Budapest", location: "Budapest", openingHours: "Grounds 24/7 · Museums 10:00-18:00",
    coordinates: { lat: 47.4960, lng: 19.0398 }
  },
  {
    id: 49, category: 'Sights', rating: 4.7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
    title: "Chain Bridge",
    description: "The iconic suspension bridge connecting Buda and Pest, beautifully lit at night.",
    time: "", address: "Széchenyi Lánchíd, 1051 Budapest", location: "Budapest", openingHours: "Open 24/7",
    coordinates: { lat: 47.4984, lng: 19.0453 }
  },
  {
    id: 50, category: 'Food', rating: 4.5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Great_Market_Hall_Budapest_%2814118071876%29.jpg",
    title: "Great Market Hall",
    description: "Budapest's largest and oldest indoor market — three floors of fresh produce, Hungarian paprika, folk crafts, and street food.",
    time: "", address: "Vámház krt. 1-3, 1093 Budapest", location: "Budapest", openingHours: "Mon 06:00-17:00 · Tue-Fri 06:00-18:00 · Sat 06:00-15:00",
    coordinates: { lat: 47.4872, lng: 19.0604 }
  },
  {
    id: 51, category: 'Sights', rating: 4.7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/St._Stephen%27s_Basilica%2C_Budapest.jpg",
    title: "St. Stephen's Basilica",
    description: "Budapest's largest church. Climb the dome for a 360° panoramic view of the city.",
    time: "", address: "Szent István tér 1, 1051 Budapest", location: "Budapest", openingHours: "09:00 - 19:00",
    coordinates: { lat: 47.5005, lng: 19.0535 }
  },
  {
    id: 52, category: 'Sights', rating: 4.8,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Matthias_Church%2C_Budapest%2C_2017.jpg/1280px-Matthias_Church%2C_Budapest%2C_2017.jpg",
    title: "Matthias Church",
    description: "A stunning Gothic church on Castle Hill with a colourful diamond-patterned tiled roof.",
    time: "", address: "Szentháromság tér 2, 1014 Budapest", location: "Budapest", openingHours: "09:00 - 17:00",
    coordinates: { lat: 47.5017, lng: 19.0341 }
  },
  {
    id: 53, category: 'Sights', rating: 4.6,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Budapest_Donauinsel_2.jpg/500px-Budapest_Donauinsel_2.jpg",
    title: "Margaret Island",
    description: "A peaceful green oasis in the middle of the Danube, perfect for a stroll or jog.",
    time: "", address: "Margitsziget, 1007 Budapest", location: "Budapest", openingHours: "Open 24/7",
    coordinates: { lat: 47.5258, lng: 19.0469 }
  },
  {
    id: 54, category: 'Sights', rating: 4.8,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Hungarian_State_Opera_House_in_Budapest.jpg",
    title: "Hungarian State Opera House",
    description: "A neo-Renaissance masterpiece on Andrássy Avenue, one of the most beautiful opera houses in Europe.",
    time: "", address: "Andrássy út 22, 1061 Budapest", location: "Budapest", openingHours: "Tours daily 10:00-17:00",
    coordinates: { lat: 47.5009, lng: 19.0606 }
  },
  {
    id: 55, category: 'Bars', rating: 4.7,
    imageUrl: "https://doblo.hu/wp-content/uploads/2022/01/4-1400x1000.jpg",
    title: "Doblo Wine Bar",
    description: "A cosy wine bar in the heart of the Jewish Quarter with an outstanding selection of Hungarian and natural wines.",
    time: "", address: "Dob utca 20, 1074 Budapest", location: "Budapest", openingHours: "15:00 - 23:00",
    coordinates: { lat: 47.4990, lng: 19.0672 }
  },
  {
    id: 56, category: 'Bars', rating: 4.5,
    imageUrl: "https://framerusercontent.com/images/K44hexPhhwdTn3gVAwgxsXyzd2s.jpg",
    title: "Mazel Tov",
    description: "A stunning open-air bar and restaurant set in a converted ruin courtyard in the Jewish Quarter.",
    time: "", address: "Akácfa utca 47, 1072 Budapest", location: "Budapest", openingHours: "12:00 - 01:00",
    coordinates: { lat: 47.4993, lng: 19.0679 }
  },
  {
    id: 57, category: 'Bars', rating: 4.4,
    imageUrl: "https://instant-fogas.com/wp-content/uploads/2019/12/Instant_1920x1005_2-1024x536.png",
    title: "Instant-Fogas",
    description: "One of Budapest's largest ruin bar complexes, with multiple rooms, dance floors, and bars.",
    time: "", address: "Akácfa utca 51, 1073 Budapest", location: "Budapest", openingHours: "18:00 - 06:00",
    coordinates: { lat: 47.4994, lng: 19.0682 }
  },
  {
    id: 58, category: 'Bars', rating: 4.6,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLnu9klSJGuNh9EUbWungw48F_uQzwHBZWjIlaClsPyOo3byGpycQjnOQCehMflR-awDkirDlR-wWSpBqABa0v2QuKUwRqMWuMoOCYjAuz24NHZva3AsZrxjU6JK3HI5ljRkOmfpNVur74UuhYKjFSAsmqQWK9UX9USID_ErbP8ISmkDWqfDcpe6cmWxTLV7aqwnonyUwvMKNN2UT4JSSPmiYPQe5XMT4ssZ2ORw3VFud_3MGed4uQ6gjgmw_TMWhz_Ls_HHWBDlbA",
    title: "360 Bar",
    description: "A rooftop bar atop the Paris Department Store on Andrássy Avenue, offering 360° panoramic views.",
    time: "", address: "Andrássy út 39, 1061 Budapest", location: "Budapest", openingHours: "14:00 - 24:00",
    coordinates: { lat: 47.5035, lng: 19.0615 }
  },
  {
    id: 59, category: 'Bars', rating: 4.8,
    imageUrl: "https://boutiqbar.com/wp-content/uploads/2025/09/Kepernyofoto-2025-09-01-13.53.59-1024x699.png",
    title: "Boutiq'Bar",
    description: "One of Budapest's most acclaimed craft cocktail bars, consistently ranked among the best in Europe.",
    time: "", address: "Magyar utca 12-14, 1053 Budapest", location: "Budapest", openingHours: "17:00 - 02:00",
    coordinates: { lat: 47.4940, lng: 19.0601 }
  }
]

export function getAllPlaces(search?: string): Place[] {
  const visible = places.filter(p => !p.hidden)
  if (!search) return visible
  const q = search.toLowerCase()
  return visible.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.address.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
}

export function getScheduledPlaces(): Place[] {
  return places.filter(p => p.time && p.time !== '').sort((a, b) =>
    new Date(a.time!).getTime() - new Date(b.time!).getTime()
  )
}

export function getPlacesByDate(isoDate: string): Place[] {
  return getScheduledPlaces().filter(p => p.time!.startsWith(isoDate))
}

export function getPlaceById(id: number): Place | undefined {
  return places.find(p => p.id === id)
}

export function getMapPlaces(): Place[] {
  return places.filter(p => p.id !== 1)
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })
}
