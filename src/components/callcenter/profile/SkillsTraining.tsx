
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock } from "lucide-react";

const SkillsTraining: React.FC = () => {
  // Mock skills data
  const skills = [
    { name: "Technical Support", level: "Expert", years: 5 },
    { name: "Healthcare Devices", level: "Advanced", years: 4 },
    { name: "Customer Service", level: "Expert", years: 7 },
    { name: "Medical Terminology", level: "Intermediate", years: 3 },
    { name: "Spanish Language", level: "Fluent", years: "Native" },
    { name: "Client Relationship Management", level: "Advanced", years: 5 },
  ];
  
  // Mock training courses
  const trainings = [
    { id: 1, title: "Advanced Medical Device Troubleshooting", status: "Completed", date: "March 15, 2023", progress: 100 },
    { id: 2, title: "Customer Satisfaction and Retention", status: "Completed", date: "May 22, 2023", progress: 100 },
    { id: 3, title: "Emergency Response Protocol", status: "In Progress", date: "Current", progress: 65 },
    { id: 4, title: "New Glucose Monitor Systems", status: "Not Started", date: "Upcoming", progress: 0 },
  ];
  
  const handleEnrollCourse = () => {
    console.log("Training enrollment will be available soon");
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Skills & Training</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium mb-3">Skills & Expertise</h4>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {skills.map((skill, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-xs text-muted-foreground">{typeof skill.years === "number" ? `${skill.years} years` : skill.years}</p>
                    </div>
                    <Badge 
                      className={
                        skill.level === "Expert" ? "bg-green-100 text-green-800" :
                        skill.level === "Advanced" ? "bg-blue-100 text-blue-800" :
                        skill.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                        skill.level === "Fluent" ? "bg-purple-100 text-purple-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {skill.level}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-medium">Training & Certifications</h4>
            <Button size="sm" variant="outline" onClick={handleEnrollCourse}>
              Enroll in Course
            </Button>
          </div>
          
          <div className="space-y-3">
            {trainings.map(training => (
              <Card key={training.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-sm font-medium">{training.title}</CardTitle>
                      <CardDescription className="text-xs flex items-center mt-1">
                        {training.status === "Completed" ? (
                          <Award className="h-3 w-3 mr-1 text-green-500" />
                        ) : training.status === "In Progress" ? (
                          <Clock className="h-3 w-3 mr-1 text-blue-500" />
                        ) : (
                          <BookOpen className="h-3 w-3 mr-1 text-gray-500" />
                        )}
                        {training.date}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        training.status === "Completed" ? "bg-green-100 text-green-800" :
                        training.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {training.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {training.status === "In Progress" && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTraining;
