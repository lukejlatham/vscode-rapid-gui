import { makeStyles } from "@fluentui/react-components";

const useChatStyles = makeStyles({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "20px",
    gap: "10px",
    overflow: "scroll",
  },
  messageList: {
    flex: 1,
    overflowY: "scroll",
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    alignItems: "left",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    padding: "5px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
  message: {},
  userMessage: {
    alignSelf: "flex-end",
    font: "Segoe UI",
  },
  copilotMessage: {
    alignSelf: "flex-start",
    font: "Segoe UI",
  },
});

export default useChatStyles;
