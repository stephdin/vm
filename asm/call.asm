; this program tests simple function calls

main:
  PUSH 5
  CALL square
  PRINT
  HALT

square:
  DUP
  MUL
  RET