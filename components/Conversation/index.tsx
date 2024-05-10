import { useAppContext } from "@/contexts/appContext";
import interactionGemini, { TeacherPersonality } from "@/lib/geminiClient";
import { GenerateContentResult } from "@google/generative-ai";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';

const Conversation = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { personality } = useAppContext();
    const [message, setMessage] = useState<string>('');
    const [resultG, setResultG] = useState<string>();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendMessage = async () => {
        if (!message) return; // Check if there's a message to send

        try {
            const response = await interactionGemini(message, personality as TeacherPersonality);
            // Update the conversation UI with the response
            // setResultG(response());
            updateConversation(response()); // Replace `console.log(response)` with this line
        } catch (error) {
            console.error(error); // Handle any errors
        } finally {
            setMessage(''); // Clear the input field after sending
            // console.log(resultG);
        }
    };

    const updateConversation = (response: string) => {
        const messages = document.getElementById('messages');
        if (!messages) return;

        const message = document.createElement('div');
        message.className = 'message';
        message.innerHTML = `
            <div class="top">Você - ${new Date().toLocaleTimeString()}</div>
            <div class="body">${response}</div>
        `;

        messages.appendChild(message);
    };

    useEffect(scrollToBottom, []);

    return (
        <div id="app">
            <div id="top">
                <div id="user-info">
                    <Image
                        src={'/imgs/default.jpeg'}
                        width={50}
                        height={50}
                        alt="Mulher asiatica com gorro preto, óculos e cabelo preto até os ombros"
                    />

                    <div id="user-status">
                        <strong>Cecilia Sassaki</strong>
                        <div className="status">Online</div>
                    </div>
                </div>
                <div id="close-chat">
                    <i className="ph-x-fill"></i>
                </div>
            </div>
            <div ref={messagesEndRef} id="messages">
                <div id="last-seen">Hoje 11:30</div>

                <div className="messages">
                    <div className="message">
                        <div className="top">Cecilia - 11:30</div>
                        <div className="body">Tive uma ideia incrível para um projeto! 😍</div>
                    </div>
                    <div className="message you">
                        <div className="top">Você - 11:32</div>
                        <div className="body">Sério? Me conta mais.</div>
                    </div>
                    <div className="message">
                        <div className="top">Cecilia - 11:34</div>
                        <div className="body">
                            E se a gente fizesse um chat moderno e responsivo em apenas uma
                            semana?
                        </div>
                    </div>
                    <div className="message you">
                        <div className="top">Você - 11:36</div>
                        <div className="body"><strong>#boraCodar! 🚀</strong></div>
                    </div>
                </div>
            </div>
            <div id="bottom">
                <input
                    type="text"
                    placeholder="Digite sua mensagem"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();

                        if (message) {
                            handleSendMessage();
                        }
                    }}
                >
                    <Image src={'/imgs/paper-plane-right.svg'} width={24} height={24} alt="Ícone de envio" />
                </button>
            </div>
        </div>
    );
};

export default Conversation;
