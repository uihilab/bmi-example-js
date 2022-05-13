const BmiHeat = require("./bmiheat.js");

console.log("*\n* Example: Heat Model run through its BMI\n*");

// Instantiate and initialize this.#model.
const bmi = new BmiHeat();
bmi.initialize("../data/heat.json");

let componentName = bmi.get_component_name();
console.log("Model name: " + componentName);

console.log("Start time: " + bmi.get_start_time());
console.log("End time: " + bmi.get_end_time());
console.log("Current time: " + bmi.get_current_time());
console.log("Time step: " + bmi.get_time_step());
console.log("Time unit: " + bmi.get_time_units());

console.log("Input variables: ");
for (let i = 0; i < bmi.get_input_item_count(); i++) {
  console.log("- " + bmi.get_input_var_names()[i]);
}
console.log("Output variables: ");
for (let i = 0; i < bmi.get_output_item_count(); i++) {
  console.log("- " + bmi.get_output_var_names()[i]);
}

// Get the grid and variable info for the temperature variable.
let var_name = bmi.get_output_var_names()[0];
console.log("Variable: " + var_name);
let gridId = bmi.get_var_grid(var_name);
console.log("- grid_id: " + gridId);
console.log("- grid type: " + bmi.get_grid_type(gridId));
let gridRank = bmi.get_grid_rank(gridId);
console.log("- grid rank: " + gridRank);
console.log("- grid size: " + bmi.get_grid_size(gridId));
console.log("- grid shape:");
let gridShape = new Array(parseInt(gridRank));
gridShape = bmi.get_grid_shape(gridId, gridShape);
for (let i = 0; i < gridRank; i++) {
  console.log("  - " + gridShape[i]);
}
console.log("- grid spacing:");
let gridSpacing = new Array(parseInt(gridRank));
gridSpacing = bmi.get_grid_spacing(gridId, gridSpacing);
for (let i = 0; i < gridRank; i++) {
  console.log("  - " + gridSpacing[i]);
}
console.log("- grid origin:");
let gridOrigin = new Array(parseInt(gridRank));
gridOrigin = bmi.get_grid_origin(gridId, gridOrigin);
for (let i = 0; i < gridRank; i++) {
  console.log("  - " + gridOrigin[i]);
}
console.log("- var type: " + bmi.get_var_type(var_name));
console.log("- var units: " + bmi.get_var_units(var_name));
console.log("- var itemsize: " + bmi.get_var_item_size(var_name));
console.log("- var nbytes: " + bmi.get_var_nbytes(var_name));

// Add an impulse to the default initial temperature field.
let temp0 = new Array(bmi.get_grid_size(gridId)).fill(0.0);
temp0 = bmi.get_value(var_name, temp0);
temp0[3 * gridShape[1] + 2] = 100.0;
bmi.set_value(var_name, temp0);

// Advance the model over several time steps.
let currentTime = bmi.get_current_time();
let temp = new Array(bmi.get_grid_size(gridId)).fill(0.0);
while (currentTime < 1.0) {
  console.log("time = " + currentTime.toString());
  console.log("temperature =");
  bmi.get_value(var_name, temp);
  var arr = [];
  var arr2 = [];
  for (let j = 0; j < gridShape[0]; j++) {
    for (let i = 0; i < gridShape[1]; i++) {
      arr2.push(temp[j * gridShape[1] + i].toFixed(2));
    }
    arr.push(arr2);
    arr2 = [];
  }
  arr.forEach((element) => {
    console.log(element);
  });
  bmi.update();
  currentTime = bmi.get_current_time();
}

bmi.finalize();
