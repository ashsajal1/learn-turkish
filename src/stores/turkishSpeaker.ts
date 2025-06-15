import { defineStore } from 'pinia';

export const useTurkishSpeakerStore = defineStore('turkishSpeaker', {
  state: () => ({
    isSpeaking: false,
    lastText: '',
  }),
  actions: {
    speak(text: string) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const trVoice = voices.find(v => v.lang && v.lang.startsWith('tr'));
        if (trVoice) {
          utter.voice = trVoice;
        }
        utter.lang = 'tr-TR';
        this.isSpeaking = true;
        this.lastText = text;
        utter.onend = () => { this.isSpeaking = false; };
        window.speechSynthesis.speak(utter);
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
