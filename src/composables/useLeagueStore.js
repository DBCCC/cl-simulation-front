import { reactive, readonly } from "vue";

const API = import.meta.env.VITE_API_BASE;

const state = reactive({
  league: null,
  weeks: null,
  loading: false,
  error: "",
});

async function apiGet(path) {
  const res = await fetch(`${API}${path}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `GET ${path} failed`);
  return data;
}

async function apiPost(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `POST ${path} failed`);
  return data;
}

async function refreshLeague() {
  state.loading = true;
  state.error = "";
  try {
    state.league = await apiGet("");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}

async function refreshWeeks() {
  state.loading = true;
  state.error = "";
  try {
    state.weeks = await apiGet("/weeks");
    return state.weeks;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}

async function generateFixture() {
  state.loading = true;
  state.error = "";
  try {
    state.weeks = await apiGet("/weeks");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}
async function resetLeague() {
  state.loading = true;
  state.error = "";
  try {
    state.league = await apiPost("/reset");   
    state.weeks = await apiGet("/weeks");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}


async function playWeek(week) {
  state.loading = true;
  state.error = "";
  try {
    state.league = await apiPost(`/play-week/${week}`);
    state.weeks = await apiGet("/weeks");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}

async function playAll() {
  state.loading = true;
  state.error = "";
  try {
    state.league = await apiPost("/play-all");
    state.weeks = await apiGet("/weeks");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}

async function editMatch(matchId, homeGoals, awayGoals) {
  state.loading = true;
  state.error = "";
  try {
    state.league = await apiPost(`/edit-match/${matchId}`, { homeGoals, awayGoals });
    state.weeks = await apiGet("/weeks");
    return state.league;
  } catch (e) {
    state.error = e.message;
    throw e;
  } finally {
    state.loading = false;
  }
}
async function updateTeam(teamId, payload) {
  state.loading = true;
  state.error = "";
  try {
    const res = await fetch(`${API}/teams/${teamId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Update failed");
    }

    state.league = data;
    state.weeks = await apiGet("/weeks");
    return data;
  } catch (e) {
    state.error = e.message;  
    throw e;
  } finally {
    state.loading = false;
  }
}
function teamName(teamId) {
  return state.league?.teams?.find((t) => t.id === teamId)?.name ?? teamId;
}

export function useLeagueStore() {
  return {
    state: readonly(state),
    refreshLeague,
    updateTeam,
    resetLeague,
    refreshWeeks,
    generateFixture,
    playWeek,
    playAll,
    editMatch,
    teamName,
  };
}
