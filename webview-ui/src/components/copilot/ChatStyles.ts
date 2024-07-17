import { makeStyles, shorthands } from "@fluentui/react-components";

const useChatStyles = makeStyles({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "20px",
    gap: "10px",
    overflow: "hidden",
  },
  messageList: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    ...shorthands.borderTop("1px", "solid", "#ccc"),
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    padding: "5px",
    ...shorthands.border("1px", "solid", "#ccc"),
    borderRadius: "2px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
  },
  message: {},
  userMessage: {
    alignSelf: "flex-end",
  },
  copilotMessage: {
    alignSelf: "flex-start",
  },
});

export default useChatStyles;
