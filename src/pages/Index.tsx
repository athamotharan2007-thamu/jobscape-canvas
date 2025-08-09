import { useState } from 'react';
import { UserProfileForm, UserProfile } from '@/components/UserProfileForm';
import { JobCard } from '@/components/JobCard';
import { jobsDatabase } from '@/data/jobs';
import { getJobRecommendations } from '@/utils/jobMatcher';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import heroBackground from '@/assets/job-hero-bg.jpg';

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { toast } = useToast();

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    const jobRecommendations = getJobRecommendations(profile, jobsDatabase);
    setRecommendations(jobRecommendations);
    
    toast({
      title: "Profile Created!",
      description: `Found ${jobRecommendations.length} job recommendations for you.`,
    });
  };

  const handleJobApply = (jobId: string) => {
    const job = recommendations.find(j => j.id === jobId);
    toast({
      title: "Application Sent!",
      description: `Your application for ${job?.title} at ${job?.company} has been submitted.`,
    });
  };

  const handleBackToProfile = () => {
    setUserProfile(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              AI-powered job recommendations tailored to your skills and preferences
            </p>
          </div>

          {!userProfile ? (
            <div className="flex justify-center">
              <UserProfileForm onSubmit={handleProfileSubmit} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Hi {userProfile.name}! 👋
                  </h2>
                  <p className="text-primary-foreground/90 text-lg">
                    Here are {recommendations.length} jobs matched to your profile
                  </p>
                </div>
                <Button 
                  onClick={handleBackToProfile}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Recommendations */}
      {recommendations.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {recommendations.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={handleJobApply}
              />
            ))}
          </div>
          
          {recommendations.length === 0 && userProfile && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No jobs found matching your criteria.
              </p>
              <Button onClick={handleBackToProfile}>
                Update Your Profile
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;