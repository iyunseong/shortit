import styles from "./Card.module.css";

function CardFooter({ className, ...rest }) {
  return <div className={`${className} ${styles.cardFooter}`} {...rest} />;
}

export default function Card({ className, ...rest }) {
  return <div className={`${className} ${styles.card}`} {...rest} />;
}

Card.Footer = CardFooter;
