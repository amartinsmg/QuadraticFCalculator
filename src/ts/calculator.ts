  //  Contains basic methods for a web calculator and must be instantiated to create specific calculators.

abstract class Calculator {
  /**
    Takes an HTML input element as a parameter (el) and retrieves its "value" attribute.
      @param el - an HTML input element
      @returns - The processed value of the input element's "value" attribute with trimmed whitespace and replaced commas.
  */

  protected static getInputValue(el: HTMLInputElement): string {
    return el.value.trim().replace(",", ".");
  }

  /**
    Validates the value attribute of each HTML input element in the array provided in the els parameter looking for an integer or
    fractional number. If the fraction attribute is true, it also accepts a fraction as a valid result. The nonZero argument indicates
    the name attribute of the input elements that cannot contain a value of zero.
      @param els - an array of HTML input elements
      @param fraction - a boolean value indicating whether to allow fractions as valid results
      @param nonZero - the name attribute of any input elements that cannot have a value of zero
      @return - The string 'valid' if all inputs pass validation. Otherwise, an error message string.
  */

  protected static validateInputValue(
    els: HTMLInputElement[],
    fraction: boolean,
    ...nonZero: string[]
  ): string {
    for (let el of els) {
      const value: string = Calculator.getInputValue(el),
        fractionRegEx = /^-?\d+[/][1-9]\d*$/,
        numberRegEx = /^-?\d*[.]?\d+$/,
        zeroFractionRegEx = /^-?0+[/]/,
        zeroNumberRegEx = /^-?0*[.]?0+$/,
        validValue = fraction
          ? fractionRegEx.test(value) || numberRegEx.test(value)
          : numberRegEx.test(value),
        zeroNumber =
          zeroFractionRegEx.test(value) || zeroNumberRegEx.test(value);
      if (!validValue) return "Enter a valid number!";
      if (nonZero.includes(el.name) && zeroNumber)
        return "Enter a non-zero number!";
    }
    return "valid";
  }

  /**
    Shows an error message below the HTML input element el if feedbackMessage is not 'valid' and removes it if the content of el is
    changed or the parent form is reset
      @param el - The HTML input element to show the error message below
      @param feedbackMessage - A string with the error message to be shown or 'valid' if no error message should be displayed
      @param parentForm - The HTML form element that contains the input element el
      @return - None.
  */

  protected static showFeedback(
    el: HTMLInputElement,
    feedbackMessage: string,
    parentForm: HTMLFormElement
  ): void {
    const parentEl = el.parentElement as HTMLElement;
    if (feedbackMessage !== "valid" && !el.classList.contains("invalid-input")) {
      const invalidMessageDiv = document.createElement("div"),
        removeInvalidMessage = () => {
          el.classList.remove("invalid-input");
          invalidMessageDiv.remove();
        },
        once = true;
      el.classList.add("invalid-input");
      invalidMessageDiv.classList.add("invalid-feedback");
      invalidMessageDiv.textContent = feedbackMessage;
      parentEl.appendChild(invalidMessageDiv);
      el.addEventListener("input", removeInvalidMessage, { once });
      parentForm.addEventListener("reset", removeInvalidMessage, { once });
    }
  }

  /**
    Receives a keyboard event as a parameter and checks if the pressed key is the Enter key. If so, it moves the focus to the HTML
    element passed in the nextEl parameter. If nextEl is not given, it submits the form.
      @param e - The keyboard event to check
      @param nextEl - The HTML element to move the focus to
      @return - None.
  */

  protected static whenKeyDown(
    e: KeyboardEvent,
    nextEl?: HTMLInputElement
  ): void {
    if (e.key === "Enter") {
      if (nextEl) {
        nextEl.focus();
        e.preventDefault();
      }
      return void 0;
    }
  }
}

export default Calculator;
