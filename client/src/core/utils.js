// return random number
const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

// return random MongoDB ID (MongoDB format)
const randomMongoId = () => {
	const timestamp = Math.round( new Date().getTime() / 1000 ).toString( 16 );
	const randomHexString = Array.from({ "length": 16 }, () => Math.floor( Math.random() * 16 ).toString( 16 ) ).join( "" );
	return `${timestamp}${randomHexString}`;
};

const randomId = () => randomMongoId(); // temp ID Generator

// sort Array by Key
const sortArrayByKey = ( array, key, asc ) => {
	if ( !array.length ) return;
	const type = typeof array[0][key];
	if ( type === "string" ) {
		array.sort( ( a, b ) => {
			const valueA = a[key].toString().toUpperCase();
			const valueB = b[key].toString().toUpperCase();
			if ( valueA < valueB ) return asc ? -1 : 1;
			if ( valueA > valueB ) return asc ? 1 : -1;
			return 0;
		});
	}
	if ( type === "number" ) array.sort( ( a, b ) => ( asc ? a[key] : b[key]) - ( asc ? b[key] : a[key]) ); // sort numbers asc/desc
	if ( type === "object" ) array.sort( ( a, b ) => ( asc ? b[key].length : a[key].length ) - ( asc ? a[key].length : b[key].length ) ); // sort arays by length (asc - from biggest to smallest)
};


const formatDate = date => {
	const options = {
		"year": "numeric",
		"month": "numeric",
		"day": "numeric"
	};
	return new Date( date ).toLocaleString( "en-US", options );
};

const calcRiskLevel = ( impact, likelihood ) => {
	if ( impact === 2 && likelihood > 0 ) return 2;
	else if ( impact === 1 && likelihood === 0 ) return 0;
	else if ( impact === 1 && likelihood === 2 ) return 2;
	else if ( impact === 0 && likelihood < 2 ) return 0;
	return 1;
};

const calcExpandDirections = element => {
	const clientRect = element.getBoundingClientRect();
	const gap = 10;
	const directions = [
		"toRight", "toBottom"
	];
	const toRightEdge = window.innerWidth - clientRect.right;
	const toBottomEdge = window.innerHeight - clientRect.bottom;
	if ( toRightEdge < gap ) directions[0] = "toLeft";
	if ( toBottomEdge < gap ) directions[1] = "toTop";
	return directions;
};

const removeSensitiveData = ( object, keys ) => {
	keys.forEach( key => {
		delete object[key];
	});
};

export { randomNumber, randomId, randomMongoId, sortArrayByKey, formatDate, calcRiskLevel, calcExpandDirections, removeSensitiveData };
