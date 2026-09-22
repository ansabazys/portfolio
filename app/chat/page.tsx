import React from "react";
import { Container } from "@/components/ui/Container";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Chat Assistant",
  description:
    "Chat with Ansab Azys's AI portfolio assistant about projects, tech stack, services, and background.",
});

export default function ChatPage() {
  return (
    <main className="flex-1 flex flex-col min-h-0 h-[calc(100dvh-88px)] md:h-screen pt-2 sm:pt-4 md:pt-12 lg:pt-16 pb-4 sm:pb-6 md:pb-8">
      <Container size="md" className="flex-1 flex flex-col min-h-0 h-full">
        <div className="max-w-md w-full flex-1 flex flex-col min-h-0 h-full">
          <h1 className="sr-only">Chat Assistant</h1>
          {/* Chat Component */}
          <ChatInterface />
        </div>
      </Container>
    </main>
  );
}
