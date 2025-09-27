// thankyou.js
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Map query params to elements
  document.getElementById("outFirst").textContent = params.get("first") || "";
  document.getElementById("outLast").textContent = params.get("last") || "";
  document.getElementById("outEmail").textContent = params.get("email") || "";
  document.getElementById("outPhone").textContent = params.get("phone") || "";
  document.getElementById("outOrg").textContent = params.get("organization") || "";

  // Use timestamp if passed, otherwise fallback to current time
  const ts = params.get("timestamp");
  const submittedDate = ts ? new Date(Number(ts)) : new Date();
  document.getElementById("outTime").textContent = submittedDate.toLocaleString();
});
