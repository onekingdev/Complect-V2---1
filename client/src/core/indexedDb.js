import { openDB } from "idb/with-async-ittr.js";
import { readDocumentsFromCloudDb } from "~/core/api.js";
import { generatedData } from "~/_devmode/generator/generator.js";
const databaseName = "complect";
const databaseVersion = 1;
const stores = [
	"_devmode",
	"businesses",
	"employees",
	"specialists",
	"projects",
	"tasks",
	"reviews",
	"policies",
	"risks"
];


const initLocalDb = async () => {
	try {
		await openDB( databaseName, databaseVersion, {
			upgrade ( db ) {
				stores.forEach( ( collection ) => {
					console.log( "Update LocaldDb" );
					const store = db.createObjectStore( collection, {
						"keyPath": "_id",
						"autoIncrement": false,
						"unique": true
					});
					store.createIndex( "_id", "_id" );
				});
			}
		});
	} catch ( error ) {
		console.error( error );
	}
};


const syncLocalDb = async () => {
	console.log( "Sync Local DB" );
	const localDb = await openDB( databaseName, databaseVersion );
	stores.forEach( async ( collection ) => {
		const answer = await readDocumentsFromCloudDb( collection );
		localDb.clear( collection );
		const transaction = localDb.transaction( collection, "readwrite" );
		answer.data.forEach( ( newDocument ) => {
			transaction.objectStore( collection ).add( newDocument );
		});
		await transaction.done;
	});
};


// cRUD
const getDocumentFromLocalDb = async ( storeName, documentId ) => {
	try {
		const db = await openDB( databaseName, databaseVersion );
		return await db.get( storeName, documentId );
	} catch ( error ) {
		console.error( error );
	}
};

const getDocumentsFromLocalDb = async ( storeName, documentId ) => {
	let result;
	try {
		const db = await openDB( databaseName, databaseVersion );
		if ( !documentId ) result = await db.getAllFromIndex( storeName, "_id" );
		return result;
	} catch ( error ) {
		console.error( error );
	}
};

const saveDocumentsToLocalDb = async ( storeName, newDocuments ) => {
	let localDb;
	try {
		console.log( "saveDocumentsToIndexedDb" );
		localDb = await openDB( databaseName, databaseVersion );
		const transaction = localDb.transaction( storeName, "readwrite" );
		newDocuments.forEach( newDocument => transaction.objectStore( storeName ).add( newDocument ) );
		await transaction.done;
	} catch ( error ) {
		console.error( error );
	} finally {
		localDb.close();
	}
};

const updateDocumentInLocalDb = async ( storeName, newDocument ) => {
	let localDb;
	try {
		localDb = await openDB( databaseName, databaseVersion );
		await localDb.put( storeName, newDocument );
	} catch ( error ) {
		console.error( error );
	} finally {
		localDb.close();
	}
};

const removeDocumentsFromLocalDb = async ( storeName, documentId ) => {
	let localDb;
	try {
		localDb = await openDB( databaseName, databaseVersion );
		if ( documentId ) localDb.delete( storeName, documentId );
		else localDb.clear( storeName );
	} catch ( error ) {
		console.error( error );
	} finally {
		localDb.close();
	}
};

const fillLocalDB = async () => {
	console.log( "Fill Local DB" );
	try {
		const collections = await generatedData();
		const collectionsNames = Object.keys( collections );
		for ( const collectionName of collectionsNames ) await saveDocumentsToLocalDb( collectionName, collections[collectionName]);
	} catch ( error ) {
		console.error( error );
	}
};


export {
	initLocalDb,
	syncLocalDb,
	saveDocumentsToLocalDb,
	updateDocumentInLocalDb,
	getDocumentFromLocalDb,
	getDocumentsFromLocalDb,
	removeDocumentsFromLocalDb,
	fillLocalDB
};
