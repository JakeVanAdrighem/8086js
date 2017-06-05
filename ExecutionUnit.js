var EU = {};

EU.Registers = {
  // General Registers.
  AX : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Accumulator
  BX : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Base
  CX : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Count
  DX : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Data
  AH : (function() { return this.AX.slice(0, 8); }),
  AL : (function() { return this.AX.slice(8, 16); }),
  BH : (function() { return this.BX.slice(0, 8); }),
  BL : (function() { return this.BX.slice(8, 16); }),
  CH : (function() { return this.CX.slice(0, 8); }),
  CL : (function() { return this.CX.slice(8, 16); }),
  DH : (function() { return this.DX.slice(0, 8); }),
  DL : (function() { return this.DX.slice(8, 16); }),

  SP : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Stack Pointer
  BP : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Base Pointer
  SI : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Source Index
  DI : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // Destination Index

  //  -- Control Flags
  // Trap (TF)
  // Direction (DF)
  // Interrupt-Enable (IF)
  //  -- Status Flags
  // Overflow Flag (OF)
  // Sign Flag(SF)
  // Zero Flag (ZF)
  // Auxiliary carry Flag (AF)
  // Parity Flag (PF)
  // Carry Flag (CF)
  FLAGS : {
    TF : 0,
    DF : 0,
    IF : 0,
    OF : 0,
    SF : 0,
    ZF : 0,
    AF : 0,
    PF : 0,
    CF : 0,
  }
};

EU.getTargetRegister = function(val) {
  // Maybe target is a register
  if (this.Registers.hasOwnProperty(val)) {
    var ret = this.Registers[val];
    if (Array.isArray(ret))
      return ret;
    else
      return ret();
  } else {
    throw new Error("Invalid operand " + val);
  }
};

EU.execute = function() {
  var Instruction = BIU.Instruction;
  var op = Instruction[0];
  EU[Instruction[0]](Instruction.splice(1));
  console.log("Executing " + Instruction[0]);
};

EU.nop = function(ops) { return true; };

EU.executionError = function(operation, ...operands) {
  var operands = [ operands ];
  throw new Error("Unable to execute operation " + operation +
                  " with operand(s) " + operands);
};

/*
ADD format:
REG, memory
REG, REG
REG, immediate
memory, REG
memory, immediate
*/
EU.add = function(ops) {
	var op1 = ops[1];
	var op2 = ops[2];
	var target = getTarget(op1);
}

  } else {
    this.executionError(ops[0], op1, op2);
  }
};

function convertRegToImm(val) {
  var res = 0;
  var tracking = 1;
  var size = val.size();
  for (var i = 0; i < size; i++) {
    res += (tracking * val.pop());
    tracking *= 2;
  }
  return res;
};

function convertImmToReg(val) {
  var reg = [];
  while (val != 0) {
    reg.un.shift(val & 0x1);
    val = val >> 1;
  }
};

EU.call = function(op1) { var target = CPU.getTargetRegister(op1); };
