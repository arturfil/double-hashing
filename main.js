
var TABLE_SIZE = 13 ;

var bucketcolor = new Array( 
	'#ff8',
	'#dca',
	'#f88',
	'#f8c',
	'#c8f',
	'#88f',
	'#8ff',
	'#8f8',	
	'#ff8',
	'#dca',
	'#f88',
	'#f8c',
	'#c8f',
	'#88f',
	'#8ff',
	'#8f8'
	);

function setElementValue(elementId, value) {
	if ( document.getElementById(elementId).innerText!=undefined ) {
		document.getElementById(elementId).innerText = value ;
	} else {
		document.getElementById(elementId).textContent = value ;
	}
}

function setCellColor(cell, color) {
	document.getElementById(cell).style.background = color ;
}

function makeBucketHTMLString(i) {
	return '<div class="bucketbox" id="bb_'+i+'" style="background: '+bucketcolor[i]+';">'
		+'<div id="bucket_'+i+'" class="buckettext"><'
		+ '/div><div class="bucketnumber">'+i+'<'+'/div><'+'/div>' ;
}


function initElement() {
	var el = document.getElementById("hashtablecontainer") ;
	var i ;
	for (i=0;i<TABLE_SIZE;i++ ) {
		el.innerHTML = el.innerHTML + makeBucketHTMLString(i) ;
	}
}
 
function setElementValue(elementId, value) {
	if ( document.getElementById(elementId).innerText!=undefined ) {
		document.getElementById(elementId).innerText = value ;
	} else {
		document.getElementById(elementId).textContent = value ;
	}
}

function getElementValue(elementId) {
	if ( document.getElementById(elementId).innerText!=undefined ) {
		return document.getElementById(elementId).innerText ;
	} else {
		return document.getElementById(elementId).textContent ;
	}
}

function getFromBucket(b) {
// check for IE or Gecko. This is Gecko only:
	return getElementValue('bucket_'+b) ;
}

function putToBucket(b,t) {
// check for IE or Gecko. This is Gecko only:
	setElementValue('bucket_'+b,t) ;
	document.getElementById('bucket_'+b).style.color="#0a0" ;
}

function makeBucketsBlack() {
	var i ;
	for ( i=0;i<TABLE_SIZE;i++ )
		document.getElementById('bucket_'+i).style.color="#000" ;
}

function colorBucketTouched(i) {
	document.getElementById('bucket_'+i).style.color="#a00" ;
}

function clearInputValues() {
	var i ;
	for ( i=0;i<TABLE_SIZE;i++ ) {
		putToBucket(i,"") ;
	}
}

function hashTableInsert(j) {
	var i = 0 ;
	var h = j%TABLE_SIZE ;
	while ( getFromBucket(h) != "" ) {
		colorBucketTouched(h) ;
		h = (h+1)%TABLE_SIZE ;
		i++ ;
		if ( i>TABLE_SIZE ) break ;
	}
	putToBucket(h,j) ;
}


function getInputValue() {
    var s = document.getElementById('hashin').value ;
	var j = parseInt(s) ;
	makeBucketsBlack() ;
	if ( !isNaN(j) ) {
		hashTableInsert(j) ;
	}
	document.getElementById('hashin').value="" ;
}