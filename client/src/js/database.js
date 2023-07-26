import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
 
  const db = await openDB('jate', 1);  1

  const tx = db.transaction('jate', 'readwrite');   

  const store = tx.objectStore('jate');   

  const request = store.put({ id: 1, value: content });   

  try {

    await request;
    console.info('Data saved to the database');
  } catch (error) {
    console.error('Error saving data to the database:', error);
  }
};


// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1); 

    const tx = db.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');

    const request = store.getAll(); 
    console.log(request);

    let response = await request; 
    console.log(response)

    response = await response.map(entry => entry.value) 
    

    console.info('Getting all data from the database');
    console.log("Test",response)
    return response [0];
    
  } catch (error) {
    console.error('Error occurred while retrieving data from the database:', error);
    throw error;
  }
};

initdb();
