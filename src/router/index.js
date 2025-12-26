import { createRouter, createWebHistory } from "vue-router";

import TeamsPage from "../pages/TeamsPage.vue";
import FixturePage from "../pages/FixturePage.vue";
import SimulationPage from "../pages/SimulationPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "teams", component: TeamsPage },
    { path: "/fixture", name: "fixture", component: FixturePage },
    { path: "/simulation", name: "simulation", component: SimulationPage },
  ],
});