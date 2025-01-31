import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router";

function Button({ children }) {
	return (
		<Link
			className={styles.button}
			to={"/destination"}>
			{children}
		</Link>
	);
}

export default Button;
