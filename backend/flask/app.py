from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import openai
import os
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

CORS(app)
jwt = JWTManager(app)

# In-memory storage (replace with database in production)
users = {}
jobs = []

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if not email or not password or not name:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if email in users:
        return jsonify({'error': 'User already exists'}), 400
    
    users[email] = {
        'email': email,
        'password': generate_password_hash(password),
        'name': name
    }
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = users.get(email)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token, 'user': {'email': email, 'name': user['name']}}), 200

@app.route('/api/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    return jsonify({'jobs': jobs}), 200

@app.route('/api/jobs', methods=['POST'])
@jwt_required()
def create_job():
    data = request.get_json()
    current_user = get_jwt_identity()
    
    job = {
        'id': len(jobs) + 1,
        'title': data.get('title'),
        'description': data.get('description'),
        'company': data.get('company'),
        'location': data.get('location'),
        'salary': data.get('salary'),
        'created_by': current_user
    }
    
    jobs.append(job)
    return jsonify({'job': job}), 201

@app.route('/api/ai/generate-description', methods=['POST'])
@jwt_required()
def generate_description():
    """
    AI-powered job description generator
    Note: Requires OpenAI API key set in environment variable OPENAI_API_KEY
    """
    data = request.get_json()
    job_title = data.get('job_title')
    company_name = data.get('company_name')
    key_skills = data.get('key_skills', [])
    
    if not job_title:
        return jsonify({'error': 'Job title is required'}), 400
    
    # Mock AI-generated description (replace with actual OpenAI API call in production)
    # To use real OpenAI API, uncomment below and set OPENAI_API_KEY environment variable
    """
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    prompt = f"Generate a professional job description for {job_title} at {company_name or 'a company'}. "
    if key_skills:
        prompt += f"Required skills: {', '.join(key_skills)}. "
    prompt += "Include responsibilities, qualifications, and benefits."
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    description = response.choices[0].message.content
    """
    
    # Mock response
    skills_text = f" with expertise in {', '.join(key_skills)}" if key_skills else ""
    description = f"""We are seeking a talented {job_title}{skills_text} to join our team{' at ' + company_name if company_name else ''}.

Responsibilities:
• Lead and execute key projects
• Collaborate with cross-functional teams
• Drive innovation and continuous improvement
• Mentor junior team members

Qualifications:
• 3+ years of relevant experience
• Strong problem-solving skills
• Excellent communication abilities
• Bachelor's degree in relevant field

Benefits:
• Competitive salary
• Health insurance
• Flexible working hours
• Professional development opportunities"""
    
    return jsonify({'description': description}), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'Flask Job Platform API'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
