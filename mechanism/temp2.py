import ollama

with open('report.txt', 'r') as file:
    content = file.read()
file.close()

response1 = ollama.chat(
  model="llama3.1:8b",
  messages=[
    {
      "role": "user",
      "content": """the below is a collection of test and scan results of a patient. play the role of a doctor and give the disease's name
      with highest probability that the patient is suffering from. the report: \n""" + content
    }
  ],
)

finale = response1['message']['content']
print(finale)