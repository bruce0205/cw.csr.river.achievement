import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    headings: [],
  }),
  getters: {
    heroHeading: (state) => {
      return state.headings?.find((heading) => heading.section === "hero");
    },
    introductionHeading: (state) => {
      return state.headings?.find(
        (heading) => heading.section === "introduction"
      );
    },
    educationHeading: (state) => {
      return state.headings?.find((heading) => heading.section === "education");
    },
  },
  actions: {
    setHeadings(headings) {
      this.headings = headings;
    },
  },
});
