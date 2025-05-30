"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Search,
  Filter,
  Clock,
  ThumbsUp,
  MessageCircle,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { forumThreadsData, ForumThread } from "../data/forumThreadsData";
import { popularTagsData } from "../data/popularTagsData";
import { notificationsData } from "../data/notificationsData";
import ThreadCard from "../components/common/ThreadCard";
import NavbarHome from "../components/common/NavbarHome";

const CommunityForum: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string>("Community");
  const notifications = notificationsData;

  // Data diimpor dari file data
  const forumThreads: ForumThread[] = forumThreadsData;
  const popularTags = popularTagsData;

  const filteredThreads = forumThreads.filter(
    (thread) =>
      searchQuery === "" ||
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
     <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      <NavbarHome
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        notifications={notifications}
      />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block rounded-full bg-indigo-100 p-2 mb-4">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
            Community Forum
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with fellow language learners, ask questions, share
            resources, and join the conversation.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Members</span>
                  <span className="font-medium">12,458</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Threads</span>
                  <span className="font-medium">3,721</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Posts</span>
                  <span className="font-medium">28,945</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Create Account
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" /> Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-indigo-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="h-4 w-4 mr-2" /> New Thread
              </Button>
            </div>

            {/* Threads */}
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="latest" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Latest
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" /> Popular
                </TabsTrigger>
                <TabsTrigger
                  value="unanswered"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> Unanswered
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-4">
                {filteredThreads.length > 0 ? (
                  filteredThreads.map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">
                      No threads found matching your search.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                {filteredThreads
                  .sort((a, b) => b.likes - a.likes)
                  .map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4">
                {filteredThreads
                  .filter((thread) => thread.replies === 0)
                  .map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))}
                {filteredThreads.filter((thread) => thread.replies === 0)
                  .length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-500">
                      No unanswered threads at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-indigo-100">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="mx-2">...</span>
                <Button variant="outline" size="sm">
                  12
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
