function addEventListeners() {
  document.querySelectorAll(".delete").forEach((btn) => {
    if (!btn._handleDelete) {
      btn._handleDelete = () => deleteRow(btn.dataset.id);
    }
    btn.removeEventListener("click", btn._handleDelete);
    btn.addEventListener("click", btn._handleDelete);
  });
  document.querySelectorAll("input").forEach((input) => {
    const inputData = input.dataset;
    input.removeEventListener("change", input._handler);
    input.addEventListener("change", () => {
      let creditPoint = 1;
      document
        .querySelectorAll(`[data-id="${inputData.id}"]`)
        .forEach((element) => {
          console.log(element);
          if (element.value) creditPoint *= Number(element.value);
          console.log("element value ", element.value);
          console.log("creditPoint ", creditPoint);
          document.querySelector(`.credit-point-${inputData.id}`).innerHTML =
            creditPoint;

          calclulateValues();
        });
    });
    calclulateValues();
  });
}

function deleteRow(id) {
  console.log("deleting row ", id);

  const row = document.querySelector(`.table-row-${id}`);
  console.log(row);
  row.remove();
  calclulateValues();
}

addEventListeners();

function calclulateValues() {
  let totalUnits = 0;
  document.querySelectorAll(".unit").forEach((unit) => {
    totalUnits += Number(unit.value);
    document.querySelector(".tnu").innerHTML = totalUnits;
  });
  let totalPoints = 0;
  document.querySelectorAll(".credit-point").forEach((unit) => {
    totalPoints += Number(unit.innerHTML);
    document.querySelector(".tcp").innerHTML = totalPoints;
  });
  const GP = totalPoints / totalUnits;
  console.log("New GP: ", GP);
  document.querySelector(".gp").innerHTML = GP.toFixed(2);
}

document.querySelector(".addBtn").addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.classList.add(
    `table-row-${document.querySelectorAll(".row").length + 1}`,
    "row"
  );
  newRow.innerHTML = ` 
          <td><input type="text" name="" id="" value="Course ${
            document.querySelectorAll(".row").length + 1
          }" /></td>
          <td>
            <input
              class="unit"
              type="number"
              name=""
              id=""
              value="2"
              data-id="${document.querySelectorAll(".row").length + 1}"
              max="5"
              min="0"
            />
          </td>
          <td>
            <input
              class="grade"
              type="number"
              name=""
              id=""
              value="5"
              data-id="${document.querySelectorAll(".row").length + 1}"
              max="5"
              min="0"
            />
          </td>
          <td class="credit-point-${
            document.querySelectorAll(".row").length + 1
          } credit-point">10</td>
          <td class="delete" data-id="${
            document.querySelectorAll(".row").length + 1
          }"><button > <img src="images/image.png"/> </button></td>
`;

  document.querySelector("tbody").appendChild(newRow);
  addEventListeners();
  calclulateValues();
});

calclulateValues();
