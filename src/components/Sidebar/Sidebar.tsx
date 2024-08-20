import React from 'react';
import { Chat } from '../../types/types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type SidebarProps = {
    chats: Chat[];
    selectedChat: Chat | null;
    handleChatSelect: (chat: Chat) => void;
    handleCreateChat: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
    chats,
    selectedChat,
    handleChatSelect,
    handleCreateChat,
}) => {
    return (
        <div className="sidebar">
            <div className='sidebar-logo'>
                <img className="logo" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s' alt='logo' />
                <Button title='Log in' />
            </div>
            <div className="chat-input">
                <Button title='Search' />
                <Input
                    type="text"
                    placeholder="Search pr start new chat"
                // value={newMessage}
                // onChange={(e) => setNewMessage(e.target.value)}
                />
            </div>
            <h2>Chats</h2>
            <ul className="chat-list">
                {chats.map((chat) => (
                    <li
                        key={chat._id}
                        className={selectedChat?._id === chat._id ? 'active' : ''}
                        onClick={() => handleChatSelect(chat)}
                    >
                        {chat.firstName} {chat.lastName}
                    </li>
                ))}
                <li onClick={handleCreateChat}>+ New Chat</li>
            </ul>
        </div>
    );
};

export default Sidebar;