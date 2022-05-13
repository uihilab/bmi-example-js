const Heat = require("../heat/heat.js");

describe("test_initialize_heat_with_values", () => {
  nRows = 8;
  nCols = 6;
  dx = 1.0;
  dy = 1.0;
  xStart = 0.0;
  yStart = 0.0;
  alpha = 1.0;

  var heat = new Heat(nRows, nCols, dx, dy, xStart, yStart, alpha);

  test("Should not be null", () => {
    expect(heat).not.toBeNull();
  });
});

describe("test_initialize_heat_without_values", () => {
  var heat = new Heat();

  test("Should not be null", () => {
    expect(heat).not.toBeNull();
  });
});

describe("test_initialize_heat_string", () => {
  var heat = new Heat("../data/heat.json");

  test("Should not be null", () => {
    expect(heat).not.toBeNull();
  });
});

describe("test_get_shape", () => {
  var heat = new Heat();
  var shape = [8, 6];

  test("Assert equal", () => {
    expect(heat.get_shape()).toEqual(shape);
  });
});

describe("test_set_shape", () => {
  var heat = new Heat();
  var newShape = [100, 50];

  heat.set_shape(newShape);

  test("Assert equal", () => {
    expect(heat.get_shape()).toEqual(newShape);
  });
});

describe("test_get_spacing", () => {
  var heat = new Heat();
  var spacing = [1.0, 1.0];

  test("Assert equal", () => {
    expect(heat.get_spacing()).toEqual(spacing);
  });
});

describe("test_set_spacing", () => {
  var heat = new Heat();
  var newSpacing = [500, 250];
  heat.set_spacing(newSpacing);

  test("Assert equal", () => {
    expect(heat.get_spacing()).toEqual(newSpacing);
  });
});

describe("test_get_origin", () => {
  var heat = new Heat();
  var origin = [0.0, 0.0];

  test("Assert equal", () => {
    expect(heat.get_origin()).toEqual(origin);
  });
});

describe("test_set_origin", () => {
  var heat = new Heat();
  var newOrigin = [10.0, 15.0];
  heat.set_origin(newOrigin);

  test("Assert equal", () => {
    expect(heat.get_origin()).toEqual(newOrigin);
  });
});

describe("test_get_alpha", () => {
  var heat = new Heat();
  var alpha = 1.0;

  test("Assert equal", () => {
    expect(heat.get_alpha()).toEqual(alpha);
  });
});

describe("test_set_alpha", () => {
  var heat = new Heat();
  var newAlpha = 0.2;
  heat.set_alpha(newAlpha);

  test("Assert equal", () => {
    expect(heat.get_alpha()).toEqual(newAlpha);
  });
});

describe("test_get_time", () => {
  var heat = new Heat();
  var time = 0.0;

  test("Assert equal", () => {
    expect(heat.get_time()).toEqual(time);
  });
});

describe("test_set_time", () => {
  var heat = new Heat();
  var newTime = 42.0;
  heat.set_time(newTime);

  test("Assert equal", () => {
    expect(heat.get_time()).toEqual(newTime);
  });
});

describe("test_get_time_step", () => {
  var heat = new Heat();

  test("Assert equal", () => {
    expect(heat.get_time_step()).toBeGreaterThan(0.0);
  });
});

describe("test_set_time_step", () => {
  var heat = new Heat();
  var newTimeStep = 5.0;
  heat.set_time_step(newTimeStep);

  test("Assert equal", () => {
    expect(heat.get_time_step()).toEqual(newTimeStep);
  });
});

describe("test_get_temperature", () => {
  var temperature = new Array(8).fill(0.0);
  for (var i = 0; i < 8; i++) {
    temperature[i] = new Array(6).fill(0.0);
  }
  var heat = new Heat();
  var expected = temperature[0];
  var actual = heat.get_temperature()[0];

  test("test that they are almost equal", () => {
    expect(expected).toEqual(actual);
  });
});

describe("test_set_temperature", () => {
  var shape = [8, 6];
  var newTemperature = new Array(shape[0]).fill(0.0);
  for (var i = 0; i < 8; i++) {
    newTemperature[i] = new Array(shape[1]).fill(10.0);
  }

  var heat = new Heat();
  var actual = heat.set_temperature(newTemperature);

  test("test that they are almost equal", () => {
    expect(heat.get_temperature()).toEqual(newTemperature);
  });
});

describe("test_advance_in_time", () => {
  var heat = new Heat();
  var finalTime = heat.get_time() + heat.get_time_step();
  heat.advance_in_time();

  test("test that they are almost equal", () => {
    expect(heat.get_time()).toEqual(finalTime);
  });
});
