from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import Job
from .serializers import RegisterSerializer, UserSerializer, JobSerializer
import os

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = (IsAuthenticated,)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_job_description(request):
    """
    AI-powered job description generator
    Note: Requires OpenAI API key set in environment variable OPENAI_API_KEY
    """
    job_title = request.data.get('job_title')
    company_name = request.data.get('company_name')
    key_skills = request.data.get('key_skills', [])
    
    if not job_title:
        return Response({'error': 'Job title is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Mock AI-generated description (replace with actual OpenAI API call in production)
    # To use real OpenAI API, uncomment below and set OPENAI_API_KEY environment variable
    """
    import openai
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
    
    return Response({'description': description}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'healthy', 'service': 'Django Job Platform API'}, status=status.HTTP_200_OK)
