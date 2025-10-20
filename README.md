# VM

A small stack-based VM written in TypeScript

## Opcodes

| **Opcode** | **Argument**   | **Description**                            | **Stack-Effect**                                 |
| ---------- | -------------- | ------------------------------------------ | ------------------------------------------------ |
| `PUSH`     | `arg` (number) | Push numeric argument onto the data stack. | `-- x`                                           |
| `POP`      | –              | Discard top value from data stack.         | `x --`                                           |
| `DUP`      | –              | Duplicate the top value.                   | `x -- x x`                                       |
| `SWAP`     | –              | Swap the top two values.                   | `a b -- b a`                                     |
| `ADD`      | –              | Pop two values, push their sum.            | `a b -- a+b`                                     |
| `SUB`      | –              | Pop two values, subtract top from second.  | `a b -- a-b`                                     |
| `MUL`      | –              | Pop two values, multiply them.             | `a b -- a*b`                                     |
| `DIV`      | –              | Pop two values, divide second by top.      | `a b -- a/b`                                     |
| `MOD`      | –              | Pop two values, compute remainder.         | `a b -- a%b`                                     |
| `EQ`       | –              | Push 1 if equal, else 0.                   | `a b -- (a==b ? 1 : 0)`                          |
| `NEQ`      | –              | Push 1 if not equal, else 0.               | `a b -- (a!=b ? 1 : 0)`                          |
| `LT`       | –              | Push 1 if second < top, else 0.            | `a b -- (a<b ? 1 : 0)`                           |
| `LTE`      | –              | Push 1 if second <= top, else 0.           | `a b -- (a<=b ? 1 : 0)`                          |
| `GT`       | –              | Push 1 if second > top, else 0.            | `a b -- (a>b ? 1 : 0)`                           |
| `GTE`      | –              | Push 1 if second >= top, else 0.           | `a b -- (a>=b ? 1 : 0)`                          |
| `PRINT`    | –              | Pop and print top value.                   | `x --`                                           |
| `JMP`      | `arg` (number) | Unconditional jump.                        | (no stack change)                                |
| `JZ`       | `arg` (number) | Jump if top value is 0.                    | `x --`                                           |
| `JNZ`      | `arg` (number) | Jump if top value is non-zero.             | `x --`                                           |
| `CALL`     | `arg` (number) | Push return address and jump.              | (no data-stack change; call stack: `-- retAddr`) |
| `RET`      | –              | Pop return address and jump back.          | (no data-stack change; call stack: `retAddr --`) |
| `HALT`     | –              | Stop execution.                            | (no stack change)                                |
