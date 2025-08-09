import { Job } from '@/components/JobCard';
import { UserProfile } from '@/components/UserProfileForm';

export const calculateMatchScore = (job: Job, profile: UserProfile): number => {
  let score = 0;
  let maxScore = 0;

  // Skills matching (40% weight)
  const skillWeight = 40;
  const matchingSkills = job.skills.filter(skill => 
    profile.skills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  const skillScore = matchingSkills.length / job.skills.length;
  score += skillScore * skillWeight;
  maxScore += skillWeight;

  // Experience level matching (30% weight)
  const expWeight = 30;
  const expMapping: { [key: string]: string[] } = {
    'entry': ['Entry Level'],
    'mid': ['Entry Level', 'Mid Level'],
    'senior': ['Mid Level', 'Senior Level'],
    'lead': ['Senior Level', 'Lead/Principal']
  };
  
  if (expMapping[profile.experience]?.includes(job.experience)) {
    score += expWeight;
  }
  maxScore += expWeight;

  // Job type matching (20% weight)
  const typeWeight = 20;
  if (job.type.toLowerCase().includes(profile.jobType.toLowerCase()) ||
      profile.jobType === 'remote' && job.location.toLowerCase().includes('remote')) {
    score += typeWeight;
  }
  maxScore += typeWeight;

  // Location matching (10% weight)
  const locationWeight = 10;
  if (profile.location && 
      (job.location.toLowerCase().includes(profile.location.toLowerCase()) ||
       job.location.toLowerCase().includes('remote') ||
       profile.location.toLowerCase().includes('remote'))) {
    score += locationWeight;
  }
  maxScore += locationWeight;

  return Math.round((score / maxScore) * 100);
};

export const getJobRecommendations = (profile: UserProfile, jobs: Job[]): Job[] => {
  const jobsWithScores = jobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(job, profile)
  }));

  return jobsWithScores
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 8); // Return top 8 matches
};