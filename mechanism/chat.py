import pdfplumber
import ollama
import os
import json

def test_analysis():
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
    f.close()
    return jstring

def scan_analysis():
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

symptomn = 'high abdoman and back pain with vomitting sensation'
response = ollama.chat(
  model="llama3.1:8b",
  messages=[
    {
      "role": "user",
      "content": """ the below is the symptomn of a patient's disease:""" + symptomn + """\n suggest the user only the tests or scans to be taken in
        the order of decreasing priority and each separated by a comma and next to the test/scan name mention if it is a test or scan like: MRI:scan or LFT:test. and no other information should be there in the output 
        except the format of the outut that i gave"""
    }
  ],
)

symp0 = response['message']['content']
symp1 = symp0.split(',')
for i in range(1):
    for s in symp1:
        if s[-4:] == 'test' or s[-4:] == 'Test' :
            res=test_analysis()
            out= s + " result:\n" + res
            with open('report.txt', 'a') as file:
                file.write(out)
        elif s[-4:] == 'scan' or s[-4:] == 'Scan':
            res2=scan_analysis()
            out2= s + " result:\n" + res2
            with open('report.txt', 'a') as file:
                file.write(out2)

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