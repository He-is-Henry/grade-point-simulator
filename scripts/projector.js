const continueBtn = document.querySelector(".continueBtn");
const semesters = document.querySelector(".semesters");

function calclulateValues() {
  const allInputs = [];
  document.querySelectorAll(".unit").forEach((input) => {
    const id = input.dataset.id;
    const unit = document.querySelector(`.unit-${id}`).value;
    const gp = document.querySelector(`.GP-${id}`).value;

    let gpaUnitsProduct = 0;

    allInputs.push({ id, unit, gp });
    let totalUnits = 0;
    allInputs.forEach((input) => {
      gpaUnitsProduct += Number(input.gp) * Number(input.unit);
      console.log(gpaUnitsProduct);
      totalUnits += Number(input.unit);
      console.log(totalUnits);
      const CGPA = (gpaUnitsProduct / totalUnits).toFixed(2);
      input.CGPA = CGPA;

      document.querySelector(`.CGPA-${id}`).innerHTML = CGPA;
    });
  });
  console.log(allInputs);
}

function deleteRow(id) {
  console.log("deleting row ", id);
  const row = document.querySelector(`.table-row-${id}`);
  row.remove();
}
document.querySelectorAll(".delete").forEach((btn) => {
  console.log(btn._handleDelete);
  if (!btn._handleDelete) {
    btn._handleDelete = () => {
      deleteRow(btn.dataset.id);
    };
    console.log("Added a new one");
  }
  console.log(btn._handleDelete);
  btn.removeEventListener("click", btn._handleDelete);
  btn.addEventListener("click", btn._handleDelete);
});
function addRows(count) {
  for (let index = 0; index < count; index++) {
    const semesterRow = `
          <td><input type="number" name="unit" class="unit unit-${
            document.querySelectorAll(".semester").length + 1
          }" data-id="${
      document.querySelectorAll(".semester").length + 1
    }" placeholder="" value = "20"/></td>

          <td><input type="number" name="gp" class="GP GP-${
            document.querySelectorAll(".semester").length + 1
          }" data-id="${
      document.querySelectorAll(".semester").length + 1
    }" placeholder="" value ="5.0"/></td>

           <td class="CGPA-${
             document.querySelectorAll(".semester").length + 1
           } CGPA"></td>
           
            <td class="delete" data-id="${
              document.querySelectorAll(".semester").length + 1
            }"><button data-id="${
      document.querySelectorAll(".semester").length + 1
    }"><img src="images/image.png" alt="" /></button></td>
       `;
    const newSemester = document.createElement("tr");
    newSemester.classList.add(
      "semester",
      `table-row-${document.querySelectorAll(".semester").length + 1}`
    );
    newSemester.innerHTML = semesterRow;
    document.querySelector("tbody").appendChild(newSemester);
  }

  document.querySelectorAll(".delete").forEach((btn) => {
    console.log(btn._handleDelete);
    if (!btn._handleDelete) {
      btn._handleDelete = () => {
        deleteRow(btn.dataset.id);
      };
      console.log("Added a new one");
    }
    console.log(btn._handleDelete);
    btn.removeEventListener("click", btn._handleDelete);
    btn.addEventListener("click", btn._handleDelete);
  });

  calclulateValues();

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", calclulateValues);
  });
}

document.querySelector(".addBtn").addEventListener("click", () => {
  addRows(1);
});
const semesterValue = localStorage.getItem("semesterValue");
if (semesterValue) {
  document.querySelector(".overlayContainer").classList.add("remove");
  addRows(semesterValue);
}
continueBtn.addEventListener("click", () => {
  const semesterValue = localStorage.getItem("semesterValue");
  if (semesterValue) {
    document.querySelector(".overlayContainer").classList.add("remove");
    addRows(semesterValue);
  }
  if (semesterValue) semesters.value = semesterValue;
  if (!semesters.value.trim()) return;
  console.log(`You have completed ${semesters.value} semesters`);
  addRows(semesters.value);
  localStorage.setItem("semesterValue", semesters.value);

  document.querySelector(".overlayContainer").classList.add("remove");
});

document.querySelectorAll("input").forEach((input) => {
  const inputData = input.dataset;
  input.addEventListener("change", () => {
    let CGPA = document.querySelectorAll(`[data-id="${inputData.id}"]`);
  });
});

document.querySelector(".editPastSemesters").addEventListener("click", () => {
  localStorage.removeItem("semesterValue");
  document.querySelector(".overlayContainer").classList.remove("remove");
  document.querySelector("tbody").innerHTML = "";
});
