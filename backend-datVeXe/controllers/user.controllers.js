const {User, sequelize} = require("../models");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const getAllUser = async (req, res) => {
	const {name} = req.query;
	try {
		if (name) {
			const userList = await User.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send(userList);
		} else {
			const userList = await User.findAll();
			res.status(200).send(userList);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const getDetailUser = async (req, res) => {
	const {id} = req.params;

	try {
		const detailUser = await User.findOne({
			where: {
				id,
			},
		});
		res.status(200).send(detailUser);
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateUser = async (req, res) => {
	const {id} = req.params;
	const {name, email, password, numberPhone, type} = req.body;
	try {
		const detailUser = await User.findOne({
			where: {
				id,
			},
		});

		// Chỉ mã hóa mật khẩu nếu có trường password trong body
		if (password) {
			var salt = bcrypt.genSaltSync(10);
			var hashPassword = bcrypt.hashSync(password, salt);
			detailUser.password = hashPassword;
		}

		// Cập nhật các trường còn lại
		detailUser.name = name;
		detailUser.email = email;
		detailUser.numberPhone = numberPhone;
		detailUser.type = type;

		await detailUser.save();
		res.status(200).send(detailUser);
	} catch (error) {
		console.error(error); // In ra lỗi trong console để dễ dàng kiểm tra
		res.status(500).send(error);
	}
};

const updateUserBooking = async (req, res) => {
	const {id} = req.params;
	const {name, numberPhone} = req.body;
	try {
		await User.update(
			{name, numberPhone},
			{
				where: {
					id,
				},
			}
		);
		const userupdate = await User.findOne({
			where: {
				id,
			},
		});
		res.status(200).send(userupdate);
	} catch (error) {
		res.status(500).send(error);
	}
};

const deleteUser = async (req, res) => {
	const {id} = req.params;
	try {
		await User.destroy({
			where: {
				id,
			},
		});
		res.status(200).send("Deleted User Successfully!");
	} catch (error) {
		res.status(500).send(error);
	}
};
const register = async (req, res) => {
	const {name, email, password, numberPhone, type} = req.body;
	console.log("check phone", numberPhone);
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (user) {
		res.status(404).send("Email đã tồn tại");
	} else {
		try {
			// Tạo một chuỗi ngẫu nhiên
			var salt = bcrypt.genSaltSync(10);
			// Mã hóa password
			var hashPassword = bcrypt.hashSync(password, salt);
			const newUser = await User.create({
				name,
				email,
				password: hashPassword,
				numberPhone,
				type,
			});

			// Trả về đối tượng người dùng dưới dạng JSON, bao gồm cả số điện thoại
			res.status(201).send(newUser.toJSON());
		} catch (error) {
			res.status(500).send(error);
		}
	}
};

const login = async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (user) {
		const isAuth = bcrypt.compareSync(password, user.password);
		if (isAuth) {
			const token = jwt.sign({email: user.email, type: user.type}, "phu2000", {expiresIn: "365d"});
			res.status(200).send({message: "Đăng nhập thành công", token: token, user});
		} else {
			res.status(404).send({message: "Mật khẩu không đúng!"});
		}
	} else {
		res.status(404).send({message: "Không tìm thấy tài khoản!"});
	}
};
const uploadAvatar = async (req, res) => {
	const {user, file} = req;
	const protocol = req.protocol;
	const host = req.headers.host;
	const fullUrlImages = `${protocol}://${host}/${file.path}`;
	const userFound = await User.findOne({
		where: {
			email: user.email,
		},
	});
	userFound.avatar = fullUrlImages;
	await userFound.save();
	res.send(file);
};
const getAllTrip = async (req, res) => {
	try {
		const [result] = await sequelize.query(
			`select users.name , tickets.trip_id from users
      inner join tickets on users.id = tickets.user_id
      inner join trips on  trips.id = tickets.trip_id 
      inner join stations as fromSta on fromSta.id = trips.fromStation
      inner join stations as toSta on toSta.id = trips.toStation
      `
		);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getUserInfo = async (req, res) => {
	const {user} = req; // Lấy thông tin người dùng đã được xác thực từ req.user

	try {
		// Tìm người dùng trong cơ sở dữ liệu dựa trên email hoặc thông tin nhận được từ token
		const userInfo = await User.findOne({
			where: {
				email: user.email, // Sử dụng email đã giải mã từ token
			},
			attributes: {
				// Chỉ trả về các thông tin cần thiết
				id: true,
				name: true,
				email: true,
				numberPhone: true,
				type: true,
				avatar: true, // Nếu có
			},
		});

		// Kiểm tra nếu không tìm thấy người dùng
		if (!userInfo) {
			return res.status(404).json({message: "Không tìm thấy người dùng."});
		}

		// Trả về thông tin người dùng trong một đối tượng data
		res.status(200).json({data: userInfo});
	} catch (error) {
		res.status(500).json({message: "Có lỗi xảy ra khi lấy thông tin người dùng."});
	}
};

const checkEmailUser = (req, res) => {
	const {email} = req.body; // Lấy email từ body
	// Kiểm tra email có đuôi @gmail.com hoặc @hcmute.edu.vn không
	if (email.endsWith("@gmail.com") || email.endsWith("@student.hcmute.edu.vn")) {
		return res.status(200).json({message: "Email hợp lệ."});
	} else {
		return res.status(400).json({message: "Email không hợp lệ"});
	}
};

// Tạo transporter để kết nối với SMTP server
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "duygpt0810@gmail.com",
		pass: "pcrp irad qtwo xtxb",
	},
});

// API gửi OTP
const sendOtpEmail = (req, res) => {
	const {email} = req.body; // Nhận email từ body của request

	if (!email) {
		return res.status(400).json({message: "Vui lòng cung cấp email."});
	}

	// Tạo mã OTP ngẫu nhiên gồm 4 chữ số
	const otp = Math.floor(1000 + Math.random() * 9000); // Mã OTP ngẫu nhiên có 4 chữ số

	// Cấu hình nội dung email
	const mailOptions = {
		from: "21110816@student.hcmute.edu.vn",
		to: email,
		subject: "Mã OTP xác thực",
		text: `Mã OTP của bạn là: ${otp}`, // Nội dung email
	};

	// Gửi email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({message: "Có lỗi xảy ra khi gửi email.", error});
		}
		console.log("Email sent: " + info.response);
		return res.status(200).json({message: "Mã OTP đã được gửi đến email của bạn.", otp});
	});
};

