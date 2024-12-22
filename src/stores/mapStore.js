import { defineStore } from "pinia";
import {
  fetchMapProject,
  fetchMapDistrict,
  fetchLandmark,
} from "@/api/sheetApi";
import { getAction } from "@/api/cmsApi";

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
    selectedActionList: (state) => {
      return state.actionList.find(
        (action) => state.selectedProjectNo === action.projectNo
      )?.actions;
    },
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
      // this.selectedProjectNo = responses[0]?.[0]?.projectNo;
      this.selectProject(responses[0]?.[0]?.projectNo);
    },
    async selectProject(selectedProjectNo) {
      if (this.selectedProjectNo === selectedProjectNo) return;
      // 1) fetch actions
      if (
        !this.actionList.find(
          (action) => action.projectNo === selectedProjectNo
        )
      ) {
        const selectedProject = this.projectList.find(
          (project) => selectedProjectNo === project.projectNo
        );
        const actions = await Promise.all(
          selectedProject.actions?.split(",").map((id) => getAction(id?.trim()))
        );
        this.actionList.push({
          projectNo: selectedProjectNo,
          actions: actions,
        });
      }

      // 2) put into state
      this.selectedProjectNo = selectedProjectNo;
      this.selectedDistrictNo = null;
    },
  },
});
