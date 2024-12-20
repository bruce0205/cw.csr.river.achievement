import { defineStore } from "pinia";
import { fetchHeading } from "@/api/sheetApi";

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
    mapHeading: (state) => {
      return state.headings?.find((heading) => heading.section === "map");
    },
  },
  actions: {
    async setHeadings() {
      const response = await fetchHeading();
      this.headings = response;
    },
  },
});
