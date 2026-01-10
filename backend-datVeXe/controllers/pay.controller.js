let isPaid = false;

const crypto = require("crypto");

const paymentController = async (req1, res2) => {
	const {totalAmount, passenger} = req1.body;
	console.log("📦 Dữ liệu từ frontend gửi lên:", req1.body);
	try {
		var partnerCode = "MOMOS9RM20220403";
		var accessKey = "FuDjG1pMnaxTUCwR";
		var secretkey = "v1jzHpgbyyzOfrMBy33ywii1mPxqV3Er";
		var requestId = partnerCode + new Date().getTime();
		var orderId = requestId;
		var orderInfo = `Đặt vé xe  ${passenger}`;
		var redirectUrl = "http://localhost:3000/payment-success";
		var ipnUrl = "https://6d82114d0dae.ngrok-free.app/api/v1/payment/callback"; // Thay đổi URL callback
		var amount = totalAmount;
		var requestType = "captureWallet";
		var extraData = ""; // pass empty value if your merchant does not have stores

		// before sign HMAC SHA256 with format
		var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

		console.log("--------------------RAW SIGNATURE----------------");
		console.log(rawSignature);

		const crypto = require("crypto");
		var signature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

		console.log("--------------------SIGNATURE----------------");
		console.log(signature);

		const requestBody = JSON.stringify({
			partnerCode: partnerCode,
			accessKey: accessKey,
			requestId: requestId,
			amount: amount,
			orderId: orderId,
			orderInfo: orderInfo,
			redirectUrl: redirectUrl,
			ipnUrl: ipnUrl,
			extraData: extraData,
			requestType: requestType,
			signature: signature,
			lang: "en",
		});

		const options = {
			hostname: "test-payment.momo.vn",
			port: 443,
			path: "/v2/gateway/api/create",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(requestBody),
			},
		};

		const https = require("https");

		const req = https.request(options, (res) => {
			console.log(`Status: ${res.statusCode}`);
			console.log(`Headers: ${JSON.stringify(res.headers)}`);
			res.setEncoding("utf8");
			res.on("data", (body) => {
				console.log("Body: ");
				console.log(body);
				console.log("payUrl: ");
				res2.status(200).send(body);
			});
			res.on("end", () => {
				console.log("No more data in response.");
			});
		});

		req.on("error", (e) => {
			console.log(`Problem with request: ${e.message}`);
		});

		// Write data to request body
		console.log("Sending....");
		req.write(requestBody);
		req.end();
	} catch (error) {
		console.error(error);
	}
};

const paymentCallback = (req, res) => {
	console.log("------------- MoMo Callback Received -------------");
	const data = req.body;
	console.log(data);

	// Thay bằng thông tin config của bạn
	const partnerCode = "MOMOS9RM20220403";
	const accessKey = "FuDjG1pMnaxTUCwR";
	const secretKey = "v1jzHpgbyyzOfrMBy33ywii1mPxqV3Er";

	const rawSignature = `accessKey=${accessKey}` + `&amount=${data.amount}` + `&extraData=${data.extraData}` + `&message=${data.message}` + `&orderId=${data.orderId}` + `&orderInfo=${data.orderInfo}` + `&orderType=${data.orderType}` + `&partnerCode=${partnerCode}` + `&payType=${data.payType}` + `&requestId=${data.requestId}` + `&responseTime=${data.responseTime}` + `&resultCode=${data.resultCode}` + `&transId=${data.transId}`;

	const generatedSignature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

	if (generatedSignature !== data.signature) {
		console.log("Invalid signature");
		return res.status(400).json({
			resultCode: 1,
			message: "Invalid signature",
		});
	}

	if (data.resultCode !== 0) {
		console.log("Payment failed:", data.message);
		return res.status(200).json({
			resultCode: data.resultCode,
			message: "Payment failed",
		});
	}

	console.log("Payment successful");

	// Trả về cho MoMo xác nhận callback đã xử lý thành công
	res.status(200).json({
		resultCode: 0,
		message: "Confirm success",
	});
};

const checkPaymentStatus = (req, res) => {
	res.status(200).json({isPaid});
};

module.exports = {
	paymentController,
	paymentCallback,
	checkPaymentStatus,
};
