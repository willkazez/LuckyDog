/***********************
 * CONFIG
 ***********************/
const SHIPPING_COST = 10;
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwJ5kyQVVGCLp1MrCNKjfUepfBHOMP2RGlDAbBi6Kfw2Acba_X0K9XJL9_78cQVS08Lvg/exec";

/***********************
 * DOM REFERENCES
 ***********************/
const itemForm = document.getElementById("itemForm");
const orderForm = document.getElementById("orderForm");
const orderStatus = document.getElementById("orderStatus");

const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerAddress = document.getElementById("customerAddress");

const summaryTotal = document.getElementById("summaryTotal");
const summaryWeight = document.getElementById("summaryWeight");
const summaryContent = document.getElementById("summaryContent");

/***********************
 * DATA
 ***********************/
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

/***********************
 * BUILD FORM
 ***********************/
itemForm.insertAdjacentHTML("beforeend", "<label>Blade Shape:</label>");
const bladeSelect = document.createElement("select");
bladeShapes.forEach(b => {
  bladeSelect.innerHTML += `<option>${b.name}</option>`;
});
itemForm.append(bladeSelect, document.createElement("br"), document.createElement("br"));

itemForm.insertAdjacentHTML(
  "beforeend",
  `
<label><input type="radio" name="buildType" value="model" checked> Blade by Name</label>
<label><input type="radio" name="buildType" value="custom"> Custom Ply Build</label>
<br><br>
`
);

const modelLabel = document.createElement("div");
modelLabel.textContent = "Blade Model:";
const modelSelect = document.createElement("select");
bladeModels.forEach(m => {
  modelSelect.innerHTML += `<option data-price="${m.price}">${m.name} - $${m.price}</option>`;
});
itemForm.append(modelLabel, modelSelect, document.createElement("br"), document.createElement("br"));

const plyContainer = document.createElement("div");
plyContainer.classList.add("hidden");

for (let i = 1; i <= 8; i++) {
  const sel = document.createElement("select");
  sel.className = "ply";
  plyOptions.forEach(p => {
    sel.innerHTML += `<option data-price="${p.price}" data-weight="${p.weight}">${p.name}</option>`;
  });
  plyContainer.append(`Ply ${i}: `, sel, document.createElement("br"));
}
itemForm.append(plyContainer, document.createElement("br"));

itemForm.append("Handle:", document.createElement("br"));
const handleSelect = document.createElement("select");
handleOptions.forEach(h => {
  handleSelect.innerHTML += `<option data-price="${h.price}" data-weight="${h.weight}">${h.name} - $${h.price}</option>`;
});
itemForm.append(handleSelect);

/***********************
 * CALCULATE
 ***********************/
function calculate() {
  let cost = SHIPPING_COST;
  let weight = 0;
  let summary = "";

  summary += `<div class="summary-line">Blade Shape: ${bladeSelect.value}</div>`;

  const buildType = document.querySelector('input[name="buildType"]:checked').value;

  if (buildType === "model") {
    const m = modelSelect.selectedOptions[0];
    cost += Number(m.dataset.price);
    summary += `<div class="summary-line">Model: ${m.textContent}</div>`;
  } else {
    document.querySelectorAll(".ply").forEach((p, i) => {
      const opt = p.selectedOptions[0];
      cost += Number(opt.dataset.price);
      weight += Number(opt.dataset.weight);
      if (!opt.textContent.startsWith("None")) {
        summary += `<div class="summary-line">Ply ${i + 1}: ${opt.textContent}</div>`;
      }
    });
  }

  const h = handleSelect.selectedOptions[0];
  cost += Number(h.dataset.price);
  weight += Number(h.dataset.weight);

  if (!h.textContent.startsWith("None")) {
    summary += `<div class="summary-line">Handle: ${h.textContent}</div>`;
  }

  summary += `<div class="summary-line">Shipping: $${SHIPPING_COST.toFixed(2)}</div>`;

  document.getElementById("itemTotalCost").textContent = `$${cost.toFixed(2)}`;
  document.getElementById("itemTotalWeight").textContent = wei
