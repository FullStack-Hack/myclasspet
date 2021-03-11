import React, { useMemo, useState } from "react";
import axios from "axios";
import ReactWebChat, { createDirectLine } from "botframework-webchat";

function ChatComponent({ styleOptions }) {
  const [directLine, setDirectLine] = useState();

  useMemo(async () => {
    const res = await axios.post(
      "https://directline.botframework.com/v3/directline/tokens/generate",
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SPEECH_SECRET}`,
        },
      }
    );
    const { token } = await res.data;
    console.log(token, res);

    setDirectLine(createDirectLine({ token }));
  }, []);

  return (
    <section className="footer">
      <header>Chat component is using React {React.version}</header>
      <div className="react-container webchat">
        {!!directLine && (
          <ReactWebChat
            directLine={directLine}
            styleOptions={styleOptions}
            webSpeechPonyfillFactory={window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory(
              {
                subscriptionKey: process.env.REACT_APP_PET_SPEECH_KEY_SECRET,
                region: "eastus",
                textNormalization: "lexical",
              }
            )}
          />
        )}
      </div>
    </section>
  );
}

export default ChatComponent;
