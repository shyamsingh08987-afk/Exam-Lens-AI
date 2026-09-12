import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Calendar,
  Award,
  Flame,
  Target,
  TrendingUp,
  RotateCcw,
  Save,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { student, updateStudent, resetDemoData, navigateTo } = useApp();

  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);
  const [semester, setSemester] = useState(student.semester);
  const [targetExam, setTargetExam] = useState(student.targetExam || 'End-Semester Theory & Practical Exams');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent({
      name,
      course,
      semester: Number(semester),
      targetExam,
    });
  };

  return (
    <div id="profile-view-root" className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Profile
          </h1>
          <span className="text-xs px-2.5 py-0.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
            Active Account
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your academic enrollment, target examinations, and learning preferences.
        </p>
      </div>

      {/* Main Profile Info Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 ring-4 ring-slate-100">
          {name.charAt(0)}
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-xl font-bold text-slate-900">{name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {course} • Semester {semester} • Enrolled Student
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
              Computer Fundamentals
            </span>
            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
              Mathematics
            </span>
            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
              Programming in C
            </span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('dashboard')}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-colors"
        >
          View Dashboard &rarr;
        </button>
      </div>

      {/* Learning Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tests Completed</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{student.testsCompleted}</p>
          <p className="text-[11px] text-slate-400 mt-1">12 mock assessments</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Questions Solved</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{student.questionsSolved}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 3 courses</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{student.streakDays} Days</p>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Top 5% consistency</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{student.overallAccuracy}%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Consistent performance</p>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Edit Academic Details</h3>
        <p className="text-xs text-slate-500 mb-5">
          Changes will persist in your browser localStorage and update your diagnostic reports.
        </p>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Name</label>
              <input
                id="profile-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Degree / Course</label>
              <input
                id="profile-course-input"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester</label>
              <select
                id="profile-semester-select"
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
                <option value={3}>Semester 3</option>
                <option value={4}>Semester 4</option>
                <option value={5}>Semester 5</option>
                <option value={6}>Semester 6</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Examination Goal</label>
            <input
              id="profile-target-exam-input"
              type="text"
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              id="reset-demo-profile-btn"
              onClick={resetDemoData}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Demo State</span>
            </button>

            <button
              type="submit"
              id="save-profile-btn"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
