import { makeStyles } from "@fluentui/react-components";

const useChatStyles = makeStyles({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "10px",
  },
  messageList: {
    flex: 1,
    overflowY: "scroll",
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: "10px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
  message: {},
  userMessage: {
    alignSelf: "flex-end",
    padding: "10px",
    borderRadius: "10px",
  },
  copilotMessage: {
    alignSelf: "flex-start",
    padding: "10px",
    borderRadius: "10px",
  },
});

export default useChatStyles;
