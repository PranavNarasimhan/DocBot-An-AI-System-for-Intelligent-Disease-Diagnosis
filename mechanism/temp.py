import ollama

response = ollama.chat(
    model='llama3.2-vision:11b',
    messages=[{
        "role": "user",
        "content": """take up the role of an experienced radiologist and analyse the given scan and output your interpretations""",
        "images": ['./vidhya_gb.jpg'] }   
    ]
)

model_response = response['message']['content']
print(model_response)