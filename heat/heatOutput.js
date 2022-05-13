const Heat = require("./heat.js");

console.log("*\n* Example: Heat Model\n*");
let heat = new Heat("../data/heat.json");
console.log("shape: " + heat.get_shape().toString());
console.log("spacing: " + heat.get_spacing().toString());
console.log("origin: " + heat.get_origin().toString());

// Place impulse in temperature field.
let temp0 = heat.get_temperature();
temp0[3][2] = 100.0;
heat.set_temperature(temp0);

// Advance model over several time steps.
let currentTime = heat.get_time();
while (currentTime < 1.0) {
  console.log("time = " + currentTime.toString());
  console.log("temperature =");
  let temp = heat.get_temperature();
  temp.forEach((element) => {
    let string1 = element.join("  ");
    console.log(string1);
    console.log("\n");
  });
  heat.advance_in_time();
  currentTime = heat.get_time();
}
