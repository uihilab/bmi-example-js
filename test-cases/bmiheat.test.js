const BmiHeat = require("../heat/bmiheat.js");

// check all the test cases before pushing
// check all getters and setters in bmiheat
// clean the code fully
// get_var_type, get_var_item_size, test_get_var_nbytes, (check get_var_location as well) test case to be done

let delta;
let varName;
let gridSize;
let initialTemp;
let gridId;
let shape;
let size;
let type;
let spacing;
let origin;

beforeAll(() => {
  delta = 0.1;
  varName = "plate_surface__temperature";
  gridSize = 48;
  initialTemp = 0.0;
  gridId = 0;
  size = 48;
  type = "uniform_rectilinear";
  shape = [8, 6];
  spacing = [1.0, 1.0];
  origin = [0.0, 0.0];
});

/**
 * testing getters and setters
 */

describe("test_get_value", () => {
  let bmi = new BmiHeat();
  bmi.initialize();

  let varCpy1 = new Array(gridSize);
  let varCpy2 = new Array(gridSize);

  let a1 = bmi.get_value(varName, varCpy1);
  let a2 = bmi.get_value(varName, varCpy2);

  test("test that they are not same", () => {
    expect(a1).not.toBe(a2);
  });
  test("test that they are almost equal", () => {
    expect(a1).toEqual(a2);
  });
});

describe("test_get_initial_value", () => {
  let bmi = new BmiHeat();
  bmi.initialize();

  let varCpy = new Array(gridSize);
  bmi.get_value(varName, varCpy);

  varCpy = varCpy.sort();

  test("test that they are almost equal", () => {
    expect(varCpy[0]).toBeCloseTo(initialTemp, delta);
  });
  test("test that they are almost equal", () => {
    expect(varCpy[gridSize - 1]).toBeCloseTo(initialTemp, delta);
  });
});

describe("test_set_value", () => {
  var component = new BmiHeat();
  component.initialize();

  var varNew1 = new Array(gridSize);
  component.get_value(varName, varNew1);
  varNew1[0] = 5.0;

  component.set_value(varName, varNew1);

  var varNew2 = new Array(gridSize);
  component.get_value(varName, varNew2);

  test("test that they are not same", () => {
    expect(varNew2).not.toBe(varNew1);
  });

  test("test that they are almost equal", () => {
    expect(varNew2).toEqual(varNew1);
  });
});

/**
 * Testing Grid Functions
 */

describe("test_get_grid_rank", () => {
  var component = new BmiHeat();
  component.initialize();

  //   assertEquals(shape.length, component.get_grid_rank(gridId));
  test("assert equal", () => {
    expect(component.get_grid_rank(gridId)).toEqual(shape.length);
  });
});

describe("test_get_grid_size", () => {
  var component = new BmiHeat();
  component.initialize();

  //   assertEquals(shape.length, component.get_grid_rank(gridId));
  test("assert equal", () => {
    expect(component.get_grid_size(gridId)).toEqual(size);
  });
});

describe("test_get_grid_type", () => {
  var component = new BmiHeat();
  component.initialize();

  //   assertEquals(shape.length, component.get_grid_rank(gridId));
  test("assert equal", () => {
    expect(component.get_grid_type(gridId)).toEqual(type);
  });
});

describe("test_get_grid_shape", () => {
  var component = new BmiHeat();
  component.initialize();
  let shape = [8, 6];
  var gridShape = new Array(shape.length);
  gridShape = component.get_grid_shape(gridId, gridShape);

  test("assert equal", () => {
    expect(gridShape).toEqual(shape);
  });
});

describe("test_get_grid_spacing", () => {
  var component = new BmiHeat();
  component.initialize();
  spacing = [1.0, 1.0];
  var gridSpacing = new Array(spacing.length);
  gridSpacing = component.get_grid_spacing(gridId, gridSpacing);

  //   assertArrayEquals(spacing, gridSpacing, delta);

  test("assert equal", () => {
    expect(gridSpacing).toEqual(spacing);
  });
});

describe("test_get_grid_origin", () => {
  var component = new BmiHeat();
  component.initialize();
  origin = [0.0, 0.0];
  var gridOrigin = new Array(origin.length);
  gridOrigin = component.get_grid_origin(gridId, gridOrigin);

  test("assert equal", () => {
    expect(gridOrigin).toEqual(origin);
  });
});

/**
 * Test IRF Methods
 */

