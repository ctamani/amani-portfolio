import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import "../styles/ConnectForm.css";


const FORM_ENDPOINT = "https://formspree.io/f/my-form-id";


export default function ConnectForm() {
  return (
    <form
      className="connect-form"
      action={FORM_ENDPOINT}
      method="POST"
    >
      <div className="connect-form-copy">
        <p className="connect-form-kicker">
          Get in touch
        </p>
      </div>

      <label className="connect-field">
        <span>Name</span>

        <div className="connect-control">
          <PersonRoundedIcon
            className="connect-field-icon"
            aria-hidden="true"
          />

          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>
      </label>

      <label className="connect-field">
        <span>Email</span>

        <div className="connect-control">
          <EmailRoundedIcon
            className="connect-field-icon"
            aria-hidden="true"
          />

          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </label>

      <label className="connect-field">
        <span>Message</span>

        <div className="connect-control connect-control-textarea">
          <ChatBubbleOutlineRoundedIcon
            className="connect-field-icon"
            aria-hidden="true"
          />

          <textarea
            name="message"
            placeholder="Write your message here..."
            required
          />
        </div>
      </label>

      <button
        type="submit"
        className="connect-submit"
      >
        <span>Send message</span>

        <ArrowForwardRoundedIcon
          aria-hidden="true"
        />
      </button>
    </form>
  );
}