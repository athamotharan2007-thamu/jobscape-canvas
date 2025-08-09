import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface UserProfile {
  name: string;
  skills: string[];
  experience: string;
  location: string;
  jobType: string;
}

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

export const UserProfileForm = ({ onSubmit }: UserProfileFormProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    skills: [],
    experience: '',
    location: '',
    jobType: ''
  });
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.skills.length > 0 && profile.experience) {
      onSubmit(profile);
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-card border-0 shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
          Create Your Profile
        </CardTitle>
        <p className="text-muted-foreground">
          Tell us about yourself to get personalized job recommendations
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              className="border-muted focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill (e.g., React, Python, Design)"
                className="border-muted focus:border-primary"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-skill-tag text-skill-tag-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={profile.experience} onValueChange={(value) => setProfile(prev => ({ ...prev, experience: value }))}>
              <SelectTrigger className="border-muted focus:border-primary">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="New York, NY or Remote"
              className="border-muted focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select value={profile.jobType} onValueChange={(value) => setProfile(prev => ({ ...prev, jobType: value }))}>
              <SelectTrigger className="border-muted focus:border-primary">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-hero hover:shadow-card-hover transition-all duration-300"
            disabled={!profile.name || profile.skills.length === 0 || !profile.experience}
          >
            Get My Job Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};