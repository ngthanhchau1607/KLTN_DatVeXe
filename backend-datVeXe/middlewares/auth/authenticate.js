// const jwt = require("jsonwebtoken");
// const authenticate = (req, res, next) => {
//   const token = req.header("token");
//   try {
//     const decode = jwt.verify(token, "phu2000");
//     if (decode) {
//       req.user = decode;
//       next();
//     } else {
//       res.status(401).send("Bạn chưa đăng nhập");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// module.exports = {
//   authenticate,
// };

const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization"); // Lấy token từ header Authorization

//   if (!token) {
//     return res.status(401).send("Token không được cung cấp");
//   }

//   // Loại bỏ phần 'Bearer ' nếu có
//   const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

//   try {
//     // Giải mã token và lưu thông tin người dùng vào req.user
//     const decode = jwt.verify(tokenWithoutBearer, "phu2000");

//     if (decode) {
//       req.user = decode; // Lưu thông tin người dùng vào req.user
//       next(); // Tiếp tục xử lý yêu cầu
//     } else {
//       res.status(401).send("Token không hợp lệ");
//     }
//   } catch (error) {
//     res.status(500).send("Có lỗi xảy ra trong quá trình xác thực token");
//   }
// };

const authenticate = (req, res, next) => {
	// Hỗ trợ lấy token từ cả "Authorization" và "token"
	let token = req.header("Authorization") || req.header("token");

	if (!token) {
		return res.status(401).send("Token không được cung cấp");
	}

	// Nếu là "Bearer <token>" thì cắt bỏ chữ Bearer
	if (token.startsWith("Bearer ")) {
		token = token.slice(7);
	}

	try {
		const decoded = jwt.verify(token, "phu2000");
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).send("Token không hợp lệ hoặc đã hết hạn");
	}
};

module.exports = {
	authenticate,
};
