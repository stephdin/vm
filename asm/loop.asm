; simple loop counting down from 7
start:
  PUSH 7
  DUP
  PRINT
  PUSH 1
  SUB
  DUP
  JNZ 1
  POP
  HALT
