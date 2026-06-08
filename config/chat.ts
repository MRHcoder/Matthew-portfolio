export const chatConfig = {
  assistantName: "MattBot",

  maxInputCharacters: 3500,

  maxMessagesPerSession: 6,

  maxOutputTokens: 700,

  rateLimit: {
    requests: 5,
    windowMinutes: 10,
  },

  suggestedPrompts: [
    "How is Matthew a fit for a Technical Program Manager role?",
    "What is Matthew’s experience with cross-functional leadership?",
    "Summarize Matthew’s AI startup experience.",
  ],

  placeholder: "Ask me a question about Matthew's background, or paste a job description here to see how well Matthew matches the requirements.",

  introMessage:
    "Hi, I’m MattBot. Ask me about Matthew’s TPM experience, systems engineering background, AI startup work, or fit for a specific job description.",

  limitReachedMessage:
    "You seem interested in learning more about Matthew. Connect with him by email or LinkedIn to schedule a conversation and learn more.",

};