import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import pdfplumber
import joblib
import io
app = Flask(__name__)

# Configure CORS with specific options
CORS(app)

# ... Your other Flask routes and code go here


@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    try:
        data = request.get_json()
        text = data['text']

        # Save the text to a file
        with open('summarized_text.txt', 'w') as file:
            file.write(text)

        # Run the script located in server/extractive-text-summarizer/src
        result = subprocess.run(['python', 'extractive-text-summarizer\src\main1.py'],
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Get the output from the subprocess
        output = result.stdout
        print(result)

        return jsonify({'summary': output})

    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/api/classify', methods=['POST'])
def classify_text():
    try:
        data = request.get_json()
        text = data['text']
        loaded_module=joblib.load('lr_model.joblib')
        res_lr=loaded_module.predict([text])
        selected_categories = ['alt.atheism',
 'comp.graphics',
 'comp.os.ms-windows.misc',
 'comp.sys.ibm.pc.hardware',
 'comp.sys.mac.hardware',
 'comp.windows.x',
 'misc.forsale',
 'rec.autos',
 'rec.motorcycles',
 'rec.sport.baseball',
 'rec.sport.hockey',
 'sci.crypt',
 'sci.electronics',
 'sci.med',
 'sci.space',
 'soc.religion.christian',
 'talk.politics.guns',
 'talk.politics.mideast',
 'talk.politics.misc',
 'talk.religion.misc']
        for i in res_lr:
            category=selected_categories[i]




       

        
       

        return jsonify({'summary':category })

    except Exception as e:
        return jsonify({'error': str(e)})






def extract_text_from_pdf(file_content):
    with pdfplumber.open(io.BytesIO(file_content)) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text



@app.route('/api/upload-pdf', methods=['POST'])
def upload_pdf():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_content = uploaded_file.read()

        # Extract text from the PDF
        text = extract_text_from_pdf(file_content)
        with open('summarized_text.txt', 'w') as file:
            file.write(text)
    

        # Run the script located in server/extractive-text-summarizer/src
        result = subprocess.run(['python', 'extractive-text-summarizer\src\main1.py'],
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(text)
        # Get the output from the subprocess
        output = result.stdout
    

        # Process the text (e.g., summarize it)
        # Return the summary as a response

        # print(text)  # This will print the extracted text from the PDF
        return jsonify({"summary":output,"input_text":text})
    else:
        return jsonify({"error": "No file uploaded."})
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)
