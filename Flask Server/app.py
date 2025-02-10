from flask import Flask, jsonify, request
from main import query,get_variation, simple_query

from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)


PORT_NUMBER = os.getenv("PORT_NUMBER")

#Route to Build the Ideal Class from the Key Words
@app.route('/build', methods = ["POST"])
def get_fake_class():
    try: 
        data = request.get_json()
        print(data)
        if not data:
            return jsonify({
            "error": "Error Creating Request"
        }), 400
        print(data)
        topics = data['topics']
        user_input = " ".join(topics) + " "
        variation = get_variation(user_input)
        return jsonify({
            "body": variation
        }), 200
    except Exception as e:
        print("Exception", e)
        return jsonify({
           "error": "Error Creating Class"
        }), 500


@app.route("/getclasses", methods = ["POST"])
def get_class():
    try:
        data = request.get_json()
        fake_class_description = data['description']
        matches = simple_query(fake_class_description)
        if not matches:
            raise Exception("Error Finding Classes") 
        
        return jsonify({
            'body': matches}), 200
    
    except Exception as e: 
        return jsonify({
            "error": "Error Finding Classes"
        }), 500



@app.route("/fullquery", methods = ["GET"])
def vector_query():
    try:
        data = request.get_json()
        topics = data['topics']
        number_variations = data['variations']
        matches = query(topics, number_variations)
        if not matches:
            raise Exception("Error Finding Classes")
        return jsonify({'body': matches}), 200
    except Exception as e: 
        print(e)
        return jsonify({
            "error": "Error Finding Classes"
        }), 500


@app.route("/info", methods = ['GET'])
def info():
    return jsonify({
        "message": "This is a Flask Server for Interacting with Davidson Class Vector DB"
    }), 200

@app.route("/health", methods = ['GET'])
def health():
    return jsonify({
        "message": "Server is Up and Running"
    }), 200


if __name__ == "__main__":
    app.run('0.0.0.0', port=PORT_NUMBER, debug=True)