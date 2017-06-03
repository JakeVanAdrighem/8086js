var ExecutionUnit = {};

ExecutionUnit.init = function(){
	this.Instruction;
	this.Operation;
  	// Retrieve the instruction sequence
  	this.InstructionBuffer = Interface.instructions();
}

ExecutionUnit.fetch = function(){
	this.Instruction = this.InstructionBuffer.pop();
	if(this.Instruction === undefined)
		return undefined
	return true;
}

ExecutionUnit.decode = function(){
	// Use first character of instruction to lookup the
	// thing we need to do.
	var instr = this.Instruction[0];
	if(!InstructionList.includes(instr)) {
		throw new Error(instr + " instruction not supported.");
	} else if(!ExecutionUnit.hasOwnProperty(instr)) {
		throw new Error(instr + " instruction not implemented.");
	} else {
		ExecutionUnit[instr](this.Instruction);
	}
}

ExecutionUnit.execute = function(){
	console.log("Executing " + this.Instruction[0]);
	this.Operation(this.Instruction);
}

ExecutionUnit.nop = function(ops){
	return true;
}

// Two types of additions:
// 8bit and 16bit. We have 8bit
// when dealing with the lower
// or higher alias of a 16bit
// register. 16bit is when we're
// operating on a full register.
// When dealing with memory, ops
// are always 16bit.
ExecutionUnit.add = function(ops) {
	var op1 = ops[1];
	var op2 = ops[2];
	var target = getTarget(op1);
}

ExecutionUnit.aType = function(ops){
	if(ops.length !== 3)
		throw new Error("Invalid operation " + ops);
	if(ops[0] === "add")
		return ExecutionUnit.add;
}

ExecutionUnit.cType = function(ops){
	if(ops[0] === "call")
		ExecutionUnit.call(ops[1]);
}

ExecutionUnit.call = function(op1) {
	var target = Machine.getTarget(op1);
}
