/**
 * 
 */
var nav = {
	col: null,
	colTop: null,
	colBot: null,
	
	row: null,
	rowLeft: null,
	rowCenter: null,
	rowRight: null,
	
	category: null,
	
	colArray: null,
	colIndex: 0,
	
	rowArray: null,
	rowIndex: 0,
	
	friendArray: null,
	friendIndex: 0,
	
	animNum: 0,
	
	init: function() {
		section = document.getElementById("nav-section");
		
		//arrays will hold structures containing appropriate data,
		//[stub] data should be loaded in this part
		nav.rowArray = new Array();
		
		//[stub] should contain data structures, but contains strings for now
		nav.rowArray.push("Category 0");
		nav.rowArray.push("Category 1");
		nav.rowArray.push("Category 2");
		nav.rowArray.push("Category 3");
		nav.rowArray.push("Category 4");
		nav.rowArray.push("Category 5");
		nav.rowArray.push("Category 6");
		nav.rowArray.push("Category 7");
		
		//arrays will hold structures containing appropriate data,
		//[stub] data should be loaded in this part
		nav.friendArray = new Array();
		
		//[stub] should contain data structures, but contains strings for now
		nav.friendArray.push("Friend 0");
		nav.friendArray.push("Friend 1");
		nav.friendArray.push("Friend 2");
		nav.friendArray.push("Friend 3");
		nav.friendArray.push("Friend 4");
		nav.friendArray.push("Friend 5");
		nav.friendArray.push("Friend 6");
		nav.friendArray.push("Friend 7");
		
		//[stub] column data depends on row data
		nav.colArray = new Array();
		
		//[stub] should contain data structures, but contains strings for now
		nav.colArray.push("Conversation 0");
		nav.colArray.push("Conversation 1");
		nav.colArray.push("Conversation 2");
		nav.colArray.push("Conversation 3");
		nav.colArray.push("Conversation 4");
		nav.colArray.push("Conversation 5");
		nav.colArray.push("Conversation 6");
		nav.colArray.push("Conversation 7");
		
		//initialize column
		nav.col = section.appendChild(document.createElement("div"));
		nav.col.setAttribute("id", "nav-column");
		
//		nav.colTop = nav.col.appendChild(document.createElement("div"));
		nav.colTop = makeBox(nav.col, true);
		nav.colTop.className = "col top";
		//[stub] fill top cell with appropriate data
		nav.colTop.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex];
		$(nav.colTop).css({opacity: "0.8"});
		
//		nav.colBot = nav.col.appendChild(document.createElement("div"));
		nav.colBot = makeBox(nav.col, true);
		nav.colBot.className = "col bot";
		//[stub] fill bottom cell with appropriate data
		nav.colBot.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex+1];
		$(nav.colBot).css({opacity: "0.8"});
		
		//initialize row
		nav.row = section.appendChild(document.createElement("div"));
		nav.row.setAttribute("id", "nav-row");
		
		nav.row.appendChild(document.createElement("div")).id = "arrow-left";
		nav.row.appendChild(document.createElement("div")).id = "arrow-right";
		nav.row.appendChild(document.createElement("div")).id = "arrow-up";
		nav.row.appendChild(document.createElement("div")).id = "arrow-down";
		
//		nav.rowLeft = nav.row.appendChild(document.createElement("div"));
		nav.rowLeft = makeBox(nav.row, false);
		nav.rowLeft.className = "row left";
		//[stub] fill left cell with appropriate data
		nav.rowLeft.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex];
		
//		nav.rowCenter = nav.row.appendChild(document.createElement("div"));
		nav.rowCenter = makeBox(nav.row, false);
		nav.rowCenter.className = "row center";
		//[stub] fill center cell with appropriate data
		nav.rowCenter.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex+1];
		
