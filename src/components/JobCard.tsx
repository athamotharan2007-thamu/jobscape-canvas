import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, Building } from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  matchScore?: number;
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
}

export const JobCard = ({ job, onApply }: JobCardProps) => {
  const handleApply = () => {
    onApply?.(job.id);
  };

  return (
    <Card className="bg-job-card hover:bg-job-card-hover shadow-card hover:shadow-card-hover transition-all duration-300 border-0 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          {job.matchScore && (
            <div className="bg-gradient-hero text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {job.matchScore}% Match
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{job.experience}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="bg-skill-tag text-skill-tag-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Button 
            onClick={handleApply}
            className="w-full bg-gradient-hero hover:shadow-card-hover transition-all duration-300"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};