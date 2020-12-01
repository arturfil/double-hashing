
const TABLE_SIZE = 10;

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

// the slot is determined by (H1 + i H2) mod 16
// h1() = k mod table_size;
// h2() = 2 * (key mod 4) + 1;
// hk() = h1 + (i, h2) 

// try [10,0,7,5,25,13,11,6]
const hashKey = (key) => {
  let round = 0;
  h = hashOne(key)
  
  console.log('Round: ', round);

  while (getFromBucket(h) != "") {
    round++;
    console.log('Round: ', round);
    h = hashOne(round * hashTwo(key));
    colorBucketTouched(h);
    if (round > 10) {
      alert("Hash function got stuck");
      return;
    }
  }

  putToBucket(h,key);
}

const hashOne = (key) => {
  return key % TABLE_SIZE;
}

const hashTwo = (key) => {
  return 2 * (key % 4) + 1;
}

const getInputValue = () => {
    let s = document.getElementById('hashin').value ;
	let j = parseInt(s) ;
	makeBucketsBlack() ;
	if ( !isNaN(j) ) 
		hashKey(j) ;
	document.getElementById('hashin').value="" ;
}