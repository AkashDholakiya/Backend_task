import mongoose from 'mongoose';
import { expect } from 'chai';
import request from 'supertest';
import redisClient from '../utils/redis.js';
import app from '../app.js'; 
import  Faq  from '../models/faqModel.js';

describe('FAQ API Integration Tests', function () {
  this.timeout(10000);

  before(async () => {


    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    
    await redisClient.flushAll();
    await Faq.deleteMany({});
  });

  after(async () => {

    await Promise.all(
      Object.keys(mongoose.connection.collections).map(collectionName =>
        mongoose.connection.collections[collectionName].deleteMany({})
      )
    );
    await mongoose.disconnect();


    await redisClient.quit();
  });

  beforeEach(async () => {
    
    await redisClient.flushAll();
  });

  describe('GET /faqs', () => {
    beforeEach(async () => {
      // Seed test data for getFaqs
      await Faq.create({ question: 'What is MongoDB?', answer: 'A NoSQL database' });
    });

    afterEach(async () => {

      await Faq.deleteMany({});
    });

    it('should return FAQs in English when no language query is provided', async () => {
      const res = await request(app).get('/api/v1/faqs/get-faqs');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.include({
        question: 'What is MongoDB?',
        answer: 'A NoSQL database',
      });
    });

    it('should return translated FAQs when language query is provided', async () => {

      await Faq.create({ question: 'What is MongoDB?', answer: 'A NoSQL database' });
      
      const res = await request(app).get('/api/v1/faqs/get-faqs/?lang=es');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.include({
        question: '¿Qué es MongoDB?',
        answer: 'Una base de datos NoSQL',
      });
    });
  });

  describe('POST /faqs', () => {
    afterEach(async () => {
      await Faq.deleteMany({});
    });

    it('should add a new FAQ and return it', async () => {
      const newFaq = { question: 'What is JavaScript?', answer: "It's a programming language." };
      const res = await request(app).post('/api/v1/faqs/add-faq').send(newFaq);
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newFaq);

      const dbFaq = await Faq.findOne({ question: 'What is JavaScript?' });
      expect(dbFaq).to.exist;
      expect(dbFaq.answer).to.equal("It's a programming language.");
    });
  });
});
