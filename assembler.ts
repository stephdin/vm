import { OPCODES } from "./opcodes.ts";
import { Instruction, Opcode } from "./types.ts";

export function assemble(source: string) {
  const lines = source.split("\n");
  const instructions: Array<Instruction> = [];

  const labels: Map<string, number> = new Map();

  let index = 0;

  // find all labels in first pass
  for (const value of lines) {
    // remove whitespace from both sides
    const line = value.trim();

    // skip empty lines and ignore comments
    if (line == "" || line.startsWith(";")) continue;

    // if it is a label, remember label position and remove colon
    if (line.endsWith(":")) {
      labels.set(line.slice(0, -1), index);
      continue;
    }

    index++;
  }

  // assemble instructions in second pass
  for (const value of lines) {
    // remove whitespace from both sides
    const line = value.trim();

    // skip empty lines and ignore comments and labels
    if (line == "" || line.startsWith(";") || line.endsWith(":")) continue;

    const [opString, argString] = line.split(" ");

    // check for correct opcodes while assembling
    if (!(opString in OPCODES)) {
      throw new Error("unknown Opcode");
    }

    // replace labels with actual position
    if (OPCODES[opString as Opcode] === OPCODES.CALL) {
      instructions.push({
        op: OPCODES[opString as Opcode],
        arg: labels.get(argString),
      });
      continue;
    }

    instructions.push({
      op: OPCODES[opString as Opcode],
      arg: parseInt(argString),
    });
  }

  return instructions;
}
