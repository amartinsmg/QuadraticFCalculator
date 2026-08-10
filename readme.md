# Quadratic Function Calculator

A web calculator for quadratic functions that computes roots, vertex and graph visualization from user input.

This project was originally implemented in plain JavaScript and later refactored to **TypeScript using Object-Oriented Programming (OOP)** as a learning exercise in software design and code organization.

---


## 💻 Technologies used

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3)
![HTML5](https://img.shields.io/badge/HTML5-E34F26)
![CSS3](https://img.shields.io/badge/CSS3-1572B6)
![Vite](https://img.shields.io/badge/Vite-646CFF)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB)
![Algebrite](https://img.shields.io/badge/Algebrite-F7DF1E)
![MathJS](https://img.shields.io/badge/MathJS-DC3912)
![Plotly](https://img.shields.io/badge/Plotly-0E1012)
![MathJax](https://img.shields.io/badge/MathJax-008200)

---

## 🎯 Purpose of the project

The goal of this project is not only to calculate a quadratic function, but to practice applying OOP concepts to a real interactive application.
Instead of organizing the code around actions (calculate, render, plot), the system was redesigned around **domain entities**.

The application models a real mathematical concept: a _quadratic function_.

This refactor allowed separation between:

- mathematical domain logic
- user interface
- graph rendering

This improves maintainability, readability and extensibility of the code.

---

## 🧩 OOP Design

The project now follows a clearer domain-oriented architecture with symbolic computation support:

| Component           | Responsibility                                                             |
| ------------------- | -------------------------------------------------------------------------- |
| `QuadraticFunction` | Represents the quadratic function and computes symbolic roots and vertex   |
| `MathExpression`    | Encapsulates symbolic expressions and handles LaTeX/numeric conversions    |
| `RootsResult`       | Typed result model describing real, complex, or absent roots               |
| `LatexFormatter`    | Formats mathematical results (roots and critical points) into LaTeX output |
| `PlotPoints`        | Generates coordinate points for graph plotting                             |
| `Calculator`        | Base abstract class with shared input validation behavior                  |
| `QFCalculator`      | Orchestrates UI interaction and application flow                           |

The interface does **not** perform mathematical calculations directly.

Instead, it interacts with domain objects:

```ts
const func = new QuadraticFunction(a, b, c);
```

The UI consumes structured results such as:

- symbolic formula
- `RootsResult` object
- vertex as `MathExpression`
- plotting points

Formatting for display (plain text or LaTeX) is delegated to dedicated
formatter classes.

---

## 🧮 Symbolic Computation First

A key architectural decision was preserving symbolic computation.

`QuadraticFunction` does **not** return raw JavaScript numbers when computing
roots or vertex coordinates. Instead, it returns `MathExpression` objects.

This prevents precision loss such as:

```md
1/3 -> 0.33333333333333333
```

Conversions to numeric values only occur when explicitly requested.

This keeps the symbolic and numeric layers clearly separated.

---

## ✨ Design Principles Applied

### Encapsulation

Mathematical rules and symbolic operations are fully contained inside
QuadraticFunction and MathExpression.

The UI never computes roots directly.

### Abstraction

The interface interacts with structured results (RootsResult,
MathExpression) without knowing how symbolic simplification or numeric
evaluation is implemented.

### Separation of Responsibilities

Each layer has a single clear role:

- **Domain layer** -> mathematical logic (`QuadraticFunction`)
- **Expression layer** -> symbolic representation (`MathExpression`)
- **Formatting layer** -> output representation (`LatexFormatter`)
- **Application layer** -> orchestration (`QFCalculator`)
- **UI layer** -> rendering only

This avoids tight coupling between DOM manipulation, formatting logic,
and mathematical computation.

---

## ⚙️ How it works

1. The user inputs the coefficients a, b and c.
2. `QFCalculator` validates the input and creates a `QuadraticFunction`object.
3. `QuadraticFunction` performs symbolic calculations using **Algebrite**.
4. Results are returned as:
    - `MathExpression` objects
    - a structured `RootsResult`
5. Formatters convert symbolic results to:
    - plain text
    - LaTeX strings
6. `PlotPoints` generates numeric coordinate data when needed.
7. **Plotly** renders the graph.
8. **MathJax** renders LaTeX expressions.

---

## 🚀 How to run the project

1. Clone this repository
2. Install dependencies:

```sh
yarn install
```

3. Start the development server:

```sh
yarn dev
```

Webpack Dev Server will start and the application will be available in your browser (usually at `http://localhost:8080`).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

---

## 🤝 Contributing

Contributions are welcome!
If you find a bug or have a feature request, feel free to open an issue or submit a pull request.
