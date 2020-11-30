
const TABLE_SIZE = 16 ;

const bucketcolor = [
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
];

function setElementValue(elementId, value) {
	if ( document.getElementById(elementId).innerText!=undefined ) 
		document.getElementById(elementId).innerText = value ;
	else
		document.getElementById(elementId).textContent = value ;
}

const setCellColor = (cell, color) => document.getElementById(cell).style.background = color ;

const makeBucketHTMLString = (i) => {
	return '<div class="bucketbox" id="bb_'+i+'" style="background: '+bucketcolor[i]+';">'
		+'<div id="bucket_'+i+'" class="buckettext"><'
		+ '/div><div class="bucketnumber">'+i+'<'+'/div><'+'/div>' ;
}


const initElement = () => {
	let el = document.getElementById("hashtablecontainer") ;
	for (let i=0;i<TABLE_SIZE;i++ ) {
		el.innerHTML = el.innerHTML + makeBucketHTMLString(i) ;
	}
}
 
function setElementValue(elementId, value) {
	if ( document.getElementById(elementId).innerText!=undefined ) 
		document.getElementById(elementId).innerText = value ;
	else 
		document.getElementById(elementId).textContent = value ;
}

function getElementValue(elementId) {
	if ( document.getElementById(elementId).innerText!=undefined ) 
		return document.getElementById(elementId).innerText ;
	else 
		return document.getElementById(elementId).textContent ;
}

const getFromBucket = (b) => getElementValue('bucket_'+b) ;

const putToBucket = (b,t) => {
	setElementValue('bucket_'+b,t) ;
	document.getElementById('bucket_'+b).style.color="#0a0" ;
}

const makeBucketsBlack = () => {
	for (let i=0;i<TABLE_SIZE;i++ )
		document.getElementById('bucket_'+i).style.color="#000" ;
}

const colorBucketTouched = (i) => document.getElementById('bucket_'+i).style.color="#a00" ;

const clearInputValues = () => {
	for (let i=0;i<TABLE_SIZE;i++ )
		putToBucket(i,"") ;
}

const hashTableInsert = (j) => {
  let h = j%TABLE_SIZE ;
  let i = 0;
  while(getFromBucket(h) != "") {
    colorBucketTouched(h)
    h = secondHashTableInsert(j++);
  }

  // if (getFromBucket(h) != "") {
  //   colorBucketTouched(h)
  //   h = secondHashTableInsert(j);
  // }

	putToBucket(h,j) ;
}

const secondHashTableInsert = (j) => {
  let h = 2 * (j % 4) + 1;
	putToBucket(h,j) ;
}


const getInputValue = () => {
    let s = document.getElementById('hashin').value ;
	let j = parseInt(s) ;
	makeBucketsBlack() ;
	if ( !isNaN(j) ) 
		hashTableInsert(j) ;
	document.getElementById('hashin').value="" ;
}