import React from 'react';
import Input from '../styles/input';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {io} from 'socket.io-client';
function Chats(){
    const userData = JSON.parse(localStorage.getItem('userDataa'));

    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selectedConversation, setselectedConversation] = useState(null);
    const messageRef = useRef(null);
    console.log('userdata displayin :>>', userData);
    useEffect(() =>{
        setSocket(io('http://localhost:8080'));
    }, []);

    useEffect(() =>{
        socket?.emit('addUser', userData?.id);
        socket?.on('getUser', (user) =>{
            console.log('activeUsers :>>', users);
        });
        socket?.on('getMessage', (data) => {
            console.log("inside socket .on :",userData);
            setMessages((prev) => ({
                ...prev,
                messages: [...prev.messages, {user: userData, message: data.message}],
            }));
        });
    }, [socket]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({behaviour: 'smooth'});
    }, [messages?.messages]);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userDataa'));

        const fetchConversations = async() => {
            const res = await fetch(`http://localhost:8004/api/conversations/${userData?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await res.json();
            setConversations(resData);
        }
        fetchConversations();
    }, [])
    
    console.log('conversations :>>', conversations);
    const fetchMessages = async(conversationId, receiver) => {
        //const selected = selectedConversation || {conversationId, user: receiver};
        const res = await fetch(`http://localhost:8004/api/message/${conversationId}?senderId=${userData?.id}&&receiverId=${receiver.receiverId}`,{
            method: 'GET',
            headers: {
                'Content-type':'application/json',
            },
           
        });
        const resData = await res.json()
        setMessages({ messages: resData, receiver, conversationId})
    }
console.log('messages :>>', messages);

