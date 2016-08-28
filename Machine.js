var Registers = {
  // Main Registers
  AX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  BX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  CX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  DX : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  getAL : (function (){ return this.AX.slice(0,8); })
}

var Machine = {};

function getTarget(val){
  // Maybe target is a register
  if(Registers.hasOwnProperty(val))
      return Registers[val];
  //if(validMemoryAddress(val))
  //  return Address(val);
}

function requires(parts, howmany){
  if(parts.length() !== howmany)
    throw new Error("Malformed " + parts[0] + " instruction.");
}

Machine.cycle = function(){
  if(!ExecutionUnit.fetch())
    return undefined;
  ExecutionUnit.decode();
}

Machine.run = function(){
  // Setup chip state for starting execution.
  this.initState();
  while(this.cycle()){
    this.cycles += 1;
    //displayMachineState();
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