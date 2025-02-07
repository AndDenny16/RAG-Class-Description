from flask import Flask, jsonify, request
from main import query,get_variation, simple_query

from dotenv import load_dotenv
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


PORT_NUMBER = os.getenv("PORT_NUMBER")

@app.route('/build', methods = ["POST"])
def get_fake_class():
    data = request.get_json()
    print(data)
    topics = data['topics']
    user_input = " ".join(topics) + " "
    variation = get_variation(user_input)
    return jsonify({
        "body": variation
    }), 200


@app.route("/getclasses", methods = ["POST"])
def get_class():
    data = request.get_json()
    fake_class_description = data['description']
    matches = simple_query(fake_class_description)
    return jsonify({
        'body': matches}), 200





@app.route("/fullquery", methods = ["GET"])
def vector_query():
    data = request.get_json()
    topics = data['topics']
    matches = query(topics, 2)
    return jsonify(matches), 200

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