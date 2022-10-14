[![Basic Model Interface](https://img.shields.io/badge/CSDMS-Basic%20Model%20Interface-green.svg)](https://bmi.readthedocs.io/)

# bmi-example-js
An example of implementing [JavaScript Bindings](https://github.com/uihilab/BMI-JS) for the CSDMS [Basic Model Interface](https://bmi-spec.readthedocs.io/en/latest/) (BMI).

## Overview
This is an example of implementing a BMI for a simple model that solves the diffusion equation on a uniform rectangular plate with Dirichlet boundary conditions. The model and its BMI are written in JavaScript. Tests of the BMI are provided in Jest.

This repository is organized with the following directories:

### heat
Holds the model and the BMI for the model
### test-cases
Tests that cover the BMI of the model

## Build/Install
This example can be built and installed on Linux, macOS, and Windows.

### Prerequisites(for testing purposes to work with [Jest](https://jestjs.io/))
- Node

To build/install this example, using the current JavaScript BMI version, run
```bash
  npm install
```
To run the test cases
```bash
  npm test
```
## Citations
The specification usage is following the standard set by:

Hutton, E.W.H., Piper, M.D., and Tucker, G.E., 2020. The Basic Model Interface 2.0: A standard interface for coupling numerical models in the geosciences. Journal of Open Source Software, 5(51), 2317, https://doi.org/10.21105/joss.02317.

Peckham, S.D., Hutton, E.W., and Norris, B., 2013. A component-based approach to integrated modeling in the geosciences: The design of CSDMS. Computers & Geosciences, 53, pp.3-12, http://dx.doi.org/10.1016/j.cageo.2012.04.002.

The publication describing the implementation in JavaScript as well as the derived case studies can be found in:

Ewing G., Erazo Ramirez C., Vaidya W., & Demir I. 2022. Client-side Web-based Model Coupling using Basic Model Interface for Hydrology and Water Resources. EarthArxiv, 4547. https://doi.org/10.31223/X5XP93

## Feedback
Feel free to send us feedback by filing an issue.

## License
This project is licensed under the MIT licence - see the [LICENSE](https://github.com/uihilab/BMI-JS/blob/main/LICENSE) file for details.

## Acknowledgements
This project has been developed by the University of Iowa Hydroinformatics Lab (UIHI Lab):
https://hydroinformatics.uiowa.edu/