const sendMessage = async(e) => {
    setMessage('');
    socket?.emit('sendMessage', {
        senderId: userData?.id,
        receiverId: messages?.receiver?.receiverId,
        message,
        conversationId: messages?.conversationId,
    });
    const res = await fetch(`http://localhost:8004/api/message`, {
        method: "POST",
        headers: {
            'content-type':"application/json",
        },
        body: JSON.stringify({
            conversationId: messages?.conversationId,
            senderId: userData?.id,
            message,
            receiverId: messages?.receiver?.receiverId
        }),
    });
    //setMessage('')
};
useEffect(() => {
    const fetchUsers = async () => { 
        try {
            const pincodeToFilterBy = userData.pincode;
            const res = await fetch(`http://localhost:8004/api/users/${pincodeToFilterBy}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (res.status === 200) {
                const resData = await res.json();
                console.log('Response from API:', resData); // Log the response data
                setUsers(resData);
            } else {
                console.error('Error fetching users. Status code:', res.status);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    fetchUsers();
}, []);

const fileInputRef = useRef(null);

const handleFileUpload = async (e) => {
  const files = e.target.files;

  if (files.length === 0) {
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const response = await fetch('http://localhost:8004/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // File(s) uploaded successfully, you can handle the response here.
      console.log('File(s) uploaded successfully');
    } else {
      // Handle the error if file upload fails.
      console.error('File upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const openFileInput = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
      }
};



console.log('users :>>', users);
console.log("messages seeing ",messages);
    return (
        <div className='w-screen flex'>
            <div className='w-[25%] h-screen bg-slate-900 border border-black overflow-hidden'>
            <div style={{ overflowY: 'scroll', maxHeight: '100%', paddingRight: '17px' ,marginRight: '-17px' }}>
                <div className='flex justify-center items-center h-[15%]'>
                    <div className='flex items-center'>
                        <div>
                            <svg class="h-12 w-12 text-green-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>

                        </div>
                        <div className='ml-8'>
                            <h3 className='text-2xl'>{userData?.name}</h3>
                            <p className='text-lg font-light'>My Account</p>
                        </div>
                    </div>
                </div>
                <div className='mx-14 mt-10'>
                    <div className='text-primary text-lg'>Messages</div>
                    <div>
                        {
                          conversations.length > 0?
                            conversations.map(({conversationId, user , lastMessage}) => {
                                console.log('conversation :>>', conversations);
                                return(
                                    <div  className={`flex items-center py-8 border-b border-b-gray-580 ${ selectedConversation?.conversationId === conversationId ? 'bg-primary text-white' : ''}`}
                                    key={conversationId}
                                        onClick={() => {
                                            fetchMessages(conversationId, user);
                                            setselectedConversation({conversationId, user});
                                        }}
                                    >
                                        <div className='cursor-pointer flex items-center'>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold'>{user?.name}</h3>
                                            <p className='text-sm font-light '>{user?.email}</p>
                                            
                                        </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className='text-center text-lg font-semibold mt-24'>noconversations</div>
                        }
                    </div>
                </div>
            </div>
            </div>
            <div className='w-[50%] h-screen bg-white flex flex-col items-center' style={{ backgroundImage: 'url("https://i.pinimg.com/originals/ee/a2/ab/eea2abd0eafdcaffbf4287bf9ff6b394.png")' }}>
                {
                    messages?.receiver?.name && 
                
                <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2'>
                    <div className='ml-6 mr-auto'>
                        <h3 className='cursor-pointer text-lg'>{messages?.receiver?.name}</h3>
                        <p className='text-sm font-light text-white-600'>{messages?.receiver?.email}</p>
                    </div>
                    <div>
                        
                    </div>
                </div>   
                }
                <div className='h-[75%]  w-full overflow-hidden  shadow-sm'>
                <div style={{ overflowY: 'scroll', maxHeight: '100%', paddingRight: '17px' ,marginRight: '-17px' }}>
                    <div className='h-[1000px] px-10 p-14'>
                        {messages?.messages?.length > 0 ? (
                           
                            messages.messages.map(({ message, user: { id } = {} }) => {
                                console.log("id : ",id);
                                console.log("used.id ",userData.id);
                                return (
                                    <>
                                        <div
                                            className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                                                id === userData?.id ? 'bg-primary text-white rounded-tl-xl ml-auto' : 'bg-white text-black rounded-tr-xl'
                                            } `}
                                        >
                                            {message}
                                        </div>
                                        <div ref={messageRef}></div>
                                    </>
                                );
                            })
                        ) : (
                            <div className='text-center text-lg text-white font-semibold mt-24'>
                                No Messages or No Conversation Selected
                                <p>Please select any of the users on right or left to chat</p>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                {
                    messages?.receiver?.name &&
                    <div className='p-14 w-full flex items-center'>
                        <Input placeholder='type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-white focus: ring-0 focus:border-0 outline-none'/>
                        <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
                            <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-send'
                            width='30'
                            height='30'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='#2c3e50'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <line x1='10' y1='14' x2='21' y2='3' />
                            <path d='M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5' />
                            </svg>
                        </div>
                        {/* <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
                            <label htmlFor='fileInput' onClick={openFileInput}>
                                <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-circle-plus'
                                width='30'
                                height='30'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='#2c3e50'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                >
                                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                <circle cx='12' cy='12' r='9' />
                                <line x1='9' y1='12' x2='15' y2='12' />
                                <line x1='12' y1='9' x2='12' y2='15' />
                                </svg>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                multiple
                                style={{display: 'none'}}
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                />
                        </div> */}
                    </div>
                }
                
            </div>
    
            <div className='w-[25%] h-screen bg-slate-900 px-8 py-16 overflow-hidden'>
                <div style={{ overflowY: 'scroll', maxHeight: '100%', paddingRight: '17px' ,marginRight: '-17px' }}>
                <div className='text-primary text-lg'>People</div>
                <div>
                        {
                          users.length > 0?
                            users.map(({userId, user}) => {
                                
                                return(
                                    <div  className='flex items-center py-8 border-b border-b-black'>
                                        <div className='cursor-pointer flex items-center' key={userId} onClick={() => fetchMessages('new', user)}>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold text-white'>{user?.name}</h3>
                                            <p className='text-sm font-light text-green-600'>{user?.email}</p>
                                        </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className='text-center text-lg font-semibold mt-24'>noconversations</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;