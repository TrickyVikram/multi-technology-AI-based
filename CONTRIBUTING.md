# Contributing to Multi-Technology AI-Based Job Platform

First off, thank you for considering contributing to this project! It's people like you that make this platform a great tool for everyone.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if applicable
- **Note your environment**: OS, browser, Node.js version, etc.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List some examples** of how it would be used

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Create a pull request** with a clear description

## 🔧 Development Setup

### For Backend Development

#### Laravel
```bash
cd backend/laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

#### Django
```bash
cd backend/django
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Flask
```bash
cd backend/flask
pip install -r requirements.txt
python app.py
```

#### Spring Boot
```bash
cd backend/springboot
./mvnw spring-boot:run
```

### For Frontend Development

#### MERN
```bash
# Server
cd frontend/mern/server
npm install
npm run dev

# Client
cd frontend/mern/client
npm install
npm start
```

#### MEAN
```bash
# Server
cd frontend/mean/server
npm install
npm run dev

# Client
cd frontend/mean/client
npm install
npm start
```

## 📝 Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the existing code style and patterns
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

### Backend-Specific

#### Python (Django/Flask)
- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for functions and classes
- Use virtual environments

#### PHP (Laravel)
- Follow PSR-12 coding standard
- Use Laravel best practices
- Utilize Eloquent ORM properly
- Follow MVC pattern

#### Java (Spring Boot)
- Follow Java naming conventions
- Use proper annotations
- Keep controllers thin
- Use service layer for business logic

#### JavaScript/TypeScript (Node.js)
- Use ES6+ features
- Follow Airbnb style guide
- Use async/await over callbacks
- Handle errors properly

### Frontend-Specific

#### React (MERN)
- Use functional components and hooks
- Keep components small and reusable
- Use proper prop types
- Follow React best practices

#### Angular (MEAN)
- Follow Angular style guide
- Use TypeScript strictly
- Implement proper services
- Use reactive programming (RxJS)

## 🧪 Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage
- Test edge cases

## 📖 Documentation

- Update README if you change functionality
- Add inline comments for complex code
- Update API documentation if endpoints change
- Include examples in documentation

## 🎨 UI/UX Guidelines

- Keep the UI clean and intuitive
- Ensure responsive design (mobile-friendly)
- Maintain consistent styling
- Follow accessibility best practices
- Test on multiple browsers

## 🔐 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate and sanitize all inputs
- Follow security best practices for your technology
- Report security vulnerabilities privately

## 📋 Commit Message Guidelines

Write clear commit messages:

```
feat: Add job search functionality
fix: Resolve authentication bug
docs: Update installation instructions
style: Format code according to standards
refactor: Simplify job creation logic
test: Add tests for AI description generator
chore: Update dependencies
```

## 🔄 Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md (if exists) with notable changes
3. The PR will be merged once you have approval from maintainers
4. Ensure CI/CD checks pass

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 👥 Community

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🙋 Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check existing documentation first

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to making this project better! 🚀

---

**Happy Coding!** ❤️
