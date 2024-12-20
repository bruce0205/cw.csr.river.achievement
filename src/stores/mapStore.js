import { defineStore } from "pinia";
import {
  fetchMapProject,
  fetchMapDistrict,
  fetchLandmark,
} from "@/api/sheetApi";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    selectedProject: null,
    selectedDistrictNo: null,
    projectList: [],
    districtList: [],
    landmarkList: [],
    actionList: [],
  }),
  getters: {
    selectedDistrictList: (state) => {
      return [];
    },
    selectedLandmarkList: (state) => {
      return state.landmarkList.filter((landmark) => {
        if (state.selectedDistrictNo === null) {
          return landmark.projectNo === state.selectedProject?.projectNo;
        } else {
          return (
            landmark.projectNo === state.selectedProject?.projectNo &&
            landmark.districtNo === state.selectedDistrictNo
          );
        }
      });
    },
  },
  actions: {
    async initMap() {
      const responses = await Promise.all([
        fetchMapProject(),
        fetchMapDistrict(),
        fetchLandmark(),
      ]);
      this.projectList = responses[0];
      this.landmarkList = responses[2];
      // TODO: set default projectNo
      this.selectedProject = responses[0]?.[0];
    },
    selectProject(selectedProjectNo) {
      if (this.selectedProject?.projectNo === selectedProjectNo) return;
      this.selectedProject = this.projectList.find(
        (project) => project.projectNo === selectedProjectNo
      );
      this.selectedDistrictNo = null;
    },
  },
});
