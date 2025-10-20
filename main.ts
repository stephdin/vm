import { assemble } from "./assembler.ts";
import { run } from "./vm.ts";

const paths = ["./asm/add.asm", "./asm/loop.asm", "./asm/call.asm"];

for (const path of paths) {
  console.log("running", path);

  const asm = Deno.readTextFileSync(path);
  const program = assemble(asm);

  const t0 = performance.now();
  run(program);
  const t1 = performance.now();

  console.log(`finished in ${t1 - t0} milliseconds. \n`);
}
