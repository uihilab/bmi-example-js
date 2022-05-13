# bmi-example-js
An example of implementing [BMI-JS](https://github.com/uihilab/BMI-JS) for the CSDMS [Basic Model Interface](https://bmi-spec.readthedocs.io/en/latest/) (BMI).

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
