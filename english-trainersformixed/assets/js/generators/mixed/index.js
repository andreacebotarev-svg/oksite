/**
 * MIXED TENSES — Question Dispatcher
 * ====================================
 * Delegates question generation to the tense-specific generator
 * via the central Registry. No switch/case, no hardcoded tenses.
 *
 * To add a new tense:
 *   1. Create generators/<tense-name>/index.js
 *   2. Register it in generators/registry.js
 *   3. Add to TENSES enum and LEVELS in strategies.js
 *   → This file stays untouched.
 */

import { generateForTense } from '../registry.js';

/**
 * Generate a question for the Mixed Tenses trainer.
 *
 * @param {string} tense        — e.g. 'present-simple', 'past-continuous'
 * @param {string} sentenceType — 'affirmative' | 'negative' | 'question'
 * @param {string} taskType     — 'gap' | 'choice' | 'error'
 * @returns {Object} Question object with type, question, options, correct, metadata
 */
export function generateMixedQuestion(tense, sentenceType, taskType) {
    console.log(`[Mixed] Generating: ${tense} | ${sentenceType} | ${taskType}`);
    return generateForTense(tense, sentenceType, taskType);
}
