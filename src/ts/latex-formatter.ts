import MathExpression from "./math-expression";
import RootsResult from "./roots-result";

class LatexFormatter {
  /**
   * Formats a function expression into a LaTeX string prefixed with "y =".
   *
   * @param formula A MathExpression representing the function.
   * @returns A LaTeX-formatted string representing the function in the form "y = ...".
   */

  public static formulaFormatter(formula: MathExpression): string {
    return `y = ${formula.toLatex()}`;
  }

  /**
   * @brief Formats the roots of a function into LaTeX strings.
   *
   * If no real roots exist, returns a single LaTeX string explaining that.
   * If one real root exists, formats it as "x = ...".
   * If multiple real roots exist, formats them as indexed variables
   * (e.g., x₁, x₂) including exact and approximate representations when applicable.
   *
   * @param roots A RootsResult object describing the real roots of the function.
   * @returns An array of LaTeX-formatted strings representing the roots.
   */

  public static rootsFormatter(roots: RootsResult): string[] {
    if (roots.type != "real")
      return ["\\text{This quadratic function doesn't have any real root.}"];
    const rootsLatex = roots.values.map((obj) => obj.toLatex()),
      rootsNumericString = roots.values.map((obj) => obj.toNumericString()),
      formattedRoots = rootsNumericString.map((str, i) => {
        if (rootsLatex[i].match(/\\/)) {
          if (str.match(/\.{3}/))
            return `${rootsLatex[i]} \\approx ${str.replace("...", "")}`;
          else return `${rootsLatex[i]} = ${str}`;
        }
        return rootsLatex[i];
      });
    if (rootsLatex.length === 1) return [`x = ${formattedRoots.pop()}`];
    return formattedRoots.map((s, i) => `{x}_{${i + 1}} = ${s} `);
  }

  /**
   * Converts each MathExpression of a critical point into its LaTeX representation
   * and joins them as a coordinate pair.
   *
   * @param point An object with two MathExpression objects representing the x and y coordinates
   *              of the critical point.
   * 
   * @returns A LaTeX-formatted string representing the critical point coordinates.
   */

  public static criticalPointFormatter(point: { x: MathExpression; y: MathExpression }): string {
    return `\\left( ${point.x.toLatex()}, ${point.y.toLatex()} \\right)`;
  }
}

export default LatexFormatter;
