/**
 * MASTER VERB DATABASE
 * Contains forms for: Base (V1), Past Simple (V2), Past Participle (V3), Continuous (Ving).
 * Used across all generators to ensure consistency.
 */

export const VERBS = [
    { base: "do", v2: "did", v3: "done", ing: "doing", trans: "делать" },
    { base: "go", v2: "went", v3: "gone", ing: "going", trans: "идти" },
    { base: "see", v2: "saw", v3: "seen", ing: "seeing", trans: "видеть" },
    { base: "eat", v2: "ate", v3: "eaten", ing: "eating", trans: "есть" },
    { base: "write", v2: "wrote", v3: "written", ing: "writing", trans: "писать" },
    { base: "break", v2: "broke", v3: "broken", ing: "breaking", trans: "ломать" },
    { base: "speak", v2: "spoke", v3: "spoken", ing: "speaking", trans: "говорить" },
    { base: "take", v2: "took", v3: "taken", ing: "taking", trans: "брать" },
    { base: "drive", v2: "drove", v3: "driven", ing: "driving", trans: "водить" },
    { base: "drink", v2: "drank", v3: "drunk", ing: "drinking", trans: "пить" },
    { base: "read", v2: "read", v3: "read", ing: "reading", trans: "читать" },
    { base: "play", v2: "played", v3: "played", ing: "playing", trans: "играть" }, // Regular
    { base: "work", v2: "worked", v3: "worked", ing: "working", trans: "работать" }, // Regular
    { base: "sleep", v2: "slept", v3: "slept", ing: "sleeping", trans: "спать" },
    { base: "buy", v2: "bought", v3: "bought", ing: "buying", trans: "покупать" },
    { base: "make", v2: "made", v3: "made", ing: "making", trans: "создавать" },
    { base: "swim", v2: "swam", v3: "swum", ing: "swimming", trans: "плавать" },
    { base: "fly", v2: "flew", v3: "flown", ing: "flying", trans: "летать" }
];

export const SUBJECTS = [
    { text: "I", type: "I" },
    { text: "You", type: "pl" },
    { text: "We", type: "pl" },
    { text: "They", type: "pl" },
    { text: "He", type: "3ps" },
    { text: "She", type: "3ps" },
    { text: "It", type: "3ps" },
    { text: "My friend", type: "3ps" },
    { text: "The cat", type: "3ps" },
    { text: "The students", type: "pl" }
];

// Helper to pick random item
export function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to check Aux correctness
export function getAux(tense, subjectType, isNegative = false) {
    if (tense === 'PC') { // Present Continuous
        if (subjectType === 'I') return isNegative ? "am not" : "am";
        if (subjectType === '3ps') return isNegative ? "isn't" : "is";
        return isNegative ? "aren't" : "are";
    }
    if (tense === 'PP') { // Present Perfect
        if (subjectType === '3ps') return isNegative ? "hasn't" : "has";
        return isNegative ? "haven't" : "have";
    }
    if (tense === 'PaS') { // Past Simple
        // "did" is universal for all subjects in questions
        // "didn't" is universal for all subjects in negatives
        return isNegative ? "didn't" : "did";
    }
    if (tense === 'PaC') { // Past Continuous
        if (subjectType === 'I' || subjectType === '3ps') return isNegative ? "wasn't" : "was";
        return isNegative ? "weren't" : "were";
    }
    if (tense === 'FS') { // Future Simple — universal, no agreement
        return isNegative ? "won't" : "will";
    }
    if (tense === 'FC') { // Future Continuous
        return isNegative ? "won't be" : "will be";
    }
    if (tense === 'FP') { // Future Perfect
        return isNegative ? "won't have" : "will have";
    }
    if (tense === 'PaP') { // Past Perfect — universal
        return isNegative ? "hadn't" : "had";
    }
    if (tense === 'PPC') { // Present Perfect Continuous
        if (subjectType === '3ps') return isNegative ? "hasn't been" : "has been";
        return isNegative ? "haven't been" : "have been";
    }
    if (tense === 'PaPC') { // Past Perfect Continuous — universal
        return isNegative ? "hadn't been" : "had been";
    }
    if (tense === 'FPC') { // Future Perfect Continuous — universal
        return isNegative ? "won't have been" : "will have been";
    }
    return "";
}
