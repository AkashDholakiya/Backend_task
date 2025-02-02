import Faq from '../models/faqModel.js';
import { translate } from 'google-translate-api-x';
import redisClient from '../utils/redis.js';

const getFaqs = async (req, res) => {
    const lang = req.query['lang'];

    try {
        let faqs = await Faq.find({});

        if (!lang) {
            return res.status(200).json(faqs);
        }

        const translatedFaqs = await Promise.all(faqs.map(async (faq) => {
            const cacheKey = `faq:${faq._id}:${lang}`;
            const cachedTranslation = await redisClient.get(cacheKey);

            if (cachedTranslation) {
                console.log(`Returning cached translation for FAQ ID: ${faq._id}`);
                return JSON.parse(cachedTranslation);
            }
 
            const translatedQuestion = await translate(faq.question, { from: "en", to: lang });
            const translatedAnswer = await translate(faq.answer, { from: "en", to: lang });
 
            const translatedData = {
                question: translatedQuestion.text,
                answer: translatedAnswer.text
            };

            await redisClient.setEx(cacheKey, 86400, JSON.stringify(translatedData));

            return translatedData;
        }));

        res.status(200).json(translatedFaqs);
    } catch (error) {
        console.error("Error in getFaqs:", error);
        res.status(500).json({ error: error.message });
    }
};

const addFaq = async (req, res) => {
    const { question, answer } = req.body;
    try {
        const faq = new Faq({ question, answer });
        await faq.save(); 
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export { getFaqs, addFaq };