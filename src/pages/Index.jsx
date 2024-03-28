import React, { useState } from "react";
import { Box, Text, Input, Button, VStack, HStack, Heading, IconButton, useToast } from "@chakra-ui/react";
import { FaMapMarked, FaUserPlus, FaPaperPlane } from "react-icons/fa";

const ChatRoom = ({ roomName, onExit }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim()) {
      const censoredMessage = inputValue.replace(/badword|curseword/gi, "****");
      setMessages([...messages, censoredMessage]);
      setInputValue("");
    }
  };

  return (
    <VStack spacing={4} p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <HStack justifyContent="space-between" w="full">
        <Heading size="md">{roomName}</Heading>
        <IconButton aria-label="Exit chat room" icon={<FaMapMarked />} onClick={onExit} />
      </HStack>
      <VStack spacing={3} w="full" h="300px" overflowY="auto">
        {messages.map((msg, index) => (
          <Box key={index} p={2} w="full" bg="gray.100" borderRadius="md">
            {msg}
          </Box>
        ))}
      </VStack>
      <HStack w="full">
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type a message..." />
        <IconButton aria-label="Send message" icon={<FaPaperPlane />} onClick={sendMessage} />
      </HStack>
    </VStack>
  );
};

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState(null);

  const enterRoom = (roomName) => {
    setCurrentRoom(roomName);
  };

  return (
    <Box p={8}>
      {currentRoom ? (
        <ChatRoom roomName={currentRoom} onExit={() => setCurrentRoom(null)} />
      ) : (
        <VStack spacing={4}>
          <Text fontSize="2xl">Select a chat room from the map</Text>
          {/* This is a placeholder for the map */}
          <Box w="full" h="500px" bg="gray.200" borderRadius="md">
            {/* Map with chat icons and room names would go here */}
          </Box>
          <Button leftIcon={<FaUserPlus />} onClick={() => enterRoom("Local City")}>
            Join Local City Room
          </Button>
          {/* More buttons for other rooms can be added here */}
        </VStack>
      )}
    </Box>
  );
};

export default Index;
