/**
 * @fileoverview Tests for no-undef rule.
 * @author Mark Macdonald
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/no-undef", {
    valid: [
        "var a = 1, b = 2; a;",
        "/*global b*/ function f() { b; }",
        { code: "function f() { b; }", globals: { b: false} },
        { code: "function f() { b; }", global: { b: false} },
        "/*global b a:false*/  a;  function f() { b; a; }",
        "function a(){}  a();",
        "function f(b) { b; }",
        "var a; a = 1; a++;",
        "var a; function f() { a = 1; }",
        "/*global b:true*/ b++;",
        "/*eslint-env browser*/ window;",
        "/*eslint-env browser*/ window;",
        "/*eslint-env node*/ require(\"a\");",
        "Object; isNaN();",
        "toString()",
        "hasOwnProperty()",
        "function evilEval(stuffToEval) { var ultimateAnswer; ultimateAnswer = 42; eval(stuffToEval); }",
        "typeof a",
        "typeof (a)",
        "var b = typeof a",
        "typeof a === 'undefined'",
        "if (typeof a === 'undefined') {}",
        { code: "var toString = 1;", ecmaFeatures: { globalReturn: true }},
        { code: "function myFunc(...foo) {  return foo;}", ecmaFeatures: { restParams: true } },
        { code: "var React, App, a=1; React.render(<App attr={a} />);", args: [1, {vars: "all"}], ecmaFeatures: { jsx: true } },
        { code: "var console; [1,2,3].forEach(obj => {\n  console.log(obj);\n});", ecmaFeatures: { arrowFunctions: true } },
        { code: "var Foo; class Bar extends Foo { constructor() { super();  }}", ecmaFeatures: { classes: true } },
        { code: "import Warning from '../lib/warning'; var warn = new Warning('text');", ecmaFeatures: { modules: true } },
        { code: "import * as Warning from '../lib/warning'; var warn = new Warning('text');", ecmaFeatures: { modules: true } }
    ],
    invalid: [
        { code: "a = 1;", errors: [{ message: "'a' is not defined.", type: "Identifier"}] },
        { code: "var a = b;", errors: [{ message: "'b' is not defined.", type: "Identifier"}] },
        { code: "function f() { b; }", errors: [{ message: "'b' is not defined.", type: "Identifier"}] },
        { code: "/*global b:false*/ function f() { b = 1; }", errors: [{ message: "'b' is read only.", type: "Identifier"}] },
        { code: "function f() { b = 1; }", global: { b: false }, errors: [{ message: "'b' is read only.", type: "Identifier"}] },
        { code: "/*global b:false*/ function f() { b++; }", errors: [{ message: "'b' is read only.", type: "Identifier"}] },
        { code: "/*global b*/ b = 1;", errors: [{ message: "'b' is read only.", type: "Identifier"}] },
        { code: "/*global b:false*/ var b = 1;", errors: [{ message: "'b' is read only.", type: "Identifier"}] },
        { code: "window;", errors: [{ message: "'window' is not defined.", type: "Identifier"}] },
        { code: "require(\"a\");", errors: [{ message: "'require' is not defined.", type: "Identifier"}] },
        { code: "Array = 1;", errors: [{ message: "'Array' is read only.", type: "Identifier"}] },
        { code: "var React; React.render(<img attr={a} />);", args: [1, {vars: "all"}], errors: [{ message: "'a' is not defined." }], ecmaFeatures: { jsx: true } },
        { code: "var React, App; React.render(<App attr={a} />);", args: [1, {vars: "all"}], errors: [{ message: "'a' is not defined." }], ecmaFeatures: { jsx: true } }
    ]
});
