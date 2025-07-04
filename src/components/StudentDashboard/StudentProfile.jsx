import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit3, Save, X, Camera } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

export default function StudentProfile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    studentId: "",
    major: "",
    year: "",
    gpa: "",
    enrollmentDate: "",
    avatar: ""
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Initialize profile data from auth context
  useEffect(() => {
    if (currentUser) {
      const initialData = {
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        dateOfBirth: currentUser.dateOfBirth || "",
        studentId: currentUser.id || "",
        major: currentUser.major || "",
        year: currentUser.year || "",
        gpa: currentUser.gpa || "",
        enrollmentDate: currentUser.enrollmentDate || "",
        avatar: currentUser.avatar || ""
      };
      setProfileData(initialData);
      setEditData(initialData);
    }
  }, [currentUser]);

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const stats = [
    { label: "Current GPA", value: profileData.gpa || "N/A", icon: Award, color: "from-emerald-50 to-green-50 border-emerald-100 text-emerald-600" },
    { label: "Academic Year", value: profileData.year || "N/A", icon: Calendar, color: "from-indigo-50 to-purple-50 border-indigo-100 text-indigo-600" },
    { label: "Major", value: profileData.major || "N/A", icon: BookOpen, color: "from-amber-50 to-orange-50 border-amber-100 text-amber-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
              <p className="text-gray-600">Manage your personal information and academic details</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              isEditing 
                ? "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 hover:from-red-100 hover:to-rose-100"
                : "bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 border border-sky-200 hover:from-sky-100 hover:to-indigo-100"
            }`}
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl border`}>
              <div className="flex items-center space-x-3">
                <stat.icon className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-75">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-sky-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                {(isEditing ? editData.avatar : profileData.avatar) ? (
                  <img
                    src={isEditing ? editData.avatar : profileData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-sky-200 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-4 border-sky-200 shadow-lg flex items-center justify-center text-3xl font-bold">
                    {(isEditing ? editData.name : profileData.name)
                      .split(' ')
                      .map(name => name[0])
                      .join('')
                      .toUpperCase() || 'U'}
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-2 rounded-lg shadow-lg hover:from-sky-600 hover:to-indigo-700 transition-all duration-300">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{(isEditing ? editData.name : profileData.name) || "Student"}</h2>
              <p className="text-sky-600 font-medium">{profileData.major || "Major not specified"}</p>
              <p className="text-sm text-gray-500">Student ID: {profileData.studentId || "N/A"}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-sky-100">
                      <User className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-800">{profileData.name || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-sky-100">
                      <Mail className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-800">{profileData.email || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-sky-100">
                      <Phone className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-800">{profileData.phone || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-sky-100">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-800">
                        {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : "Not provided"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 resize-none"
                  rows="2"
                />
              ) : (
                <div className="flex items-start space-x-3 px-4 py-3 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-sky-100">
                  <MapPin className="w-4 h-4 text-sky-600 mt-0.5" />
                  <span className="text-gray-800">{profileData.address || "Not provided"}</span>
                </div>
              )}
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-800">{profileData.major || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-800">{profileData.year || "Not specified"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Date</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span className="text-gray-800">
                      {profileData.enrollmentDate ? new Date(profileData.enrollmentDate).toLocaleDateString() : "Not provided"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-800 font-bold">{profileData.gpa || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
