document.addEventListener("DOMContentLoaded", () => {

  const SHIPPING_COST = 10;
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8H2C9f908OXLnryLQjiIKoWYQ_oXfhsRmIkpFR8puPekq7CoK8A1jhEgeBn1MkZWF/exec";

  const bladeModels = [
    { name: "Greyhound", price: 127 },
    { name: "Greyhound Z", price: 137 },
    { name: "Whippet", price: 127 },
    { name: "Goldendoodle", price: 89 },
    { name: "Goldendoodle Z", price: 95 }
  ];

  const handleOptions = [
    { name: "None", weight: 0, price: 0 },
    { name: "Kiri", weight: 11, price: 16 },
    { name: "Walnut", weight: 23, price: 17 },
    { name: "Kassod", weight: 27, price: 16 },
    { name: "Redwood", weight: 33, price: 16 },
    { name: "Rosewood", weight: 38, price: 20 }
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

  const itemForm = document.getElementById("itemForm");

  itemForm.innerHTML = `
    <label>Build Type:
      <select id="buildType">
        <option value="model">Blade by Name</option>
        <option value="custom">Custom Ply Build</option>
      </select>
    </label>

    <div id="modelBlock">
      <label>Blade Model:
        <select id="bladeModel">
          ${bladeModels.map(m =>
            `<option data-price="${m.price}">${m.name} - $${m.price}</option>`
          ).join("")}
        </select>
      </label>
    </div>

    <div id="plyBlock" class="hidden">
      ${Array.from({ length: 8 }, (_, i) => `
        <label>Ply ${i + 1}:
          <select class="ply">
            ${plyOptions.map(p =>
              `<option data-price="${p.price}" data-weight="${p.weight}">
                ${p.name}
              </option>`
            ).join("")}
          </select>
        </label>
      `).join("")}
    </div>

    <label>Handle:
      <select id="handle">
        ${handleOptions.map(h =>
          `<option data-price="${h.price}" data-weight="${h.weight}">
            ${h.name} (${h.weight}g) - $${h.price}
          </option>`
        ).join("")}
      </select>
    </label>
  `;

  function calculate() {
    let cost = SHIPPING_COST;
    let weight = 0;
    let summary = "";

    if (buildType.value === "model") {
      const m = bladeModel.selectedOptions[0];
      cost += Number(m.dataset.price);
      summary += `<div class="summary-line">Model: ${m.textContent}</div>`;
    } else {
      document.querySelectorAll(".ply").forEach((p, i) => {
        const opt = p.selectedOptions[0];
        cost += Number(opt.dataset.price);
        weight += Number(opt.dataset.weight);
        if (opt.textContent !== "None") {
          summary += `<div class="summary-line">Ply ${i + 1}: ${opt.textContent}</div>`;
        }
      });
    }

    const h = handle.selectedOptions[0];
    cost += Number(h.dataset.price);
    weight += Number(h.dataset.weight);

    summary += `<div class="summary-line">Shipping: $${SHIPPING_COST}</div>`;

    itemTotalCost.textContent = `$${cost.toFixed(2)}`;
    itemTotalWeight.textContent = weight ? `${weight.toFixed(1)}g` : "—";
    summaryContent.innerHTML = summary;
    summaryTotal.textContent = `$${cost.toFixed(2)}`;
    summaryWeight.textContent = weight ? `${weight.toFixed(1)}g` : "—";
  }

  itemForm.addEventListener("change", () => {
    modelBlock.classList.toggle("hidden", buildType.value !== "model");
    plyBlock.classList.toggle("hidden", buildType.value !== "custom");
    calculate();
  });

  calculate();

  orderForm.addEventListener("submit", async e => {
    e.preventDefault();

    orderStatus.textContent = "Submitting order…";

    const payload = {
      name: customerName.value,
      email: customerEmail.value,
      address: customerAddress.value,
      totalCost: summaryTotal.textContent,
      totalWeight: summaryWeight.textContent,
      summary: summaryContent.innerText
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      orderStatus.textContent = "✅ Order received! We’ll contact you shortly.";
      orderForm.reset();
      calculate();

    } catch (err) {
      console.error(err);
      orderStatus.textContent = "❌ Order submission failed.";
    }
  });
});
