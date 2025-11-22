const axios = require("axios");

const BILLING_BASE = (
  process.env.BILLING_SERVICE_BASE_URL || "http://localhost:5003/api/v1"
).replace(/\/+$/, "");
const USER_BASE = (
  process.env.USER_SERVICE_BASE_URL || "http://localhost:5001/api/v1"
).replace(/\/+$/, "");

const DEBUG_STAT = process.env.DEBUG_STAT === "1";

const normalizeId = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (val.toString) return val.toString();
  return String(val);
};

// Call billing: GET /invoice/by-appointments?ids=a,b,c
async function fetchInvoicesByAppointmentIds(appointmentIds = []) {
  const ids = appointmentIds.map(normalizeId).filter(Boolean);
  if (!ids.length) return [];

  // Build query string
  const qs = encodeURIComponent(ids.join(","));
  const urlGET = `${BILLING_BASE}/invoice/by-appointments?ids=${qs}`;

  try {
    if (DEBUG_STAT) console.log(`[stat] -> GET ${urlGET}`);
    const res = await axios.get(urlGET, { timeout: 20000 });
    const data = res?.data?.metadata ?? res?.data ?? [];
    if (DEBUG_STAT)
      console.log(
        `[stat] <- ${res.status} invoices=${
          Array.isArray(data) ? data.length : 0
        }`
      );
    return Array.isArray(data) ? data : [];
  } catch (e) {
    // Optional fallback sang POST nếu cần (trong trường hợp bạn thêm route POST)
    const urlPOST = `${BILLING_BASE}/invoice/by-appointments`;
    try {
      if (DEBUG_STAT)
        console.log(`[stat] (fallback) -> POST ${urlPOST} ids=${ids.length}`);
      const res = await axios.post(
        urlPOST,
        { appointmentIds: ids },
        { timeout: 20000 }
      );
      const data = res?.data?.metadata ?? res?.data ?? [];
      if (DEBUG_STAT)
        console.log(
          `[stat] (fallback) <- ${res.status} invoices=${
            Array.isArray(data) ? data.length : 0
          }`
        );
      return Array.isArray(data) ? data : [];
    } catch (e2) {
      console.error(
        `[stat] x GET/POST by-appointments err=${
          e?.response?.status || e?.code || e?.message
        }`
      );
      return [];
    }
  }
}

// Fetch 1 user (barber) by id
async function fetchUserById(id) {
  const url = `${USER_BASE}/user/find/${id}`;
  try {
    if (DEBUG_STAT) console.log(`[stat] -> GET ${url}`);
    const res = await axios.get(url, { timeout: 10000 });
    const payload = res?.data?.metadata ?? res?.data ?? null;
    // Một số service trả metadata.user; fallback an toàn:
    const user = payload?.user || payload;
    if (DEBUG_STAT) {
      console.log(
        `[stat] <- ${res.status} user=${user?._id || user?.id || "null"} role=${
          user?.user_role || "-"
        }`
      );
    }
    return user || null;
  } catch (e) {
    console.error(
      `[stat] x GET ${url} err=${e?.response?.status || e?.code || e?.message}`
    );
    return null;
  }
}

// Batch fetch users by ids (song song, có limit concurrency đơn giản)
async function fetchUsersByIds(ids = []) {
  const uniq = Array.from(new Set(ids.map(normalizeId).filter(Boolean)));
  const map = new Map();
  const concurrency = 8;
  for (let i = 0; i < uniq.length; i += concurrency) {
    const chunk = uniq.slice(i, i + concurrency);
    const res = await Promise.all(chunk.map((id) => fetchUserById(id)));
    res.forEach((user, idx) => {
      const id = chunk[idx];
      if (user) map.set(id, user);
    });
  }
  return map;
}

module.exports = {
  normalizeId,
  fetchInvoicesByAppointmentIds,
  fetchUserById,
  fetchUsersByIds,
};
