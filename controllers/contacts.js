import { getDb } from '../db/connect.js';
import { ObjectId } from 'mongodb';

const getCollection = () => getDb().db('database').collection('contacts');

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const lists = await getCollection().find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact by ID
export const getSingleContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = await getCollection().findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const result = await getCollection().insertOne({ firstName, lastName, email, favoriteColor, birthday });
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await getCollection().replaceOne(
      { _id: userId },
      { firstName, lastName, email, favoriteColor, birthday }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getCollection().deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};