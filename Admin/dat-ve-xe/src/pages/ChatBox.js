import React, {useState, useRef, useEffect} from "react";
import {DOMAIN1} from "../untils/setting";

// Gợi ý câu hỏi
const suggestedQuestions = ["Chính sách hoàn/hủy vé như thế nào?", "Các chương trình khuyến mãi?", "Lịch trình chuyến xe ngày mai?"];

// Câu trả lời cứng cho câu 1
const predefinedAnswers = {
	"Chính sách hoàn/hủy vé như thế nào?": "Bạn có thể hoàn hoặc hủy vé trước 24h so với giờ khởi hành, phí hoàn/hủy tùy từng loại vé. Vui lòng liên hệ hotline 0899 897 394 để được hỗ trợ chi tiết.",
};

const ChatBox = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showChatOptions, setShowChatOptions] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	const SYSTEM_PROMPT = ``;

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
	};

	useEffect(() => {
		if (isOpen && messages.length === 0) {
			setMessages([
				{
					fromUser: false,
					text: "👋 Tôi có thể giúp gì được bạn?\n⏰ Thường trả lời trong vòng 1 giờ",
				},
			]);
		}
	}, [isOpen]);

	useEffect(() => {
		scrollToBottom();
	}, [messages, isTyping]);

	const bannedWords = ["ngu", "đồ chó", "đm", "vcl"]; // thêm các từ cần lọc

	// Gửi tin nhắn lên backend (hoặc không nếu có predefined answer)
	const handleSend = async (customMessage) => {
		const msg = customMessage || input;
		if (!msg.trim()) return;

		// ---- KIỂM TRA TỪ NGỮ BẬY BẠ ----
		const msgLower = msg.toLowerCase();
		const hasBannedWord = bannedWords.some((word) => msgLower.includes(word));

		if (hasBannedWord) {
			setIsTyping(true); // bật animation "đang nghĩ"
			setTimeout(() => {
				setMessages((prev) => [...prev, {fromUser: false, text: "⚠️ Vui lòng không sử dụng từ ngữ không phù hợp!"}]);
				setInput(""); // xóa input của người dùng
				setIsTyping(false); // tắt animation "đang nghĩ"
			}, 2000); // delay 2 giây
			return; // dừng xử lý tiếp
		}

		const userMessage = {fromUser: true, text: msg};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsTyping(true);

		try {
			// Nếu có câu trả lời cứng thì hiển thị luôn
			if (predefinedAnswers[msg]) {
				setTimeout(() => {
					const botMessage = {fromUser: false, text: predefinedAnswers[msg]};
					setMessages((prev) => [...prev, botMessage]);
					setIsTyping(false);
				}, 500); // delay nhỏ để animation typing
				return;
			}

			// Trường hợp câu hỏi thứ 2: Các chương trình khuyến mãi
			if (msg === "Các chương trình khuyến mãi?") {
				const response = await fetch(`${DOMAIN1}voucher`);
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
				const data = await response.json();

				const now = new Date();

				// Lọc voucher còn hiệu lực
				const activeVouchers = data.data.filter((v) => {
					const start = new Date(v.startTime);
					const end = new Date(v.endTime);
					return now >= start && now <= end;
				});

				const replyText = activeVouchers.length > 0 ? "Các chương trình khuyến mãi hiện có:\n" + activeVouchers.map((v) => `- Mã: ${v.code}, Áp dụng: ${new Date(v.startTime).toLocaleDateString()} - ${new Date(v.endTime).toLocaleDateString()}, Giảm: ${v.discountValue}%`).join("\n") : "Hiện tại không có chương trình khuyến mãi nào hoạt động.";

				setTimeout(() => {
					setMessages((prev) => [...prev, {fromUser: false, text: replyText}]);
					setIsTyping(false);
				}, 3000); // delay 1.5s để simulate typing
				return;
			}

			if (msg === "Lịch trình chuyến xe ngày mai?") {
				const today = new Date();
				const tomorrow = new Date(today);
				tomorrow.setDate(today.getDate() + 1);

				const yyyy = tomorrow.getFullYear();
				const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
				const dd = String(tomorrow.getDate()).padStart(2, "0");
				const dateStr = `${yyyy}-${mm}-${dd}`;

				console.log("Hôm nay:", today.toLocaleDateString("vi-VN"));
				console.log("Ngày mai là:", dateStr);

				fetch(`${DOMAIN1}trips/tripbydate`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({date: dateStr}),
				})
					.then((res) => res.json())
					.then((data) => {
						let replyText = "";

						if (!data.trips || (Array.isArray(data.trips) && data.trips.length === 0)) {
							replyText = "Ngày mai không có chuyến đi nào.";
						} else {
							const tripsArray = Array.isArray(data.trips) ? data.trips : [data.trips];
							const tripMessages = tripsArray.map((trip) => `Ngày mai chúng ta sẽ có chuyến đi từ ${trip.fromProvince} đến ${trip.toProvince}.`);
							replyText = tripMessages.join("\n");
						}

						// **Thêm botMessage vào state để hiển thị chat**
						// delay 5s trước khi hiển thị
						setTimeout(() => {
							setMessages((prev) => [...prev, {fromUser: false, text: replyText}]);
							setIsTyping(false);
						}, 5000);
					})
					.catch((err) => {
						console.error("Lỗi khi gọi API:", err);
						setMessages((prev) => [...prev, {fromUser: false, text: "Có lỗi khi lấy lịch trình chuyến xe ngày mai."}]);
						setIsTyping(false);
					});

				return;
			}

			// Nếu tin nhắn có từ "hôm nay"
			if (msg.toLowerCase().includes("hôm nay")) {
				const today = new Date();

				const yyyy = today.getFullYear();
				const mm = String(today.getMonth() + 1).padStart(2, "0");
				const dd = String(today.getDate()).padStart(2, "0");
				const dateStr = `${yyyy}-${mm}-${dd}`;

				console.log("Ngày hôm nay là:", dateStr);

				fetch(`${DOMAIN1}trips/tripbydate`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({date: dateStr}),
				})
					.then((res) => res.json())
					.then((data) => {
						let replyText = "";

						if (!data.trips || (Array.isArray(data.trips) && data.trips.length === 0)) {
							replyText = "Hôm nay không có chuyến đi nào.";
						} else {
							const tripsArray = Array.isArray(data.trips) ? data.trips : [data.trips];
							const tripMessages = tripsArray.map((trip) => `Hôm nay chúng ta sẽ có chuyến đi từ ${trip.fromProvince} đến ${trip.toProvince}.`);
							replyText = tripMessages.join("\n");
						}

						// gửi reply vào chatbox
						setTimeout(() => {
							setMessages((prev) => [...prev, {fromUser: false, text: replyText}]);
							setIsTyping(false);
						}, 5000);
					})
					.catch((err) => {
						console.error("Lỗi khi gọi API:", err);
						setMessages((prev) => [...prev, {fromUser: false, text: "Có lỗi khi lấy lịch trình chuyến đi hôm nay."}]);
						setIsTyping(false);
					});

				return;
			}

			// Gửi lên backend
			const fullMessage = `${SYSTEM_PROMPT}\n\nUser: ${msg}\nAssistant:`;
			const response = await fetch(`${DOMAIN1}openai/chat`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({message: fullMessage}),
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();

			// Delay 3 giây để simulate AI "đang nghĩ"
			setTimeout(() => {
				const botReply = {
					fromUser: false,
					text: data.reply || "Xin lỗi, tôi không hiểu câu hỏi của bạn.",
				};
				setMessages((prev) => [...prev, botReply]);
				setIsTyping(false);
			}, 6000);
		} catch (error) {
			console.error("Error fetching bot reply:", error);
			setMessages((prev) => [...prev, {fromUser: false, text: "Có lỗi xảy ra. Vui lòng thử lại sau."}]);
			setIsTyping(false);
		}
	};

	// Khi người dùng click vào câu hỏi gợi ý
	const handleSuggestedQuestion = (question) => {
		handleSend(question);
	};

	const handleToggleChatOptions = () => setShowChatOptions((prev) => !prev);
	const toggleChat = () => {
		setIsOpen((prev) => !prev);
		setShowChatOptions(false);
	};

	return (
		<div className="fixed bottom-20 left-5 z-50 w-80 font-sans flex flex-col items-start">
			{/* Chat options */}
			{showChatOptions && (
				<div className="mb-3 flex flex-col gap-3 w-full">
					<a href="https://www.facebook.com/gonai.xombac/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-3 shadow-lg transition" title="Chat với chúng tôi qua Messenger">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png" alt="Messenger Logo" className="w-10 h-10 flex-shrink-0" />
						<span className="font-medium text-base">Chat với chúng tôi qua Messenger</span>
					</a>

					<span className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-3 shadow-lg transition cursor-default" title="Chat với chúng tôi qua Zalo 0899897394">
						<img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="Zalo Logo" className="w-10 h-10 flex-shrink-0" />
						<span className="font-medium text-base">Chat với chúng tôi qua Zalo 0899897394</span>
					</span>

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

			{/* Nút mở chat */}
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
						<span className="font-semibold text-lg flex items-center gap-2">Chatbot tự động</span>
						<button onClick={toggleChat} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition focus:outline-none shadow-md" title="Đóng chat">
							<span className="text-xl font-bold select-none">&times;</span>
						</button>
					</div>

					{/* Suggested questions */}
					<div className="flex flex-col gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
						{suggestedQuestions.map((q, idx) => (
							<button key={idx} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition" onClick={() => handleSuggestedQuestion(q)}>
								{q}
							</button>
						))}
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

						{/* Typing indicator */}
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
