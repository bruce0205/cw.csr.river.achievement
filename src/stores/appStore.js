import { defineStore } from "pinia";
import { fetchSection } from "@/api/sheetApi";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    sections: [],
  }),
  getters: {
    heroSection: (state) => {
      return state.sections?.find((section) => section.section === "hero");
    },
    introductionSection: (state) => {
      return state.sections?.find(
        (section) => section.section === "introduction"
      );
    },
    educationSection: (state) => {
      return state.sections?.find((section) => section.section === "education");
    },
    mapSection: (state) => {
      return state.sections?.find((section) => section.section === "map");
    },
  },
  actions: {
    async setSections() {
      const response = await fetchSection();
      this.sections = response;
    },
  },
});
