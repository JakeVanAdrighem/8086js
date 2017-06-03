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

var Machine = {};

Machine.getTarget = function(val){
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
  //if(validMemoryAddress(val))
  //  return Address(val);
}

Machine.cycle = function(){
  if(!ExecutionUnit.fetch())
    return undefined;
  ExecutionUnit.decode();
  ExecutionUnit.execute();
  return true;
}

Machine.run = function(){
  // Setup chip state for starting execution.
  this.initState();
  while(this.cycle()){
    this.cycles += 1;
    //Interface.update();
  }
  console.log("Executed " + this.cycles + " cycles.");
}

Machine.initState = function(){
  // Count total cycles executed.
  this.cycles = 0;
  // Start with a NOP on the instruction bus
  ExecutionUnit.init();
  Interface.init();
  //displayMachineState();
  // Setup the Register table
  this.registers = Interface.registers;
}

// TODO: Replace this with a button on the main page
// to start execution. For development purposes we
// don't want to have to click something each iteration.
Machine.run();