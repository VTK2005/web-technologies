// seed.js — Populate the books collection with sample data
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');

const books = [
  { title: 'JavaScript Essentials',      author: 'John Smith',     category: 'Programming', price: 450, rating: 4.5, year: 2023 },
  { title: 'MongoDB in Action',          author: 'Kyle Banker',    category: 'Database',    price: 520, rating: 4.7, year: 2022 },
  { title: 'Node.js Design Patterns',    author: 'Mario Casciaro', category: 'Programming', price: 490, rating: 4.3, year: 2023 },
  { title: 'React Up and Running',       author: 'Stoyan Stefanov',category: 'Programming', price: 380, rating: 4.1, year: 2021 },
  { title: 'Data Structures & Algos',    author: 'Thomas Cormen',  category: 'CS Theory',   price: 600, rating: 4.8, year: 2020 },
  { title: 'Python Crash Course',        author: 'Eric Matthes',   category: 'Programming', price: 340, rating: 4.6, year: 2023 },
  { title: 'Clean Code',                 author: 'Robert Martin',  category: 'Engineering', price: 410, rating: 4.9, year: 2019 },
  { title: 'The Pragmatic Programmer',   author: 'David Thomas',   category: 'Engineering', price: 430, rating: 4.8, year: 2019 },
  { title: 'Database System Concepts',   author: 'Abraham Silberschatz', category: 'Database', price: 700, rating: 4.2, year: 2020 },
  { title: 'Deep Learning',             author: 'Ian Goodfellow',  category: 'AI/ML',       price: 650, rating: 4.7, year: 2021 },
  { title: 'Machine Learning Yearning', author: 'Andrew Ng',       category: 'AI/ML',       price: 200, rating: 4.4, year: 2021 },
  { title: 'JavaScript: Good Parts',    author: 'Douglas Crockford',category:'Programming', price: 290, rating: 3.9, year: 2018 },
  { title: 'CSS: The Definitive Guide', author: 'Eric Meyer',      category: 'Web Design',  price: 320, rating: 4.0, year: 2022 },
  { title: 'Linux Command Line',        author: 'William Shotts',  category: 'OS',          price: 360, rating: 4.5, year: 2021 },
  { title: 'Docker Deep Dive',          author: 'Nigel Poulton',   category: 'DevOps',      price: 280, rating: 4.3, year: 2022 },
  { title: 'Kubernetes in Action',      author: 'Marko Luksa',     category: 'DevOps',      price: 580, rating: 4.6, year: 2023 },
  { title: 'Express.js Guide',          author: 'Azat Mardan',     category: 'Programming', price: 310, rating: 3.8, year: 2020 },
  { title: 'SQL Performance Explained', author: 'Markus Winand',   category: 'Database',    price: 440, rating: 4.5, year: 2022 },
  { title: 'Git Pro',                   author: 'Scott Chacon',    category: 'Tools',       price: 250, rating: 4.4, year: 2020 },
  { title: 'Computer Networks',         author: 'Andrew Tanenbaum',category: 'Networking',  price: 680, rating: 4.3, year: 2021 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Book.deleteMany({});
  const inserted = await Book.insertMany(books);
  console.log(`✅ Seeded ${inserted.length} books into the database`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