//		nav.rowRight = nav.row.appendChild(document.createElement("div"));
		nav.rowRight = makeBox(nav.row, false);
		nav.rowRight.className = "row right";
		//[stub] fill right cell with appropriate data
		nav.rowRight.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex+2];
		
		nav.category = section.appendChild(document.createElement("div"));
		nav.category.id = "nav-cat";
		nav.category.className = "round";
		nav.category.innerHTML = "Viewing: Categories (Click to Switch View)";
		$(nav.category).click(function(event) {
			nav.switchView();
		});
	},
	
	move: function(dir) {
		section = document.getElementById("nav-section");
		str = nav.category.innerHTML;
		
		left = 0;
		right = 1;
		up = 2;
		down = 3;
		
		//locking mechanism
		if (nav.animNum == 0) {
			if (dir == left) {
				conv.unload();
				nav.animNum = 6;
				
				if (str.indexOf("Categories", 0) != -1) {
					nav.rowIndex++;
					nav.rowIndex = nav.rowIndex % nav.rowArray.length;
				} else {
					nav.friendIndex++;
					nav.friendIndex = nav.friendIndex % nav.friendArray.length;
				}
				nav.colIndex = 0;
				//[stub] load column data from row data
				
				//make new cells for column movement
				newTop = makeBox(nav.col, true);
				newTop.className = "col top";
				$(newTop).css({opacity: "0.0"});
				//[stub] fill cell with next data
				newTop.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex];
				
				newBot = makeBox(nav.col, true);
				newBot.className = "col bot";
				$(newBot).css({opacity: "0.0"});
				//[stub] fill cell with next data
				newBot.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex+1];
				
				//make new cell for row movement
				newLeft = nav.rowCenter;
				newCenter = nav.rowRight;
				newRight = makeBox(nav.row, false);
				newRight.className = "row";
				$(newRight).css({left: "924px"});
				//[stub] fill cell with next data
				if (str.indexOf("Categories", 0) != -1) {
					newRight.getElementsByTagName("p")[0].innerHTML =
						nav.rowArray[(nav.rowIndex+2)%nav.rowArray.length];
				} else {
					newRight.getElementsByTagName("p")[0].innerHTML =
						nav.friendArray[(nav.friendIndex+2)%nav.friendArray.length];
				}
				
				//animation starts here
				//make old column cells disappear, new ones appear
				$(nav.colTop).css({opacity: "0.0"});
				$(newTop).animate({opacity: "0.8"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colTop);
					nav.colTop = newTop;
					
					$(nav.colTop).click(function(event) {
						conv.load(0);
					});
				});
				
				$(nav.colBot).css({opacity: "0.0"});
				$(newBot).animate({opacity: "0.8"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colBot);
					nav.colBot = newBot;
					
					$(nav.colBot).click(function(event) {
						conv.load(1);
					});
				});
				
				//make row cells move to the left
				$(nav.rowLeft).animate({left: "-308px"}, function() {
					nav.animNum--;
					nav.row.removeChild(nav.rowLeft);
					nav.rowLeft = newLeft;
					nav.rowLeft.className = "row left";
				});
				
				$(nav.rowCenter).animate({left: "0px"}, function() {
					nav.animNum--;
					nav.rowCenter = newCenter;
					nav.rowCenter.className = "row center";
				});
				
				$(nav.rowRight).animate({left: "308px"}, function() {
					nav.animNum--;
					nav.rowRight = newRight;
					nav.rowRight.className = "row right";
				});
				
				$(newRight).animate({left: "616px"}, function() {
					nav.animNum--;
				});
			} else if (dir == right) {
				conv.unload();
				nav.animNum = 6;
				
				if (str.indexOf("Categories", 0) != -1) {
					nav.rowIndex--;
					if (nav.rowIndex < 0) {
						nav.rowIndex = nav.rowArray.length-1;
					}
				} else {
					nav.friendIndex--;
					if (nav.friendIndex < 0) {
						nav.friendIndex = nav.friendArray.length-1;
					}
				}
				nav.colIndex = 0;
				//[stub] load column data from row data
				
				//make new cells for column movement
				newTop = makeBox(nav.col, true);
				newTop.className = "col top";
				$(newTop).css({opacity: "0.0"});
				//[stub] fill cell with next data
				newTop.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex];
				
				newBot = makeBox(nav.col, true);
				newBot.className = "col bot";
				$(newBot).css({opacity: "0.0"});
				//[stub] fill cell with next data
				newBot.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex+1];
				
				//make new cell for row movement
				newLeft = makeBox(nav.row, false);
				newCenter = nav.rowLeft;
				newRight = nav.rowCenter;
				newLeft.className = "row";
				$(newLeft).css({left: "-308px"});
				//[stub] fill cell with next data
				if (str.indexOf("Categories", 0) != -1) {
					newLeft.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex];
				} else {
					newLeft.getElementsByTagName("p")[0].innerHTML = nav.friendArray[nav.friendIndex];
				}
				
				//animation starts here
				//make old column cells disappear, new ones appear
				$(nav.colTop).css({opacity: "0.0"});
				$(newTop).animate({opacity: "0.8"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colTop);
					nav.colTop = newTop;
					
					$(nav.colTop).click(function(event) {
						conv.load(0);
					});
				});
				
				$(nav.colBot).css({opacity: "0.0"});
				$(newBot).animate({opacity: "0.8"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colBot);
					nav.colBot = newBot;
					
					$(nav.colBot).click(function(event) {
						conv.load(1);
					});
				});
				
				//make row cells move to the right				
				$(newLeft).animate({left: "0px"}, function() {
					nav.animNum--;
				});
				
				$(nav.rowLeft).animate({left: "308px"}, function() {
					nav.animNum--;
					nav.rowLeft = newLeft;
					nav.rowLeft.className = "row left";
				});
				
				$(nav.rowCenter).animate({left: "616px"}, function() {
					nav.animNum--;
					nav.rowCenter = newCenter;
					nav.rowCenter.className = "row center";
				});
				
				$(nav.rowRight).animate({left: "924px"}, function() {
					nav.animNum--;
					nav.row.removeChild(nav.rowRight);
					nav.rowRight = newRight;
					nav.rowRight.className = "row right";
				});
			} else if (dir == up) {
				nav.animNum = 3;
				nav.colIndex++;
				nav.colIndex = nav.colIndex%nav.colArray.length;
				
				//make new cells for column movement
				newTop = nav.colBot;
				
				newBot = makeBox(nav.col, true);
				newBot.className = "col";
				$(newBot).css({top: "810px", opacity: "0.8"});
				//[stub] fill cell with next data
				//newBox.getElementsByTagName("p")[0].innerHTML =
				//	nav.colArray[(nav.colIndex+1)%nav.colArray.length];
				
				//animation starts here
				//make column cells move up
//				$(nav.colTop).animate({top: "-180px"}, function() {
				$(nav.colTop).animate({top: "-250px"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colTop);
					nav.colTop = newTop;
					nav.colTop.className = "col top";
					
					$(nav.colTop).click(function(event) {
						conv.load(0);
					});
				});
				
