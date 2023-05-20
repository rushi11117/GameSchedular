const isDuplicateDocument = async (collectionName, document) => {
    try {
      const db = mongoose.connection;
      const collection = db.collection(collectionName);
  
      const existingDocument = await collection.findOne(document);
  
      return !!existingDocument; // Returns true if a duplicate document exists, false otherwise
    } catch (error) {
      console.error('Error checking for duplicate document:', error);
      throw error;
    }
  };
  
  module.exports = {
    isDuplicateDocument
  };  