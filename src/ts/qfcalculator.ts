import Calculator from "./calculator";
import Quadratic from "./quadratic";
import LatexFormatter from "./latex-formatter";

declare const MathJax: any, Plotly: any;

class QFCalculator extends Calculator {
  /**
    Converts the input text in TeX format to an SVG element with its mathematical representation.
      @param texStr - The input text in TeX format to be converted.
      @return - A string representing the innerHTML of the resulting SVG element.
  */

  protected static convertTexToSvg(texStr: string): string {
    return MathJax ? MathJax.tex2svg(texStr).innerHTML : texStr;
  }

  /**
    Receives an array of HTML input elements in the els parameter and validates if the input data is a valid integer,
    decimal, or fractional number. It also checks if the value of the input element with the name a is different than zero.
      @param els - An array of HTML input elements.
      @returns - Returns the string 'valid' if the input data is valid. Otherwise, returns an error message.
  */

  protected static validateInputValue(els: HTMLInputElement[]): string {
    return Calculator.validateInputValue(els, true, "a");
  }

  /**
    Formats the data entered in the html inputs contained in the els argument and returns an array of strings with the
    formatted data to be manipulated by the Algebrite library
      @param els - Array of HTML input elements to be formatted
      @return - Array of strings with the formatted data
  */

  protected static formatInputsValues(els: HTMLInputElement[]): string[] {
    return els.map((el) => {
      const value = QFCalculator.getInputValue(el);
      if (value.match(/\d*[.]\d/)) return `${parseFloat(value) * 1e17}/${1e17}`;
      else return value;
    });
  }

  /**
    This constructor creates a quadratic function calculator from the following arguments:
      @param formulaSelector - a string containing the CSS selector for the field where will be displayed the calculated quadratic function formula
      @param inputsSelectors - an array of strings containing the CSS selectors for the input fields where the user inputs the coefficients of the
                               quadratic function
      @param formSelector - a string containing the CSS selector for the form element that contains the input fields and submit button
      @param outputSelector - a string containing the CSS selector for the element where the calculated function roots, vertex and plot are displayed
      @param outputHsSelctor - a string containing the CSS selectors for the heading elements for the displayed data
      @param rootsDivSelector - a string containing the CSS selector for the div element that will display the roots of the quadratic function
      @param coordinatesDivSelector - a string containing the CSS selector for the div element where the coordinates of the quadratic function's
                                      vertex will be displayed
      @param graphDivSelector - a string containing the CSS selector for the div element that will display the plot of the quadratic function
      @param errorFeedbackDivSelector - a string containing the CSS selector for the div element that will display any error feedback messages. 
  */

  public constructor(
    formulaSelector: string,
    inputsSelectors: string[],
    formSelector: string,
    outputSelector: string,
    outputHsSelctor: string,
    rootsDivSelector: string,
    coordinatesDivSelector: string,
    graphDivSelector: string,
    errorFeedbackDivSelector: string,
  ) {
    super();
    const formulaDiv = document.querySelector(formulaSelector) as HTMLElement,
      inputsElements = inputsSelectors.map(
        (selector) => document.querySelector(selector) as HTMLInputElement,
      ),
      form = document.querySelector(formSelector) as HTMLFormElement,
      OutputElement = document.querySelector(outputSelector) as HTMLElement,
      outputHeadings = document.querySelectorAll(
        outputHsSelctor,
      ) as NodeListOf<HTMLElement>,
      rootsDiv = document.querySelector(rootsDivSelector) as HTMLElement,
      coordinatesDiv = document.querySelector(
        coordinatesDivSelector,
      ) as HTMLElement,
      graphDiv = document.querySelector(graphDivSelector) as HTMLElement,
      errorFeedbackDiv = document.querySelector(
        errorFeedbackDivSelector,
      ) as HTMLElement;

    /**
      Collects user data when the form is submitted, validates the input data, and instantiates the QuadraticFunction class based on the obtained
      coefficients. It then uses the data obtained from the instance to display the results and plot the graph of the function. The function
      handles errors that may occur during the validation or instantiation process and provides feedback to the user.
    */

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        if (QFCalculator.validateInputValue(inputsElements) !== "valid")
          throw "Invalid input";
        const [A, B, C] = QFCalculator.formatInputsValues(inputsElements),
          { formula, roots, vertex, plotPoits } = new Quadratic(A, B, C);
        outputHeadings.forEach((el) => el.classList.remove("non-display"));
        formulaDiv.innerHTML = QFCalculator.convertTexToSvg(
          LatexFormatter.formulaFormatter(formula),
        );
        rootsDiv.innerHTML = LatexFormatter.rootsFormatter(roots)
          .map((str) => QFCalculator.convertTexToSvg(str))
          .join("");
        coordinatesDiv.innerHTML = QFCalculator.convertTexToSvg(
          LatexFormatter.criticalPointFormatter(vertex),
        );
        if (Plotly)
          Plotly.newPlot(
            graphDiv,
            [
              {
                ...plotPoits,
                mode: "line",
              },
            ],
            {
              margin: {
                l: 60,
                r: 5,
                b: 20,
                t: 5,
              },
            },
          );
      } catch (err) {
        formulaDiv.innerHTML =
          QFCalculator.convertTexToSvg("y = ax^2 + bx + c");
        outputHeadings.forEach((el) => el.classList.add("non-display"));
        rootsDiv.innerHTML = "";
        coordinatesDiv.innerHTML = "";
        graphDiv.innerHTML = "";
        errorFeedbackDiv.textContent =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Error";
        form.addEventListener(
          "submit",
          () => (errorFeedbackDiv.textContent = null),
        );
        throw err;
      }
      OutputElement.scrollIntoView();
    });

    inputsElements.forEach((el, i, arr) => {
      // Triggers the showFeedback method on the object when this element loses focus

      el.addEventListener("blur", () =>
        Calculator.showFeedback(
          el,
          QFCalculator.validateInputValue([el]),
          form,
        ),
      );

      // Triggers the whenKeyDown method when a key is pressed down while the parent object has focus

      el.addEventListener("keydown", (e) =>
        Calculator.whenKeyDown(e, arr[i + 1]),
      );
    });
  }
}

export default QFCalculator;
