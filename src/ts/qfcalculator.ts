import Quadratic from "./quadratic";
import Calculator from "./calculator";
import "mathjax/es5/tex-svg.js";
const Plotly = require("plotly.js/dist/plotly-basic.min.js");

declare const MathJax: any;

abstract class QFCalculator extends Calculator {
  //Call MathJax method that convert latex to an svg element and get its innerHTML

  private static convertTexToSvg(texStr: string): string {
    return MathJax.tex2svg(texStr).innerHTML;
  }

  //Read an input element's value and check if it's valid

  protected static validateInputValue(els: HTMLInputElement[]): string {
    return Calculator.validateInputValue(els, true, "a");
  }

  //Format the data from an input element for use in Algebrite

  private static formatInputsValues(els: HTMLInputElement[]): string[] {
    return els.map((el) => {
      const VALUE = QFCalculator.getInputValue(el);
      if (VALUE.match(/\d*[.]\d/)) return `${parseFloat(VALUE) * 1e17}/${1e17}`;
      else return VALUE;
    });
  }

  //Show the errors found in user input

  protected static showFeedback(
    el: HTMLInputElement,
    parentForm: HTMLFormElement
  ): void {
    Calculator.showFeedback(el, parentForm, QFCalculator);
  }

  public static main(): void {
    //Constatns that store elements that will be often read or changed

    const FormulaDiv = document.querySelector("#formula"),
      AInput: HTMLInputElement = document.querySelector("#a-input"),
      BInput: HTMLInputElement = document.querySelector("#b-input"),
      CInput: HTMLInputElement = document.querySelector("#c-input"),
      InputsElements = [AInput, BInput, CInput],
      Form: HTMLFormElement = document.querySelector("#coefficients-form"),
      OutputElement = document.querySelector("#output-data"),
      OutputHeadings = document.querySelectorAll(".output-heading"),
      RootsDiv = document.querySelector("#roots"),
      CoordinatesDiv = document.querySelector("#coordinates"),
      GraphFig = document.querySelector("#graph"),
      ErrorFeedbackDiv = document.querySelector("#error-feedback");

    //Instantiate QuadraticFunction class, read its data and update the document when form is submitted

    Form.onsubmit = (e) => {
      e.preventDefault();
      try {
        if (QFCalculator.validateInputValue(InputsElements) !== "valid")
          throw "Invalid input";
        const [A, B, C] = QFCalculator.formatInputsValues(InputsElements),
          { formula, plotPoits, roots, vertex } = new Quadratic(A, B, C);
        OutputHeadings.forEach((el) => el.classList.remove("non-display"));
        FormulaDiv.innerHTML = QFCalculator.convertTexToSvg(formula);
        RootsDiv.innerHTML = roots
          .map((str) => QFCalculator.convertTexToSvg(str))
          .join("");
        CoordinatesDiv.innerHTML = QFCalculator.convertTexToSvg(vertex);
        Plotly.newPlot(GraphFig, [{ ...plotPoits, mode: "line" }]);
      } catch (err) {
        FormulaDiv.innerHTML =
          QFCalculator.convertTexToSvg("y = ax^2 + bx + c");
        OutputHeadings.forEach((el) => el.classList.add("non-display"));
        RootsDiv.innerHTML = null;
        CoordinatesDiv.innerHTML = null;
        GraphFig.innerHTML = null;
        ErrorFeedbackDiv.textContent = err instanceof Error ? err.message : err;
        Form.addEventListener(
          "submit",
          () => (ErrorFeedbackDiv.textContent = null)
        );
        throw err;
      }
      OutputElement.scrollIntoView();
    };

    InputsElements.forEach((el, i, arr) => {
      //Method that calls the validateAndGetInputValue method for their parent objects when its lose focus

      el.onblur = () => QFCalculator.showFeedback(el, Form);

      //Method that call the whenKeyDown method when a key is downed

      el.onkeydown = (e) => QFCalculator.whenKeyDown(e, arr[i + 1]);
    });
  }
}

export default QFCalculator.main;