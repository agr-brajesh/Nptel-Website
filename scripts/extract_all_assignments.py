import pymupdf
import os
import re
import json

def parse_assignment_file(filepath, week_num):
    doc = pymupdf.open(filepath)
    raw_lines = []
    for page in doc:
        blocks = page.get_text('dict')['blocks']
        for b in blocks:
            if 'lines' in b:
                for l in b['lines']:
                    text = ''
                    has_bold = False
                    for s in l['spans']:
                        t = s['text']
                        if t.strip():
                            text += t
                            fn = s['font'].lower()
                            fl = s['flags']
                            if 'bold' in fn or (fl & 16) or (fl & 4 and 'bold' in fn):
                                has_bold = True
                    text = text.strip()
                    if text:
                        raw_lines.append((text, has_bold))
                        
    clean_lines = []
    header_keywords = [
        'nptel online', 'psychology of stress', 'assignment number',
        'detailed solution', 'indian institute of technology',
        'options may be shuffled', 'correct answer indicated'
    ]
    
    for text, bold in raw_lines:
        t_low = text.lower()
        if any(h in t_low for h in header_keywords):
            continue
        # Also skip standalone "Assignment 1", "Assignment 12", etc.
        if re.match(r'^assignment\s+\d+$', t_low):
            continue
        clean_lines.append((text, bold))
        
    questions = []
    curr_q = None
    curr_opt = None
    
    for text, bold in clean_lines:
        # Check if question start: e.g. '1.', '2.', '1. What...', '1.What...'
        q_match = re.match(r'^(\d+)\.\s*(.*)', text)
        opt_match = re.match(r'^([a-d])\.\s*(.*)', text, re.IGNORECASE)
        
        if q_match:
            if curr_q:
                questions.append(curr_q)
            q_num = int(q_match.group(1))
            q_text = q_match.group(2).strip()
            curr_q = {
                'id': f'w{week_num}_q{q_num}',
                'week': week_num,
                'question_number': q_num,
                'text': q_text,
                'type': 'single_choice',
                'marks': 1,
                'negative_marks': 0,
                'options': [],
                'correct_answers': [],
                'explanation': '',
                'verified': True
            }
            curr_opt = None
        elif opt_match and curr_q is not None:
            opt_key = opt_match.group(1).lower()
            opt_text = opt_match.group(2).strip()
            opt_obj = {
                'id': opt_key,
                'text': opt_text,
                'is_correct': bold
            }
            curr_q['options'].append(opt_obj)
            curr_opt = opt_obj
            if bold:
                curr_q['correct_answers'].append(opt_key)
        elif curr_opt is not None:
            # Continuation of current option text
            curr_opt['text'] += ' ' + text
            if bold and curr_opt['id'] not in curr_q['correct_answers']:
                curr_opt['is_correct'] = True
                curr_q['correct_answers'].append(curr_opt['id'])
        elif curr_q is not None and not curr_q['options']:
            # Continuation of question text
            curr_q['text'] += ' ' + text
            
    if curr_q:
        questions.append(curr_q)
        
    return questions

all_assignments = []
total_questions = 0

for w in range(1, 13):
    fp = rf'C:\Users\agrbr\Downloads\Assignment {w} Solution - NOC26 HS169.pdf'
    if not os.path.exists(fp):
        print(f"Error: {fp} not found")
        continue
    qs = parse_assignment_file(fp, w)
    total_questions += len(qs)
    print(f"Week {w}: {len(qs)} questions extracted")
    for q in qs:
        opts = [o['id'] for o in q['options']]
        corr = q['correct_answers']
        if len(corr) != 1 or len(opts) != 4:
            print(f"  Warning in Week {w} Q{q['question_number']}: opts={len(opts)}, corr={corr}")
    all_assignments.extend(qs)

print(f"\nTotal extracted questions: {total_questions}")
with open("extracted_raw.json", "w", encoding="utf-8") as f:
    json.dump(all_assignments, f, indent=2)
print("Saved raw extraction to extracted_raw.json")
