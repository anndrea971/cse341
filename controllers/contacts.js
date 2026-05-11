import { getDb } from '../db/connect.js';
import { ObjectId } from 'mongodb';

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const db = getDb().db(); // If you named your database something specific in Atlas, put it inside db('YourDbName')
    const lists = await db.collection('contacts').find().toArray();
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
    const db = getDb().db();
    const lists = await db.collection('contacts').find({ _id: userId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};