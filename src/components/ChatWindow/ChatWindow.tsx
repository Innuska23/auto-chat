import React from 'react';
import { Chat } from '../../types/types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type ChatWindowProps = {
    selectedChat: Chat | null;
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleUpdateChat: (updatedChat: Chat) => void;
    handleDeleteChat: (chatId: string) => void;
    handleSendMessage: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
    selectedChat,
    newMessage,
    setNewMessage,
    handleUpdateChat,
    handleDeleteChat,
    handleSendMessage,
}) => {
    return (
        <div className="chat-window">
            {selectedChat && (
                <>
                    <div className="chat-header">
                        <h2>
                            {selectedChat.firstName} {selectedChat.lastName}
                        </h2>
                        <div>
                            <Button title="Edit" onClick={() => handleUpdateChat({ ...selectedChat, firstName: 'Updated', lastName: 'User' })} />
                            <Button title="Delete" onClick={() => handleDeleteChat(selectedChat._id!)} />
                        </div>
                    </div>

                    <div className="chat-messages">
                        {selectedChat.messages?.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.senderId === selectedChat._id ? 'user' : 'assistant'}`}
                            >
                                <div className="chat-message-content">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button title='Send' onClick={handleSendMessage} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatWindow;