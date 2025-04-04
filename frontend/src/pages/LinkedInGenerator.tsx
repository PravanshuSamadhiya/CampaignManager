
import Layout from "@/components/layout/Layout";
import LinkedInMessageGenerator from "@/components/linkedin/LinkedInMessageGenerator";

const LinkedInGenerator = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">LinkedIn Message Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate personalized LinkedIn messages based on profile data
        </p>
      </div>
      <LinkedInMessageGenerator />
    </Layout>
  );
};

export default LinkedInGenerator;
