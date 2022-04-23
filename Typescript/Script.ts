//Constatns that store elements that will be often read or changed

const AInput: HTMLInputElement = document.querySelector("#a-value"),
  BInput: HTMLInputElement = document.querySelector("#b-value"),
  CInput: HTMLInputElement = document.querySelector("#c-value"),
  Form: HTMLFormElement = document.querySelector("#input-form"),
  FormDiv: HTMLDivElement = document.querySelector("#function-form"),
  RootsDiv: HTMLDivElement = document.querySelector("#roots"),
  ResultRootsDiv: HTMLDivElement = document.querySelector("#result-roots"),
  CoordinatesDiv: HTMLDivElement = document.querySelector("#coordinates"),
  ResultCoordinatesDiv: HTMLDivElement = document.querySelector("#result-coordinates"),
  GraphDiv: HTMLDivElement = document.querySelector("#graph");

//Read an element's value and check if it's valid

function testInput(...els: HTMLInputElement[]) {
  let isValid = true;
  for (let el of els){
    const VALUE = el.value.trim(),
      FractionRegEx = /^-?\d+[/]\d+$/,
      DividedByZeroRegEx = /[/]0/,
      FloatRegEx = /^-?\d*[.]\d{1,15}$/,
      IntegerRegEx = /^-?\d+$/,
      ZeroFractionRegEx = /^-?0+[/]/,
      ZeroFloatRegEx = /^-?0*[.]0+$/,
      ZeroIntegerRegEx = /^-?0+$/,
      VALIDFRACTION = FractionRegEx.test(VALUE) && !DividedByZeroRegEx.test(VALUE),
      VALIDEFLOAT = FloatRegEx.test(VALUE),
      VALIDEINTEGER = IntegerRegEx.test(VALUE),
      ParentEl = el.parentElement;
    try{
      if(el.id === "a-value" && (ZeroFractionRegEx.test(VALUE) || ZeroFloatRegEx.test(VALUE) || ZeroIntegerRegEx.test(VALUE))){
        throw "Enter a non-zero number!";
      }
      if(!(VALIDFRACTION || VALIDEFLOAT || VALIDEINTEGER)){
        throw "Enter a integer, float or fractional number!";
      }
    }catch (err){
      if (ParentEl.childElementCount === 2){
        const InvalidMessageDiv = document.createElement("div");
        el.classList.add("invalid-input");
        InvalidMessageDiv.classList.add("invalid-message");
        InvalidMessageDiv.textContent = err;
        ParentEl.appendChild(InvalidMessageDiv);
        el.addEventListener("focus", () => {
          el.classList.remove("invalid-input");
          InvalidMessageDiv.remove();
        }, {once: true});
      }
      isValid = false;
    }
  }
  return isValid;
}

//Get the value of an element and format it

function getValue (el: HTMLInputElement){
  return el.value.trim().replace("/", "dividedBy");
}

//Move focus to the next element or submit the form if there is none

function whenKeyDown(e: KeyboardEvent, nextEl?: HTMLInputElement) {
  if (e.keyCode === 13) {
    if (nextEl) {
      nextEl.focus();
      nextEl.value = "";
      e.preventDefault();
    }
  }
};

//Call the API, read its response and update the document

async function main() {
  GraphDiv.innerHTML = null;
  try {
    if (!testInput(AInput, BInput, CInput)){
      throw "Invalid input!";
    }
    const A = getValue(AInput),
      B = getValue(BInput),
      C = getValue(CInput),
      RESPONSE = await fetch(`http://127.0.0.1:5000/?a=${A}&b=${B}&c=${C}`);
    if (!RESPONSE.ok){
      throw (await RESPONSE.json()).error;
    }
    const {
        x1: X1,
        x2: X2,
        xVertex: XVERTEX,
        yVertex: YVERTEX,
        form: FORM,
        realRoots: REALROOTS,
        graph: GRAPH,
      }: {
        x1: string;
        x2: string;
        xVertex: string;
        yVertex: string;
        form: string;
        realRoots: number;
        graph: string;
      } = await (RESPONSE).json(),
      GraphSvg = document.createElement("svg");
    let roots: string;
    switch (REALROOTS) {
      case 2:
        roots = `x\u2081 = ${X1}<br>x\u2082 =  ${X2}`;
        break;
      case 1:
        roots = `x = ${X1}`;
        break;
      default:
        roots = "This quadratic function don't have any real zero.";
    }
    FormDiv.textContent = FORM.replace("**2", "\u00b2").replace(/[*]/g, "");
    RootsDiv.textContent = "Roots (when y = 0):";
    ResultRootsDiv.innerHTML = roots
      .replace(/[*]*sqrt/g, "\u221a")
      .replace(/approx/g, "\u2248");
    CoordinatesDiv.textContent = "Vertex:";
    ResultCoordinatesDiv.textContent = `(${XVERTEX}, ${YVERTEX})`;
    GraphSvg.innerHTML = GRAPH;
    GraphDiv.appendChild(GraphSvg);
  } catch (err) {
    FormDiv.textContent = "y = ax\u00b2 + bx + c";
    RootsDiv.textContent = null;
    ResultRootsDiv.textContent = null;
    CoordinatesDiv.textContent = null;
    ResultCoordinatesDiv.textContent = err.message === "Failed to fetch" ? err.message : err;
  }
  location.href = "#result";
}

//Call the main function when form is submitted

Form.onsubmit = (e) => {
  main();
  e.preventDefault();
};

//Methods that call the testInput function for their parent objects when they lose focus

AInput.onblur = () => void testInput(AInput);
BInput.onblur = () => void testInput(BInput);
CInput.onblur = () => void testInput(CInput);

//Methods that call the whenKeyDown function when a key is downed

AInput.onkeydown = (e) => whenKeyDown(e, BInput);
BInput.onkeydown = (e) => whenKeyDown(e, CInput);
CInput.onkeydown = (e) => whenKeyDown(e);
