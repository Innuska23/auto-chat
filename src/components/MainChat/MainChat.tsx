import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import '../../App.css';
import Sidebar from '../Sidebar/Sidebar';
import ChatWindow from '../ChatWindow/ChatWindow';
import { Chat } from '../../types/types';

// Constants
const API_URL = 'https://your-chat-api.com/api';

const INITIAL_CHATS: Chat[] = [
    { _id: '1', firstName: 'John', lastName: 'Doe' },
    { _id: '2', firstName: 'Jane', lastName: 'Doe' },
    { _id: '3', firstName: 'Bob', lastName: 'Smith' },
];

const MainChat: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        // Fetch chats from the backend
        const fetchChats = async () => {
            try {
                const response: AxiosResponse<Chat[]> = await axios.get(`${API_URL}/chats`);
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        fetchChats();
    }, []);

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat);
    };

    const handleCreateChat = async () => {
        try {
            const newChat: Chat = { _id: 'unique-id', firstName: 'New', lastName: 'User' };
            const response: AxiosResponse<Chat> = await axios.post(`${API_URL}/chats`, newChat);
            setChats([...chats, response.data]);
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    const handleUpdateChat = async (updatedChat: Chat) => {
        try {
            await axios.put(`${API_URL}/chats/${updatedChat._id}`, updatedChat);
            setChats(chats.map((chat) => (chat._id === updatedChat._id ? updatedChat : chat)));
        } catch (error) {
            console.error('Error updating chat:', error);
        }
    };

    const handleDeleteChat = async (chatId: string) => {
        try {
            await axios.delete(`${API_URL}/chats/${chatId}`);
            setChats(chats.filter((chat) => chat._id !== chatId));
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await axios.post(`${API_URL}/chats/${selectedChat?._id}/messages`, { text: newMessage });
                setNewMessage('');
                setShowToast(true);
                // Simulate auto-response after 3 seconds
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="main-chat">
            <Sidebar
                chats={chats}
                selectedChat={selectedChat}
                handleChatSelect={handleChatSelect}
                handleCreateChat={handleCreateChat}
            />
            <ChatWindow
                selectedChat={selectedChat}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleUpdateChat={handleUpdateChat}
                handleDeleteChat={handleDeleteChat}
                handleSendMessage={handleSendMessage}
            />
            {showToast && <div className="toast">Auto-response received!</div>}
        </div>
    );
};

export default MainChat;