//				$(nav.colBot).animate({top: "20px"}, function() {
				$(nav.colBot).animate({top: "0px"}, function() {
					nav.animNum--;
					nav.colBot = newBot;
					nav.colBot.className = "col bot";
					
					$(nav.colBot).click(function(event) {
						conv.load(1);
					});
				});
				
//				$(newBot).animate({top: "420px"}, function() {
				$(newBot).animate({top: "455px"}, function() {
					nav.animNum--;
				});
			} else if (dir == down) {
				nav.animNum = 3;
				nav.colIndex--;
				//[stub] implement wrap around
				if (nav.colIndex < 0) {
					nav.colIndex = nav.colArray.length-1;
				}
				
				//make new cells for column movement
				newTop = makeBox(nav.col, true);
				newTop.className = "col";
//				$(newTop).css({top: "-180px"});
				$(newTop).css({top: "-250px"});
				//[stub] fill cell with next data
				
				newBot = nav.colTop;
				
				//animation starts here
				//make column cells move down
				$(newTop).animate({top: "0px", opacity: "0.8"}, function() {
					nav.animNum--;
				});
				
//				$(nav.colTop).animate({top: "420px"}, function() {
				$(nav.colTop).animate({top: "455px"}, function() {
					nav.animNum--;
					nav.colTop = newTop;
					nav.colTop.className = "col top";
					
					$(nav.colTop).click(function(event) {
						conv.load(0);
					});
				});
				
				$(nav.colBot).animate({top: "810px"}, function() {
					nav.animNum--;
					nav.col.removeChild(nav.colBot);
					nav.colBot = newBot;
					nav.colBot.className = "col bot";
					
					$(nav.colBot).click(function(event) {
						conv.load(1);
					});
				});
			}
		}
	},
	
	switchView: function() {
		str = nav.category.innerHTML;
		if (nav.animNum == 0) {
			if (str.indexOf("Categories", 0) != -1) {
				conv.unload();
				nav.animNum = 5;
				nav.rowIndex = 0;
				nav.colIndex = 0;
				nav.category.innerHTML = "Viewing: Friends (Click to Switch View)";
				//switch to Friends view
				$(nav.rowLeft).css({opacity: "0.0"});
				$(nav.rowCenter).css({opacity: "0.0"});
				$(nav.rowRight).css({opacity: "0.0"});
				$(nav.colTop).css({opacity: "0.0"});
				$(nav.colBot).css({opacity: "0.0"});
				
				nav.rowLeft.getElementsByTagName("p")[0].innerHTML = nav.friendArray[nav.friendIndex];
				nav.rowCenter.getElementsByTagName("p")[0].innerHTML = nav.friendArray[nav.friendIndex+1];
				nav.rowRight.getElementsByTagName("p")[0].innerHTML = nav.friendArray[nav.friendIndex+2];
				nav.colTop.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex];
				nav.colBot.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex+1];
				
				$(nav.rowLeft).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.rowCenter).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.rowRight).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.colTop).animate({opacity: "0.8"}, function() {
					nav.animNum--;
				});
				$(nav.colBot).animate({opacity: "0.8"}, function() {
					nav.animNum--;
				});
			} else  {
				conv.unload();
				nav.animNum = 5;
				nav.friendIndex = 0;
				nav.colIndex = 0;
				nav.category.innerHTML = "Viewing: Categories (Click to Switch View)";
				//switch to Category view
				
				$(nav.rowLeft).css({opacity: "0.0"});
				$(nav.rowCenter).css({opacity: "0.0"});
				$(nav.rowRight).css({opacity: "0.0"});
				$(nav.colTop).css({opacity: "0.0"});
				$(nav.colBot).css({opacity: "0.0"});
				
				nav.rowLeft.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex];
				nav.rowCenter.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex+1];
				nav.rowRight.getElementsByTagName("p")[0].innerHTML = nav.rowArray[nav.rowIndex+2];
				nav.colTop.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex];
				nav.colBot.getElementsByTagName("p")[0].innerHTML = nav.colArray[nav.colIndex+1];
				
				$(nav.rowLeft).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.rowCenter).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.rowRight).animate({opacity: "1.0"}, function() {
					nav.animNum--;
				});
				$(nav.colTop).animate({opacity: "0.8"}, function() {
					nav.animNum--;
				});
				$(nav.colBot).animate({opacity: "0.8"}, function() {
					nav.animNum--;
				});
			}
		}
	}
};

function moveNav(e) {
	if(window.event) {
		keynum = e.keyCode;
	} else if(e.which) {
		keynum = e.which;
	}
	
	left = 37;
	up = 38;
	right = 39;
	down = 40;
	
	switch(keynum) {
	case left:
		nav.move(0);
		break;
	case right:
		nav.move(1);
		break;
	case up:
		nav.move(2);
		break;
	case down:
		nav.move(3);
		break;
	}
	
	document.getElementById("test").innerHTML = "";
}

function makeBox(parent, col) {
	box = parent.appendChild(document.createElement("div"));
	box.appendChild(document.createElement("div")).className = "box-top-right";
	box.appendChild(document.createElement("div")).className = "box-top-left";
	box.appendChild(document.createElement("p"));
	box.appendChild(document.createElement("div")).className = "box-bot-right";
	box.appendChild(document.createElement("div")).className = "box-bot-left";
	
	if (col == true) {
		box.appendChild(document.createElement("div")).className = "conv-up";
		box.appendChild(document.createElement("div")).className = "conv-down";
	}
	
	return box;
}