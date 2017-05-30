/* Interface Module */
// This module is for abstracting
// away all the nasty HTML DOM stuff.

var Interface = {
	registers(){ return document.getElementById("registers"); },
	instructions(){ 
		instrs = document.getElementById("instructions").value;
		instrs = instrs.trim();
		// Replace inline comments with a newline.
		instrs = instrs.replace(/;.*\n/,"\n");
		// Remove full line comments.
		// The 2nd argument 'm' sets the multiline flag for
		// our regex so that we match for the beginning of
		// the line as well as the start of the string.
		instrs = instrs.replace(RegExp(/^;.*\n/,'m'),"");
		// Split into individual instructions.
		instrs = instrs.split('\n');
		// Lowercase everything and split into various op parts.
		instrs.forEach(function(element, index, array){
			element = element.toLowerCase();
			array[index] = element.split(/[ ,]/);
		});
		return instrs;
	}
}

Interface.init = function() {
	regs = this.registers();
	// Setup the Register table
	// Setup the instruction set
	// Setup the memory display
}
