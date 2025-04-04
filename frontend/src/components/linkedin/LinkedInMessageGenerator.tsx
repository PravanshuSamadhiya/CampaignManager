import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LinkedInProfile } from "@/types/linkedin";

const LinkedInMessageGenerator = () => {
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<LinkedInProfile>();
  const { toast } = useToast();

  const generateMessage = async (data: LinkedInProfile) => {
    setIsLoading(true);
    setGeneratedMessage("");

    try {
      const response = await fetch("http://localhost:3000/messages/personalized-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate message");
      }

      const result = await response.json();
      setGeneratedMessage(result.message);

      toast({
        title: "Message Generated",
        description: "Your AI-generated LinkedIn message is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate the message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: "Copied to clipboard",
      description: "Message has been copied to clipboard.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <Card className="border-purple-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">LinkedIn Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(generateMessage)} className="space-y-4">
            
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" {...register("name", { required: true })} />
            </div>

            
            <div className="grid gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="Software Engineer" {...register("jobTitle", { required: true })} />
            </div>

           
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." {...register("company", { required: true })} />
            </div>

           
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="San Francisco, CA" {...register("location", { required: true })} />
            </div>

            
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" placeholder="Write a short summary..." {...register("summary", { required: true })} />
            </div>

           
            <Button type="submit" className="w-full bg-[#643969] hover:bg-purple-800" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
      <Card className="border-purple-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Generated Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-full">
            <Textarea
              className="flex-1 min-h-[300px] mb-4"
              placeholder="Generated message will appear here..."
              value={generatedMessage}
              readOnly
            />
            <Button onClick={copyToClipboard} className="bg-[#643969] hover:bg-purple-700" disabled={!generatedMessage}>
              Copy to Clipboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInMessageGenerator;
