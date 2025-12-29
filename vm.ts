import { OPCODES } from "./opcodes.ts";
import { Instruction } from "./types.ts";

const DEBUG = false;

export function run(program: Array<Instruction>) {
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
      case OPCODES.PUSH: {
        if (typeof arg === "undefined") {
          throw new Error("No argument given for PUSH");
        }

        stack.push(arg);
        break;
      }

      /* x -- */
      case OPCODES.POP: {
        stack.pop();
        break;
      }

      /* x -- x x */
      case OPCODES.DUP: {
        const a = stack.pop();

        if (typeof a === "undefined") {
          throw new Error("Stack underflow: not enough values to DUP");
        }

        stack.push(a);
        stack.push(a);
        break;
      }

      /* a b -- b a */
      case OPCODES.SWAP: {
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
      case OPCODES.ADD: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values to ADD");
        }

        stack.push(a + b);
        break;
      }

      /* a b -- a-b */
      case OPCODES.SUB: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values to SUB");
        }

        stack.push(a - b);
        break;
      }

      /* a b -- a*b */
      case OPCODES.MUL: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values to MUL");
        }

        stack.push(a * b);
        break;
      }

      /* a b -- a/b */
      case OPCODES.DIV: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values to DIV");
        }

        stack.push(a / b);
        break;
      }

      /* a b -- a%b */
      case OPCODES.MOD: {
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
      case OPCODES.EQ: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values for EQ");
        }

        stack.push(a == b ? 1 : 0);
        break;
      }

      /* a b -- (a!=b ? 1 : 0) */
      case OPCODES.NEQ: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values for NEQ");
        }

        stack.push(a != b ? 1 : 0);
        break;
      }

      /* a b -- (a<b ? 1 : 0) */
      case OPCODES.LT: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values for LT");
        }

        stack.push(a < b ? 1 : 0);
        break;
      }

      /* a b -- (a<=b ? 1 : 0) */
      case OPCODES.LTE: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values for LTE");
        }

        stack.push(a <= b ? 1 : 0);
        break;
      }

      /* a b -- (a>b ? 1 : 0) */
      case OPCODES.GT: {
        const b = stack.pop();
        const a = stack.pop();

        if (typeof a === "undefined" || typeof b === "undefined") {
          throw new Error("Stack underflow: not enough values for GT");
        }

        stack.push(a > b ? 1 : 0);
        break;
      }

      /* a b -- (a>=b ? 1 : 0) */
      case OPCODES.GTE: {
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
      case OPCODES.PRINT: {
        console.log(stack.pop());
        break;
      }

      /* Control Flow */

      case OPCODES.JMP: {
        if (typeof arg !== "number") {
          throw new Error("JMP needs a numeric target address");
        }
        pc = arg;
        continue; // skip program counter increment
      }

      case OPCODES.JZ: {
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

      case OPCODES.JNZ: {
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

      case OPCODES.CALL: {
        if (typeof arg !== "number") {
          throw new Error("CALL requires a target address");
        }

        callStack.push(pc + 1);
        pc = arg;
        continue; // skip program counter increment
      }

      case OPCODES.RET: {
        const retAddr = callStack.pop();

        if (typeof retAddr === "undefined") {
          throw new Error("Call stack underflow on RET");
        }

        pc = retAddr;
        continue; // skip program counter increment
      }

      case OPCODES.HALT: {
        if (DEBUG) console.log("Halting program");
        halted = true;
        break;
      }

      default:
        throw new Error("Unknown OP code " + op);
    }

    if (DEBUG) console.log(op, arg ? arg : "", ";", oldStack, "--", stack);

    // increment program counter
    pc++;
  }
}
