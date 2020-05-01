const gId = (id) => document.getElementById(id);

gId("decryptBtn").addEventListener("click", (_) => {
  const slug_id = gId("slugId").value,
    passphrase = gId("passPhrase").value;

  fetch(`/api/r?slug=${slug_id}&passphrase=${passphrase}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      gId("msg").setAttribute("style", "white-space: pre;");
      switch (data.response.status) {
        case "error":
          gId("response").className = "notification py-5 w-full notification inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none bg-red-200 text-red-700";
          let msg = "";
          for (const [key, value] of Object.entries(data.response.details.query)) {
            msg += `${value}\n`;
          }
          gId("msg").textContent = msg;
          return;
        case "invalid":
          gId("response").className = "notification py-5 w-full notification inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none bg-red-200 text-red-700";
          gId("msg").innerHTML = data.response.msg;
          return;
        case "expired":
          gId("response").className = "notification py-5 w-full notification inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none bg-yellow-200 text-yellow-700";
          gId("passPhrase").value = "";
          gId("passPhrase").disabled = true;
          gId("decryptBtn").disabled = true;
          gId("msg").innerHTML = data.response.msg;
          return;
        case "success":
          gId("response").className = "notification py-5 w-full notification inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none bg-indigo-200 text-indigo-700";
          gId("passPhrase").value = "";
          gId("passPhrase").disabled = true;
          gId("decryptBtn").disabled = true;
          gId("msg").innerHTML = data.response.msg;
          return;
      }
    });
});
