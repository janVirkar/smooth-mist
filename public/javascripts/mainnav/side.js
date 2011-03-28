/**
 * 
 */
var conv = {
	container: null,
	data: null,
	cells: null,
	page: 1,
	index: -1,
	maxConv: 4,
	
	init: function() {
		conv.container = makeBox(document.getElementById("conv-section"), false);
		conv.container.id = "conv-container";
		
		//[stub] space for filters
		conv.container.appendChild(document.createElement("div")).id = "conv-filter";
		conv.container.appendChild(document.createElement("div")).id = "conv-pages";
		
		reply = conv.container.appendChild(document.createElement("div"))
		reply.id = "conv-reply";
		reply.appendChild(document.createElement("textarea")).id = "reply-input";
		reply.defaultValue = "Type comment here...";
	},
	
	load: function(area) {
		var top = 0;
		var bot = 1;
		
		//make sure a new conversation is being focused
		if (nav.animNum == 0 && nav.colIndex + area != conv.index) {
			var i = 0;
			var topSpace = 190;
			var cellHeight = 100;
			
			//make sure that the side cells are cleared before loading new cells
			if (conv.cells != null) {
				conv.unload();
			}
			
			//[stub] data should be a structure taken from nav.colArray
			//[stub] cells should be initalized with all cells from data
			conv.cells = new Array();
			//[stub] keep loading until page is full OR data has no more cells
			while (i < conv.maxConv) {
				//[stub] cells should be taken from conv.cells instead of made on the spot
				nav.animNum++;
				conv.cells.push(conv.container.appendChild(document.createElement("div")));
				conv.cells[conv.cells.length-1].className = "conv-cell";
				$(conv.cells[conv.cells.length-1]).css({top: (topSpace + i*cellHeight) + "px", opacity: "0.0"});
				$(conv.cells[conv.cells.length-1]).animate({opacity: "1.0"}, "fast", function() {
					nav.animNum--;
				});
				i++;
			}
			
			conv.index = nav.colIndex + area;
		}
	},
	
	unload: function() {
		if (conv.cells != null) {
			//remove all visible cells in the side bar
			i = (conv.page-1)*conv.maxConv;
			while (i < conv.page*conv.maxConv && i < conv.cells.length) {
				cell = conv.cells.pop();
				$(cell).css({opacity: "0.0"});
				conv.container.removeChild(cell);
			}
			
			conv.cells = null;
			conv.index = -1;
		}
	}
};