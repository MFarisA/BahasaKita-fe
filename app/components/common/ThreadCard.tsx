import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { ForumThread } from "../../data/forumThreadsData";

interface ThreadCardProps {
  thread: ForumThread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg hover:text-indigo-700 cursor-pointer">
              {thread.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={thread.author.avatar}
                  alt={thread.author.name}
                />
                <AvatarFallback>
                  {thread.author.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span>{thread.author.name}</span>
              <span className="text-xs text-slate-400">
                • {thread.lastActivity}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 line-clamp-2">{thread.preview}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-indigo-50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {thread.replies} replies
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" /> {thread.likes} likes
          </span>
        </div>
        <Button variant="ghost" size="sm">
          View Thread
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
