
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { runAllTests } from '@/utils/test-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Smartphone, Monitor, Tablet, ArrowRight } from 'lucide-react';

const TestingPanel: React.FC = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('flows');
  
  const handleRunTests = () => {
    const results = runAllTests();
    setTestResults(results);
    console.log("Test Results:", results);
  };
  
  const testUserFlows = [
    { name: 'New User Registration', path: '/signup' },
    { name: 'User Login', path: '/login' },
    { name: 'Product Browsing', path: '/products' },
    { name: 'View SOS Pendant', path: '/sos-pendant' },
    { name: 'View Medical Dispenser', path: '/medical-dispenser' },
    { name: 'View Glucose Monitor', path: '/glucose-monitor' },
    { name: 'Checkout Process', path: '/checkout' },
    { name: 'Member Dashboard', path: '/dashboard' },
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'Call Center', path: '/call-center' },
    { name: 'Contact Page', path: '/contact' },
    { name: 'About Us', path: '/about' },
  ];
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Testing & Quality Assurance Panel</CardTitle>
        <CardDescription>Test all aspects of the application for quality assurance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="flows">User Flows</TabsTrigger>
            <TabsTrigger value="responsive">Responsiveness</TabsTrigger>
            <TabsTrigger value="links">Links & A11y</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flows" className="space-y-4">
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Test User Flows</AlertTitle>
              <AlertDescription>
                Click on a flow to navigate through the application and test the complete user journey.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {testUserFlows.map((flow) => (
                <Button 
                  key={flow.path}
                  variant="outline" 
                  className="justify-between"
                  onClick={() => navigate(flow.path)}
                >
                  {flow.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="responsive">
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Test Responsiveness</AlertTitle>
              <AlertDescription>
                Verify the application works correctly on all device sizes.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Smartphone className="h-8 w-8 mb-2" />
                <span>Mobile</span>
                <span className="text-xs text-muted-foreground mt-1">320-639px</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Tablet className="h-8 w-8 mb-2" />
                <span>Tablet</span>
                <span className="text-xs text-muted-foreground mt-1">640-1023px</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Monitor className="h-8 w-8 mb-2" />
                <span>Desktop</span>
                <span className="text-xs text-muted-foreground mt-1">1024px+</span>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mb-4">
              Current width: {window.innerWidth}px ({testResults?.responsiveness || 'Run tests to see'})
            </div>
            
            <Button onClick={handleRunTests}>Run Responsiveness Tests</Button>
          </TabsContent>
          
          <TabsContent value="links">
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Test Links & Accessibility</AlertTitle>
              <AlertDescription>
                Verify all links work correctly and check for accessibility issues.
              </AlertDescription>
            </Alert>
            
            <Button onClick={handleRunTests} className="mb-4">Run Link & Accessibility Tests</Button>
            
            {testResults && (
              <div className="space-y-4 mt-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Link Check Results</h3>
                  <p>Total Links: {testResults.links.totalLinks}</p>
                  <p>Valid Links to Test: {testResults.links.validLinks.length}</p>
                  <p>Broken Links: {testResults.links.brokenLinks.length}</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Accessibility Check Results</h3>
                  <p>Images without alt text: {testResults.accessibility.imagesWithoutAlt}</p>
                  <p>Heading structure: {testResults.accessibility.headingLevels.join(', ')}</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">UI Elements Check</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(testResults.uiElements).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        {value ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className="capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestingPanel;
