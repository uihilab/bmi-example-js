const Solve2D = require("./solve2D.js");

/**
 * @class 
 * @name Heat
 * Create a new Heat model.
   * @param {Number} nRows the number of rows in the solution grid
   * @param {Number} nCols the number of columns in the solution grid
   * @param {Number} dx distance between columns in grid
   * @param {Number} dy distance between rows in grid
   * @param {Number} xStart coordinates of lower left corner of grid
   * @param {Number} yStart coordinates of lower left corner of grid
   * @param {Number} alpha parameter in heat equation
 */

class Heat {
  #shape;
  #spacing;
  #origin;
  #alpha;
  #time;
  #timeStep;
  #temperature;

  /**
   */
  constructor(nRows, nCols, dx, dy, xStart, yStart, alpha) {
    if (typeof nRows === "undefined") {
      nRows = 8;
      nCols = 6;
      dx = 1.0;
      dy = 1.0;
      xStart = 0.0;
      yStart = 0.0;
      alpha = 1.0;
    } else if (typeof nRows === "string" && typeof nCols === "undefined") {
      const file_params = require(nRows);
      nRows = file_params.nRows;
      nCols = file_params.nCols;
      dx = file_params.dx;
      dy = file_params.dy;
      xStart = file_params.xStart;
      yStart = file_params.yStart;
      alpha = file_params.alpha;
    } else {
    }
    this.#shape = [nRows, nCols];
    this.#spacing = [dy, dx];
    this.#origin = [yStart, xStart];
    this.#alpha = alpha;
    this.#time = 0.0;

    var minSpacing = Math.min(dy, dx);
    this.#timeStep = Math.pow(minSpacing, 2.0) / (4.0 * this.#alpha);

    /**
     *  Initialize plate temperature.
     */
    this.#temperature = this.create2DArray(nRows, nCols);
  }

  /**
   *Creates a 2D array of size [row][column]
   * @param {Number} row
   * @param {Number} column
   * @returns {Object[]} 2D Array of size [Row][Column]
   */
  create2DArray(row, column) {
    var arr = new Array(row).fill(0.0);
    for (var i = 0; i < row; i++) {
      arr[i] = new Array(column).fill(0.0);
    }
    return arr;
  }

  /**
   * Getter for the field shape
   *
   * @return an array.
   */
  get_shape() {
    return this.#shape;
  }

  /**
   * Setter for the field shape
   *
   * @param shape an array.
   */
  set_shape(shape) {
    this.#shape = shape;
  }

  /**
   * Getter for the field spacing.
   *
   * @return an array.
   */
  get_spacing() {
    return this.#spacing;
  }

  /**
   *  Setter for the field spacing.
   *
   * @param spacing an array.
   */
  set_spacing(spacing) {
    this.#spacing = spacing;
  }

  /**
   *  Getter for the field origin.
   *
   * @return an array..
   */
  get_origin() {
    return this.#origin;
  }

  /**
   *  Setter for the field origin.
   *
   * @param origin an array.
   */
  set_origin(origin) {
    this.#origin = origin;
  }

  /**
   *  Getter for the field alpha.
   *
   * @return a Number Object.
   */
  get_alpha() {
    return this.#alpha;
  }

  /**
   *  Setter for the field alpha.
   *
   * @param alpha a Number Object.
   */
  set_alpha(alpha) {
    this.#alpha = alpha;
  }

  /**
   *  Getter for the field time.
   *
   * @return a Number Object.
   */
  get_time() {
    return this.#time;
  }

  /**
   *  Setter for the field time.
   *
   * @param time a Number Object.
   */
  set_time(time) {
    this.#time = time;
  }

  /**
   *  Getter for the field timeStep .
   *
   * @return a Number Object.
   */
  get_time_step() {
    return this.#timeStep;
  }

  /**
   *  Setter for the field timeStep .
   *
   * @param timeStep a Number Object.
   */
  set_time_step(timeStep) {
    this.#timeStep = timeStep;
  }

  /**
   *  Getter for the field temperature .
   *
   * @return a 2D array of Number.
   */
  get_temperature() {
    return this.#temperature;
  }

  /**
   *  Setter for the field temperature .
   *
   * @param temperature a 2D array of Number.
   */
  set_temperature(temperature) {
    this.#temperature = temperature;
  }

  /**
   * Helper function to deal with array copying
   */
  deepCopy(arr) {
    let copy = [];
    arr.forEach((elem) => {
      if (Array.isArray(elem)) {
        copy.push(this.deepCopy(elem));
      } else {
        if (typeof elem === "object") {
          copy.push(this.deepCopyObject(elem));
        } else {
          copy.push(elem);
        }
      }
    });
    return copy;
  }

  /**
   * Helper function to deal with Objects
   */
  deepCopyObject(obj) {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        tempObj[key] = this.deepCopy(value);
      } else {
        if (typeof value === "object") {
          tempObj[key] = this.deepCopyObject(value);
        } else {
          tempObj[key] = value;
        }
      }
    }
    return tempObj;
  }

  /**
   * Calculate new temperatures for the next time step.
   */
  advance_in_time() {
    let copy = this.deepCopy(this.#temperature);
    this.#temperature = Solve2D.solve(
      copy,
      this.#shape,
      this.#spacing,
      this.#alpha,
      this.#timeStep
    );
    this.#time += this.#timeStep;
  }
}

module.exports = Heat;