const changePass = async (req, res) => {
	const {id} = req.params;
	const {oldPassword, newPassword} = req.body;

	try {
		// Tìm người dùng theo ID
		const user = await User.findOne({
			where: {
				id,
			},
		});

		// Kiểm tra nếu người dùng không tồn tại
		if (!user) {
			return res.status(404).send({message: "Người dùng không tồn tại!"});
		}

		// Kiểm tra mật khẩu cũ
		const isOldPasswordValid = bcrypt.compareSync(oldPassword, user.password);
		if (!isOldPasswordValid) {
			return res.status(400).send({message: "Mật khẩu cũ không đúng!"});
		}

		// Mã hóa mật khẩu mới
		const salt = bcrypt.genSaltSync(10);
		const hashNewPassword = bcrypt.hashSync(newPassword, salt);

		// Cập nhật mật khẩu mới
		user.password = hashNewPassword;
		await user.save();

		// Trả về phản hồi thành công
		res.status(200).send({message: "Mật khẩu đã được thay đổi thành công!"});
	} catch (error) {
		console.error(error); // In ra lỗi trong console để dễ dàng kiểm tra
		res.status(500).send({message: "Có lỗi xảy ra khi thay đổi mật khẩu."});
	}
};

const resetPassword = async (req, res) => {
	const {email, newPassword} = req.body;

	try {
		// Tìm người dùng theo email
		const user = await User.findOne({where: {email}});

		if (!user) {
			return res.status(404).send({message: "Người dùng không tồn tại!"});
		}

		// Mã hóa mật khẩu mới
		const salt = bcrypt.genSaltSync(10);
		const hashNewPassword = bcrypt.hashSync(newPassword, salt);

		// Cập nhật mật khẩu mới
		user.password = hashNewPassword;
		await user.save();

		res.status(200).send({message: "Mật khẩu đã được đặt lại thành công!"});
	} catch (error) {
		console.error(error);
		res.status(500).send({message: "Có lỗi xảy ra khi đặt lại mật khẩu."});
	}
};

module.exports = {
	register,
	login,
	uploadAvatar,
	getAllTrip,
	getAllUser,
	deleteUser,
	getDetailUser,
	updateUser,
	updateUserBooking,
	getUserInfo,
	changePass,
	checkEmailUser,
	sendOtpEmail,
	resetPassword,
};