describe("test_initialize_string", () => {
  var component = new BmiHeat();

  test("assert equal", () => {
    expect(component.initialize("../data/heat.json")).not.toBeNull();
  });
  test("test that they are almost equal", () => {
    expect(component.get_current_time()).toBeCloseTo(0.0, delta);
  });
});

describe("test_initialize", () => {
  var component = new BmiHeat();

  test("assert equal", () => {
    expect(component.initialize()).not.toBeNull();
  });
  test("test that they are almost equal", () => {
    expect(component.get_current_time()).toBeCloseTo(0.0, delta);
  });
});

describe("test_update", () => {
  var component = new BmiHeat();
  component.initialize();
  maxIter = 10;
  finalTime = maxIter * component.get_time_step();
  for (var i = 0; i < maxIter; i++) {
    component.update();
  }

  test("test that they are almost equal", () => {
    expect(component.get_current_time()).toBeCloseTo(finalTime, delta);
  });
});

describe("test_update_until", () => {
  var component = new BmiHeat();
  component.initialize();
  component.update_until(10.1);

  test("test that they are almost equal", () => {
    expect(component.get_current_time()).toBeCloseTo(10.1, delta);
  });
});

describe("test_get_component_name", () => {
  var component = new BmiHeat();
  component.initialize();
  var cName = "Heat";

  test("test that they are almost equal", () => {
    expect(component.get_component_name()).toEqual(cName);
  });
});

describe("test_get_input_var_names", () => {
  var component = new BmiHeat();
  component.initialize();
  var inputVarNames = ["plate_surface__temperature"];

  test("test that they are almost equal", () => {
    expect(component.get_input_var_names()).toEqual(inputVarNames);
  });
});

describe("test_get_input_var_name_count", () => {
  var component = new BmiHeat();
  component.initialize();
  var inputVarNames = ["plate_surface__temperature"];

  test("test that they are almost equal", () => {
    expect(component.get_input_item_count()).toEqual(inputVarNames.length);
  });
});

describe("test_get_output_var_names", () => {
  var component = new BmiHeat();
  component.initialize();
  var outputVarNames = ["plate_surface__temperature"];

  test("test that they are almost equal", () => {
    expect(component.get_output_var_names()).toEqual(outputVarNames);
  });
});

describe("test_get_output_var_name_count", () => {
  var component = new BmiHeat();
  component.initialize();
  var outputVarNames = ["plate_surface__temperature"];

  test("test that they are almost equal", () => {
    expect(component.get_output_item_count()).toEqual(outputVarNames.length);
  });
});

describe("test_get_start_time", () => {
  var component = new BmiHeat();
  component.initialize();

  test("test that they are almost equal", () => {
    expect(component.get_start_time()).toBeCloseTo(0.0, delta);
  });
});

describe("test_get_end_time", () => {
  var component = new BmiHeat();
  component.initialize();

  test("test that they are almost equal", () => {
    expect(component.get_end_time()).toBeCloseTo(Number.MAX_VALUE, delta);
  });
});

/**
 * Test Var Methods
 */

describe("test_get_var_grid", () => {
  var component = new BmiHeat();
  component.initialize();

  test("test that they are almost equal", () => {
    expect(component.get_var_grid(varName)).toEqual(gridId);
  });
});

// describe("test_get_var_type", () => {
//   var component = new BmiHeat();
//   component.initialize();
//   var varType = "double";

//   test("test that they are almost equal", () => {
//     expect(varType).toEqual(component.get_var_type(varName));
//   });
// });

describe("test_get_var_units", () => {
  var component = new BmiHeat();
  component.initialize();
  var varUnits = "K";

  test("test that they are almost equal", () => {
    expect(component.get_var_units(varName)).toEqual(varUnits);
  });
});

// describe("test_get_var_item_size", () => {
//   var component = new BmiHeat();
//   component.initialize();
//   var size_of_number = 8;

//   test("test that they are almost equal", () => {
//     expect(size_of_number).toEqual(component.get_var_item_size(varName));
//   });
// });

// describe("test_get_var_nbytes", () => {
//   var component = new BmiHeat();
//   component.initialize();
//   gridSize = 48;
//   var varCpy = new Array(gridSize);
//   component.get_value(varName, varCpy);
//   size_of_number = 8;

//   test("test that they are almost equal", () => {
//     expect(component.get_var_nbytes(varName)).toEqual(
//       size_of_number * varCpy.length
//     );
//   });
// });

describe("test_get_var_location", () => {
  var component = new BmiHeat();
  component.initialize();
  var varLocation = "node";

  test("test that they are almost equal", () => {
    expect(component.get_var_location(varName)).toEqual(varLocation);
  });
});
