const Algebrite = require("algebrite");
import MathExpression from "./math-expression";
import RootsResult from "./roots-result";
import PlotPoits from "./plot-points";

class QuadraticFunction {
  readonly formula: MathExpression;
  readonly roots: RootsResult;
  readonly vertex: { x: MathExpression; y: MathExpression };
  readonly plotPoits: PlotPoits;

  /**
   * Constructor that receives coefficients of a quadratic function in string format, which may contain integers, decimals, or fractions, and
   * returns an object with its properties.
   *
   * @param  a - Coefficient of the quadratic term.
   * @param  b - Coefficient of the linear term.
   * @param  c - Constant term.
   *
   * @returns Object containing the properties of the quadratic function:
   *     formula: MathExpression with the math formula.
   *     roots: an RootsResult with the roots of the function
   *     vertex: an object with two MathExpression objects representing the x and y coordinates of the vertex.
   *     plotPoints: object containing the coordinates for the function's graph,
   *                 with one array for the x values and another for the y values.
   */

  public constructor(a: string, b: string, c: string) {
    const formula = Algebrite.expand(`${a} * x^2 + (${b}) * x + (${c})`),
      roots: any = Algebrite.roots(formula),
      deltaFormula = `(${b})^2 - 4 * (${a}) * (${c})`,
      delta = parseFloat(Algebrite.float(deltaFormula).toString()),
      vertexFormulas = [
        `-(${b})/(2 * (${a}))`,
        `-(${deltaFormula})/(4 * (${a}))`,
      ],
      vertexCoordinates = vertexFormulas
        .map((str) => Algebrite.simplify(str))
        .map((obj) => new MathExpression(obj.toString())),
      rootsStr: string[] = roots.toString().replace(/\[|\]/g, "").split(",");
    this.formula = new MathExpression(formula.toString());
    this.roots = {
      type: delta < 0 ? "complex" : "real",
      values: rootsStr.map((str) => new MathExpression(str)),
    };
    this.vertex = { x: vertexCoordinates[0], y: vertexCoordinates[1] };
    const x1: number =
        this.roots.type == "real"
          ? this.roots.values[0].toNumber()
          : this.vertex.x.toNumber(),
      x2: number | null =
        this.roots.type == "real" && delta > 0
          ? this.roots.values[1].toNumber()
          : null;
    this.plotPoits = new PlotPoits(formula.toString(), x1, x2);
  }
}

export default QuadraticFunction;
