import axios from "axios";

export const USER_SERVICE_BASE_URL = (
  process.env.USER_SERVICE_BASE_URL || "http://localhost:5001/api/v1"
).replace(/\/+$/, "");

const DEBUG_HYDRATE = process.env.DEBUG_HYDRATE === "1";

// Helper: chuẩn hóa id về string
export const normalizeId = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (val.toString) return val.toString();
  return String(val);
};

// Helper: gọi user-service lấy 1 user theo id (có log)
export async function fetchUserById(id) {
  const url = `${USER_SERVICE_BASE_URL}/user/find/${id}`;
  try {
    if (DEBUG_HYDRATE) {
      console.log(`[user-hydrate] -> GET ${url}`);
    }
    const res = await axios.get(url, { timeout: 10000 });
    const payload = res?.data;
    const user = payload?.metadata ?? payload ?? null;

    if (DEBUG_HYDRATE) {
      const keys = user ? Object.keys(user) : [];
      console.log(
        `[user-hydrate] <- ${
          res.status
        } id=${id} ok=${!!user} keys=${JSON.stringify(keys)}`
      );
    }
    return user;
  } catch (e) {
    console.error(
      `[user-hydrate] x GET ${url} id=${id} err=${
        e?.response?.status || e?.code || e?.message
      }`
    );
    return null; // nếu lỗi, vẫn trả null để tiếp tục
  }
}

// Helper: hydrate barber/customer cho 1 mảng hoặc 1 object appointment (có log tóm tắt)
export async function hydrateBarberCustomer(input) {
  const isArray = Array.isArray(input);
  const arr = isArray ? input : [input];
  const t0 = Date.now();

  // Thu thập id duy nhất
  const idSet = new Set();
  for (const a of arr) {
    const barberId = normalizeId(a?.barber);
    const customerId = normalizeId(a?.customer);
    if (barberId) idSet.add(barberId);
    if (customerId) idSet.add(customerId);
  }
  const ids = Array.from(idSet);
  if (DEBUG_HYDRATE) {
    console.log(
      `[user-hydrate] appointments=${arr.length} uniqueUserIds=${
        ids.length
      } ids=${JSON.stringify(ids)}`
    );
  }

  const map = new Map();
  let fetched = 0;
  let missing = 0;

  // Gọi song song, cache vào map
  await Promise.all(
    ids.map(async (id) => {
      const user = await fetchUserById(id);
      if (user) {
        map.set(id, user.user);
        fetched++;
      } else {
        missing++;
      }
    })
  );

  const hydrated = arr.map((a) => {
    if (!a) return a;
    const copy = { ...a };
    const barberId = normalizeId(copy.barber);
    const customerId = normalizeId(copy.customer);

    if (barberId && map.has(barberId)) copy.barber = map.get(barberId);
    if (customerId && map.has(customerId)) copy.customer = map.get(customerId);

    return copy;
  });

  const dt = Date.now() - t0;
  console.log(
    `[user-hydrate] done appointments=${arr.length} fetched=${fetched} missing=${missing} time=${dt}ms`
  );

  return isArray ? hydrated : hydrated[0];
}
