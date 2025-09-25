import React, {useState, useRef, useEffect} from "react";

const ChatBox = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showChatOptions, setShowChatOptions] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	const handleToggleChatOptions = () => {
		setShowChatOptions((prev) => !prev);
	};

	const toggleChat = () => {
		setIsOpen((prev) => !prev);
		setShowChatOptions(false);
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isTyping]);

	const handleSend = async () => {
		if (input.trim()) {
			const newMessage = {fromUser: true, text: input};
			setMessages((prev) => [...prev, newMessage]);
			setInput("");
			setIsTyping(true);

			try {
				const response = await fetch("http://localhost:8000/api/v1/openai/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({message: input}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				// Giả sử API trả về { reply: "..." }
				const botReply = {
					fromUser: false,
					text: data.reply || "Xin lỗi, tôi không hiểu câu hỏi của bạn.",
				};

				setMessages((prev) => [...prev, botReply]);
			} catch (error) {
				console.error("Error fetching bot reply:", error);
				setMessages((prev) => [
					...prev,
					{
						fromUser: false,
						text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
					},
				]);
			} finally {
				setIsTyping(false);
			}
		}
	};
	return (
		<div className="fixed bottom-20 left-5 z-50 w-80 font-sans flex flex-col items-start">
			{/* 3 icon chat options với chữ nằm ngang */}
			{showChatOptions && (
				<div className="mb-3 flex flex-col gap-3 w-full">
					{/* Messenger */}
					<a
						href="https://m.me/yourpage" // Thay bằng link Messenger của bạn
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-3 shadow-lg transition"
						title="Chat với chúng tôi qua Messenger"
					>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png" alt="Messenger Logo" className="w-10 h-10 flex-shrink-0" />
						<span className="font-medium text-base">Chat với chúng tôi qua Messenger</span>
					</a>

					{/* Zalo */}
					<a
						href="https://zalo.me/yourid" // Thay bằng link Zalo của bạn
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-3 shadow-lg transition"
						title="Chat với chúng tôi qua Zalo"
					>
						<img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="Zalo Logo" className="w-10 h-10 flex-shrink-0" />
						<span className="font-medium text-base">Chat với chúng tôi qua Zalo</span>
					</a>

					{/* Chatbot tự động */}
					<button
						onClick={() => {
							setIsOpen(true);
							setShowChatOptions(false);
						}}
						className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-3 shadow-lg transition w-full"
						title="Chat với chatbot tự động"
					>
						<img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="Chatbot Logo" className="w-10 h-10 flex-shrink-0" />
						<span className="font-medium text-base">Chat với chatbot tự động</span>
					</button>
				</div>
			)}

			{/* Nút mở chat chính (nút tròn lớn) */}
			{!isOpen && (
				<button onClick={handleToggleChatOptions} className="bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white focus:outline-none transition duration-200" title="Chat">
					<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
						<path d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 9h12v2H6V9zm0-3h12v2H6V6z" />
					</svg>
				</button>
			)}

			{/* Chatbox chính */}
			{isOpen && (
				<div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-300 flex flex-col h-[500px] w-full max-w-md mt-4">
					{/* Header */}
					<div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
						<span className="font-semibold text-lg flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
								<path d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 9h12v2H6V9zm0-3h12v2H6V6z" />
							</svg>
							Chatbot tự động
						</span>
						<button onClick={toggleChat} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition focus:outline-none shadow-md" title="Đóng chat">
							<span className="text-xl font-bold select-none">&times;</span>
						</button>
					</div>

					{/* Nội dung chat */}
					<div className="flex-1 px-3 py-2 overflow-y-auto bg-gray-50 space-y-4">
						{messages.map((msg, index) => (
							<div key={index} className={`flex ${msg.fromUser ? "justify-end" : "justify-start"} items-start gap-2`}>
								{!msg.fromUser && (
									<div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
											<path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
										</svg>
									</div>
								)}

								<div className={`px-4 py-2 rounded-xl text-sm max-w-[75%] leading-relaxed ${msg.fromUser ? "bg-blue-600 text-white rounded-br-none" : "bg-blue-100 text-gray-800 rounded-bl-none"}`}>{msg.text}</div>
							</div>
						))}

						{isTyping && (
							<div className="flex justify-start items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
										<path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
									</svg>
								</div>
								<div className="px-4 py-2 rounded-xl text-sm max-w-[25%] bg-blue-100 text-gray-800 rounded-bl-none">
									<span className="animate-pulse">Typing...</span>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className="border-t border-gray-300 p-2 flex items-center gap-2">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSend();
								}
							}}
							placeholder="Message..."
							rows={1}
							className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
							style={{minHeight: "36px"}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatBox;
