/**
 * Solves the 2D heat equation on a uniform grid.
 * @class
 * @name Solve2D
 */
class Solve2D {
  /**
   * Main solver
   * @param temperature a 2D array of temperatures
   * @param shape the dimensions of the grid, in (rows, cols)
   * @param spacing the distance between rows and columns, respectively
   * @param alpha parameter in heat equation
   * @param timeStep current time step
   * @return the temperatures after timeStep
   */
  static solve(temperature, shape, spacing, alpha, timeStep) {
    let topRowIndex = shape[0] - 1;
    let topColIndex = shape[1] - 1;
    let dx2 = Math.pow(spacing[1], 2.0);
    let dy2 = Math.pow(spacing[0], 2.0);
    let c = (alpha * timeStep) / (dx2 + dy2);
    const M = shape[0],
      N = shape[1];

    var arr = new Array(M);
    for (var i = 0; i < M; i++) {
      arr[i] = new Array(N);
    }
    let newTemperature = arr;

    for (let i = 1; i < topRowIndex; i++) {
      for (let j = 1; j < topColIndex; j++) {
        let rowOp = dx2 * (temperature[i][j - 1] + temperature[i][j + 1]);
        let colOp = dy2 * (temperature[i - 1][j] + temperature[i + 1][j]);
        newTemperature[i][j] =
          c * (rowOp + colOp - 2.0 * (dx2 + dy2) * temperature[i][j]);
      }
    }

    for (let j = 0; j < shape[1]; j++) {
      newTemperature[0][j] = 0.0;
      newTemperature[topRowIndex][j] = 0.0;
    }

    for (let i = 0; i < shape[0]; i++) {
      newTemperature[i][0] = 0.0;
      newTemperature[i][topColIndex] = 0.0;
    }

    for (let i = 1; i < topRowIndex; i++) {
      for (let j = 1; j < topColIndex; j++) {
        newTemperature[i][j] += temperature[i][j];
      }
    }

    return newTemperature;
  }
}

module.exports = Solve2D;
