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
    case "PUSH": {
      if (typeof arg === "undefined") {
        throw new Error("No argument given for PUSH");
      }

      stack.push(arg);
      break;
    }
    case "ADD": {
      // a,b -- a+b
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to ADD");
      }

      stack.push(a + b);
      break;
    }
    case "SUB": {
      // a,b -- a-b
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to SUB");
      }

      stack.push(a - b);
      break;
    }
    case "DUP": {
      // a -- a,a
      const a = stack.pop();

      if (typeof a === "undefined") {
        throw new Error("Stack underflow: not enough values to DUP");
      }

      stack.push(a);
      stack.push(a);
      break;
    }
    case "SWAP": {
      // a,b -- b,a
      const b = stack.pop();
      const a = stack.pop();


      if (typeof a === "undefined" || typeof b === "undefined") {
        throw new Error("Stack underflow: not enough values to ADD");
      }

      stack.push(b);
      stack.push(a);
      break;
    }
    case "PRINT": {
      // a --
      console.log(stack.pop());
      break;
    }
    case "HALT": {
      console.log("Halting program");
      // todo exit application
      break;
    }
    default:
      break;
  }

  console.log(op, arg ? arg : "", ";", oldStack, "--", stack);
}
