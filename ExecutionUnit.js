var EU = {};

EU.execute = function(){
	var Instruction = BIU.Instruction;
	var op = Instruction[0];
	EU[Instruction[0]](Instruction.splice(1));
	console.log("Executing " + Instruction[0]);
}

EU.nop = function(ops){
	return true;
}

EU.executionError = function(operation, ...operands){
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
EU.add = function(ops) {
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

EU.call = function(op1) {
	var target = CPU.getTargetRegister(op1);
}
