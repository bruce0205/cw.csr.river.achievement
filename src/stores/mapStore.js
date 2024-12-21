import { defineStore } from "pinia";
import {
  fetchMapProject,
  fetchMapDistrict,
  fetchLandmark,
} from "@/api/sheetApi";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    selectedProjectNo: null,
    selectedDistrictNo: null,
    projectList: [],
    districtList: [],
    landmarkList: [],
    actionList: [],
  }),
  getters: {
    selectedProject: (state) => {
      return state.projectList.find(
        (project) => state.selectedProjectNo === project.projectNo
      );
    },
    selectedDistrict: (state) => {
      return state.districtList.find(
        (district) =>
          state.selectedProjectNo === district.projectNo &&
          state.selectedDistrictNo === district.districtNo
      );
    },
    selectedDistrictList: (state) => {
      if (!!state.selectedProjectNo) {
        return state.districtList.filter(
          (district) => district.projectNo === state.selectedProject?.projectNo
        );
      } else {
        return [];
      }
    },
    selectedLandmarkList: (state) => {
      return state.landmarkList.filter((landmark) => {
        if (!!state.selectedDistrictNo) {
          return (
            landmark.projectNo === state.selectedProjectNo &&
            landmark.districtNo === state.selectedDistrictNo
          );
        } else {
          return landmark.projectNo === state.selectedProjectNo;
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
      this.districtList = responses[1];
      this.landmarkList = responses[2];
      this.selectedProjectNo = responses[0]?.[0]?.projectNo;
    },
    selectProject(selectedProjectNo) {
      if (this.selectedProjectNo === selectedProjectNo) return;
      this.selectedProjectNo = selectedProjectNo;
      this.selectedDistrictNo = null;
    },
  },
});
