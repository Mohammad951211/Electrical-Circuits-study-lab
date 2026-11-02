# Changelog

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
