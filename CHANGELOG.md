# Changelog

## 1.12.0 (2026-11-04)
- The platform is now called Circuit Hub. Under the name: ME0212 Electrical Circuits & Machines, German Jordanian University, and the instructor.
- The new GJU logo and the SATS logo sit side by side in the header, on a white plate so they stay clear in the dark theme.
- Two themes only, light and dark, with colours taken from the GJU logo (sky blue and orange). A button in the header switches them. The first visit follows the device setting and the choice is remembered.
- Footer: "Developed by: Mohammad Alghweri, German Jordanian University" with a link to the portfolio.
- Quiz numeric questions have no Check button: type the number and press Next or Enter.
- Calculator menus show the selected line with an arrow, and the lines can be clicked.
- Report a problem and Send feedback open the Google Form, with the student's name and ID filled in when entered.
- The version number in the page code is now filled in at build time.

## 1.11.0 (2026-11-04)
- One topic at a time: Study, Practice and Quiz now show a single topic with a topic bar on top. Previous topic and Next topic buttons sit at the end of the page. After the last topic, Next goes to the first topic of the next chapter.
- Circuit drawings: 72 worked examples, 13 random question types and 125 quiz questions that describe a circuit now show it as a drawing. Drawings of random questions use the numbers of the question.
- Calculator redesigned to look and behave like a real scientific calculator: metal body, round REPLAY pad, gold SHIFT and red ALPHA functions, pressed-key feel.
- Calculator modes (MENU): Calculate, Complex, Base-N (DEC, HEX, BIN, OCT, and, or, xor, xnor, Not, Neg), Matrix, Vector (VctA, VctB, VctC, dot, cross, angle, unit vector), Statistics (1-variable and 7 regression types), Table, Equation.
- New functions: CALC (ask values of variables), SOLVE, definite integral, derivative, sum, Pol and Rec, Ran#, physical constants (CONST), CLR menu. Not included: CONV, spreadsheet, distribution, inequality, ratio.
- Tests check the new navigation, the drawings and the calculator modes.

## 1.10.0 (2026-11-04)
- Chapter pages now have three main tabs: Study, Practice and Quiz. Practice and Quiz mix questions from the whole chapter.
- Study: every topic has its own Examples drop-down. A Watch button appears only when an animation exists for that topic and shows that circuit only.
- The instructor name is shown under the course name.
- New Calculator button next to Formula sheet. It opens a floating fx-991EX style scientific calculator with SHIFT, ALPHA, STO, RCL, S⇔D, complex numbers (polar and rectangular), equation solving (2 and 3 unknowns, quadratic and cubic), matrices and determinants. Calculus, statistics, base-n, vector and table modes are not included.

## 1.9.0 (2026-11-03)
- New chapter layout with four tabs: Study, Examples, Practice and Quiz. Each tab shows the topics of the chapter as buttons, so the student works on one topic at a time.
- Study: all topics of the chapter are listed under each other. Each topic has a Watch button that opens the circuit and the animation in a panel inside the topic, without leaving the page. The calculator is a drop-down at the end of the page.
- Examples: three or more worked examples per topic (book and slide examples plus similar ones written for the course), each step with a short reason. Chapters 1 to 6 and Motors are complete. Chapters 8, 9 and 11 follow after their slides are processed.
- Practice: at least 10 questions per topic, solved step by step. Quiz: a quiz for one topic or for the whole chapter.
- Formulas in the solutions are written as stacked fractions (numerator over denominator).
- Circuit figures are larger.
- New tests check that every topic has the required examples, practice questions and quiz questions.

## 1.8.0 (2026-11-02)
- Back button: every tab switch and filter change is kept in the page history. Back returns to the previous page and tab, and the phone Back gesture follows the same history.
- Every quiz question (456) now explains the rule, the application to the numbers, and why the other options fail, in numbered steps.
- Every practice question (84) has a worked answer with the idea, the formula, the values and the result. Circuit questions also show a check.
- Every random question (84 types) starts with an Idea line and ends with a unit check.
- Every worked example (80) starts with an Idea line that names the rule and why it is used.
- New tests make sure that no question, answer or example is left without steps, and that Back works step by step.

## 1.7.0 (2026-11-01)
- Worked examples moved from the Study page into Exercises: each chapter opens with 8 examples solved step by step, then the practice questions.
- Examples now stay inside the slide material: book examples only where the slides name them, plus practice examples written for the slide topics (80 in total).
- Content beyond the slides removed: leakage current, the full dielectric table, mutual inductance, the rotating factor j and pulsing DC.

## 1.6.0 (2026-11-01)
- New "Examples" tab in every chapter: 51 book examples solved step by step (one step at a time), plus a "New random example" with fresh numbers.
- All solutions in exercises and quizzes are shown as numbered steps (formula, values, result).
- The back button returns to the previous page.
- Students enter their full name and university ID in white fields. Both appear in the header and on the progress report.
- 8 more number generators for chapters 5, 6, 8 and 9.

## 1.5.0 (2026-11-01)
- Chapter 11 (transformers) and the motors part added: lessons, animations, calculators, questions and drawings.
- Chapters 5, 6, 8 and 9 checked against the textbook. Examples 8.11 and 8.12 now show the book's peak form. The superposition animation follows Example 5.1.
- Every lesson and question shows its source (book page or slide number), with a "Report a problem" email link.
- About 100 new questions for chapters 5, 6, 8 and 9.
- Numeric answers accept prefixes (for example 710 µA). The 1.5% tolerance is shown.
- Printable formula sheet for each chapter, a 10-minute quiz clock and a "How to use" card.
- Accessibility check (axe) passes with zero issues in all themes. The hidden error and order tabs were removed from the code.

## 1.4.0 (2026-11-01)
- Source files, build script and tests are kept in this repository (src/, assets/, tests/).
- Automatic tests run on GitHub for every push.
- Version number and a feedback link in the page footer.

## 1.3.0 (2026-10-31)
- Current is drawn as small moving arrows.
- Simpler navigation: chapter cards with Study, Exercises and Quiz, and a back button.

## 1.2.0 (2026-10-31)
- Chapters 5, 6, 8 and 9 added.

## 1.0.0 (2026-10)
- First release with chapters 1 to 4.
