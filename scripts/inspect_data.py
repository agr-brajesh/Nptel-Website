import json

with open('extracted_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total items: {len(data)}")
for i in [0, 7, 8, 87, 95]:
    q = data[i]
    print(f"\n--- W{q['week']} Q{q['question_number']} ---")
    print(f"Question: {q['text']}")
    for o in q['options']:
        mark = '*' if o['is_correct'] else ' '
        print(f"  [{mark}] {o['id']}. {o['text']}")
    print(f"Official Correct: {q['correct_answers']}")
