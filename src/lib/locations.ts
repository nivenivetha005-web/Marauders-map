export interface MapPosition {
  x: number;
  y: number;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface Location {
  id: string;
  name: string;
  shortIntro: string;
  date: string;
  memoryText: string;
  photos: Photo[];
  mapPosition?: MapPosition;
}

function photoSet(id: string, date: string, mainCaption: string): Photo[] {
  return [
    { src: `/placeholders/${id}.svg`, caption: mainCaption },
    { src: `/placeholders/${id}-2.svg`, caption: date },
    { src: `/placeholders/${id}-3.svg`, caption: date },
    { src: `/placeholders/${id}-4.svg`, caption: date },
  ];
}

export const locations: Location[] = [
  {
    id: "great-hall",
    name: "Great Hall",
    shortIntro: "Something happened here.",
    date: "October 14, 2026",
    memoryText: "The night everyone stayed until the candles burned low.",
    photos: photoSet(
      "great-hall",
      "October 14, 2026",
      "The night everyone stayed until the candles burned low."
    ),
    mapPosition: { x: 42, y: 35 },
  },
  {
    id: "hogwarts-library",
    name: "Hogwarts Library",
    shortIntro: "The map remembers this place.",
    date: "November 2, 2026",
    memoryText: "Whispered plans between the tallest shelves, past curfew.",
    photos: photoSet(
      "hogwarts-library",
      "November 2, 2026",
      "Whispered plans between the tallest shelves, past curfew."
    ),
    mapPosition: { x: 30, y: 22 },
  },
  {
    id: "astronomy-tower",
    name: "Astronomy Tower",
    shortIntro: "The map remembers this place.",
    date: "December 20, 2026",
    memoryText: "We counted stars instead of studying for the exam.",
    photos: photoSet(
      "astronomy-tower",
      "December 20, 2026",
      "We counted stars instead of studying for the exam."
    ),
    mapPosition: { x: 65, y: 12 },
  },
  {
    id: "forbidden-forest",
    name: "Forbidden Forest",
    shortIntro: "The map remembers this place.",
    date: "September 30, 2026",
    memoryText: "A dare that turned into the bravest thing we'd ever done.",
    photos: photoSet(
      "forbidden-forest",
      "September 30, 2026",
      "A dare that turned into the bravest thing we'd ever done."
    ),
    mapPosition: { x: 15, y: 60 },
  },
  {
    id: "hogsmeade",
    name: "Hogsmeade",
    shortIntro: "The map remembers this place.",
    date: "December 5, 2026",
    memoryText: "Butterbeer, snow on the rooftops, and no reason to hurry back.",
    photos: photoSet(
      "hogsmeade",
      "December 5, 2026",
      "Butterbeer, snow on the rooftops, and no reason to hurry back."
    ),
    mapPosition: { x: 8, y: 40 },
  },
  {
    id: "quidditch-pitch",
    name: "Quidditch Pitch",
    shortIntro: "The map remembers this place.",
    date: "October 28, 2026",
    memoryText: "The catch nobody thought was possible, and the roar after it.",
    photos: photoSet(
      "quidditch-pitch",
      "October 28, 2026",
      "The catch nobody thought was possible, and the roar after it."
    ),
    mapPosition: { x: 78, y: 55 },
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    shortIntro: "The map remembers this place.",
    date: "April 11, 2026",
    memoryText: "Dirt under our nails and a secret worth keeping buried.",
    photos: photoSet(
      "greenhouse",
      "April 11, 2026",
      "Dirt under our nails and a secret worth keeping buried."
    ),
    mapPosition: { x: 55, y: 70 },
  },
  {
    id: "room-of-requirement",
    name: "Room of Requirement",
    shortIntro: "The map remembers this place.",
    date: "May 1, 2026",
    memoryText: "It became exactly what we needed, the one time it mattered most.",
    photos: photoSet(
      "room-of-requirement",
      "May 1, 2026",
      "It became exactly what we needed, the one time it mattered most."
    ),
    mapPosition: { x: 48, y: 48 },
  },
];

export function getLocationById(id: string | null | undefined): Location | undefined {
  if (!id) return undefined;
  return locations.find((location) => location.id === id);
}
