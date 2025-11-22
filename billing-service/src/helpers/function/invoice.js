const axios = require("axios");

const APPOINTMENT_SERVICE_BASE_URL = (
  process.env.APPOINTMENT_SERVICE_BASE_URL || "http://localhost:5002/api/v1"
).replace(/\/+$/, "");

const DEBUG_APPOINTMENT_HYDRATE = process.env.DEBUG_APPOINTMENT_HYDRATE === "1";

const normalizeId = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (val.toString) return val.toString();
  return String(val);
};

async function fetchAppointmentById(id) {
  const url = `${APPOINTMENT_SERVICE_BASE_URL}/appointment/${id}?populate=1`;
  try {
    if (DEBUG_APPOINTMENT_HYDRATE) {
      console.log(`[appt-hydrate] -> GET ${url}`);
    }
    const res = await axios.get(url, { timeout: 10000 });
    const payload = res?.data;
    const appt = payload?.metadata ?? payload ?? null;
    if (DEBUG_APPOINTMENT_HYDRATE) {
      console.log(
        `[appt-hydrate] <- ${res.status} id=${id} ok=${!!appt} keys=${
          appt ? Object.keys(appt).join(",") : "-"
        }`
      );
    }
    return appt;
  } catch (e) {
    console.error(
      `[appt-hydrate] x GET ${url} id=${id} err=${
        e?.response?.status || e?.code || e?.message
      }`
    );
    return null;
  }
}

// Hydrate the "appointment" field on invoice(s)
async function hydrateInvoicesWithAppointment(input) {
  const isArray = Array.isArray(input);
  const arr = isArray ? input : [input];

  // Normalize each invoice to plain object
  const plain = arr.map((doc) =>
    doc && typeof doc.toObject === "function" ? doc.toObject() : { ...doc }
  );

  // Collect unique appointment ids
  const idSet = new Set();
  for (const inv of plain) {
    const a = inv?.appointment;
    const apptId =
      a && typeof a === "object" && a._id ? normalizeId(a._id) : normalizeId(a);
    if (apptId) idSet.add(apptId);
  }
  const ids = Array.from(idSet);

  if (DEBUG_APPOINTMENT_HYDRATE) {
    console.log(
      `[appt-hydrate] invoices=${plain.length} uniqueApptIds=${
        ids.length
      } ids=${JSON.stringify(ids)}`
    );
  }

  // Fetch all appointments in parallel
  const map = new Map();
  await Promise.all(
    ids.map(async (id) => {
      const appt = await fetchAppointmentById(id);
      if (appt) map.set(id, appt);
    })
  );

  // Replace appointment field with hydrated object (when available)
  const hydrated = plain.map((inv) => {
    const a = inv?.appointment;
    const apptId =
      a && typeof a === "object" && a._id ? normalizeId(a._id) : normalizeId(a);
    if (apptId && map.has(apptId)) {
      inv.appointment = map.get(apptId);
    }
    return inv;
  });

  return isArray ? hydrated : hydrated[0];
}

module.exports = {
  normalizeId,
  fetchAppointmentById,
  hydrateInvoicesWithAppointment,
};
