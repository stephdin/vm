const DEBUG = true;

type Instruction = { op: string; arg?: number };

function run(program: Array<Instruction>) {
  const stack: Array<number> = [];
  const callStack: Array<number> = [];

  let pc: number = 0;
  let halted: boolean = false;

  while (!halted && pc < program.length) {
    const { op, arg } = program[pc];
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

        stack.push(a != b ? 1 : 0);
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

      case "JMP": {
        if (typeof arg !== "number") {
          throw new Error("JMP needs a numeric target address");
        }
        pc = arg;
        continue; // skip program counter increment
      }

      case "JZ": {
        if (typeof arg !== "number") {
          throw new Error("JZ needs a numeric target address");
        }

        const cond = stack.pop();

        if (cond === 0) {
          pc = arg;
          continue; // skip program counter increment
        }
        break;
      }

      case "JNZ": {
        if (typeof arg !== "number") {
          throw new Error("JNZ needs a numeric target address");
        }

        const cond = stack.pop();

        if (cond !== 0) {
          pc = arg;
          continue; // skip program counter increment
        }
        break;
      }

      case "CALL": {
        if (typeof arg !== "number")
          throw new Error("CALL requires a target address");

        callStack.push(pc + 1);
        pc = arg;
        continue; // skip program counter increment
      }

      case "RET": {
        const retAddr = callStack.pop();

        if (typeof retAddr === "undefined")
          throw new Error("Call stack underflow on RET");

        pc = retAddr;
        continue; // skip program counter increment
      }

      case "HALT": {
        console.log("Halting program");
        halted = true;
        break;
      }

      default:
        throw new Error("Unknown OP code " + op);
        break;
    }

    if (DEBUG) console.log(op, arg ? arg : "", ";", oldStack, "--", stack);

    // increment program counter
    pc++;
  }
}

const program1: Array<Instruction> = [
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

const program2: Instruction[] = [
  { op: "PUSH", arg: 7 },
  { op: "DUP" },
  { op: "PRINT" },
  { op: "PUSH", arg: 1 },
  { op: "SUB" },
  { op: "DUP" },
  { op: "JNZ", arg: 1 },
  { op: "POP" },
  { op: "HALT" },
];

const program3: Instruction[] = [
  // main
  { op: "PUSH", arg: 5 },
  { op: "CALL", arg: 4 }, // call to address 4
  { op: "PRINT" },
  { op: "HALT" },

  // function square(x)
  { op: "DUP" },
  { op: "MUL" },
  { op: "RET" },
];

const t0 = performance.now();
run(program1);
const t1 = performance.now();
console.log(`running program 1 took ${t1 - t0} milliseconds.`);

const t3 = performance.now();
run(program2);
const t4 = performance.now();
console.log(`running program 2 took ${t4 - t3} milliseconds.`);

const t5 = performance.now();
run(program3);
const t6 = performance.now();
console.log(`running program 3 took ${t6 - t5} milliseconds.`);
