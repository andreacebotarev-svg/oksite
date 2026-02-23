/**
 * MIXED TRAINER — Strategy & Level Configuration
 * ================================================
 * ALL 12 ENGLISH TENSES — COMPLETE SYSTEM!
 *
 * ┌──────────┬──────────────┬──────────────┬──────────────┐
 * │          │   Simple     │  Continuous  │   Perfect    │  Perfect Cont.
 * ├──────────┼──────────────┼──────────────┼──────────────┤
 * │ Present  │ PS           │ PC           │ PP           │  PPC
 * │ Past     │ PaS          │ PaC          │ PaP          │  PaPC
 * │ Future   │ FS           │ FC           │ FP           │  FPC
 * └──────────┴──────────────┴──────────────┴──────────────┘
 *
 * Levels are PROGRESSIVE:
 *   1-3   → Present Tenses (PS, PC, PP)
 *   4-5   → Past Tenses (PaS, PaC)
 *   6-7   → Future Tenses (FS, FC, FP)
 *   8-9   → Advanced: Perfect + Perfect Continuous
 *   10    → Grand Mix (all 12 tenses!)
 *   hard  → Weighted toward negatives & questions
 *   exam  → 60 questions strict count
 */

/* ─── TENSE IDENTIFIERS ─── */
export const TENSES = {
    // Present (4)
    PS:   'present-simple',
    PC:   'present-continuous',
    PP:   'present-perfect',
    PPC:  'present-perfect-continuous',
    // Past (4)
    PaS:  'past-simple',
    PaC:  'past-continuous',
    PaP:  'past-perfect',
    PaPC: 'past-perfect-continuous',
    // Future (4)
    FS:   'future-simple',
    FC:   'future-continuous',
    FP:   'future-perfect',
    FPC:  'future-perfect-continuous',
};

/* ─── TASK TYPE IDENTIFIERS ─── */
export const TASK_TYPES = {
    GAP:        'gap',      // Вставь пропущенное слово
    CHOICE:     'choice',   // Выбери правильный вариант
    FIND_ERROR: 'error'     // Найди ошибку в предложении
};

