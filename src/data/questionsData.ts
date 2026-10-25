// AUTO-GENERATED NPTEL QUESTION BANK FOR NOC26 HS169
// Psychology of Stress, Health and Well-Being - IIT Guwahati
// Total verified questions: 96

export interface QuestionOption {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
  is_correct: boolean;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'numerical';

export interface Question {
  id: string;
  week: number;
  question_number: number;
  text: string;
  type: QuestionType;
  marks: number;
  negative_marks: number;
  options: QuestionOption[];
  correct_answers: string[]; // e.g. ['c']
  explanation: string;
  verified: boolean;
}

export interface WeekInfo {
  week: number;
  title: string;
  description: string;
  icon: string;
  questionCount: number;
}

export const WEEKS_METADATA: WeekInfo[] = [
  {
    week: 1,
    title: "Introduction to Stress & Appraisal Theory",
    description: "Lazarus & Folkman's interactional model, primary, secondary, and reappraisal, harm/loss vs threat appraisals, and biological stress responses like fight-or-flight and tend-and-befriend.",
    icon: "Brain",
    questionCount: 8
  },
  {
    week: 2,
    title: "Physiological Bases of Stress & Psychosomatics",
    description: "Biological mechanisms of stress, General Adaptation Syndrome (Selye), neuroendocrine pathways (HPA axis, autonomic nervous system), and psychosomatic disorders.",
    icon: "Activity",
    questionCount: 8
  },
  {
    week: 3,
    title: "Sources & Manifestations of Stress",
    description: "Daily hassles vs major life events, Holmes & Rahe Social Readjustment Rating Scale (SRRS), cataclysmic events, ambient stressors, and occupational stress.",
    icon: "AlertTriangle",
    questionCount: 8
  },
  {
    week: 4,
    title: "Coping Processes & Social Support",
    description: "Problem-focused versus emotion-focused coping mechanisms, approach vs avoidance strategies, cognitive appraisal in coping, and multidimensional social support.",
    icon: "ShieldCheck",
    questionCount: 8
  },
  {
    week: 5,
    title: "Personality, Hardiness & Resilience",
    description: "Type A and Type B behavior patterns, hostility, cardiovascular health, Suzanne Kobasa's psychological hardiness (Commitment, Control, Challenge), and locus of control.",
    icon: "UserCheck",
    questionCount: 8
  },
  {
    week: 6,
    title: "Interventions & Stress Management",
    description: "Evidence-based stress reduction, Jacobson's progressive muscle relaxation, biofeedback, autogenic training, cognitive reframing, and mindfulness interventions.",
    icon: "HeartHandshake",
    questionCount: 8
  },
  {
    week: 7,
    title: "Health, Well-Being & Positive Psychology",
    description: "Foundations of positive psychology, subjective well-being (Diener), hedonic versus eudaimonic happiness, and Seligman's multidimensional PERMA model.",
    icon: "Smile",
    questionCount: 8
  },
  {
    week: 8,
    title: "Hedonic Adaptation & Sustainable Happiness",
    description: "Hedonic treadmill, Wilson & Gilbert's AREA model, Sonja Lyubomirsky's 40% intentional activities model, and sustainable interventions.",
    icon: "TrendingUp",
    questionCount: 8
  },
  {
    week: 9,
    title: "Gratitude, Altruism & Social Comparison",
    description: "Psychological science of gratitude journaling, upward and downward social comparisons (Festinger), contrast vs assimilation effects, and prosocial kindness.",
    icon: "Heart",
    questionCount: 8
  },
  {
    week: 10,
    title: "Character Strengths & Flow Experience",
    description: "Peterson & Seligman's VIA Classification of Strengths and Virtues, head vs heart strengths, and Mihaly Csikszentmihalyi's flow state and autotelic experiences.",
    icon: "Sparkles",
    questionCount: 8
  },
  {
    week: 11,
    title: "Self-Actualization & Self-Determination",
    description: "Abraham Maslow's Being vs Deficiency needs, Carl Rogers' organismic valuing and conditions of worth, and Deci & Ryan's Self-Determination Theory (SDT).",
    icon: "Compass",
    questionCount: 8
  },
  {
    week: 12,
    title: "Meaning in Life & Logotherapy",
    description: "Viktor Frankl's logotherapy and existential psychology, coherence, purpose, and mattering, and the contrast between intrinsic versus extrinsic goal pursuits.",
    icon: "Award",
    questionCount: 8
  },
];

export const QUESTIONS_DATA: Question[] = [
  {
    "id": "w1_q1",
    "week": 1,
    "question_number": 1,
    "text": "What is the central idea of the interactional definition of stress proposed by Lazarus and Folkman?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Stress is a set of symptoms",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Stress is the physiological response to any demand",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Stress is a particular relationship between the person and the environment",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Stress is a subjective phenomenon based on individual perception",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Richard Lazarus and Susan Folkman formulated the transactional/interactional model, defining stress as a specific relationship between the person and the environment that is appraised as taxing or exceeding personal resources.",
    "verified": true
  },
  {
    "id": "w1_q2",
    "week": 1,
    "question_number": 2,
    "text": "What is reappraisal according to the appraisal model of stress?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "It is a judgment of a situation as positive or negative during secondary appraisal",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "It is an evaluation of personal resources in response to a stressful situation",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "It is an appraisal that follows an earlier appraisal in the same encounter and modifies it",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "It is the process of judging a particular event as irrelevant, relevant, or stressful during primary appraisal",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Reappraisal refers to a continuous cognitive process that modifies an earlier appraisal based on new information, feedback from coping efforts, or environmental changes.",
    "verified": true
  },
  {
    "id": "w1_q3",
    "week": 1,
    "question_number": 3,
    "text": "How can culture influence an individual's experience of stress?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "By determining daily hassles",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "By influencing the appraisal/perception of an event",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "By creating positive spillover effects",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "By causing stress contagion",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Cultural background shapes cognitive appraisal by prescribing values, norms, and behavioral expectations that dictate whether a specific stimulus is perceived as threatening, challenging, or neutral.",
    "verified": true
  },
  {
    "id": "w1_q4",
    "week": 1,
    "question_number": 4,
    "text": "How are harm loss appraisals different from threat appraisals according to Lazarus?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Harm loss appraisals are future-oriented, while threat appraisals are past-oriented",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Harm loss appraisals result from loss or damage, while threat appraisals are present- oriented",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Harm loss appraisals are past or present-oriented and result from appraisals of loss or damage, while threat appraisals are future-oriented",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Harm loss appraisals see the potential for gain or growth, while threat appraisals involve evaluation of personal resources",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Harm/loss appraisals focus on damage or loss that has already occurred (past or present-oriented), whereas threat appraisals anticipate potential harm or loss that may occur in the future.",
    "verified": true
  },
  {
    "id": "w1_q5",
    "week": 1,
    "question_number": 5,
    "text": "What does pressure to conform involve, according to the paragraph?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Expectations to perform tasks",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Life changes requiring readjustment",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Expectations to follow others' values and rules",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Pursuit of a goal being thwarted",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Secondary appraisal involves the cognitive evaluation of available coping options and personal resources (e.g., 'What can I do about this situation?').",
    "verified": true
  },
  {
    "id": "w1_q6",
    "week": 1,
    "question_number": 6,
    "text": "Which system is responsible for the quick reaction (within a minute) in response to acute stress?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Parasympathetic nervous system",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Hypothalamic pituitary adrenocortical (HPA) system",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Sympathetic adrenal medullary (SAM) system",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Limbic system",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Walter Cannon coined the term 'Fight-or-Flight' response, describing the evolutionary physiological preparation of the body via sympathetic nervous system activation to confront or flee danger.",
    "verified": true
  },
  {
    "id": "w1_q7",
    "week": 1,
    "question_number": 7,
    "text": "Which system leads to the secretion of corticosteroids such as cortisol in the stress response?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Parasympathetic Nervous System (PNS)",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Hypothalamic Pituitary Adrenocortical (HPA) system",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Central Nervous System (CNS)",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Enteric Nervous System (ENS)",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Challenge appraisals focus on the potential for personal gain, growth, mastery, and positive emotional experience, contrasting with threat appraisals.",
    "verified": true
  },
  {
    "id": "w1_q8",
    "week": 1,
    "question_number": 8,
    "text": "According to the \"Tend and Befriend\" pattern, how do females respond to stress?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Initiating the fight or flight response",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Showing aggressive behavior",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Engaging in nurturant activities and maintaining social networks",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Withdrawing from social interactions",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Shelley Taylor proposed the 'Tend-and-Befriend' model, illustrating that females under stress often release oxytocin, fostering nurturant care for offspring and seeking social support networks.",
    "verified": true
  },
  {
    "id": "w2_q1",
    "week": 2,
    "question_number": 1,
    "text": "What does the term \"psychosomatic diseases\" refer to?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Mental illnesses only",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Physical diseases caused by bacteria",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Physical diseases influenced by mental factors",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Genetic disorders",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Psychosomatic disorders are genuine physical conditions whose onset, severity, or course are significantly influenced, precipitated, or exacerbated by psychological factors and chronic stress.",
    "verified": true
  },
  {
    "id": "w2_q2",
    "week": 2,
    "question_number": 2,
    "text": "How does stress contribute to cardiovascular diseases?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "By promoting blood clotting",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "By decreasing blood pressure",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "By causing high levels of physiological arousal and promoting atherosclerosis",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "By reducing the build-up of fatty patches on arterial walls",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Hans Selye's General Adaptation Syndrome (GAS) delineates three successive physiological phases: Alarm Reaction, Resistance Stage, and Exhaustion Stage.",
    "verified": true
  },
  {
    "id": "w2_q3",
    "week": 2,
    "question_number": 3,
    "text": "How does Broken Heart Syndrome differ from a heart attack?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "It has milder symptoms",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "It is caused by blocked heart arteries",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "There's no evidence of blocked heart arteries in Broken Heart Syndrome",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "It is less common in women",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "During the Resistance stage of GAS, the body attempts to adapt and cope with the continuing stressor; overt arousal diminishes while endocrine defenses remain sustained.",
    "verified": true
  },
  {
    "id": "w2_q4",
    "week": 2,
    "question_number": 4,
    "text": "What did Friedman and Rosenman find in their longitudinal study regarding the likelihood of developing coronary heart disease (CHD) between Type A and Type B individuals?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Type B individuals were twice as likely to develop CHD",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "No significant difference between Type A and Type B individuals",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Type A Individuals were twice as likely to develop CHD",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Type A individuals were less likely to develop CHD",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "The parasympathetic division of the autonomic nervous system is responsible for 'rest and digest' activities, decelerating heart rate and promoting restorative physiological homeostasis.",
    "verified": true
  },
  {
    "id": "w2_q5",
    "week": 2,
    "question_number": 5,
    "text": "What interdisciplinary field of study explores the relationship between psychological factors, neurological factors, and the immune system?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Neurobiology",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Psychoneuroimmunology",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Psychopharmacology",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Immunology",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "The hypothalamic-pituitary-adrenal (HPA) axis triggers the secretion of cortisol, the primary glucocorticoid stress hormone that mobilizes glucose and modulates immune function.",
    "verified": true
  },
  {
    "id": "w2_q6",
    "week": 2,
    "question_number": 6,
    "text": "According to Dhabhar and McEwen\u2019s (1997, 2001) biphasic model, how does acute stress affect the immune response?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Suppresses the immune response",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Has no impact on the immune response",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Enhances the immune response by helping in the redistribution of immune cells in the body",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Causes exhaustion and weakens immune responses",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Prolonged elevation of cortisol due to chronic stress causes immunosuppression, reducing lymphocyte proliferation and antibody production.",
    "verified": true
  },
  {
    "id": "w2_q7",
    "week": 2,
    "question_number": 7,
    "text": "How does Acute Stress Disorder (ASD) differ from posttraumatic stress disorder (PTSD), according to Barnhill (2020)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "ASD has longer duration",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "ASD lasts less than a month, while PTSD persists longer",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Both have the same duration",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "ASD is more severe than PTSD",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Allostasis refers to the active physiological process by which the body maintains stability (homeostasis) through change, and allostatic load represents the wear-and-tear accumulated over time.",
    "verified": true
  },
  {
    "id": "w2_q8",
    "week": 2,
    "question_number": 8,
    "text": "What is mentioned as a potential cause of Complex PTSD (CPTSD)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Single traumatic events",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Repeated, prolonged, interpersonal trauma exposure",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Childhood accidents",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Natural disasters",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Cardiovascular diseases, peptic ulcers, and tension headaches are classic medical conditions strongly linked to chronic autonomic and neuroendocrine stress dysregulation.",
    "verified": true
  },
  {
    "id": "w3_q1",
    "week": 3,
    "question_number": 1,
    "text": "How is PTG related to coping in the context of trauma, according to Tedeschi and Calhoun (2004)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Coping is the direct result of PTG",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Coping is necessary but not sufficient to achieve psychological thriving or PTG",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Coping is unrelated to PTG",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "PTG and coping are interchangeable terms",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Daily hassles are the irritating, frustrating, or distressing everyday demands and minor occurrences that research shows are strongly predictive of psychological and physical health issues.",
    "verified": true
  },
  {
    "id": "w3_q2",
    "week": 3,
    "question_number": 2,
    "text": "How does PTG differ from resilience?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Resilience emphasizes stability in the context of trauma, while PTG involves returning to baseline functioning after the trauma",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Resilience involves profound and significant improvement after the trauma, while PTG focuses on returning to baseline functioning after the trauma",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Resilience is the ability to bounce back and go on with life after a hardship, while PTG involves improvement that is deeply profound and significant after the trauma",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Resilience and PTG are interchangeable terms, representing the same concept",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Holmes and Rahe developed the Social Readjustment Rating Scale (SRRS) to measure life stress by assigning Life Change Units (LCUs) to major positive and negative life events.",
    "verified": true
  },
  {
    "id": "w3_q3",
    "week": 3,
    "question_number": 3,
    "text": "According to the theoretical model of PTG by Tedeschi and Calhoun, how is the relationship between posttraumatic stress (PTS) and posttraumatic growth (PTG) characterized?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "PTS and PTG are opposite ends of a spectrum",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "PTS is unrelated to PTG",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "PTS and PTG are negatively correlated",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Some degree of PTS is a prerequisite for PTG",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Cataclysmic events are sudden, massive, and unexpected stressors (such as natural disasters or terrorist attacks) affecting whole communities simultaneously.",
    "verified": true
  },
  {
    "id": "w3_q4",
    "week": 3,
    "question_number": 4,
    "text": "External locus of control has been associated with \u2026\u2026\u2026\u2026 coping strategies",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Help seeking",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Avoidance",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Positive thinking",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "All of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Ambient stressors are chronic, negatively valued, and non-urgent environmental conditions (such as background noise, pollution, crowding, and extreme temperature).",
    "verified": true
  },
  {
    "id": "w3_q5",
    "week": 3,
    "question_number": 5,
    "text": "Which of the following is an example of internal, unstable and controllable factor?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Hard work",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Ability",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Luck",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Task characteristics",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Role ambiguity in occupational psychology occurs when an employee lacks clear information regarding job expectations, responsibilities, and evaluation criteria.",
    "verified": true
  },
  {
    "id": "w3_q6",
    "week": 3,
    "question_number": 6,
    "text": "In the research on hardiness conducted by Maddi and Kobasa, what differentiated the one-third of the sample that thrived from the two- thirds that suffered after the deregulation event?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Age differences",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Work experience",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Psychological hardiness",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Gender variations",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Role conflict arises when an individual faces incompatible demands from two or more concurrent roles (e.g., demanding workplace duties vs family obligations).",
    "verified": true
  },
  {
    "id": "w3_q7",
    "week": 3,
    "question_number": 7,
    "text": "How do individuals with high external locus of control (ELoC) tend to perceive outcomes in life?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "As a result of personal factors",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Influenced by factors such as luck and chance",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Predictable and within their control",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Internally determined",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "The Karasek Job Demand-Control model posits that the highest psychological strain and risk of illness occur when job demands are high and job control/decision latitude is low.",
    "verified": true
  },
  {
    "id": "w3_q8",
    "week": 3,
    "question_number": 8,
    "text": "According to Joseph and Linley's Organismic Valuing Theory, what is the main principle underlying the process of growth through adversity?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Behavioral conditioning",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Cognitive restructuring",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Inherent tendencies towards growth and actualization",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Psychoanalytic theory",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Burnout is a chronic workplace syndrome characterized by emotional exhaustion, depersonalization/cynicism, and a reduced sense of personal accomplishment.",
    "verified": true
  },
  {
    "id": "w4_q1",
    "week": 4,
    "question_number": 1,
    "text": "Which of the following is an example of emotion-focused coping?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Generating options to solve the problem",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Expression of negative emotion",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Implementing steps to solve the problem",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Obtaining advice or instrumental help",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Problem-focused coping aims directly at altering, managing, or eliminating the source of stress by gathering information, planning, and taking instrumental action.",
    "verified": true
  },
  {
    "id": "w4_q2",
    "week": 4,
    "question_number": 2,
    "text": "How do problem-focused coping and emotion-focused coping interact?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "They hinder each other's effectiveness",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Problem-focused coping enhances distress in a threatening situation",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "They tend to facilitate one another",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Problem-focused coping diminishes the effectiveness of emotion-focused coping",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Emotion-focused coping focuses on regulating and alleviating the emotional distress associated with the stressor (e.g., seeking emotional support, reappraisal, distraction).",
    "verified": true
  },
  {
    "id": "w4_q3",
    "week": 4,
    "question_number": 3,
    "text": "What personality traits are linked to the behavioral inhibition system, making individual more likely to use avoidance coping strategies?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Extraversion",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Openness",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Neuroticism",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Optimism",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Approach (or active) coping involves directly confronting the problem and taking purposeful steps to resolve it, whereas avoidance coping relies on denial or behavioral withdrawal.",
    "verified": true
  },
  {
    "id": "w4_q4",
    "week": 4,
    "question_number": 4,
    "text": "What is the concept of \"learned helplessness\" proposed by Martin Seligman (1967) related to?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Effective problem-solving in uncontrollable situations",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "The giving up/avoidance syndrome",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Approach coping in uncontrollable situations",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Perceived control in adaptive situations",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Instrumental (or tangible) social support provides concrete, practical assistance, goods, or services (such as financial help, transportation, or childcare).",
    "verified": true
  },
  {
    "id": "w4_q5",
    "week": 4,
    "question_number": 5,
    "text": "Which of the following is NOT mentioned as one of the properties of defense mechanisms by Vaillant (1992)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "They are unconscious mental processes",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "They are conscious and deliberate processes",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "They help manage instincts and affect",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "They are dynamic and reversible",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Emotional social support provides empathy, caring, love, trust, and validation of feelings from family, friends, or counselors.",
    "verified": true
  },
  {
    "id": "w4_q6",
    "week": 4,
    "question_number": 6,
    "text": "How does a person with a dominant SUPER-EGO manifest in terms of behavior, according to Freud's theory?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Highly impulsive",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Overly idealistic and moralistic",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Engages in criminal behavior",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Overly idealistic, moralistic, and judgmental",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Proactive coping involves anticipating potential stressors far in advance and taking preparatory steps to prevent them or buffer their negative impact.",
    "verified": true
  },
  {
    "id": "w4_q7",
    "week": 4,
    "question_number": 7,
    "text": "What is the key difference between repression and suppression?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Repression is conscious, while suppression is unconscious",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Both involve conscious removal of unpleasant thoughts",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Repression is unconscious, while suppression involves consciously removing unpleasant thoughts out of awareness",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Suppression is a more mature defense mechanism than repression",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Coping flexibility refers to an individual's ability to evaluate stressful situations accurately and adaptively deploy different coping strategies that match situational demands.",
    "verified": true
  },
  {
    "id": "w4_q8",
    "week": 4,
    "question_number": 8,
    "text": "How does the Coping Effectiveness Training (CET) framework advise dealing with changeable and unchangeable stressors?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Use only problem-focused coping for both types of stressors",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Use problem-focused coping for changeable stressors and emotion-focused coping for unchangeable stressors",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Use only emotion-focused coping for both types of stressors",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Avoid emotion focused coping strategies for unchangeable stressors",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "The buffering hypothesis of social support states that social resources protect individuals specifically during times of high stress by attenuating the adverse effects of stressors.",
    "verified": true
  },
  {
    "id": "w5_q1",
    "week": 5,
    "question_number": 1,
    "text": "How does changing the breathing pattern to slow and deep during anxiety or stress affect the autonomic nervous system?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Activates the sympathetic system",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Activates the parasympathetic system",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "No impact on the autonomic nervous system.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Type A behavior pattern, identified by cardiologists Friedman and Rosenman, is characterized by intense competitiveness, time urgency, impatience, and hostile aggressiveness.",
    "verified": true
  },
  {
    "id": "w5_q2",
    "week": 5,
    "question_number": 2,
    "text": "Progressive muscle relaxation involves............................... throughout the body.",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Relaxing muscle groups in ordered sequence.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Tensing muscle groups in ordered sequence.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Tensing and relaxing muscle groups in ordered sequence.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Tensing and relaxing muscle groups in random sequence.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Extensive meta-analytic research demonstrates that cynicism and hostility are the primary toxic components of the Type A pattern driving coronary heart disease.",
    "verified": true
  },
  {
    "id": "w5_q3",
    "week": 5,
    "question_number": 3,
    "text": "Catastrophic thinking is -------------------",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Conscious, deliberate, and flexible.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Rational, logical, and conscious.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Irrational, automatic, habitual, and unconscious.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Positive, adaptive, and conscious.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Suzanne Kobasa identified psychological hardiness as comprising the '3 Cs': Commitment (engagement), Control (internal belief in influence), and Challenge (viewing change as growth).",
    "verified": true
  },
  {
    "id": "w5_q4",
    "week": 5,
    "question_number": 4,
    "text": "Which of the following is NOT mentioned as a charateristic of catastrophic thinking?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Based on irrational assumptions.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Conscious and deliberate.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Automatic and habitual.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Unconscious.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Julian Rotter's internal locus of control represents the conviction that personal outcomes are governed by one's own efforts, choices, and competencies.",
    "verified": true
  },
  {
    "id": "w5_q5",
    "week": 5,
    "question_number": 5,
    "text": "According to Albert Ellis, how can emotions be changed?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "By suppressing emotions.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "By changing thinking patterns.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "By ignoring emotions.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "By embracing irrational beliefs.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Dispositional optimism, as measured by Scheier and Carver's LOT-R, is the generalized expectancy that good rather than bad things will happen in the future.",
    "verified": true
  },
  {
    "id": "w5_q6",
    "week": 5,
    "question_number": 6,
    "text": "Which one of the following is an example of tangible support?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Offering empathetic words.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Providing financial assistance.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Expressing understanding and affirmation.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Offering advice during difficult times.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Learned helplessness (Seligman) develops when repeated exposure to uncontrollable aversive events creates the expectation that future actions are futile.",
    "verified": true
  },
  {
    "id": "w5_q7",
    "week": 5,
    "question_number": 7,
    "text": "In the social convoy model, what does the inner circle represent?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "People with less importance in one's life.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "People who are not supportive.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "People who are very close and hard to imagine life without.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "People with whom one has infrequent contact.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Resilience in psychology refers to the dynamic capacity to bounce back, adapt successfully, and maintain positive functioning in the face of significant adversity.",
    "verified": true
  },
  {
    "id": "w5_q8",
    "week": 5,
    "question_number": 8,
    "text": "What are the three components of mindfulness proposed by Shapiro and colleagues?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Awareness, Focus, and Presence.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Intention, Attention, and Attitude.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Concentration, Observation, and Acceptance.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Meditation, Relaxation, and Reflection.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "High neuroticism (emotional instability) is consistently associated with greater vulnerability to stress, heightened negative affectivity, and maladaptive coping.",
    "verified": true
  },
  {
    "id": "w6_q1",
    "week": 6,
    "question_number": 1,
    "text": "What are the three components of subjective well-being (SWB)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Autonomy, positive relations with others, self-acceptance",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Life satisfaction, autonomy, personal growth",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Life satisfaction, the presence of positive mood, and the absence of negative mood.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Autonomy, environmental mastery, purpose in life",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Edmund Jacobson developed Progressive Muscle Relaxation (PMR), a systematic somatic technique involving alternating intentional tension and deep relaxation across major muscle groups.",
    "verified": true
  },
  {
    "id": "w6_q2",
    "week": 6,
    "question_number": 2,
    "text": "Which part of the brain is associated with pleasure-seeking or hedonia?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Hot systems (older subcortical part of the brain)",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Cold systems (newer, complex, cerebral part of the brain)",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Both hot and cold systems",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of the above.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Autogenic training, developed by Johannes Schultz, utilizes self-directed passive verbal suggestions of heaviness and warmth in limbs to achieve autonomic equilibrium.",
    "verified": true
  },
  {
    "id": "w6_q3",
    "week": 6,
    "question_number": 3,
    "text": "In Keyes\u2019 model, what is the state characterized by low levels of subjective well-being and low levels of psychological and social well-being?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Flourishing",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Moderate mental health",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Languishing",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Subjective well-being",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Biofeedback utilizes electronic monitoring instruments to provide real-time sensory feedback on autonomic physiological processes (such as heart rate variability, skin conductance, or EEG).",
    "verified": true
  },
  {
    "id": "w6_q4",
    "week": 6,
    "question_number": 4,
    "text": "What is another term for hedonic well-being?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Psychological well-being.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Subjective well-being.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Affective well-being.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Eudaimonic well-being.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Mindfulness-Based Stress Reduction (MBSR), established by Jon Kabat-Zinn, teaches non-judgmental present-moment awareness, body scans, and mindful breathing.",
    "verified": true
  },
  {
    "id": "w6_q5",
    "week": 6,
    "question_number": 5,
    "text": "Personal growth, autonomy, meaning in life are components of \u2026\u2026\u2026\u2026\u2026\u2026well-being",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Hedonic.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Eudaimonic.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Subjective.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Both hedonic and eudaimonic.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Cognitive restructuring in Cognitive Behavioral Therapy (CBT) identifies and modifies maladaptive automatic thoughts, cognitive distortions, and catastrophic interpretations.",
    "verified": true
  },
  {
    "id": "w6_q6",
    "week": 6,
    "question_number": 6,
    "text": "Which of the following statement is true for Martin Seligman\u2019s model of flourish (PERMA)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "It is a hedonic model of well-being.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "It is a eudaimonic model of well-being",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "It is a combination of both hedonic and eudaimonic model of well-being.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Albert Ellis's REBT utilizes the ABCDE framework (Activating event, Beliefs, Consequences, Disputing irrational beliefs, and Effective new philosophy).",
    "verified": true
  },
  {
    "id": "w6_q7",
    "week": 6,
    "question_number": 7,
    "text": "In Martin Seligman\u2019s PERMA model, what does \u201cEngagement\u201d refer to?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Pleasant emotions",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Social connections",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Full involvement in activities that uses skills to the fullest extent.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "A sense of accomplishment",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Diaphragmatic breathing stimulates the vagus nerve, initiating parasympathetic response, lowering heart rate, and decreasing physiological hyperarousal.",
    "verified": true
  },
  {
    "id": "w6_q8",
    "week": 6,
    "question_number": 8,
    "text": "What are the two defining aspects of resilience according?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Resistance and recovery.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Exposure to threat and positive adaptation.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Development process and adaptation.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Adversity and privilege.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Time management strategies such as prioritization (e.g., Eisenhower matrix) reduce stress by enhancing perceived control and diminishing frantic task-switching.",
    "verified": true
  },
  {
    "id": "w7_q1",
    "week": 7,
    "question_number": 1,
    "text": "Which among the following is not part of Ruut Veenhoven\u2019s qualities of life?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Livability of environment",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Life-ability of the person",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Utility of life",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Meaning in life",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Subjective Well-Being (SWB), formulated by Ed Diener, comprises three key facets: high life satisfaction (cognitive), frequent positive affect, and infrequent negative affect.",
    "verified": true
  },
  {
    "id": "w7_q2",
    "week": 7,
    "question_number": 2,
    "text": "What is affective forecasting?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Predictions about future events",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Predictions about emotional reactions to future events",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Predictions about physical reactions to future events",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Predictions about past events",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Hedonic well-being focuses on pleasure attainment and pain avoidance, whereas eudaimonic well-being focuses on meaning, self-realization, and living in accordance with one's true daimon.",
    "verified": true
  },
  {
    "id": "w7_q3",
    "week": 7,
    "question_number": 3,
    "text": "How does focalism contribute to the impact bias?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "By accurately predicting the influence of other events on thoughts and feelings",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "By underestimating the intensity and duration of emotional reactions",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "By overestimating how much we will think about the event in the future and underestimating the influence of other events on our thoughts and feelings",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "By avoiding making sense of novel and unexpected events",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Martin Seligman's PERMA model of flourishing represents Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment.",
    "verified": true
  },
  {
    "id": "w7_q4",
    "week": 7,
    "question_number": 4,
    "text": "What do empirical studies show regarding the relationship between subjective well-being and traditional objective well-being indicators?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Strong correlation",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Weak correlation",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "No correlation",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Negative correlation",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Barbara Fredrickson's Broaden-and-Build theory proposes that positive emotions broaden people's momentary thought-action repertoires and build enduring physical and psychological resources.",
    "verified": true
  },
  {
    "id": "w7_q5",
    "week": 7,
    "question_number": 5,
    "text": "What does Easterlin\u2019s Paradox state about the relationship between happiness and income over time?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Happiness increases linearly with increasing income",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Happiness varies directly with income at a point in time but does not increase over time when a country\u2019s income increase.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Happiness is unrelated to income.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Happiness decreases with increasing income.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "The 'undoing hypothesis' posits that positive emotions rapidly undo or neutralize the lingering cardiovascular aftereffects of negative emotions.",
    "verified": true
  },
  {
    "id": "w7_q6",
    "week": 7,
    "question_number": 6,
    "text": "How does social comparison theory explain the Easterlin\u2019s Paradox?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "A proportional increase in all incomes will increase average happiness.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "A proportional increase of all incomes in an economy or country would leave average happiness unaffected",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "A decrease in all incomes will increase average happiness.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "An increase in individual income will decrease average happiness",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Psychological well-being (Ryff) includes six dimensions: self-acceptance, personal growth, purpose in life, positive relations with others, environmental mastery, and autonomy.",
    "verified": true
  },
  {
    "id": "w7_q7",
    "week": 7,
    "question_number": 7,
    "text": "According to Barbara Fredrickson's 'broaden-and-build' theory, what is the function of positive emotions?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Positive emotions narrow our attention and thinking",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Positive emotions broaden our thought\u2013action repertoires",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Positive emotions induce negative emotions simultaneously",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Negative emotions enhance resilience",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "High emotional intelligence (Salovey & Mayer / Goleman) enhances stress resilience through accurate perception, appraisal, understanding, and regulation of emotions.",
    "verified": true
  },
  {
    "id": "w7_q8",
    "week": 7,
    "question_number": 8,
    "text": "According to Fredrickson and Lasoda (2005), what is the significance of having a positivity ratio of 3:1 or above?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "It has no impact on psychological well-being.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "It stimulates a downward spiral of negativity.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "It is more likely to stimulate an upward spiral of positivity and lead to flourishing and well-being",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "It is irrelevant to happiness intervention strategies.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Social capital and positive interpersonal relationships constitute the single strongest and most consistent empirical predictor of human happiness across cross-cultural studies.",
    "verified": true
  },
  {
    "id": "w8_q1",
    "week": 8,
    "question_number": 1,
    "text": "What is the term for the psychological process where people become accustomed to a stimulus and its emotional effects are reduced over time?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Hedonic adaptation",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Emotional stagnation",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Baseline leveling",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Stimulus habituation",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Hedonic adaptation is the psychological process where individuals become accustomed to a positive or negative emotional stimulus, causing emotional intensity to return to a baseline set point.",
    "verified": true
  },
  {
    "id": "w8_q2",
    "week": 8,
    "question_number": 2,
    "text": "According to the AREA Model, what does the explaining step determine in the process of hedonic adaptation?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Rate of attention",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Rate of adaptation",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Emotional intensity",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Reacting process",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "In Wilson and Gilbert's AREA model of affective adaptation, the Explaining stage determines the rate of adaptation: once an event is comprehended and explained, emotional reactions attenuate rapidly.",
    "verified": true
  },
  {
    "id": "w8_q3",
    "week": 8,
    "question_number": 3,
    "text": "In the study by Lucas and colleagues, which negative life events showed the most pronounced lack of hedonic adaptation?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Divorce",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Marriage",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Severe disability",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Unemployment",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "In the landmark longitudinal study by Lucas and colleagues, severe permanent disability showed the most persistent and incomplete hedonic adaptation, leaving well-being below pre-event baseline.",
    "verified": true
  },
  {
    "id": "w8_q4",
    "week": 8,
    "question_number": 4,
    "text": "Which among the following personality traits is negatively related to happiness?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Neuroticism",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Openness",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Extroversion",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Agreeableness",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Neuroticism exhibits a robust, negative correlation with subjective happiness, driving hyper-vigilance toward threat and chronic negative affectivity.",
    "verified": true
  },
  {
    "id": "w8_q5",
    "week": 8,
    "question_number": 5,
    "text": "According to Lyubomirsky, how does hedonic adaptation differ between positive and negative experiences?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Negative experiences lead to faster and complete adaptation",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Positive experiences lead to faster and complete adaptation.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Positive and negative experiences show similar adaptation patterns.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "There is no consistency in adaptation between positive and negative experiences.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Sonja Lyubomirsky found that people adapt much more rapidly and completely to positive life changes (such as pay raises or marriage) than to negative life events.",
    "verified": true
  },
  {
    "id": "w8_q6",
    "week": 8,
    "question_number": 6,
    "text": "According to research, what percentage of variance in happiness levels do all circumstances combined account for?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "20% to 25%.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Only 8% to 15%",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "30% to 40%.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "50% to 60%",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Research syntheses indicate that all objective life circumstances combined (income, marital status, health, physical attractiveness) account for only approximately 10% (8% to 15%) of variance in happiness.",
    "verified": true
  },
  {
    "id": "w8_q7",
    "week": 8,
    "question_number": 7,
    "text": "What are the three types of intentional activities described by Lyubomirsky et al. (2005)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Behavioural, genetic, and volitional",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Circumstantial, cognitive, and behavioural",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Behavioural, cognitive, and volitional",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Genetic, cognitive, and volitional",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Lyubomirsky, Sheldon, and Schkade identify intentional activities into three distinct categories: behavioural (e.g. exercise), cognitive (e.g. reframing), and volitional (e.g. pursuing meaningful goals).",
    "verified": true
  },
  {
    "id": "w8_q8",
    "week": 8,
    "question_number": 8,
    "text": "What is the basic idea of the Sustainable Happiness Model, according to Sheldon and Lyubomirsky (2019)?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Genetics and life circumstances entirely determine happiness.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Happiness is solely dependent on life circumstances.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "People can influence their own happiness by their intentional activities",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Volitional activities have no impact on happiness.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "The Sustainable Happiness Model posits that despite genetic set points and circumstances, individuals can exert substantial, enduring influence over their happiness through deliberate intentional activities.",
    "verified": true
  },
  {
    "id": "w9_q1",
    "week": 9,
    "question_number": 1,
    "text": "In the context of gratitude, which of the following is NOT correct-",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Gratitude facilitates coping with stress",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Gratitude increases upward social comparison",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Gratitude improves self-esteem",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Gratitude enhances accessibility to positive memories",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Gratitude facilitates positive emotions and cognitive coping, while reducing unhealthy upward social comparisons and envy; thus claiming it increases upward social comparison is incorrect.",
    "verified": true
  },
  {
    "id": "w9_q2",
    "week": 9,
    "question_number": 2,
    "text": "Keeping a gratitude journal means---------------------",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Writing things for which one is grateful.",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Expressing gratitude to a person face-to-face",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Expressing gratitude to a person by writing letters",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "All of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "A gratitude journal involves intentionally and systematically writing down things, events, or relationships for which one is personally thankful on a regular basis.",
    "verified": true
  },
  {
    "id": "w9_q3",
    "week": 9,
    "question_number": 3,
    "text": "Which of the following personality traits is incompatible with gratitude",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Extrovert",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Introvert",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Neuroticism",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Narcissism",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Narcissism is fundamentally incompatible with gratitude because narcissistic entitlement fosters the belief that one inherently deserves all benefits without needing to acknowledge others.",
    "verified": true
  },
  {
    "id": "w9_q4",
    "week": 9,
    "question_number": 4,
    "text": "Kindness satisfies the basic human need for\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026.",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Relatedness",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Autonomy",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Competence",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Kindness directly fulfills the basic psychological need for Relatedness by cultivating meaningful social bonds, connection, and mutual belonging.",
    "verified": true
  },
  {
    "id": "w9_q5",
    "week": 9,
    "question_number": 5,
    "text": "In the context of reciprocal altruism, when is kindness most likely to be demonstrated?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "In isolated situations",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "In one-time encounters.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "When individuals expect not to meet again.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "When individuals expect to meet again.",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Under Trivers' theory of reciprocal altruism, altruistic and kind acts are most likely to be extended when individuals anticipate future interactions and opportunities for mutual reciprocity.",
    "verified": true
  },
  {
    "id": "w9_q6",
    "week": 9,
    "question_number": 6,
    "text": "What is essential for acts of kindness to bring maximum improvement in well- being?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Regular and planned acts of kindness",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Acts of kindness done out of obligation",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Freely and autonomously done acts of kindness.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Forced acts of kindness",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Research by Deci, Ryan, and Lyubomirsky shows that acts of kindness foster well-being most effectively when they are performed autonomously and freely rather than out of guilt or external compulsion.",
    "verified": true
  },
  {
    "id": "w9_q7",
    "week": 9,
    "question_number": 7,
    "text": "In the context of downward comparison, what does assimilation result in?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Negative self-evaluation",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Positive self-evaluation",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "No change in self-evaluation",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Avoidance of self-evaluation",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "In social comparison theory (Festinger / Buunk), downward comparison with assimilation occurs when an observer identifies with a less fortunate target, leading to negative self-evaluation ('I might become like them').",
    "verified": true
  },
  {
    "id": "w9_q8",
    "week": 9,
    "question_number": 8,
    "text": "According to diverse research studies, what is the typical result of social comparison on social networking sites in terms of subjective well-being (SWB) or happiness?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Consistent increase in SWB or happiness.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Typically results in decreases in SWB or happiness.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "No impact on SWB or happiness.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Social comparison on SNSs always increases happiness.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Numerous empirical studies show that passive social networking site consumption fosters chronic upward social comparison, leading to decreased subjective well-being and life satisfaction.",
    "verified": true
  },
  {
    "id": "w10_q1",
    "week": 10,
    "question_number": 1,
    "text": "According to Peterson & Seligman (2004), what inspired the development of the VIA Classification?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Strength Finder",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Gallup\u2019s Strengths",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "DSM",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Weaknesses Classification",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Peterson and Seligman developed the VIA (Values in Action) Classification of Strengths and Virtues explicitly as a positive psychological counterpart to the DSM (Diagnostic and Statistical Manual).",
    "verified": true
  },
  {
    "id": "w10_q2",
    "week": 10,
    "question_number": 2,
    "text": "According to the VIA Classification, which virtue includes strengths that connect us to the larger universe?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Justice",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Humanity",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Courage",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Transcendence",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "In the VIA Classification, the virtue of Transcendence encompasses character strengths (appreciation of beauty, gratitude, hope, humor, and spirituality) that forge connections to the larger universe.",
    "verified": true
  },
  {
    "id": "w10_q3",
    "week": 10,
    "question_number": 3,
    "text": "According to the VIA Classification, what is a component of the virtue of Humanity that involves being aware of the motives and feelings of self and others?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Love",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Social Intelligence",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Kindness",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Leadership",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Under the VIA Classification, the virtue of Humanity contains interpersonal strengths including Love, Kindness, and Social Intelligence (awareness of own and others' motives and feelings).",
    "verified": true
  },
  {
    "id": "w10_q4",
    "week": 10,
    "question_number": 4,
    "text": "What does research indicate about the strengths of the heart compared to the strengths of the head?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Strengths of the head are more individualistic",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Strengths of the heart are more strongly related to well-being",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Strengths of the head are more strongly related to life satisfaction",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Both strengths are equally related to well-being",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Research across diverse cohorts demonstrates that 'strengths of the heart' (love, gratitude, zest, hope) are more strongly correlated with life satisfaction and subjective well-being than 'strengths of the head' (e.g., love of learning).",
    "verified": true
  },
  {
    "id": "w10_q5",
    "week": 10,
    "question_number": 5,
    "text": "According to Clifton and Anderson (2002), how do talents differ from skills and knowledge?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Talents are acquired, while skills and knowledge are naturally occurring",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Talents exist naturally within each of us, while skills and knowledge need to be acquired.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Talents are more important than skills and knowledge.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Talents are the combination of skills and knowledge.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Clifton and Anderson emphasize that talents are naturally recurring patterns of thought, feeling, or behavior, whereas skills and knowledge are learned capacities that must be intentionally acquired.",
    "verified": true
  },
  {
    "id": "w10_q6",
    "week": 10,
    "question_number": 6,
    "text": "Under what conditions does the state of flow happen?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "When tasks are easy and skills exceed challenges",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "When tasks are challenging and skills are irrelevant",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "When a task is high on challenge and skill levels.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "When tasks are irrelevant and no skills are required",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Mihaly Csikszentmihalyi's flow state occurs specifically when an individual confronts an activity where perceived challenges are high and commensurate personal skills are equally high.",
    "verified": true
  },
  {
    "id": "w10_q7",
    "week": 10,
    "question_number": 7,
    "text": "What term is used to describe activities that can facilitate a flow experience",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Autonomous",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Autotelic",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Automate",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Autonomic",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Autotelic activities (from Greek 'autos' meaning self and 'telos' meaning goal) are intrinsically rewarding activities pursued for their own sake rather than for an external incentive.",
    "verified": true
  },
  {
    "id": "w10_q8",
    "week": 10,
    "question_number": 8,
    "text": "What type of activities are less likely to be associated with flow experience?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Sports and dancing.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Creative arts and hobbies.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Housework and watching TV.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Socializing and studying.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Passive, low-engagement activities such as doing housework and watching television rarely generate flow experiences due to their low challenge and minimal skill deployment.",
    "verified": true
  },
  {
    "id": "w11_q1",
    "week": 11,
    "question_number": 1,
    "text": "According to Maslow, what kind of need is self-actualization?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Social need",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Safety need",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Being need",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Deficiency need",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "In Abraham Maslow's hierarchy of needs, self-actualization represents a 'Being need' (B-need or growth need), distinguished from lower 'Deficiency needs' (D-needs).",
    "verified": true
  },
  {
    "id": "w11_q2",
    "week": 11,
    "question_number": 2,
    "text": "According to Maslow, which of the following is an obstacle in achieving self-actualization?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Lack of desire",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Stuck in fulfilling lower needs",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Societal conditions of worth",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Maslow emphasized that people frequently fail to achieve self-actualization because they remain preoccupied with and stuck in fulfilling lower deficiency needs (physiological, safety, and belonging).",
    "verified": true
  },
  {
    "id": "w11_q3",
    "week": 11,
    "question_number": 3,
    "text": "According to Carl Rogers, which of the following is an obstacle to achieving our \u2018real self\u2019?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Lack of desire",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Stuck in fulfilling lower needs",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Societal conditions of worth",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Carl Rogers explained that societal 'conditions of worth' (conditional positive regard from parents/society) cause individuals to abandon their authentic organismic valuing process and real self.",
    "verified": true
  },
  {
    "id": "w11_q4",
    "week": 11,
    "question_number": 4,
    "text": "According to Carl Rogers, inconsistency between our real self and ideal self creates......................",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Psychosis",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Neurosis",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Organismic valuing",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of these",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "In person-centered theory, a significant incongruence or discrepancy between the perceived 'real self' and the societal/ideal self generates anxiety, defenses, and neurosis.",
    "verified": true
  },
  {
    "id": "w11_q5",
    "week": 11,
    "question_number": 5,
    "text": "Which of the following theories explains human motivation based on the basic psychological need fulfillment?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Organismic valuing theory",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Functional descriptive model",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "PERMA model.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Self-determination theory.",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Deci and Ryan's Self-Determination Theory (SDT) explains human motivation and flourishing through the fulfillment of three basic psychological needs: Autonomy, Competence, and Relatedness.",
    "verified": true
  },
  {
    "id": "w11_q6",
    "week": 11,
    "question_number": 6,
    "text": "A student generally completes school work independently, but only because of its value in gaining admission to college. This is an example of.............type of extrinsic motivation.",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "External regulation",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Introjection",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Identification.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Integration",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Under SDT's organismic integration theory, completing schoolwork because one consciously identifies with its personal utility for college admission represents 'Identification' extrinsic motivation.",
    "verified": true
  },
  {
    "id": "w11_q7",
    "week": 11,
    "question_number": 7,
    "text": "Which of the following can promote internalized forms of extrinsic motivation?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Increased external pressure",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Inflexible guidelines and regulations",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Satisfaction of basic psychological needs",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Strict punishment for non-compliance",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Internalized extrinsic motivation is fostered when an environment supports and satisfies the individual's basic psychological needs for autonomy, competence, and relatedness.",
    "verified": true
  },
  {
    "id": "w11_q8",
    "week": 11,
    "question_number": 8,
    "text": "Which of the following are internalized forms of extrinsic motivation?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Amotivation and Introjection.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Identification and integration.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "External regulation and controlled motivation.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "None of these.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "On the SDT continuum of motivation, Identification and Integration represent the most autonomous, internalized forms of extrinsic motivation.",
    "verified": true
  },
  {
    "id": "w12_q1",
    "week": 12,
    "question_number": 1,
    "text": "Which of the following is a motivational component of meaning in life?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Coherence",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Purpose",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Significance",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Mattering",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Psychologists break meaning in life into three distinct components: Coherence/Comprehension (cognitive), Purpose (motivational/directional), and Significance/Mattering (evaluative).",
    "verified": true
  },
  {
    "id": "w12_q2",
    "week": 12,
    "question_number": 2,
    "text": "\u2018Life has meaning under all circumstances, even the most miserable ones'. This statement is associated with...........................",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Cognitive therapy",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Mindfulness-based therapy",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Behavioral therapy",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Logotherapy",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "Viktor Frankl founded Logotherapy (existential psychotherapy), anchored on the conviction that life possesses unconditional meaning under all circumstances, even in profound suffering.",
    "verified": true
  },
  {
    "id": "w12_q3",
    "week": 12,
    "question_number": 3,
    "text": "How is significance or mattering defined in the context of meaning in life?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "A value-laden evaluation of daily activities",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Worthwhileness and value of one\u2019s life",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "A measure of achievements and success",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "A focus on personal desires and wishes",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Significance or mattering reflects the existential judgment that one's life has inherent worth, value, and makes a meaningful difference in the world.",
    "verified": true
  },
  {
    "id": "w12_q4",
    "week": 12,
    "question_number": 4,
    "text": "How do the dimensions of comprehension, purpose, and mattering influence each other?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "They have no mutual influence.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "A high level in one dimension leads to low levels in others.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Low levels in one may lead to low levels in others, and vice versa",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "They have unpredictable relationships.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Empirical research demonstrates reciprocal synergy among dimensions of meaning: deficits in comprehension or purpose undermine mattering, and vice-versa.",
    "verified": true
  },
  {
    "id": "w12_q5",
    "week": 12,
    "question_number": 5,
    "text": "What did Frankl believe is the last of human freedoms, even in the most challenging circumstances?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Freedom to pursue material success",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Freedom to avoid suffering",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Freedom to achieve external goals.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Freedom to choose one's attitude in any given circumstance.",
        "is_correct": true
      }
    ],
    "correct_answers": [
      "d"
    ],
    "explanation": "In 'Man's Search for Meaning', Viktor Frankl wrote that 'everything can be taken from a man but one thing: the last of the human freedoms\u2014to choose one's attitude in any given set of circumstances.'",
    "verified": true
  },
  {
    "id": "w12_q6",
    "week": 12,
    "question_number": 6,
    "text": "What is one way Frankl suggested individuals can discover meaning in life?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Creating a work or doing a deed",
        "is_correct": true
      },
      {
        "id": "b",
        "text": "Avoiding all forms of suffering",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Pursuing external achievements only.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Experiencing natural beauty without any action",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "a"
    ],
    "explanation": "Frankl proposed three fundamental avenues to discover meaning: (1) creating a work or doing a deed, (2) experiencing something or encountering someone (love, beauty), and (3) the attitude one takes toward unavoidable suffering.",
    "verified": true
  },
  {
    "id": "w12_q7",
    "week": 12,
    "question_number": 7,
    "text": "Why might satisfaction from extrinsic goals not last?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Extrinsic goals are inherently unsatisfying.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "People quickly adapt to extrinsic goals.",
        "is_correct": true
      },
      {
        "id": "c",
        "text": "Satisfaction from extrinsic goals is dependent on external factors.",
        "is_correct": false
      },
      {
        "id": "d",
        "text": "Extrinsic goals are not valued by one's culture.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "b"
    ],
    "explanation": "Extrinsic goals (wealth, status, physical appeal) yield fleeting satisfaction because humans rapidly adapt to external milestones and continually compare themselves to higher benchmarks.",
    "verified": true
  },
  {
    "id": "w12_q8",
    "week": 12,
    "question_number": 8,
    "text": "How do intrinsic goals differ from extrinsic goals in terms of their relationship to cultural beliefs and norms?",
    "type": "single_choice",
    "marks": 1,
    "negative_marks": 0,
    "options": [
      {
        "id": "a",
        "text": "Both intrinsic and extrinsic goals are strongly shaped by cultural beliefs and norms.",
        "is_correct": false
      },
      {
        "id": "b",
        "text": "Intrinsic goals are more influenced by cultural beliefs, while extrinsic goals are less influenced by cultural beliefs and norms.",
        "is_correct": false
      },
      {
        "id": "c",
        "text": "Extrinsic goals are strongly shaped by cultural beliefs and norms, while intrinsic goals emerge from natural growth tendencies.",
        "is_correct": true
      },
      {
        "id": "d",
        "text": "Cultural beliefs have no impact on the content of either intrinsic or extrinsic goals.",
        "is_correct": false
      }
    ],
    "correct_answers": [
      "c"
    ],
    "explanation": "Extrinsic goals are heavily conditioned by external social pressures and cultural norms, whereas intrinsic goals (growth, relationships, community contribution) emerge from innate human growth tendencies.",
    "verified": true
  }
];
