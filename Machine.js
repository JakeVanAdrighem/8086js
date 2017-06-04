var Registers = {
  // Main Registers.
  AX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  BX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  CX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  DX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  AH : (function (){ return this.AX.slice(0, 8); }),
  AL : (function (){ return this.AX.slice(8,16); }),
  BH : (function (){ return this.BX.slice(0, 8); }),
  BL : (function (){ return this.BX.slice(8,16); }),
  CH : (function (){ return this.CX.slice(0, 8); }),
  CL : (function (){ return this.CX.slice(8,16); }),
  DH : (function (){ return this.DX.slice(0, 8); }),
  DL : (function (){ return this.DX.slice(8,16); }),

   // Index Registers
  SI : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Source Index
  DI : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Destination Index
  BP : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Base Pointer
  SP : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Stack Pointer

  // Program Counter
  IP : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Instruction Pointer

  // Segment Registers
  CS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Code Segment
  DS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Data Segment
  ES : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Extra Segment
  SS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Stack Segment

  // Status Registers
  // - - - - O D I T S Z - A - P - C
  // Overflow Flag (OF)
  // Direction Flag (DF)
  // Interrupt Flag (IF)
  // Trap Flag (TF)
  // Sign Flag(SF)
  // Zero Flag (ZF)
  // Auxiliary carry Flag (AF)
  // Parity Flag (PF)
  // Carry Flag (CF)
  STATUS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  // Getters for the various flags.
  OF() { return STATUS[4];  },
  DF() { return STATUS[5];  },
  IF() { return STATUS[6];  },
  TF() { return STATUS[7];  },
  SF() { return STATUS[8];  },
  ZF() { return STATUS[9];  },
  AF() { return STATUS[11]; },
  PF() { return STATUS[13]; },
  CF() { return STATUS[15]; }
};

var Memory;

var CPU = {};

CPU.getTargetRegister = function(val){
  // Maybe target is a register
  if(Registers.hasOwnProperty(val)){
	var ret = Registers[val];
	if(Array.isArray(ret))
		return ret;
	else
		return ret();
  } else {
	throw new Error("Invalid operand " + val);
  }
}

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
CPU.cycle = function(){
  if(!BIU.fetch())
    return undefined;
  EU.execute();
  Interface.update();
  this.cycles += 1;
  return true;
}

CPU.run = function(){
  // Setup chip state for starting execution.
  this.initState();
  while(this.cycle());
  console.log("Executed " + this.cycles + " cycles.");
}

CPU.initState = function(){
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
}

// TODO: Replace this with a button on the main page
// to start execution. For development purposes we
// don't want to have to click something each iteration.
CPU.run();

