import { defineStore } from 'pinia';

function getTurkishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang && v.lang.toLowerCase().startsWith('tr'));
}

export const useTurkishSpeakerStore = defineStore('turkishSpeaker', {
  state: () => ({
    isSpeaking: false,
    lastText: '',
  }),
  actions: {
    speak(text: string) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const speakNow = () => {
          const utter = new window.SpeechSynthesisUtterance(text);
          utter.lang = 'tr-TR';
          const trVoice = getTurkishVoice();
          if (trVoice) {
            utter.voice = trVoice;
          }
          this.isSpeaking = true;
          this.lastText = text;
          utter.onend = () => { this.isSpeaking = false; };
          window.speechSynthesis.speak(utter);
        };
        // If voices are not loaded yet, wait for them
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            speakNow();
            window.speechSynthesis.onvoiceschanged = null;
          };
        } else {
          speakNow();
        }
      }
    },
    stop() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        this.isSpeaking = false;
      }
    }
  }
});
