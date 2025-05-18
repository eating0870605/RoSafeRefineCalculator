
// 精煉資料表
const refineData = [
  // 等級, 裝備累積量, 神金累積量, zeny累積量
  { level: 4, equip: 0, ore: 0, zeny: 0 },
  { level: 5, equip: 1, ore: 5, zeny: 100000 },
  { level: 6, equip: 3, ore: 15, zeny: 320000 },
  { level: 7, equip: 6, ore: 30, zeny: 790000 },
  { level: 8, equip: 10, ore: 55, zeny: 1700000 },
  { level: 9, equip: 16, ore: 105, zeny: 3330000 },
  { level: 10, equip: 26, ore: 190, zeny: 6070000 },
  { level: 11, equip: 48, ore: 325, zeny: 11320000 },
  { level: 12, equip: 78, ore: 550, zeny: 20320000 },
  { level: 13, equip: 123, ore: 925, zeny: 34820000 },
  { level: 14, equip: 192, ore: 1525, zeny: 59320000 },
  { level: 15, equip: 290, ore: 2425, zeny: 101320000 },
];

const levelSelect = document.getElementById("targetLevel");
const startSelect = document.getElementById("startLevel");

for (let i = 4; i <= 15; i++) {
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
    <p><strong>總價： ${grandTotal.toLocaleString()} Zeny</strong></p>

    <h3>詳細表格：</h3>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th>精煉等級</th><th>裝備總量</th><th>神金總量</th><th>Zeny總量</th><th>累積總價</th>
      </tr>
      // ${refineData.filter(d => d.level >= start && d.level <= target).map(d => {
      ${refineData.map(d => {
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
