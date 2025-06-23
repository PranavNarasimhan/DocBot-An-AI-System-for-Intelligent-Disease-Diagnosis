import pdfplumber
import ollama
import os
import json

path = "./vidhya_LFT.pdf"
json_string=""
filename_without_ext=os.path.splitext(os.path.basename("hello"))[0]
json_filename = f"{filename_without_ext}.json"

def pdf_to_text(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

result = pdf_to_text(path)

response = ollama.chat(
  model="llama3.1:8b",
  messages=[
    {
      "role": "user",
      "content": result + """\n\nthis is a patient's medical report. Read through the entire data and rewrite 
                    it in such a way that the data is more user-readable but detailed, without changing the values and names of the tests, 
                    departments, and others. Return a JSON document with data. Only return JSON, no other text."""
    }
  ],
)

json_string = response['message']['content']

json_string = json_string.replace("json\n","").replace("\n","").replace("```","")
json_data = json.loads(json_string)
  
with open(json_filename,'a') as file:
    json.dump(json_data,file,indent=4)

f= open(json_filename)
temp_data= str(json.loads(f.read()))

response1 = ollama.chat(
  model="llama3.1:8b",    
  messages=[
    {
      "role": "user",
      "content": temp_data + """\n play the role of a doctor, this is a patient's medical report. go thorugh the entire data 
          and give me only the abnormal parameters(a parameter is considered abnormal if the patient's result value doesn't fall inside the normal
          range / reference interval mentioned in the report), as individual bullet points and no other text"""
    }
  ],
)

jstring = response1['message']['content']
print(jstring)
f.close()