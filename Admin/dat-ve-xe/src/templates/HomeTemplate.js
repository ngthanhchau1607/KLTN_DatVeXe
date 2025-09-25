import {Fragment} from "react";
import {Route} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ChatBox from "../pages/ChatBox";
export const HomeTemplate = (props) => {
	const {Component, ...restProps} = props;
	return (
		<Route
			{...restProps}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Header />
						<Component {...propsRoute} />
						<Footer />
						<ChatBox />
					</Fragment>
				);
			}}
		/>
	);
};
