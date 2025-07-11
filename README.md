# Student-Future Prediction

A comprehensive student management and future prediction system that combines academic tracking with machine learning-based career guidance. This platform serves both students and faculty members with personalized insights and predictive analytics.

## 🎯 Project Overview

The Student-Future Prediction system is a full-stack web application designed to help students track their academic progress and receive AI-powered predictions about their future success. The platform features separate interfaces for students and faculty members, with advanced machine learning capabilities for career guidance.

## ✨ Key Features

### For Students
- **Academic Dashboard**: Track grades, attendance, and course progress
- **Future Prediction**: AI-powered predictions based on academic performance
- **Profile Management**: Complete student profile with academic information
- **AI Assistant**: Interactive AI chatbot for academic guidance
- **Progress Analytics**: Visual charts and statistics for academic performance

### For Faculty
- **Student Management**: View and manage student information
- **Academic Records**: Add and update student academic information
- **Analytics Dashboard**: Monitor student performance and trends
- **Course Management**: Handle course assignments and grades

### Core Features
- **Machine Learning Predictions**: Uses Random Forest algorithm for future success prediction
- **Real-time Analytics**: Interactive charts and progress tracking
- **Responsive Design**: Modern UI with Tailwind CSS
- **Authentication System**: Secure login with role-based access
- **RESTful API**: Django REST framework backend

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **Framer Motion** for animations
- **Axios** for API communication
- **OpenAI API** for AI assistant functionality

### Backend
- **Django 5.1.7** with Django REST Framework
- **SQLite** database (development)
- **Scikit-learn** for machine learning
- **XGBoost** for advanced predictions
- **Pandas & NumPy** for data processing
- **Joblib** for model serialization

### Machine Learning
- **Random Forest Classifier** for prediction model
- **Standard Scaler** for feature normalization
- **Model persistence** with joblib

## 📁 Project Structure

```
Student-Future Prediction/
├── backend/                          # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   ├── models/                       # ML model files
│   ├── predictions/                  # Prediction app
│   ├── users/                        # User management app
│   ├── student_portal_backend/       # Django settings
│   └── media/                        # File uploads
├── student-future/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/                # Authentication components
│   │   │   ├── faculty/             # Faculty-specific components
│   │   │   ├── student/             # Student-specific components
│   │   │   └── layouts/             # Layout components
│   │   ├── context/                 # React context
│   │   ├── services/                # API services
│   │   └── routes/                  # Routing
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── model.pkl                        # Trained ML model
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd "Student-Future Prediction/backend"
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start Django server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd "Student-Future Prediction/student-future"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📊 Machine Learning Model

The prediction system uses a Random Forest Classifier trained on student data including:
- GPA (Grade Point Average)
- Attendance Rate
- Extracurricular Activities
- Study Hours
- Previous Academic Scores

### Model Features
- **Prediction Categories**: Low, Medium, High success probability
- **Confidence Scores**: Probability distribution for predictions
- **Feature Scaling**: StandardScaler for normalized inputs
- **Model Persistence**: Saved models for quick loading

### Training Data
The model is trained on synthetic data with realistic student performance patterns, ensuring robust predictions for real-world scenarios.

## 🔐 Authentication & Authorization

The system implements role-based access control with two user types:

### Student Access
- View academic dashboard
- Access prediction features
- Manage personal profile
- Interact with AI assistant

### Faculty Access
- View student lists
- Add academic information
- Access analytics dashboard
- Manage course data

## 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes
- **Interactive Charts**: Real-time data visualization
- **Smooth Animations**: Framer Motion for enhanced UX
- **Mobile Responsive**: Optimized for all device sizes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### Students
- `GET /api/students/profile/` - Get student profile
- `PUT /api/students/profile/` - Update student profile
- `GET /api/students/academic-info/` - Get academic information
- `POST /api/students/academic-info/` - Add academic information

### Predictions
- `POST /api/predictions/predict/` - Get future prediction
- `GET /api/predictions/history/` - Get prediction history

### Faculty
- `GET /api/faculty/students/` - Get student list
- `POST /api/faculty/add-info/` - Add student information
- `GET /api/faculty/analytics/` - Get analytics data

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd student-future
npm test
```

## 📝 Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings.py
2. Configure production database
3. Set up static file serving
4. Use Gunicorn or uWSGI

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Integration with external LMS
- [ ] Mobile app development
- [ ] Advanced ML models
- [ ] Multi-language support
- [ ] Export functionality
- [ ] Advanced reporting features

---

**Built with ❤️ using React, Django, and Machine Learning**
