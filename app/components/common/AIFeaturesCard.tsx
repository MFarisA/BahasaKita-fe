import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const AIFeaturesCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">AI-Powered Learning</CardTitle>
      <CardDescription>
        Use Gemini AI and Text-to-Speech to enhance your language learning
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Practice pronunciation, get instant translations, and receive
        personalized learning assistance.
      </p>
    </CardContent>
    <CardFooter>
      <Link href="/ai-features" className="w-full">
        <Button size="sm" className="w-full bg-slate-300">
          Try AI Features
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default AIFeaturesCard;
