/********************
 * CONFIG
 ********************/
const SHIPPING_COST = 10;
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJ5kyQVVGCLp1MrCNKjfUepfBHOMP2RGlDAbBi6Kfw2Acba_X0K9XJL9_78cQVS08Lvg/exec";

/********************
 * DATA
 ********************/
const bladeShapes = [
  { name: "Traditional", price: 0 },
  { name: "Cyber", price: 0 }
];

const bladeModels = [
  { name: "Greyhound", price: 127 },
  { name: "Greyhound Z", price: 137 },
  { name: "Whippet", price: 127 },
  { name: "Goldendoodle", price: 89 },
  { name: "Goldendoodle Z", price: 95 }
];

const handleOptions = [
  { name: "None", weight: 0, price: 0 },
  { name: "Kiri (11g)", weight: 11, price: 16 },
  { name: "Walnut (23g)", weight: 23, price: 17 },
  { name: "Kassod (27g)", weight: 27, price: 16 },
  { name: "Redwood (33g)", weight: 33, price: 16 },
  { name: "Rosewood (38g)", weight: 38, price: 20 }
];

const plyOptions = [
  { name: "None", weight: 0, price: 0 },
  { name: "Koto (0.5mm)", weight: 8.47, price: 8 },
  { name: "Limba (0.5mm)", weight: 8.0, price: 8 },
  { name: "Ayous (0.8mm)", weight: 8.25, price: 8 },
  { name: "Balsa core (3mm)", weight: 10.8, price: 15 },
  { name: "Balsa core (5mm)", weight: 25.68, price: 18 },
  { name: "Ayous core (3mm)", weight: 30.6, price: 12 },
  { name: "Kiri core (3mm)", weight: 24.0, price: 12 },
  { name: "Super ALC", weight: 6.0, price: 37 },
  { name: "ZLC", weight: 7.56, price: 42 }
];

/********************
 * BUILD FORM
 ********************/
const itemForm = document.getElementById("itemForm");

// Blade Shape
itemForm.append("Blade Shape:", document.createElement("br"));
const bladeSelect = document.c
