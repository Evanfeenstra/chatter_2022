export default function Message(props) {
  // add the date
  // add the username
  // add a pic
  // props.fromMe
  return (
    <div
      className="message-row"
      style={{ flexDirection: props.fromMe ? "row-reverse" : "row" }}
    >
      <div className="message">
        <span className="message-user">{props.user}</span>
        <span>{props.text}</span>
      </div>
    </div>
  );
}
