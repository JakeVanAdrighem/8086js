var ExecutionUnit = {};

ExecutionUnit.init = function(){
	this.Instruction;
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
	}
	this.execute();
}

ExecutionUnit.execute = function(){
	console.log("Executing " + this.Instruction[0]);
	ExecutionUnit[this.Instruction[0]](this.Instruction.splice(1));
}

ExecutionUnit.nop = function(ops){
	return true;
}

ExecutionUnit.executionError = function(operation, ...operands){
	var operands = [operands];
	throw new Error("Unable to execute operation " + operation + " with operand(s) " + operands);
}


/* Notes for all instruction types:             */
/* When handling instructions with 2 operands   */
/* the operands must be the same size.          */


/*
ADD instr formats:

REG, memory
REG, REG
REG, immediate
memory, REG
memory, immediate
*/
ExecutionUnit.add = function(ops) {
	var op1 = ops[1];
	var op2 = ops[2];
	var target = getTarget(op1);
}

function convertRegToImm(val){
	var res = 0;
	var tracking = 1;
	var size = val.size();
	for(var i = 0; i < size; i++){
		res += (tracking * val.pop());
		tracking *= 2;
	}
	return res;
}

function convertImmToReg(val){
	var reg = [];
	while(val != 0){
		reg.un.shift(val & 0x1);
		val = val >> 1;
	}
}

ExecutionUnit.call = function(op1) {
	var target = Machine.getTarget(op1);
}