/* ─── LEVEL DEFINITIONS ─── */
export const LEVELS = {

    // ══════════ GROUP 0: SOLO SIMPLE (Starter) ══════════
    'present-simple': {
        id: 'present-simple',
        title: 'Solo: Present Simple',
        description: 'Только Present Simple. Утверждения, отрицания и вопросы.',
        quota: { 'present-simple': 15 },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 1
    },
    'past-simple': {
        id: 'past-simple',
        title: 'Solo: Past Simple',
        description: 'Только Past Simple. V2 (ed) и Did.',
        quota: { 'past-simple': 15 },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 4
    },
    'future-simple': {
        id: 'future-simple',
        title: 'Solo: Future Simple',
        description: 'Только Future Simple. Will + V1.',
        quota: { 'future-simple': 15 },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 6
    },

    // ══════════ GROUP 1: PRESENT TENSES (Levels 1-3) ══════════

    1: {
        id: 1,
        title: 'Уровень 1: Основы Present',
        description: 'Только утверждения (+). Present Simple, Continuous, Perfect.',
        quota: { 'present-simple': 5, 'present-continuous': 5, 'present-perfect': 5 },
        allowedTypes: ['affirmative'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE],
        nextLevel: 2
    },

    2: {
        id: 2,
        title: 'Уровень 2: Present + Отрицания',
        description: 'Утверждения (+) и Отрицания (-). Добавляем "don\'t", "haven\'t" и др.',
        quota: { 'present-simple': 5, 'present-continuous': 5, 'present-perfect': 5 },
        allowedTypes: ['affirmative', 'negative'], // 50/50 mix handled by generator
        typeWeights: { 'affirmative': 0.6, 'negative': 0.4 },
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE],
        nextLevel: 3
    },

    3: {
        id: 3,
        title: 'Уровень 3: Мастер Present',
        description: 'Полный микс (+ / - / ?). Все типы Present, включая вопросы.',
        quota: { 'present-simple': 7, 'present-continuous': 7, 'present-perfect': 6 },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 4
    },

    // ══════════ GROUP 2: PAST TENSES (Levels 4-5) ══════════

    4: {
        id: 4,
        title: 'Уровень 4: Основы Past',
        description: 'Past Simple & Continuous. Только утверждения (+).',
        quota: { 'past-simple': 8, 'past-continuous': 7 },
        allowedTypes: ['affirmative'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE],
        nextLevel: 5
    },

    5: {
        id: 5,
        title: 'Уровень 5: Мастер Past',
        description: 'Past Simple, Continuous & Perfect. Все типы фраз (+ / - / ?).',
        quota: { 'past-simple': 6, 'past-continuous': 6, 'past-perfect': 6 }, // Added Past Perfect
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 6
    },

    // ══════════ GROUP 3: FUTURE TENSES (Levels 6-7) ══════════

    6: {
        id: 6,
        title: 'Уровень 6: Основы Future',
        description: 'Future Simple & Continuous. Только утверждения (+).',
        quota: { 'future-simple': 8, 'future-continuous': 7 },
        allowedTypes: ['affirmative'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE],
        nextLevel: 7
    },

    7: {
        id: 7,
        title: 'Уровень 7: Мастер Future',
        description: 'Future Simple, Continuous & Perfect. Полный микс (+ / - / ?).',
        quota: { 'future-simple': 6, 'future-continuous': 5, 'future-perfect': 5 }, // Added Future Perfect
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 8
    },

    // ══════════ GROUP 4: ADVANCED PERFECT (Levels 8-9) ══════════

    8: {
        id: 8,
        title: 'Уровень 8: Perfect Intro',
        description: 'Сложные времена: Present & Past Perfect Continuous. Только (+).',
        quota: { 'present-perfect-continuous': 8, 'past-perfect-continuous': 7 },
        allowedTypes: ['affirmative'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE],
        nextLevel: 9
    },

    9: {
        id: 9,
        title: 'Уровень 9: Perfect Master',
        description: 'Все Perfect и Perfect Continuous времена. Полный хардкор.',
        quota: { 
            'future-perfect-continuous': 4, 
            'past-perfect': 4, 
            'present-perfect-continuous': 4,
            'future-perfect': 4 
        },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 10
    },

    // ══════════ GROUP 5: CHALLENGE (Level 10 + Modes) ══════════

    10: {
        id: 10,
        title: 'Уровень 10: Grand Mix 🌀',
        description: 'Абсолютно все 12 времен в одном флаконе. Проверка на прочность.',
        quota: {
            // Present
            'present-simple': 2, 'present-continuous': 2, 'present-perfect': 2, 'present-perfect-continuous': 1,
            // Past
            'past-simple': 2, 'past-continuous': 2, 'past-perfect': 2, 'past-perfect-continuous': 1,
            // Future
            'future-simple': 2, 'future-continuous': 2, 'future-perfect': 2, 'future-perfect-continuous': 1
        },
        allowedTypes: ['affirmative', 'negative', 'question'],
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 'win'
    },

    // Special Modes
    'hard': {
        id: 'hard',
        title: '🔥 Hardcore Mode',
        description: 'Только сложные задачи. Найди ошибку и впиши пропущенное.',
        quota: {
            'past-perfect-continuous': 5,
            'future-perfect-continuous': 5,
            'future-perfect': 5,
            'present-perfect-continuous': 5
        },
        allowedTypes: ['negative', 'question'], // Harder types
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.FIND_ERROR], // No easy multiple choice
        nextLevel: 'win'
    },

    'exam': {
        id: 'exam',
        title: '🏆 Финальный Экзамен',
        description: '60 вопросов. Все времена. Строгий зачет по количеству ошибок.',
        mode: 'strict_count', // Special mode handling
        totalQuota: { 'affirmative': 20, 'negative': 20, 'question': 20 }, // 60 total
        // Weights for random generation inside the exam
        typeWeights: { 'affirmative': 0.33, 'negative': 0.33, 'question': 0.33 },
        allowedTasks: [TASK_TYPES.GAP, TASK_TYPES.CHOICE, TASK_TYPES.FIND_ERROR],
        nextLevel: 'win'
    }
};
