import { Router } from 'express';
import { findPlaces } from '../services/search.js';

const router = Router();
const MAX_QUESTION_LENGTH = 200;

const NOT_FOUND_ANSWER =
  "I couldn't verify that in the campus information I have. Try the Places tab, or ask at the campus office.";

const EMERGENCY_ANSWER =
  'This app does not have verified emergency information yet, so I cannot give emergency contacts. In an emergency, ask campus security or call your local emergency number.';

const EMERGENCY_WORDS = /\b(emergency|ambulance|police|fire)\b/i;

// The question is untrusted text. We only search it. We never run it.
router.post('/', (req, res) => {
  const question = req.body ? req.body.question : undefined;

  if (typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Please send a question as text.' });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: `Please keep the question under ${MAX_QUESTION_LENGTH} characters.` });
  }

  if (EMERGENCY_WORDS.test(question)) {
    return res.json({ answer: EMERGENCY_ANSWER, place_ids: [], sources: [] });
  }

  const matches = findPlaces(question);
  if (matches.length === 0) {
    return res.json({ answer: NOT_FOUND_ANSWER, place_ids: [], sources: [] });
  }

  const lines = matches.map((place) => `${place.name}: ${place.floorInfo.join('; ')}.`);
  const anyUnverified = matches.some((place) => !place.verified);
  const note = anyUnverified ? ' This information has not been verified by USTP.' : '';

  return res.json({
    answer: `${lines.join(' ')}${note}`,
    place_ids: matches.map((place) => place.id),
    sources: matches.map((place) => ({ place_id: place.id, source: place.sourceNote })),
  });
});

export default router;