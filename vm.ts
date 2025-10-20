type Instruction = { op: string; arg?: number };

const program: Array<Instruction> = [
  { op: "PUSH", arg: 23 },
  { op: "PUSH", arg: 42 },
  { op: "ADD" },
  { op: "PRINT" },
  { op: "PUSH", arg: 7 },
  { op: "DUP" },
  { op: "PUSH", arg: 1 },
  { op: "ADD" },
  { op: "SWAP" },
  { op: "PRINT" },
  { op: "PRINT" },
  { op: "HALT" },
];

const stack: Array<number> = [];

for (const { op, arg } of program) {
  const oldStack = [...stack];

  switch (op) {
    /* Stack  */

    /* -- x */
    case "PUSH": {
      if (typeof arg === "undefined") {
        throw new Error("No argument given for PUSH");
      }

      stack.push(arg);
      break;
    }

    /* x -- */
    case "POP": {
      stack.pop();
      break;
    }

    /* x -- x x */
    case "DUP": {
      const a = stack.pop();

      if (typeof a === "undefined") {
        throw new Error("Stack underflow: not enough values to DUP");
      }

      stack.push(a);
      stack.push(a);
      break;
    }

    /* a b -- b a */
    case "SWAP": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to SWAP");
      }

      stack.push(b);
      stack.push(a);
      break;
    }

    /* Arithmetic */

    /* a b -- a+b */
    case "ADD": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to ADD");
      }

      stack.push(a + b);
      break;
    }

    /* a b -- a-b */
    case "SUB": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to SUB");
      }

      stack.push(a - b);
      break;
    }

    /* a b -- a*b */
    case "MUL": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to MUL");
      }

      stack.push(a * b);
      break;
    }

    /* a b -- a/b */
    case "DIV": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to DIV");
      }

      stack.push(a / b);
      break;
    }

    /* a b -- a%b */
    case "MOD": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to MOD");
      }

      stack.push(a % b);
      break;
    }

    /* Logic */

    /* a b -- (a==b ? 1 : 0) */
    case "EQ": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for EQ");
      }

      stack.push(a == b ? 1 : 0);
      break;
    }

    /* a b -- (a!=b ? 1 : 0) */
    case "NEQ": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for NEQ");
      }

      stack.push(a <= b ? 1 : 0);
      break;
    }

    /* a b -- (a<b ? 1 : 0) */
    case "LT": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for LT");
      }

      stack.push(a < b ? 1 : 0);
      break;
    }

    /* a b -- (a<=b ? 1 : 0) */
    case "LTE": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for LTE");
      }

      stack.push(a <= b ? 1 : 0);
      break;
    }

    /* a b -- (a>b ? 1 : 0) */
    case "GT": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for GT");
      }

      stack.push(a > b ? 1 : 0);
      break;
    }

    /* a b -- (a>=b ? 1 : 0) */
    case "GTE": {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values for GTE");
      }

      stack.push(a >= b ? 1 : 0);
      break;
    }

    /* I/O */

    /* x -- */
    case "PRINT": {
      console.log(stack.pop());
      break;
    }

    /* Control Flow */
    case "HALT": {
      console.log("Halting program");
      // TODO: exit the application
      break;
    }
    default:
      break;
  }

  console.log(op, arg ? arg : "", ";", oldStack, "--", stack);
}
