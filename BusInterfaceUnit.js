var BIU = {};

BIU.Registers = {
  // Program Counter
  IP : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Instruction Pointer

  // Segment Registers
  CS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Code Segment
  DS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Data Segment
  ES : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Extra Segment
  SS : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Stack Segment
};

BIU.init = function(){
	this.Instruction;
	// Retrieve the instruction data
	this.InstructionBuffer = Interface.instructions();
	// We reverse the buffer so that we can just pop
	// each instruction off the queue simply easily
	this.InstructionBuffer.reverse();
}

BIU.fetch = function(){
	// TODO: Fetch instruction from memory using IP
	this.Instruction = this.InstructionBuffer.pop();
	if(this.Instruction === undefined) {
		return undefined;
	} else {
		return true;
	}
}
