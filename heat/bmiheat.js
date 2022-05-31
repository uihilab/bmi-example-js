const BMI = require("../bmijs/bmi.js");
const Heat = require("./heat.js");

/**
 * @class BmiHeat
 * Contains BMI methods that wrap the Heat class.
 */
class BmiHeat extends BMI {
  MODEL_NAME = "Heat";
  INPUT_VAR_NAMES = ["plate_surface__temperature"];
  OUTPUT_VAR_NAMES = ["plate_surface__temperature"];

  #model;
  #varUnits;
  #grids;
  #gridType;

  /**
   * @constructor
   * @memberof BmiHeat
   * Creates a new BmiHeat model that is ready for initialization.
   */
  constructor() {
    super();
    this.#model = null;
    this.#varUnits = {};
    this.#grids = {};
    this.#gridType = {};
  }

  /**
   * @method initialize
   * @memberof BmiHeat
   * @param {String} configFile - path to json file
   * Model control function
   */
  initialize(configFile) {
    if (typeof configFile === "undefined") {
      this.#model = new Heat(8, 6, 1.0, 1.0, 0.0, 0.0, 1.0);
    } else {
      this.#model = new Heat(configFile);
    }
    this.#initializeHelper();
  }

  /**
   * @private
   * @method #initializeHelper
   * Initializes BmiHeat properties using properties from the enclosed Heat
   * instance.
   */
  #initializeHelper() {
    let varname = this.INPUT_VAR_NAMES[0];
    this.#varUnits[varname] = "K";
    this.#grids[0] = varname;
    this.#gridType = { 0: "uniform_rectilinear" };
  }

  /**
   * @override
   */
  update() {
    this.#model.advance_in_time();
  }

  /**
   * @override
   */
  update_until(then) {
    let nSteps = (then - this.get_current_time()) / this.get_time_step();
    for (let i = 0; i < Math.floor(nSteps); i++) {
      this.update();
    }
    this.#updateFrac(nSteps - Math.floor(nSteps));
  }

  /**
   * @private
   * @method #updateFrac
   * A helper for updating a model to a fractional time step.
   * @param timeFrac
   */
  #updateFrac(timeFrac) {
    let timeStep = this.get_time_step();
    this.#model.set_time_step(timeFrac * timeStep);
    this.update();
    this.#model.set_time_step(timeStep);
  }

  /**
   * @override
   */
  finalize() {
    this.#model = null;
  }

  /*
   * Model information functions
   */

  /**
   * @override
   */
  get_component_name() {
    return this.MODEL_NAME;
  }

  /**
   * @override
   */
  get_input_item_count() {
    return this.INPUT_VAR_NAMES.length;
  }

  /**
   * @override
   */
  get_output_item_count() {
    return this.OUTPUT_VAR_NAMES.length;
  }

  /**
   * @override
   */
  get_input_var_names() {
    return this.INPUT_VAR_NAMES;
  }

  /**
   * @override
   */
  get_output_var_names() {
    return this.OUTPUT_VAR_NAMES;
  }

  /*
   * Variable information functions
   */

  /**
   * @override
   */
  get_var_grid(varName) {
    let arr = Object.values(this.#grids);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == varName) {
        return parseInt(Object.keys(this.#grids)[i]);
      }
    }
    return -1;
  }

  /**
   * @override
   */
  get_var_type(varName) {
    if (varName == this.get_output_var_names()[0]) {
      if (typeof this.#model.get_temperature() === "Number") {
        return "Number";
      }
    }
    return null;
  }

  /**
   * @override
   */
  get_var_units(varName) {
    return this.#varUnits[varName];
  }

  /**
   * @override
   */
  get_var_item_size(varName) {
    let itemSize = 0;
    if (this.get_var_type(varName) === "Number") {
      itemSize = 8;
    }
    return itemSize;
  }

  /**
   * @override
   */
  get_var_nbytes(varName) {
    if (varName == this.get_output_var_names()[0]) {
      return (
        this.get_var_item_size(varName) *
        this.get_grid_size(this.get_var_grid(varName))
      );
    } else {
      return -1;
    }
  }

  /**
   * @override
   */
  get_var_location(varName) {
    return "node";
  }

  /*
   * Time functions
   */

  /**
   * @override
   */
  get_start_time() {
    return 0;
  }

  /**
   * @override
   */
  get_current_time() {
    return this.#model.get_time();
  }

  /**
   * @override
   */
  get_end_time() {
    return Number.MAX_VALUE;
  }

  /**
   * @override
   */
  get_time_units() {
    return null;
  }

  /**
   * @override
   */
  get_time_step() {
    return this.#model.get_time_step();
  }

  /*
   * Getters and setters
   */

  /**
   * @override
   */
  get_value(varName, dest) {
    let nRows = this.#model.get_shape()[0];
    let nCols = this.#model.get_shape()[1];
    for (let i = 0; i < nRows; i++) {
      dest = this.arraycopy(
        this.#model.get_temperature()[i],
        0,
        dest,
        i * nCols,
        nCols
      );
    }
    return dest;
  }

  arraycopy(src, srcPos, dst, dstPos, length) {
    while (length--) dst[dstPos++] = src[srcPos++];
    return dst;
  }

  /**
   * Not implemented for Heat
   */
  get_value_ptr(varName) {
    return null;
  }

  /**
   * Not implemented for Heat
   */
  get_value_at_indices(varName, dest, indices) {
    return; // Not implemented
  }

  /**
   * Not implemented for Heat
   */
  get_value_at_indices(varName, dest, indices) {
    return; // Not implemented
  }

  /**
   * Not implemented for Heat
   */
  get_value_at_indices(varName, dest, indices) {
    return; // Not implemented
  }

  /**
   * @override
   */
  set_value(varName, src) {
    let nRows = this.#model.get_shape()[0];
    let nCols = this.#model.get_shape()[1];
    let temperature = this.#model.get_temperature();
    for (let i = 0; i < nRows; i++) {
      temperature[i] = this.arraycopy(src, i * nCols, temperature[i], 0, nCols);
    }
    this.#model.set_temperature(temperature);
  }

  /**
   * Not implemented for Heat
   */
  set_value_at_indices(varName, indices, src) {
    return;
  }

  /*
   * Model grid functions
   */

  /**
   * @override
   */
  get_grid_rank(gridId) {
    return this.#model.get_shape().length;
  }

  /**
   * @override
   */
  get_grid_size(gridId) {
    let product = 1;
    for (let i = 0; i < this.#model.get_shape().length; i++) {
      product *= this.#model.get_shape()[i];
    }
    return product;
  }

  /**
   * @override
   */
  get_grid_type(gridId) {
    return this.#gridType[gridId];
  }

  /**
   * @override
   */
  get_grid_shape(gridId, gridShape) {
    for (let i = 0; i < this.#model.get_shape().length; i++) {
      gridShape[i] = this.#model.get_shape()[i];
    }
    return gridShape;
  }

  /**
   * @override
   */
  get_grid_spacing(gridId, gridSpacing) {
    for (let i = 0; i < this.#model.get_spacing().length; i++) {
      gridSpacing[i] = this.#model.get_spacing()[i];
    }
    return gridSpacing;
  }

  /**
   * @override
   */
  get_grid_origin(gridId, gridOrigin) {
    for (let i = 0; i < this.#model.get_origin().length; i++) {
      gridOrigin[i] = this.#model.get_origin()[i];
    }
    return gridOrigin;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_x(gridId, gridX) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_y(gridId, gridY) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_z(gridId, gridZ) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_node_count(gridId) {
    return -1;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_edge_count(gridId) {
    return -1;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_face_count(gridId) {
    return -1;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_edge_nodes(gridId, edgeNodes) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_face_edges(gridId, faceEdges) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_face_nodes(gridId, faceNodes) {
    return;
  }

  /**
   * Not implemented for Heat
   */
  get_grid_nodes_per_face(gridId, nodesPerFace) {
    return;
  }
}

module.exports = BmiHeat;
