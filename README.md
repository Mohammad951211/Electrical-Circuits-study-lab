# Circuit Hub

Interactive study platform for ME0212 Electrical Circuits and Machines, German Jordanian University.
The live site is the single file `index.html` (GitHub Pages).
Content: chapters 1, 2, 3, 4, 5, 6, 8, 9 and 11 of the textbook, plus the motors part (Introduction to Motors.pdf). Chapters 7 and 10 have no slides yet. It works offline and stores progress only on the student's device.

## Edit and release
1. Change the files in `src/` (content, figures, animations) or `assets/`.
2. Build: `python3 build.py` (writes `index.html`).
3. Test: `python3 build.py --test && python3 tests/run_tests.py`
4. Raise the number in `VERSION`, add a line to `CHANGELOG.md`, commit and push.

## Layout
- `src/template.html`, `src/lab.css`, `src/lab.js`: page, style and platform.
- `src/fig-*.js`, `src/figs*.js`: circuit drawings and drawing questions.
- `src/content*.js`: lessons, calculators.
- `src/watch*.js`: animations.
- `src/mcq*.js`, `src/gens*.js`: multiple-choice questions and number generators.
- `src/exfigs.js`, `src/mcqfigs.js`, `src/mcqfigs2.js`: circuit drawings for worked examples, random questions and quiz questions (the quiz drawings are built from the numbers in the question text).
- `src/fxcalc.js`, `src/fxmodes.js`, `src/fxui.js`: the calculator (engine, extra modes, keys and screen).
- `src/ideas*.js`: "In plain words" and "Common slip" notes.
- `tests/run_tests.py`: content, interface, animation and accessibility checks.
