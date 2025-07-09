import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Stats from './components/Stats';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StudentLayout from './components/layouts/StudentLayout';
import FacultyLayout from './components/layouts/FacultyLayout';
import StudentHome from './components/student/StudentHome';
import AcademicInformation from './components/student/AcademicInformation';
import PredictFuture from './components/student/PredictFuture';
import StudentProfile from './components/student/StudentProfile';
import FacultyHome from './components/faculty/FacultyHome';
import AddInformation from './components/faculty/AddInformation';
import StudentsList from './components/faculty/StudentsList';
import FacultyProfile from './components/faculty/FacultyProfile';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Hero />} />
              <Route path="/" element={<Stats />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Student Routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentHome />} />
                <Route path="academic" element={<AcademicInformation />} />
                <Route path="predict" element={<PredictFuture />} />
                <Route path="profile" element={<StudentProfile />} />
              </Route>

              {/* Faculty Routes */}
              <Route path="/faculty" element={<FacultyLayout />}>
                <Route index element={<FacultyHome />} />
                <Route path="add-info" element={<AddInformation />} />
                <Route path="students" element={<StudentsList />} />
                <Route path="profile" element={<FacultyProfile />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
