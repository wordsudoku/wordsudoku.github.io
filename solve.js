debug=false;function log(){if(debug){console.log(arguments)}}function getRandomInt(e){return Math.floor(Math.random()*Math.floor(e))}function choose(e){return e[getRandomInt(e.length)]}function generateRandomMapping(e){var l=[1,2,3,4,5,6,7,8,9];if(!e){e=0}for(var t=0;t<e;t++){arraySwap(l,getRandomInt(9),getRandomInt(9))}log("generated mapping:",l);return l}function numberGameToLetters(e){log("number game:",e);var l=0;var t="";while(l<e.length){var r=false;if(e[l]=="!"){r=true;l++}var n=e.charCodeAt(l)-"1".charCodeAt(0);var i=null;if(r){i=String.fromCharCode("A".charCodeAt(0)+n)}else{i=String.fromCharCode("a".charCodeAt(0)+n)}t+=i;l++}return t}function arraySwap(e,l,t){log("swap",l,t);var r=e[l];e[l]=e[t];e[t]=r}function shuffleRows(e,l){var t=[];var r="";for(var n=0;n<e.length;){r+=e[n];n++;if(n%9==0){t.push(r);r=""}}for(var n=0;n<l;n++){var i=[[0,1,2],[3,4,5],[6,7,8]];var o=choose(i);arraySwap(t,choose(o),choose(o))}var a=t.join("");return a}function transpose(e){var l=["","","","","","","","",""];for(var t=0;t<e.length;t++){l[t%9]+=e[t]}return l.join("")}function randomize(e){for(var l=0;l<20;l++){e=shuffleRows(e,10);e=transpose(e)}e=normalizeWord(e);if(choose([0,1]))e=transpose(e);return e}function normalizeWord(e){log("normalizeWord",e);var l=[1,2,3,4,5,6,7,8,9];var t=choose([0,1,2,3,4,5,6,7,8])*9;var r=e.substring(t,t+9).toLowerCase();for(var n=0;n<9;n++){var i=r[n];var o="a";if("A"<=i&&i<="I"){o="A"}else if("J"<=i&&i<="Z"){o="J"}else if("a"<=i&&i<="i"){o="a"}var a=i.charCodeAt(0)-o.charCodeAt(0);l[a]=n}log("generated mapping:",l);var s="";for(var n=0;n<e.length;n++){var i=e[n];var o="a";if("A"<=i&&i<="I"){o="A"}else if("J"<=i&&i<="Z"){o="J"}else if("a"<=i&&i<="i"){o="a"}var a=i.charCodeAt(0)-o.charCodeAt(0);var c=String.fromCharCode(o.charCodeAt(0)+l[a]);log(i,"->",c);s+=c}return s}levelCode="z";levelWord=words[0];function loadGame(e,l){console.log("load game:",e);for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){var n=[t,r];setCellSolution(n,"");setCellValue(n,"",true);setCellVariable(n)}}hideHints();glowValue(-1);clearHighlights();clearOptions();log("shuf game:",e);levelWord=choose(words);var i=1;if(e[0]=="z"){setLevel("easy")}else if(e[0]=="y"){setLevel("medium")}else if(e[0]=="x"){setLevel("hard")}else if(e[0]=="w"){setLevel("expert")}else{i=0;setLevel("easy")}if(i){levelWord=e.substring(i,i+9);i+=9}initKeyboard();var o=[1,2,3,4,5,6,7,8,9];for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){var a=e[i];var s=null;var c=null;var u=false;if("A"<=a&&a<="I"){s=o[a.charCodeAt(0)-"A".charCodeAt(0)];c=s;u=true}else if("J"<=a&&a<="Z"){s=o[a.charCodeAt(0)-"J".charCodeAt(0)];c=s;u=false}else if("a"<=a&&a<="i"){c=o[a.charCodeAt(0)-"a".charCodeAt(0)];if(i+1<e.length&&"j"<=e[i+1]&&e[i+1]<="z"){s=o[e[i+1].charCodeAt(0)-"j".charCodeAt(0)];i++}else{s=""}}else{return}var n=[t,r];setCellSolution(n,c);setCellValue(n,s,true);if(u){setCellFixed(n)}else{setCellVariable(n)}i++}}saveBoard();if(!showErrors()){showTrainer()}}savedHash=null;function saveBoard(){savedHash=encodeBoard();window.location.hash=savedHash}cellHighlight=null;cellElements=null;function getCellElement(e){if(!cellElements){cellElements=createMatrix(10);for(var l=1;l<=9;l++){for(var t=1;t<=9;t++){cellElements[l][t]=document.getElementById("cell"+l+""+t)}}}return cellElements[e[0]][e[1]]}cellHighlights=null;function highlightCell(e,l){if(!cellHighlights){cellHighlights=createMatrix(10);for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){cellHighlights[t][r]="#fff"}}}cellHighlights[e[0]][e[1]]=l}function flushHighlights(){getCellElement([1,1]);for(var e=1;e<=9;e++){for(var l=1;l<=9;l++){cellElements[e][l].style.background=cellHighlights[e][l]}}}function highlightRow(e,l){var t=cellHighlight;cellHighlight=l;getRowValues(e);cellHighlight=t}function highlightColumn(e,l){var t=cellHighlight;cellHighlight=l;getColumnValues(e);cellHighlight=t}function highlightSquare(e,l){var t=cellHighlight;cellHighlight=l;getSquareValues(e);cellHighlight=t}function clearHighlights(){for(var e=1;e<=9;e++){for(var l=1;l<=9;l++){highlightCell([e,l],"#fff")}}flushHighlights()}function displaySymbol(e){log("displaySymbol",e,levelWord);if(e){return levelWord[e-1].toUpperCase()}else{return""}}function initKeyboard(){for(var e=1;e<=9;e++){document.getElementById("keyv"+e).innerText=displaySymbol(e);document.getElementById("keyh"+e).innerText=displaySymbol(e)}}function clearOptions(){for(var e=1;e<=9;e++){for(var l=1;l<=9;l++){var t=[e,l];var r=getCellElement(t);r.classList.remove("options");r.innerText=displaySymbol(board[e][l])}}}function createMatrix(e){var l=[];for(var t=0;t<e;t++){l.push([]);for(var r=0;r<e;r++){l[t].push(null)}}return l}function copyMatrix(e){var l=[];for(var t=0;t<e.length;t++){l.push([]);for(var r=0;r<e[t].length;r++){l[t].push(e[t][r])}}return l}board=createMatrix(10);function encodeBoard(){var e=cellHighlight;cellHighlight=null;var l=levelCode+levelWord;for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){var n=[t,r];var i=getCellValue(n);var o=isCellFixed(n);if(o){l+=String.fromCharCode("A".charCodeAt(0)+i-1)}else{var a=getCellSolution(n);if(i==a){l+=String.fromCharCode("J".charCodeAt(0)+a-1)}else{l+=String.fromCharCode("a".charCodeAt(0)+a-1);if(i){l+=String.fromCharCode("j".charCodeAt(0)+i-1)}}}}}cellHighlight=e;log("encode:",l);return l}function getCellValue(e){if(cellHighlight){highlightCell(e,cellHighlight)}var l=board[e[0]][[e[1]]];return l}function setCellValue(e,l,t,r){var n=getCellElement(e);if(l==""){l=0}board[e[0]][e[1]]=parseInt(l);n.innerText=displaySymbol(board[e[0]][e[1]]);n.classList.remove("bad");if(boardIsFull()){console.log("full");clearHighlights();showEndgame();return}if(!t){glowValue(l);saveBoard();if(!showErrors()&&!r){clearHighlights();clearOptions();showTrainer()}}else{glowValue(-1)}}function showCellOptions(e,l){log("show options:",e,l);var t=getCellElement(e);var r="";for(var n=0;n<l.length;n++){if(n>0&&n%3==0){r+="\n"}r+=displaySymbol(l[n])}t.innerText=r;t.classList.add("options")}function getCellSolution(e){log("get solution:",e);var l=getCellElement(e);return parseInt(l.getAttribute("solution"))}function setCellSolution(e,l){log("set solution:",e,l);var t=getCellElement(e);t.setAttribute("solution",""+l)}function getRowValues(e){var l=[];for(var t=1;t<=9;t++){var r=getCellValue([e,t]);if(r){l.push(r)}}log("row:",e,"values:",l);return l}function rowContains(e,l){var t=getRowValues(e);for(var r=0;r<t.length;r++){if(t[r]==l)return true}return false}function getColumnValues(e){var l=[];for(var t=1;t<=9;t++){var r=getCellValue([t,e]);if(r){l.push(r)}}log("column:",e,"values:",l);return l}function columnContains(e,l){var t=getColumnValues(e);for(var r=0;r<t.length;r++){if(t[r]==l)return true}return false}function getTopLeft(e){return[1+Math.floor((e[0]-1)/3)*3,1+Math.floor((e[1]-1)/3)*3]}function getSquareValues(e){var l=[];var t=getTopLeft(e);for(var r=t[0];r<t[0]+3;r++){for(var n=t[1];n<t[1]+3;n++){var i=getCellValue([r,n]);if(i){l.push(i)}}}log("square:",t,"values:",l);return l}function squareContains(e,l){var t=getSquareValues(e);for(var r=0;r<t.length;r++){if(t[r]==l)return true}return false}function boardIsFull(){for(var e=1;e<=9;e++){for(var l=1;l<=9;l++){if(!getCellValue([e,l])){return false}}}return true}function getNextCell(e){var l=[e[0],e[1]];if(l[1]<9){l[1]++}else{l[0]++;l[1]=1}return l}function searchEmptyCell(e){var l=[1,0];if(e){l=[e[0],e[1]]}while(true){l=getNextCell(l);if(l[0]>9){return null}if(getCellValue(l)==0){return l}}}selectedCell=null;function selectCell(e){glowValue(getCellValue(e));var l=getCellElement(e);var t=l.classList.contains("selected");clearSelection();if(isCellFixed(e)){log("cannot select fixed value cell");return}selectedCell=[e[0],e[1]];l.classList.add("selected")}function clearSelection(){if(!selectedCell)return;var e=getCellElement(selectedCell);if(e.classList.contains("selected")){e.classList.remove("selected");selectedCell=null}}function getSelection(){return[selectedCell[0],selectedCell[1]]}function isCellFixed(e){var l=getCellElement(e);return l.classList.contains("fixed")}function setCellFixed(e){var l=getCellElement(e);l.classList.add("fixed")}function setCellVariable(e){var l=getCellElement(e);l.classList.remove("fixed")}function glowValue(e){var l=cellHighlight;cellHighlight=null;for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){var n=[t,r];if(getCellValue(n)==e&&e){getCellElement(n).classList.add("glow")}else{getCellElement(n).classList.remove("glow")}}}cellHighlight=l}function track(e){}function keyPress(e){log("keypress:",e);var l=getSelection();if(l){setCellValue(l,e)}track(e)}function clearCell(){log("clear cell");if(!selectedCell)return;var e=getSelection();if(e){setCellValue(e,"")}}function showErrors(){log("show errors");var e=cellHighlight;cellHighlight=null;var l=false;for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){var n=[t,r];if(getCellValue(n)&&getCellValue(n)!=getCellSolution(n)){getCellElement(n).classList.add("bad");l=true}}}cellHighlight=e;return l}function deleteErrors(){log("delete errors");clearHighlights();clearSelection();clearOptions();var e=false;for(var l=1;l<=9;l++){for(var t=1;t<=9;t++){var r=[l,t];if(getCellValue(r)&&getCellValue(r)!=getCellSolution(r)){setCellValue(r,"");getCellElement(r).classList.add("bad");e=true}}}return e}colors=["#ffc","#cfc","#cff","#fcc","#fcf","#acf","#fac","#fca","#acc"];iColor=0;function getColor(){return colors[iColor++%colors.length]}function resetColors(){iColor=0}function showEndgame(){log("showEndgame");clearSelection();glowValue(-1);if(!showErrors()){var e=getRandomInt(colors.length);for(var l=1;l<9;l+=3){for(var t=1;t<9;t+=3){highlightSquare([l,t],colors[e]);e=(e+1)%colors.length}}flushHighlights()}}function createSelectHandler(e,l){return function(){selectCell([e,l])}}function initSelectHandlers(){log("initializing handlers");for(var e=1;e<=9;e++){for(var l=1;l<=9;l++){getCellElement([e,l]).onclick=createSelectHandler(e,l)}}}function levelChanged(e){var l=e.options[e.selectedIndex].value;var t=document.getElementsByClassName("level");for(var r=0;r<t.length;r++){t[r].value=l}}function getLevel(){var e=document.getElementsByClassName("level")[0];return e.options[e.selectedIndex].value}function getLevelCode(){var e=getLevel();if(e=="medium"){return"y"}else if(e=="hard"){return"x"}else if(e=="expert"){return"w"}return"z"}function setLevel(e){var l=document.getElementsByClassName("level");for(var t=0;t<l.length;t++){l[t].value=e}levelCode=getLevelCode()}function newGame(){log("newGame");var e=simpleGames;var l=getLevel();if(l=="medium"){e=easyGames}else if(l=="hard"){e=intermediateGames}else if(l=="expert"){e=expertGames}loadGame(getLevelCode()+choose(words)+randomize(choose(e)),20);track("new-game");track("level-"+l)}function listOptions(e,l){if(getCellValue(e,l))return[getCellValue(e,l)];var t=[];if(l)cellHighlight="#cff";t=t.concat(getRowValues(e[0]));if(l)cellHighlight="#cfc";t=t.concat(getColumnValues(e[1]));if(l)cellHighlight="#ffc";t=t.concat(getSquareValues(e));if(l)cellHighlight=null;var r=[null,true,true,true,true,true,true,true,true,true];for(var n=0;n<t.length;n++){r[t[n]]=false}var i=[];for(var n=1;n<=9;n++){if(r[n]){i.push(n)}}return i}function showHintLastCell(e){log("show hint last cell");document.getElementById("lastCellDo").classList.add("hidden");document.getElementById("lastCellNext").classList.add("hidden");var l=document.getElementById("lastCellText");var t=null;clearSelection();while(true){t=searchEmptyCell(t);if(!t){log("no more empty cells");l.innerHTML="There are no empty cells.";break}log("empty cell:",t);var r=listOptions(t,true);log("options:",t,r);if(r.length!=1){continue}cellHighlight="#cfc";var n=false;if(!n){clearHighlights();if(getSquareValues(t).length==8){n=true}}if(!n){clearHighlights();if(getRowValues(t[0]).length==8){n=true}}if(!n){clearHighlights();if(getColumnValues(t[1]).length==8){n=true}}if(n){log("hint:",t,r);selectCell(t);highlightCell(t,"#ccc");l.innerHTML="Cell "+t[0]+"."+t[1]+" is the last cell in a group (row, column or square). "+"This means that there is only one possible value left.";document.getElementById("lastCellDo").classList.remove("hidden");cellHighlight=null;if(e){document.getElementById("lastCellDo").classList.add("hidden");document.getElementById("lastCellNext").classList.remove("hidden");setCellValue(t,r[0],false,true)}return true}}return false}function showHintElimination(e){log("show hint elimination");document.getElementById("eliminationDo").classList.add("hidden");document.getElementById("eliminationNext").classList.add("hidden");var l=document.getElementById("eliminationText");var t=null;while(true){clearHighlights();clearSelection();t=searchEmptyCell(t);if(!t){log("no more empty cells");l.innerHTML="There are no cells for which we can perform "+"value elimination by row, column and square.";break}log("empty cell:",t);var r=listOptions(t,true);log("options:",t,r);if(r.length==1){log("hint:",t,r);selectCell(t);highlightCell(t,"#ccc");l.innerHTML="Choose an empty cell, like "+t[0]+"."+t[1]+". Out of all the possible values 1-9, "+"eliminate those already found on "+"the same row, column and square as the cell. "+"If only one value is left, write it into the cell. "+"This pattern is also known as Lone Single or Naked Single.";document.getElementById("eliminationDo").classList.remove("hidden");cellHighlight=null;if(e){document.getElementById("eliminationDo").classList.add("hidden");document.getElementById("eliminationNext").classList.remove("hidden");setCellValue(t,r[0],false,true)}return true}}return false}function showHintElimPosSquare(e){log("show hint elim pos square");clearHighlights();clearSelection();document.getElementById("elimPosSquareDo").classList.add("hidden");document.getElementById("elimPosSquareNext").classList.add("hidden");var l=document.getElementById("elimPosSquareText");var t=[1,1];while(t[0]<=9){for(var r=1;r<=9;r++){clearHighlights();clearSelection();cellHighlight="#cff";var n=[];var i=true;for(var o=t[0];i&&o<t[0]+3;o++){for(var a=t[1];i&&a<t[1]+3;a++){var s=getCellValue([o,a]);if(s==r){i=false}else if(s==0){if(!rowContains(o,r)&&!columnContains(a,r)){n.push([o,a])}}}}if(i&&n.length==1){highlightSquare(t,"#ffc");var c=n[0];selectCell(c);highlightCell(c,"#ccc");l.innerHTML="Choose a square, like "+t[0]+"."+t[1]+". Then choose a number from 1-9 that is not in the square. "+"From all the possible empty cells inside the square "+" where the number can be placed, "+"eliminate those that contain the number "+"on the same row or column (in other squares). "+"If only one cell is left, write the number into it. "+"This pattern is also known as Hidden Single in Square.";document.getElementById("elimPosSquareDo").classList.remove("hidden");document.getElementById("elimPosSquareNext").classList.add("hidden");cellHighlight=null;if(e){document.getElementById("elimPosSquareDo").classList.add("hidden");document.getElementById("elimPosSquareNext").classList.remove("hidden");setCellValue(c,r,false,true)}return true}}t[1]+=3;if(t[1]>9){t[0]+=3;t[1]=1}}clearHighlights();clearSelection();cellHighlight=null;return false}function showHintElimPosRow(e){log("show hint elim pos row");clearHighlights();clearSelection();document.getElementById("elimPosRowDo").classList.add("hidden");document.getElementById("elimPosRowNext").classList.add("hidden");var l=document.getElementById("elimPosRowText");for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){clearHighlights();clearSelection();var n=true;var i=[];cellHighlight="#cff";for(var o=1;n&&o<=9;o++){var a=getCellValue([t,o]);if(a==r){n=false}else if(a==0){if(!squareContains([t,o],r)&&!columnContains(o,r)){i.push([t,o])}}}if(n&&i.length==1){highlightRow(t,"#ffc");var s=i[0];selectCell(s);highlightCell(s,"#ccc");l.innerHTML="Choose a row, like "+t+". Then choose a number from 1-9 that is not on the row. "+"From all the possible empty cells on the row "+" where the number can be placed, "+"eliminate those for which the number is already present "+"on the same column as the cell, "+"or inside a square that contains the cell. "+"If only one empty cell is left, write the number into it. "+"This pattern is also known as Hidden Single in Row.";document.getElementById("elimPosRowDo").classList.remove("hidden");document.getElementById("elimPosRowNext").classList.add("hidden");cellHighlight=null;if(e){document.getElementById("elimPosRowDo").classList.add("hidden");document.getElementById("elimPosRowNext").classList.remove("hidden");setCellValue(s,r,false,true)}return true}}}clearHighlights();clearSelection();cellHighlight=null;return false}function showHintElimPosColumn(e){log("show hint elim pos col");clearHighlights();clearSelection();document.getElementById("elimPosColumnDo").classList.add("hidden");document.getElementById("elimPosColumnNext").classList.add("hidden");var l=document.getElementById("elimPosColumnText");for(var t=1;t<=9;t++){for(var r=1;r<=9;r++){clearHighlights();clearSelection();cellHighlight="#cff";var n=[];var i=true;for(var o=1;i&&o<=9;o++){var a=getCellValue([o,t]);if(a==r){i=false}else if(a==0){if(!squareContains([o,t],r)&&!rowContains(o,r)){n.push([o,t])}}}if(i&&n.length==1){highlightColumn(t,"#ffc");var s=n[0];selectCell(s);highlightCell(s,"#ccc");l.innerHTML="Choose a column, like "+t+". Then choose a number from 1-9 that is not on the column. "+"From all the possible empty cells on the column "+" where the number can be placed, "+"eliminate those for which the number is already present "+"on the same row as the cell, "+"or inside a square that contains the cell. "+"If only one empty cell is left, write the number into it. "+"This pattern is also known as Hidden Single in Column.";document.getElementById("elimPosColumnDo").classList.remove("hidden");document.getElementById("elimPosColumnNext").classList.add("hidden");cellHighlight=null;if(e){document.getElementById("elimPosColumnDo").classList.add("hidden");document.getElementById("elimPosColumnNext").classList.remove("hidden");setCellValue(s,r,false,true)}return true}}}clearHighlights();clearSelection();cellHighlight=null;return false}function getBoardOptions(){var e=createMatrix(10);for(var l=1;l<=9;l++){for(var t=1;t<=9;t++){e[l][t]=listOptions([l,t])}}return e}function contains(e,l){return e.indexOf(l)>=0}function remove(e,l){while(true){var t=e.indexOf(l);if(t==-1){return}e.splice(t,1)}}function copyVector(e){var l=[];for(var t=0;t<e.length;t++){l.push(e[t])}return l}function removeOptionFromRow(e,l,t,r){for(var n=1;n<=9;n++){if(contains(r,[l,n])){continue}remove(e[l][n],t)}}function removeOptionFromColumn(e,l,t,r){for(var n=1;n<=9;n++){if(contains(r,[n,l])){continue}remove(e[n][l],t)}}function removeOptionFromSquare(e,l,t,r){for(var n=l[0];n<l[0]+3;n++){for(var i=l[1];i<l[1]+3;i++){if(contains(r,[n,i])){continue}remove(e[n][i],t)}}}function arraysEqual(e,l){if(e.length!=l.length)return false;for(var t=0;t<e.length;t++){if(e[t]!=l[t])return false}return true}function removeOptionFromCommonGroups(e,l,t){var r=l[0][0];var n=l[0][1];var i=getTopLeft(l[0]);for(var o=1;o<l.length;o++){if(l[o][0]!=r){r=null}if(l[o][1]!=n){n=null}if(!arraysEqual(getTopLeft(l[o]),i)){i=null}}var a=l;if(r)removeOptionFromRow(e,r,t,a);if(n)removeOptionFromColumn(e,n,t,a);if(i)removeOptionFromSquare(e,i,t,a)}function groupBySquare(){var e=[];for(var l=1;l<=9;l+=3){for(var t=1;t<=9;t+=3){var r=[];for(var n=0;n<3;n++){for(var i=0;i<3;i++){r.push([l+n,t+i])}}e.push(r)}}return e}function groupByRow(){var e=[];for(var l=1;l<=9;l++){var t=[];for(var r=1;r<=9;r++){t.push([l,r])}e.push(t)}return e}function groupByColumn(){var e=[];for(var l=1;l<=9;l++){for(var t=1;t<=9;t++){var r=[];r.push([t,l])}e.push(r)}return e}function eliminateBySimplePairs(e,l){var t=[];if(l=="square"){t=groupBySquare()}else if(l=="row"){t=groupByRow()}else if(l=="column"){t=groupByColumn()}var r=false;for(var n=0;n<t.length;n++){var i={};for(var o=0;o<t[n].length;o++){var a=t[n][o];var s=e[a[0]][a[1]].join("");if(s.length==2){if(!(s in i)){i[s]=[]}i[s].push(a)}}for(var c in i){if(i[c].length==2){console.log("simple pair: cell",i[c],"values:",c);var u=i[c][0];var h=i[c][1];var d=getColor();highlightCell(u,d);highlightCell(h,d);r=true;var g=[u,h];for(var o=0;o<c.length;o++){var f=parseInt(c[o]);removeOptionFromCommonGroups(e,[u,h],f,g)}}}}return r}function showHintSimplePairs(e){clearHighlights();clearSelection();cellHighlight=null;resetColors();document.getElementById("simplePairsDo").classList.add("hidden");document.getElementById("simplePairsNext").classList.add("hidden");var l=document.getElementById("simplePairsText");var t=getBoardOptions();for(var r=1;r<=9;r++){for(var n=1;n<=9;n++){var i=[r,n];if(!getCellValue(i)&&t[r][n].length==1){selectCell(i);highlightCell(i,"#ccc");l.innerHTML="There is no need to look for pairs, the selected cell can be filled through elimination.";document.getElementById("simplePairsDo").classList.remove("hidden");document.getElementById("simplePairsNext").classList.add("hidden");if(e){document.getElementById("simplePairsDo").classList.add("hidden");document.getElementById("simplePairsNext").classList.remove("hidden");setCellValue(i,t[r][n][0],false,true)}cellHighlight=null;return true}}}var o=false;if(eliminateBySimplePairs(t,"square")){o=true}if(eliminateBySimplePairs(t,"row")){o=true}if(eliminateBySimplePairs(t,"column")){o=true}if(!o){return false}for(var r=1;r<=9;r++){for(var n=1;n<=9;n++){var i=[r,n];if(!getCellValue(i)&&t[r][n].length==1){l.innerHTML="Each of the highlighted pairs can be "+"filled only with a pair of values. We don't know which is which. "+"However we do know that other cells in the same group as the pair "+"(row, column or square) must not contain those two values. "+"The selected cell is one of them. It had initially 3 possible values; "+"by eliminating 2 of them, we can now determine its value.";document.getElementById("simplePairsDo").classList.remove("hidden");document.getElementById("simplePairsNext").classList.add("hidden");selectCell(i);highlightCell(i,"#ccc");if(e){document.getElementById("simplePairsDo").classList.add("hidden");document.getElementById("simplePairsNext").classList.remove("hidden");setCellValue(i,t[r][n][0],false,true)}cellHighlight=null;return true}}}clearHighlights();cellHighlight=null;return false}function chooseBestCell(){var e=[0];for(var l=1;l<=9;l++){e.push(9-getRowValues(l).length)}var t=[0];for(var r=1;r<=9;r++){t.push(9-getColumnValues(r).length)}var n=createMatrix(10);for(var l=1;l<=9;l+=3){for(var r=1;r<=9;r+=3){n[l][r]=9-getSquareValues([l,r]).length;for(var i=0;i<3;i++){for(var o=0;o<3;o++){n[l+i][r+o]=n[l][r]}}}}var a=null;var s=99999;var c=null;while(true){c=searchEmptyCell(c);if(!c){break}var u=e[c[0]]*t[c[1]]*n[c[0]][c[1]];if(u>0&&u<s){a=c;s=u}}return a}function showHintTwoSteps(e){document.getElementById("twoStepsDo").classList.add("hidden");document.getElementById("twoStepsNext").classList.add("hidden");var l=document.getElementById("twoStepsText");clearHighlights();clearSelection();cellHighlight=null;var t=null;var r=chooseBestCell();while(true){t=searchEmptyCell(t);if(!t){break}log("empty cell:",t);var n=listOptions(t,true);log("options:",t,n);if(n.length>0){log("hint:",t,n);l.innerHTML="";document.getElementById("twoStepsDo").classList.remove("hidden");document.getElementById("twoStepsNext").classList.add("hidden");cellHighlight=null;showCellOptions(t,n);if(t[0]==r[0]&&t[1]==r[1]){selectCell(t);highlightCell(t,"#ccc");if(e){document.getElementById("twoStepsDo").classList.add("hidden");document.getElementById("twoStepsNext").classList.remove("hidden");setCellValue(t,getCellSolution(t),false,true);clearOptions();break}}}}clearHighlights();return true}function hideHints(){clearOptions();document.getElementById("hintLastCell").classList.add("hidden");document.getElementById("hintElimination").classList.add("hidden");document.getElementById("hintElimPosSquare").classList.add("hidden");document.getElementById("hintElimPosRow").classList.add("hidden");document.getElementById("hintElimPosColumn").classList.add("hidden");document.getElementById("hintSimplePairs").classList.add("hidden");document.getElementById("hintTwoSteps").classList.add("hidden")}hideHints();function getTrainer(){return document.getElementsByClassName("trainer")[0].classList.contains("enabled")}function toggleTrainer(){var e=!getTrainer();var l=document.getElementsByClassName("trainer");for(var t=0;t<l.length;t++){if(e){l[t].classList.add("enabled")}else{l[t].classList.remove("enabled")}}if(!e){clearHighlights();hideHints()}else{showTrainer()}flushHighlights();track("toggle-trainer")}function showTrainer(){if(getTrainer()){hint(false)}}function hintHelper(e){hideHints();if(showErrors()){return}if(boardIsFull()){return}if(showHintLastCell(e)){document.getElementById("hintLastCell").classList.remove("hidden");return}if(showHintElimination(e)){document.getElementById("hintElimination").classList.remove("hidden");return}if(showHintElimPosSquare(e)){document.getElementById("hintElimPosSquare").classList.remove("hidden");return}if(showHintElimPosRow(e)){document.getElementById("hintElimPosRow").classList.remove("hidden");return}if(showHintElimPosColumn(e)){document.getElementById("hintElimPosColumn").classList.remove("hidden");return}if(showHintSimplePairs(e)){document.getElementById("hintSimplePairs").classList.remove("hidden");return}if(showHintTwoSteps(e)){document.getElementById("hintTwoSteps").classList.remove("hidden");return}}function hint(e){log("hint",e);hintHelper(e);flushHighlights();if(!e){track("hint")}else{track("solve")}}function loadGameFromHash(){log("loadGameFromHash",window.location.hash,savedHash);var e=encodeBoard();var l=window.location.hash.replace("#","");if(l!=e){loadGame(l)}}window.onload=function(){initSelectHandlers();if(window.location.hash){try{loadGameFromHash()}catch(e){newGame()}}else{newGame()}window.onhashchange=loadGameFromHash};
