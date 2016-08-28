var ExecutionUnit = {};


ExecutionUnit.init = function(){
	console.log("Initializing ExecutionUnit");
	this.Instruction;
	this.Operation;
  	// Retrieve the instruction sequence
  	this.InstructionBuffer = Interface.instructions();
}

ExecutionUnit.fetch = function(){
	this.Instruction = this.getNextInstruction();
	return true;
}


ExecutionUnit.getNextInstruction = function(){
  nextInstruction = this.InstructionBuffer.pop();
  if(nextInstruction === undefined)
  	return undefined;
  return nextInstruction;
}

ExecutionUnit.decode = function(){
	console.log("Decoding");
	// Use first character of instruction to lookup the
	// thing we need to do.
	path = ExecutionPathLookupTable[this.Instruction[0][0]];
	if(!path)
		throw new Error("Unable to execute " + this.Instruction[0] + " instruction.");
	path(this.Instruction);
}

ExecutionUnit.execute = function(){

}

ExecutionUnit.nop = function(){
	return true;
}

ExecutionUnit.add = function(op1, op2) {
	console.log("Executing ADD");
	var target = getTarget(op1);
}

ExecutionUnit.aType = function(ops){
	if(ops.length !== 3)
		throw new Error("Invalid operation " + ops);
	if(ops[0] === "add")
		ExecutionUnit.add(ops[1], ops[2]);
}

ExecutionUnit.call = function(op1) {
	console.log("Executing CALL");
	var target = getTarget(op1);
}

ExecutionUnit.cType = function(ops){
	if(ops[0] === "call")
		ExecutionUnit.call(ops[1]);
}

var ExecutionPathLookupTable = {
	"a" : ExecutionUnit.aType,
	"c" : ExecutionUnit.cType
}