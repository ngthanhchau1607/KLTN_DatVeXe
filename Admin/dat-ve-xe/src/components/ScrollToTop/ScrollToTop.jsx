import {useEffect} from "react";
import {withRouter} from "react-router-dom";

function ScrollToTop({location}) {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth", // bỏ nếu không muốn hiệu ứng
		});
	}, [location.pathname]);

	return null;
}

export default withRouter(ScrollToTop);
