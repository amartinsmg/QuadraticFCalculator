const { abs, compile, max, min, range } = require("mathjs");

class PlotPoits {
  x: number[];
  y: number[];

/**
 * @brief Creates an object with x and y values, both arrays of numbers, where each common index brings a coordinate to be plotted.
 * 
 * @param formula - A string with a mathematical formula.
 * @param xValues - Numerical values of x that must be present in the returned coordinates.
 * 
 * @returns - An object with the properties x and y, both being arrays of numbers where each common index brings a coordinate to draw a graph.
*/

  public constructor(formula: string, ...xValues: (number | null)[]) {
    const expression: any = compile(formula),
      filteredXValues = xValues
        .filter((x) => typeof x === "number" && !isNaN(x))
        .sort((a, b) => (a as number) - (b as number)),
      x1 = filteredXValues[0] ?? 0,
      x2 = filteredXValues[filteredXValues.length - 1] ?? x1,
      extraValue: number = max(2, abs(x2 - x1) / 5, min(abs(x1), abs(x2))),
      xMinValue = x1 - extraValue,
      xMaxValue = x2 + extraValue,
      step = abs(xMaxValue - xMinValue) / 100;
    this.x = range(xMinValue, xMaxValue, step).toArray();
    this.y = this.x.map((x) => expression.evaluate({ x }));
  }
}

export default PlotPoits;
