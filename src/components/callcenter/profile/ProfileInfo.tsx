
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

const ProfileInfo: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  
  // Mock initial profile data
  const [profileData, setProfileData] = useState({
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@guardianai.com",
    phone: "+1 (555) 123-4567",
    languages: "English, Spanish",
    emergencyContact: "Maria Rodriguez, +1 (555) 987-6543",
    bio: "Technical support specialist with 5 years of experience in healthcare technology. Specializing in medical device troubleshooting and client support."
  });
  
  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile information updated successfully");
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        {editMode ? (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full Name</Label>
            {editMode ? (
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            ) : (
              <div className="p-2 border rounded-md">{profileData.name}</div>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            {editMode ? (
              <Input
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            ) : (
              <div className="p-2 border rounded-md">{profileData.email}</div>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            {editMode ? (
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            ) : (
              <div className="p-2 border rounded-md">{profileData.phone}</div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="languages">Languages</Label>
            {editMode ? (
              <Input
                id="languages"
                name="languages"
                value={profileData.languages}
                onChange={handleChange}
              />
            ) : (
              <div className="p-2 border rounded-md">{profileData.languages}</div>
            )}
          </div>
          
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            {editMode ? (
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={profileData.emergencyContact}
                onChange={handleChange}
              />
            ) : (
              <div className="p-2 border rounded-md">{profileData.emergencyContact}</div>
            )}
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            {editMode ? (
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                className="resize-none h-20"
              />
            ) : (
              <div className="p-2 border rounded-md h-20 overflow-y-auto">{profileData.bio}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
