export const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  let errMsg = `Error: ${res.status}`;
  try {
    const text = await res.text();
    const errorData = JSON.parse(text);
    errMsg = `${res.status} ${errorData?.message || errMsg}`;
  } catch {}

  return Promise.reject(new Error(errMsg));
};
