import json
import os

with open('extracted_raw.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Week topics and metadata
week_metadata = {
    1: {
        "title": "Introduction to Stress & Appraisal Theory",
        "description": "Lazarus & Folkman's interactional model, primary, secondary, and reappraisal, harm/loss vs threat appraisals, and biological stress responses like fight-or-flight and tend-and-befriend.",
        "icon": "Brain"
    },
    2: {
        "title": "Physiological Bases of Stress & Psychosomatics",
        "description": "Biological mechanisms of stress, General Adaptation Syndrome (Selye), neuroendocrine pathways (HPA axis, autonomic nervous system), and psychosomatic disorders.",
        "icon": "Activity"
    },
    3: {
        "title": "Sources & Manifestations of Stress",
        "description": "Daily hassles vs major life events, Holmes & Rahe Social Readjustment Rating Scale (SRRS), cataclysmic events, ambient stressors, and occupational stress.",
        "icon": "AlertTriangle"
    },
    4: {
        "title": "Coping Processes & Social Support",
        "description": "Problem-focused versus emotion-focused coping mechanisms, approach vs avoidance strategies, cognitive appraisal in coping, and multidimensional social support.",
        "icon": "ShieldCheck"
    },
    5: {
        "title": "Personality, Hardiness & Resilience",
        "description": "Type A and Type B behavior patterns, hostility, cardiovascular health, Suzanne Kobasa's psychological hardiness (Commitment, Control, Challenge), and locus of control.",
        "icon": "UserCheck"
    },
    6: {
        "title": "Interventions & Stress Management",
        "description": "Evidence-based stress reduction, Jacobson's progressive muscle relaxation, biofeedback, autogenic training, cognitive reframing, and mindfulness interventions.",
        "icon": "HeartHandshake"
    },
    7: {
        "title": "Health, Well-Being & Positive Psychology",
        "description": "Foundations of positive psychology, subjective well-being (Diener), hedonic versus eudaimonic happiness, and Seligman's multidimensional PERMA model.",
        "icon": "Smile"
    },
    8: {
        "title": "Hedonic Adaptation & Sustainable Happiness",
        "description": "Hedonic treadmill, Wilson & Gilbert's AREA model, Sonja Lyubomirsky's 40% intentional activities model, and sustainable interventions.",
        "icon": "TrendingUp"
    },
    9: {
        "title": "Gratitude, Altruism & Social Comparison",
        "description": "Psychological science of gratitude journaling, upward and downward social comparisons (Festinger), contrast vs assimilation effects, and prosocial kindness.",
        "icon": "Heart"
    },
    10: {
        "title": "Character Strengths & Flow Experience",
        "description": "Peterson & Seligman's VIA Classification of Strengths and Virtues, head vs heart strengths, and Mihaly Csikszentmihalyi's flow state and autotelic experiences.",
        "icon": "Sparkles"
    },
    11: {
        "title": "Self-Actualization & Self-Determination",
        "description": "Abraham Maslow's Being vs Deficiency needs, Carl Rogers' organismic valuing and conditions of worth, and Deci & Ryan's Self-Determination Theory (SDT).",
        "icon": "Compass"
    },
    12: {
        "title": "Meaning in Life & Logotherapy",
        "description": "Viktor Frankl's logotherapy and existential psychology, coherence, purpose, and mattering, and the contrast between intrinsic versus extrinsic goal pursuits.",
        "icon": "Award"
    }
}

# Rich pedagogical explanations for each question
# We map question ID -> explanation
explanations = {
    # Week 1
    "w1_q1": "Richard Lazarus and Susan Folkman formulated the transactional/interactional model, defining stress as a specific relationship between the person and the environment that is appraised as taxing or exceeding personal resources.",
    "w1_q2": "Reappraisal refers to a continuous cognitive process that modifies an earlier appraisal based on new information, feedback from coping efforts, or environmental changes.",
    "w1_q3": "Cultural background shapes cognitive appraisal by prescribing values, norms, and behavioral expectations that dictate whether a specific stimulus is perceived as threatening, challenging, or neutral.",
    "w1_q4": "Harm/loss appraisals focus on damage or loss that has already occurred (past or present-oriented), whereas threat appraisals anticipate potential harm or loss that may occur in the future.",
    "w1_q5": "Secondary appraisal involves the cognitive evaluation of available coping options and personal resources (e.g., 'What can I do about this situation?').",
    "w1_q6": "Walter Cannon coined the term 'Fight-or-Flight' response, describing the evolutionary physiological preparation of the body via sympathetic nervous system activation to confront or flee danger.",
    "w1_q7": "Challenge appraisals focus on the potential for personal gain, growth, mastery, and positive emotional experience, contrasting with threat appraisals.",
    "w1_q8": "Shelley Taylor proposed the 'Tend-and-Befriend' model, illustrating that females under stress often release oxytocin, fostering nurturant care for offspring and seeking social support networks.",

    # Week 2
    "w2_q1": "Psychosomatic disorders are genuine physical conditions whose onset, severity, or course are significantly influenced, precipitated, or exacerbated by psychological factors and chronic stress.",
    "w2_q2": "Hans Selye's General Adaptation Syndrome (GAS) delineates three successive physiological phases: Alarm Reaction, Resistance Stage, and Exhaustion Stage.",
    "w2_q3": "During the Resistance stage of GAS, the body attempts to adapt and cope with the continuing stressor; overt arousal diminishes while endocrine defenses remain sustained.",
    "w2_q4": "The parasympathetic division of the autonomic nervous system is responsible for 'rest and digest' activities, decelerating heart rate and promoting restorative physiological homeostasis.",
    "w2_q5": "The hypothalamic-pituitary-adrenal (HPA) axis triggers the secretion of cortisol, the primary glucocorticoid stress hormone that mobilizes glucose and modulates immune function.",
    "w2_q6": "Prolonged elevation of cortisol due to chronic stress causes immunosuppression, reducing lymphocyte proliferation and antibody production.",
    "w2_q7": "Allostasis refers to the active physiological process by which the body maintains stability (homeostasis) through change, and allostatic load represents the wear-and-tear accumulated over time.",
    "w2_q8": "Cardiovascular diseases, peptic ulcers, and tension headaches are classic medical conditions strongly linked to chronic autonomic and neuroendocrine stress dysregulation.",

    # Week 3
    "w3_q1": "Daily hassles are the irritating, frustrating, or distressing everyday demands and minor occurrences that research shows are strongly predictive of psychological and physical health issues.",
    "w3_q2": "Holmes and Rahe developed the Social Readjustment Rating Scale (SRRS) to measure life stress by assigning Life Change Units (LCUs) to major positive and negative life events.",
    "w3_q3": "Cataclysmic events are sudden, massive, and unexpected stressors (such as natural disasters or terrorist attacks) affecting whole communities simultaneously.",
    "w3_q4": "Ambient stressors are chronic, negatively valued, and non-urgent environmental conditions (such as background noise, pollution, crowding, and extreme temperature).",
    "w3_q5": "Role ambiguity in occupational psychology occurs when an employee lacks clear information regarding job expectations, responsibilities, and evaluation criteria.",
    "w3_q6": "Role conflict arises when an individual faces incompatible demands from two or more concurrent roles (e.g., demanding workplace duties vs family obligations).",
    "w3_q7": "The Karasek Job Demand-Control model posits that the highest psychological strain and risk of illness occur when job demands are high and job control/decision latitude is low.",
    "w3_q8": "Burnout is a chronic workplace syndrome characterized by emotional exhaustion, depersonalization/cynicism, and a reduced sense of personal accomplishment.",

    # Week 4
    "w4_q1": "Problem-focused coping aims directly at altering, managing, or eliminating the source of stress by gathering information, planning, and taking instrumental action.",
    "w4_q2": "Emotion-focused coping focuses on regulating and alleviating the emotional distress associated with the stressor (e.g., seeking emotional support, reappraisal, distraction).",
    "w4_q3": "Approach (or active) coping involves directly confronting the problem and taking purposeful steps to resolve it, whereas avoidance coping relies on denial or behavioral withdrawal.",
    "w4_q4": "Instrumental (or tangible) social support provides concrete, practical assistance, goods, or services (such as financial help, transportation, or childcare).",
    "w4_q5": "Emotional social support provides empathy, caring, love, trust, and validation of feelings from family, friends, or counselors.",
    "w4_q6": "Proactive coping involves anticipating potential stressors far in advance and taking preparatory steps to prevent them or buffer their negative impact.",
    "w4_q7": "Coping flexibility refers to an individual's ability to evaluate stressful situations accurately and adaptively deploy different coping strategies that match situational demands.",
    "w4_q8": "The buffering hypothesis of social support states that social resources protect individuals specifically during times of high stress by attenuating the adverse effects of stressors.",

    # Week 5
    "w5_q1": "Type A behavior pattern, identified by cardiologists Friedman and Rosenman, is characterized by intense competitiveness, time urgency, impatience, and hostile aggressiveness.",
    "w5_q2": "Extensive meta-analytic research demonstrates that cynicism and hostility are the primary toxic components of the Type A pattern driving coronary heart disease.",
    "w5_q3": "Suzanne Kobasa identified psychological hardiness as comprising the '3 Cs': Commitment (engagement), Control (internal belief in influence), and Challenge (viewing change as growth).",
    "w5_q4": "Julian Rotter's internal locus of control represents the conviction that personal outcomes are governed by one's own efforts, choices, and competencies.",
    "w5_q5": "Dispositional optimism, as measured by Scheier and Carver's LOT-R, is the generalized expectancy that good rather than bad things will happen in the future.",
    "w5_q6": "Learned helplessness (Seligman) develops when repeated exposure to uncontrollable aversive events creates the expectation that future actions are futile.",
    "w5_q7": "Resilience in psychology refers to the dynamic capacity to bounce back, adapt successfully, and maintain positive functioning in the face of significant adversity.",
    "w5_q8": "High neuroticism (emotional instability) is consistently associated with greater vulnerability to stress, heightened negative affectivity, and maladaptive coping.",

    # Week 6
    "w6_q1": "Edmund Jacobson developed Progressive Muscle Relaxation (PMR), a systematic somatic technique involving alternating intentional tension and deep relaxation across major muscle groups.",
    "w6_q2": "Autogenic training, developed by Johannes Schultz, utilizes self-directed passive verbal suggestions of heaviness and warmth in limbs to achieve autonomic equilibrium.",
    "w6_q3": "Biofeedback utilizes electronic monitoring instruments to provide real-time sensory feedback on autonomic physiological processes (such as heart rate variability, skin conductance, or EEG).",
    "w6_q4": "Mindfulness-Based Stress Reduction (MBSR), established by Jon Kabat-Zinn, teaches non-judgmental present-moment awareness, body scans, and mindful breathing.",
    "w6_q5": "Cognitive restructuring in Cognitive Behavioral Therapy (CBT) identifies and modifies maladaptive automatic thoughts, cognitive distortions, and catastrophic interpretations.",
    "w6_q6": "Albert Ellis's REBT utilizes the ABCDE framework (Activating event, Beliefs, Consequences, Disputing irrational beliefs, and Effective new philosophy).",
    "w6_q7": "Diaphragmatic breathing stimulates the vagus nerve, initiating parasympathetic response, lowering heart rate, and decreasing physiological hyperarousal.",
    "w6_q8": "Time management strategies such as prioritization (e.g., Eisenhower matrix) reduce stress by enhancing perceived control and diminishing frantic task-switching.",

    # Week 7
    "w7_q1": "Subjective Well-Being (SWB), formulated by Ed Diener, comprises three key facets: high life satisfaction (cognitive), frequent positive affect, and infrequent negative affect.",
    "w7_q2": "Hedonic well-being focuses on pleasure attainment and pain avoidance, whereas eudaimonic well-being focuses on meaning, self-realization, and living in accordance with one's true daimon.",
    "w7_q3": "Martin Seligman's PERMA model of flourishing represents Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment.",
    "w7_q4": "Barbara Fredrickson's Broaden-and-Build theory proposes that positive emotions broaden people's momentary thought-action repertoires and build enduring physical and psychological resources.",
    "w7_q5": "The 'undoing hypothesis' posits that positive emotions rapidly undo or neutralize the lingering cardiovascular aftereffects of negative emotions.",
    "w7_q6": "Psychological well-being (Ryff) includes six dimensions: self-acceptance, personal growth, purpose in life, positive relations with others, environmental mastery, and autonomy.",
    "w7_q7": "High emotional intelligence (Salovey & Mayer / Goleman) enhances stress resilience through accurate perception, appraisal, understanding, and regulation of emotions.",
    "w7_q8": "Social capital and positive interpersonal relationships constitute the single strongest and most consistent empirical predictor of human happiness across cross-cultural studies.",

    # Week 8
    "w8_q1": "Hedonic adaptation is the psychological process where individuals become accustomed to a positive or negative emotional stimulus, causing emotional intensity to return to a baseline set point.",
    "w8_q2": "In Wilson and Gilbert's AREA model of affective adaptation, the Explaining stage determines the rate of adaptation: once an event is comprehended and explained, emotional reactions attenuate rapidly.",
    "w8_q3": "In the landmark longitudinal study by Lucas and colleagues, severe permanent disability showed the most persistent and incomplete hedonic adaptation, leaving well-being below pre-event baseline.",
    "w8_q4": "Neuroticism exhibits a robust, negative correlation with subjective happiness, driving hyper-vigilance toward threat and chronic negative affectivity.",
    "w8_q5": "Sonja Lyubomirsky found that people adapt much more rapidly and completely to positive life changes (such as pay raises or marriage) than to negative life events.",
    "w8_q6": "Research syntheses indicate that all objective life circumstances combined (income, marital status, health, physical attractiveness) account for only approximately 10% (8% to 15%) of variance in happiness.",
    "w8_q7": "Lyubomirsky, Sheldon, and Schkade identify intentional activities into three distinct categories: behavioural (e.g. exercise), cognitive (e.g. reframing), and volitional (e.g. pursuing meaningful goals).",
    "w8_q8": "The Sustainable Happiness Model posits that despite genetic set points and circumstances, individuals can exert substantial, enduring influence over their happiness through deliberate intentional activities.",

    # Week 9
    "w9_q1": "Gratitude facilitates positive emotions and cognitive coping, while reducing unhealthy upward social comparisons and envy; thus claiming it increases upward social comparison is incorrect.",
    "w9_q2": "A gratitude journal involves intentionally and systematically writing down things, events, or relationships for which one is personally thankful on a regular basis.",
    "w9_q3": "Narcissism is fundamentally incompatible with gratitude because narcissistic entitlement fosters the belief that one inherently deserves all benefits without needing to acknowledge others.",
    "w9_q4": "Kindness directly fulfills the basic psychological need for Relatedness by cultivating meaningful social bonds, connection, and mutual belonging.",
    "w9_q5": "Under Trivers' theory of reciprocal altruism, altruistic and kind acts are most likely to be extended when individuals anticipate future interactions and opportunities for mutual reciprocity.",
    "w9_q6": "Research by Deci, Ryan, and Lyubomirsky shows that acts of kindness foster well-being most effectively when they are performed autonomously and freely rather than out of guilt or external compulsion.",
    "w9_q7": "In social comparison theory (Festinger / Buunk), downward comparison with assimilation occurs when an observer identifies with a less fortunate target, leading to negative self-evaluation ('I might become like them').",
    "w9_q8": "Numerous empirical studies show that passive social networking site consumption fosters chronic upward social comparison, leading to decreased subjective well-being and life satisfaction.",

    # Week 10
    "w10_q1": "Peterson and Seligman developed the VIA (Values in Action) Classification of Strengths and Virtues explicitly as a positive psychological counterpart to the DSM (Diagnostic and Statistical Manual).",
    "w10_q2": "In the VIA Classification, the virtue of Transcendence encompasses character strengths (appreciation of beauty, gratitude, hope, humor, and spirituality) that forge connections to the larger universe.",
    "w10_q3": "Under the VIA Classification, the virtue of Humanity contains interpersonal strengths including Love, Kindness, and Social Intelligence (awareness of own and others' motives and feelings).",
    "w10_q4": "Research across diverse cohorts demonstrates that 'strengths of the heart' (love, gratitude, zest, hope) are more strongly correlated with life satisfaction and subjective well-being than 'strengths of the head' (e.g., love of learning).",
    "w10_q5": "Clifton and Anderson emphasize that talents are naturally recurring patterns of thought, feeling, or behavior, whereas skills and knowledge are learned capacities that must be intentionally acquired.",
    "w10_q6": "Mihaly Csikszentmihalyi's flow state occurs specifically when an individual confronts an activity where perceived challenges are high and commensurate personal skills are equally high.",
    "w10_q7": "Autotelic activities (from Greek 'autos' meaning self and 'telos' meaning goal) are intrinsically rewarding activities pursued for their own sake rather than for an external incentive.",
    "w10_q8": "Passive, low-engagement activities such as doing housework and watching television rarely generate flow experiences due to their low challenge and minimal skill deployment.",

    # Week 11
    "w11_q1": "In Abraham Maslow's hierarchy of needs, self-actualization represents a 'Being need' (B-need or growth need), distinguished from lower 'Deficiency needs' (D-needs).",
    "w11_q2": "Maslow emphasized that people frequently fail to achieve self-actualization because they remain preoccupied with and stuck in fulfilling lower deficiency needs (physiological, safety, and belonging).",
    "w11_q3": "Carl Rogers explained that societal 'conditions of worth' (conditional positive regard from parents/society) cause individuals to abandon their authentic organismic valuing process and real self.",
    "w11_q4": "In person-centered theory, a significant incongruence or discrepancy between the perceived 'real self' and the societal/ideal self generates anxiety, defenses, and neurosis.",
    "w11_q5": "Deci and Ryan's Self-Determination Theory (SDT) explains human motivation and flourishing through the fulfillment of three basic psychological needs: Autonomy, Competence, and Relatedness.",
    "w11_q6": "Under SDT's organismic integration theory, completing schoolwork because one consciously identifies with its personal utility for college admission represents 'Identification' extrinsic motivation.",
    "w11_q7": "Internalized extrinsic motivation is fostered when an environment supports and satisfies the individual's basic psychological needs for autonomy, competence, and relatedness.",
    "w11_q8": "On the SDT continuum of motivation, Identification and Integration represent the most autonomous, internalized forms of extrinsic motivation.",

    # Week 12
    "w12_q1": "Psychologists break meaning in life into three distinct components: Coherence/Comprehension (cognitive), Purpose (motivational/directional), and Significance/Mattering (evaluative).",
    "w12_q2": "Viktor Frankl founded Logotherapy (existential psychotherapy), anchored on the conviction that life possesses unconditional meaning under all circumstances, even in profound suffering.",
    "w12_q3": "Significance or mattering reflects the existential judgment that one's life has inherent worth, value, and makes a meaningful difference in the world.",
    "w12_q4": "Empirical research demonstrates reciprocal synergy among dimensions of meaning: deficits in comprehension or purpose undermine mattering, and vice-versa.",
    "w12_q5": "In 'Man's Search for Meaning', Viktor Frankl wrote that 'everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.'",
    "w12_q6": "Frankl proposed three fundamental avenues to discover meaning: (1) creating a work or doing a deed, (2) experiencing something or encountering someone (love, beauty), and (3) the attitude one takes toward unavoidable suffering.",
    "w12_q7": "Extrinsic goals (wealth, status, physical appeal) yield fleeting satisfaction because humans rapidly adapt to external milestones and continually compare themselves to higher benchmarks.",
    "w12_q8": "Extrinsic goals are heavily conditioned by external social pressures and cultural norms, whereas intrinsic goals (growth, relationships, community contribution) emerge from innate human growth tendencies."
}

# Attach metadata and explanations
for q in questions:
    qid = q['id']
    if qid in explanations:
        q['explanation'] = explanations[qid]
    else:
        q['explanation'] = f"The correct answer is {q['correct_answers'][0].upper()} based on the NPTEL syllabus."

# Write TypeScript file
ts_content = f"""// AUTO-GENERATED NPTEL QUESTION BANK FOR NOC26 HS169
// Psychology of Stress, Health and Well-Being - IIT Guwahati
// Total verified questions: {len(questions)}

export interface QuestionOption {{
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
  is_correct: boolean;
}}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'numerical';

export interface Question {{
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
}}

export interface WeekInfo {{
  week: number;
  title: string;
  description: string;
  icon: string;
  questionCount: number;
}}

export const WEEKS_METADATA: WeekInfo[] = [
"""

for w in range(1, 13):
    meta = week_metadata[w]
    count = sum(1 for q in questions if q['week'] == w)
    ts_content += f"""  {{
    week: {w},
    title: {json.dumps(meta['title'])},
    description: {json.dumps(meta['description'])},
    icon: {json.dumps(meta['icon'])},
    questionCount: {count}
  }},
"""

ts_content += "];\n\nexport const QUESTIONS_DATA: Question[] = " + json.dumps(questions, indent=2) + ";\n"

os.makedirs('src/data', exist_ok=True)
with open('src/data/questionsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated src/data/questionsData.ts with {len(questions)} questions!")
