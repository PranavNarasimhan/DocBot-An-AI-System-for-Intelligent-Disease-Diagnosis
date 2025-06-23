from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pdfplumber
import ollama
import os
import json

app = Flask(__name__)
CORS(app)

# Paths for saving uploaded files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function for test analysis
def test_analysis(file_path):
    json_string = ""
    filename_without_ext = os.path.splitext(os.path.basename(file_path))[0]
    json_filename = f"{filename_without_ext}.json"

    def pdf_to_text(file_path):
        with pdfplumber.open(file_path) as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text()
        return text

    result = pdf_to_text(file_path)

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
    json_string = json_string.replace("json\n", "").replace("\n", "").replace("```", "")
    json_data = json.loads(json_string)

    with open(json_filename, 'w') as file:
        json.dump(json_data, file, indent=4)

    f = open(json_filename)
    temp_data = str(json.loads(f.read()))
    f.close()

    response1 = ollama.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": temp_data + """\n play the role of a doctor, this is a patient's medical report. go through the entire data 
                    and give me only the abnormal parameters(a parameter is considered abnormal if the patient's result value doesn't fall inside the normal
                    range / reference interval mentioned in the report), as individual bullet points and no other text."""
            }
        ],
    )

    return response1['message']['content']

# Function for scan analysis
def scan_analysis(file_path):
    response = ollama.chat(
        model='llama3.2-vision:11b',
        messages=[{
            "role": "user",
            "content": """take up the role of an experienced radiologist and analyse the given scan and output your interpretations""",
            "images": [file_path]
        }]
    )

    return response['message']['content']

@app.route('/upload', methods=['POST'])
def upload_file():
    test_name = request.form.get("test_name")
    skip = request.form.get("skip")

    if skip == "true":
        return jsonify({"message": f"{test_name} skipped"}), 200

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    if test_name.lower().endswith("test"):
        result = test_analysis(file_path)
    elif test_name.lower().endswith("scan"):
        result = scan_analysis(file_path)
    else:
        return jsonify({"error": "Invalid test/scan type"}), 400

    with open('report.txt', 'a') as report_file:
        report_file.write(f"{test_name} result:\n{result}\n")

    return jsonify({"message": f"{test_name} processed successfully"}), 200

@app.route('/disease_analysis', methods=['POST'])
def disease_analysis():
    symptom = request.json.get('symptom')
    response = ollama.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": """ the below is the symptomn of a patient's disease:""" + symptom + """\n suggest the user only the tests or scans to be taken in
        the order of decreasing priority and each separated by a comma and next to the test/scan name mention if it is a test or scan like: MRI:scan or LFT:test. and no other information should be there in the output 
        except the format of the outut that i gave"""
            }
        ],
    )

    suggested_tests = response['message']['content'].split(',')

    return jsonify({"tests": suggested_tests}), 200

@app.route('/generate_report', methods=['GET'])
def generate_report():
    if not os.path.exists('report.txt'):
        return jsonify({"error": "No report generated"}), 404

    with open('report.txt', 'r') as file:
        content = file.read()

    response = ollama.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": f"""The below is a collection of test and scan results of a patient. Play the role of a doctor and give the disease's name
                with the highest probability that the patient is suffering from. The report: \n{content}"""
            }
        ],
    )

    disease = response['message']['content']
    return jsonify({"disease": disease}), 200

if __name__ == "__main__":
    app.run(debug=True)
