import Faq from '../models/faqModel.js';
// import redis from 'redis';

// const client = redis.createClient();

// client.on("error", function(error) {
//     console.error(error);
// });

const getFaqs = async (req, res) => {
    const query = req.query['lang'];

    try {
        const faqs = await Faq.find({});
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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