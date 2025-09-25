import logo from "./logo.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import {createBrowserHistory} from "history";
import {Router, Switch} from "react-router-dom";
import {HomeTemplate} from "./templates/HomeTemplate";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AlertAll from "./components/Alert/AlertAll";
import Payment from "./pages/Payment";
import ModalInfo from "./components/Modal/ModalInfo";
import TicketManagement from "./components/UserManagement/TicketManagement";
import InfoManagement from "./components/UserManagement/InfoManagement";
import CommentManagement from "./components/UserManagement/CommentManagement";

import AdminTemplate from "./templates/Admin/AdminTemplate";
import AdminTicket from "./pages/Admin/AdminTicket";
import AdminVehicle from "./pages/Admin/AdminVehicle";
import AdminTrip from "./pages/Admin/AdminTrip";
import AdminUser from "./pages/Admin/AdminUser";
import AdminPassenger from "./pages/Admin/AdminPassenger";
import AdminStation from "./pages/Admin/AdminStation";

import AdminTripPassenger from "./pages/Admin/AdminTripPassenger";
import DrawerForm from "./components/Drawer/DrawerForm";
import AdminTurnOver from "./pages/Admin/AdminTurnOver/AdminTurnOver";
import AddTrip from "./components/Add/AddTrip";
import MapPoint from "./components/Map/MapPoint";
import PaymentSuccess from "./pages/PaymentSuccess";
import StationMienDong from "./components/Station/StationMienDong";
import StationQuyNhon from "./components/Station/StationQuyNhon";
import StationBaTri from "./components/Station/StationBaTri";
import StationMyDinh from "./components/Station/StationMyDinh";
import ChangePassword from "./components/UserManagement/ChangePassword";
import Article1 from "./components/Article/Article1";
import Article2 from "./components/Article/Article2";
import Article3 from "./components/Article/Article3";
import Rental1 from "./components/Rental/Rental1";
import Rental2 from "./components/Rental/Rental2";
import Rental3 from "./components/Rental/Rental3";
import Rental4 from "./components/Rental/Rental4";
import Feature1 from "./components/Feature/Feature1";
import Feature2 from "./components/Feature/Feature2";
import Feature3 from "./components/Feature/Feature3";
import Feature4 from "./components/Feature/Feature4";
import Endow1 from "./components/Endow/Endow1";
import Endow2 from "./components/Endow/Endow2";
import Endow3 from "./components/Endow/Endow3";
import Endow4 from "./components/Endow/Endow4";
import AdminVoucher from "./pages/Admin/AdminVoucher";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<AlertAll />
			<ModalInfo />
			<DrawerForm />

			<Switch>
				<Payment path="/payment" exact />
				<PaymentSuccess path="/payment-success" exact />

				<HomeTemplate path="/station/miendong" exact Component={StationMienDong} />
				<HomeTemplate path="/station/quynhon" exact Component={StationQuyNhon} />
				<HomeTemplate path="/station/batri" exact Component={StationBaTri} />
				<HomeTemplate path="/station/mydinh" exact Component={StationMyDinh} />

				<HomeTemplate path="/article1" exact Component={Article1} />
				<HomeTemplate path="/article2" exact Component={Article2} />
				<HomeTemplate path="/article3" exact Component={Article3} />

				<HomeTemplate path="/rental1" exact Component={Rental1} />
				<HomeTemplate path="/rental2" exact Component={Rental2} />
				<HomeTemplate path="/rental3" exact Component={Rental3} />
				<HomeTemplate path="/rental4" exact Component={Rental4} />

				<HomeTemplate path="/feature1" exact Component={Feature1} />
				<HomeTemplate path="/feature2" exact Component={Feature2} />
				<HomeTemplate path="/feature3" exact Component={Feature3} />
				<HomeTemplate path="/feature4" exact Component={Feature4} />

				<HomeTemplate path="/endow1" exact Component={Endow1} />
				<HomeTemplate path="/endow2" exact Component={Endow2} />
				<HomeTemplate path="/endow3" exact Component={Endow3} />
				<HomeTemplate path="/endow4" exact Component={Endow4} />

				<AdminTemplate path="/admin/ticket" exact Component={AdminTicket} />
				<AdminTemplate path="/admin/vehicle" exact Component={AdminVehicle} />
				<AdminTemplate path="/admin/trip" exact Component={AdminTrip} />
				<AdminTemplate path="/admin/station" exact Component={AdminStation} />
				<MapPoint path="/mappoint" exact />
				<AdminTemplate path="/admin/addtrip" exact Component={AddTrip} />
				<AdminTemplate path="/admin/trip/tripPassenger/:id" exact Component={AdminTripPassenger} />
				<AdminTemplate path="/admin/user" exact Component={AdminUser} />
				<AdminTemplate path="/admin/voucher" exact Component={AdminVoucher} />
				<AdminTemplate path="/admin/turnover" exact Component={AdminTurnOver} />
				<AdminTemplate path="/admin" exact Component={AdminUser} />
				<AdminTemplate path="/admin/passenger" exact Component={AdminPassenger} />
				<HomeTemplate path="/booking" exact Component={Booking} />
				<HomeTemplate path="/ticketmgt" exact Component={TicketManagement} />
				<HomeTemplate path="/changepassword" exact Component={ChangePassword} />
				<HomeTemplate path="/usermgt" exact Component={InfoManagement} />
				<HomeTemplate path="/commentmgt" exact Component={CommentManagement} />
				<HomeTemplate path="/booking" exact Component={Booking} />
				<HomeTemplate path="/booking/:id/:from/:to/:start" exact Component={Booking} />
				<HomeTemplate path="/" exact Component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
