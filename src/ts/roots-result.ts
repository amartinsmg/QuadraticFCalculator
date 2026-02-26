import MathExpression from "./math-expression";

/**
 * @brief Represents the result of solving a equation.
 *
 * This discriminated union type models the possible outcomes
 * when computing the roots of a function.
 *
 * Possible result types:
 *
 * - "none":
 *   Indicates that no roots exist.
 *
 * - "real":
 *   Indicates that one or two real roots were found.
 *   @property {MathExpression[]} values
 *   An array containing the real root expressions.
 *
 * - "complex":
 *   Indicates that two complex conjugate roots were found.
 *   @property {MathExpression[]} values
 *   An array containing the complex root expressions.
 */

type RootsResult =
  | { type: "none" }
  | { type: "real"; values: MathExpression[] }
  | { type: "complex"; values: MathExpression[] };

export default RootsResult;
