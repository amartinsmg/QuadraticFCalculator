const Algebrite = require("algebrite");

/**
 * @brief Represents a symbolic mathematical expression.
 *
 * This class encapsulates a string-based mathematical expression
 * and provides methods to convert it into LaTeX, numeric string,
 * numeric value, or return its original symbolic form.
 */

class MathExpression {
  constructor(private readonly expr: string) {}

  /**
   * @brief Converts the symbolic expression to a simplified LaTeX string.
   *
   * The expression is first simplified symbolically using Algebrite,
   * then converted to its LaTeX representation.
   *
   * @returns A LaTeX-formatted string of the simplified expression.
   */

  public toLatex(): string {
    return Algebrite.simplify(this.expr).toLatexString();
  }

  /**
   * @brief Converts the symbolic expression to a floating-point string.
   *
   * The expression is evaluated numerically using Algebrite's float
   * function and returned as a string representation.
   *
   * @returns A string containing the numeric (floating-point) value.
   */

  public toNumericString(): string {
    return Algebrite.run(`float(${this.expr})`).toString();
  }

  /**
   * @brief Converts the symbolic expression to a JavaScript number.
   *
   * The expression is evaluated numerically and parsed into a
   * JavaScript number using parseFloat.
   *
   * @returns The numeric (floating-point) value of the expression.
   */

  public toNumber(): number {
    return parseFloat(Algebrite.run(`float(${this.expr})`));
  }

  /**
   * @brief Returns the original symbolic expression as a string.
   *
   * @returns The raw expression string without simplification.
   */

  public toString(): string {
    return this.expr;
  }
}

export default MathExpression;
