var Memory;

var CPU = {};

// Original Execution cycle
// As documented in the 8086 Family Users Manual
// Page(s) 2-3/2-4.
// 1. Fetch the next instruction from memory.
// 2. Read an operand (if required by the instruction).
// 3. Execute the instruction.
// 4. Write the result (if required by the instruction).
// Notes:
// Modern chips have a fetch/decode/execute sequence.
// Because the original hardware had no notion of
// 'decode', we can just let the EU dispatch to the
// correct function.
CPU.cycle = function() {
  if (!BIU.fetch())
    return undefined;
  EU.execute();
  Interface.update();
  this.cycles += 1;
  return true;
};

CPU.run = function() {
  // Setup chip state for starting execution.
  this.initState();
  while (this.cycle()) {};
  console.log("Executed " + this.cycles + " cycles.");
};

CPU.initState = function() {
  // Count total cycles executed.
  this.cycles = 0;
  Interface.init();
  BIU.init();
  // Setup the Register table
  this.registers = Interface.registers;

  // Setup the memory
  // TODO: Setup mem properly. Should support 1MB.
  // 1MB achieved by:
  // 16-bit internally + 4bit segment registers
  //
  Memory = new Array(10000);
  Memory.fill(0000000000000000, 0, Memory.length);
};

// TODO: Replace this with a button on the main page
// to start execution. For development purposes we
// don't want to have to click something each iteration.
CPU.run();
