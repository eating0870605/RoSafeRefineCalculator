
// 精煉資料表
const refineData = [
  // 等級, 裝備累積量, 神金累積量, zeny累積量
  { level: 5, equip: 1, ore: 5, zeny: 100000 },
  { level: 6, equip: 2, ore: 10, zeny: 220000 },
  { level: 7, equip: 3, ore: 15, zeny: 470000 },
  { level: 8, equip: 4, ore: 25, zeny: 910000 },
  { level: 9, equip: 6, ore: 50, zeny: 1630000 },
  { level: 10, equip: 10, ore: 85, zeny: 2740000 },
  { level: 11, equip: 22, ore: 135, zeny: 4875000 },
  { level: 12, equip: 30, ore: 225, zeny: 9000000 },
  { level: 13, equip: 45, ore: 375, zeny: 14500000 },
  { level: 14, equip: 69, ore: 600, zeny: 24500000 },
  { level: 15, equip: 98, ore: 900, zeny: 42000000 },
];

const levelSelect = document.getElementById("targetLevel");
const startSelect = document.getElementById("startLevel");

for (let i = 5; i <= 15; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = `+${i}`;
  levelSelect.appendChild(option.cloneNode(true));
  startSelect.appendChild(option);
}

function getRefineData(level) {
  return refineData.find(r => r.level === level);
}

function calculate() {
  const start = parseInt(startSelect.value);
  const target = parseInt(levelSelect.value);
  const equipPrice = parseFloat(document.getElementById("equipPrice").value);
  const orePrice = parseFloat(document.getElementById("orePrice").value);

  const startData = getRefineData(start);
  const endData = getRefineData(target);

  const equipTotal = (endData.equip - startData.equip) * equipPrice;
  const oreTotal = (endData.ore - startData.ore) * orePrice;
  const zenyTotal = endData.zeny - startData.zeny;
  const grandTotal = equipTotal + oreTotal + zenyTotal;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>裝備總價：${equipTotal.toLocaleString()} Zeny</p>
    <p>神金總價：${oreTotal.toLocaleString()} Zeny</p>
    <p>Zeny總價：${zenyTotal.toLocaleString()} Zeny</p>
    <hr />
    <p><strong>總價：約 ${grandTotal.toLocaleString()} Zeny</strong></p>

    <h3>詳細表格：</h3>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th>精煉等級</th><th>裝備累積量</th><th>神金累積量</th><th>Zeny累積量</th><th>累積總價</th>
      </tr>
      ${refineData.filter(d => d.level >= start && d.level <= target).map(d => {
        const eTotal = d.equip * equipPrice;
        const oTotal = d.ore * orePrice;
        const total = eTotal + oTotal + d.zeny;
        return `
          <tr>
            <td>+${d.level}</td>
            <td>${d.equip}</td>
            <td>${d.ore}</td>
            <td>${d.zeny.toLocaleString()}</td>
            <td>${total.toLocaleString()}</td>
          </tr>`;
      }).join("")}
    </table>
  `;
}
