import { OPCODES } from "./opcodes.ts";

export type Opcode = keyof typeof OPCODES;
export type Instruction = { op: typeof OPCODES[Opcode], arg?: number };