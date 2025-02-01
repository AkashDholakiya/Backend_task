import express from 'express';
import { getFaqs, addFaq } from '../controllers/faqController.js';
const router = express.Router();

router.get('/get-faqs', getFaqs);
router.post('/add-faq', addFaq);

export default router;