let previewText = "";

function generateEmail() {
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const status = document.querySelector("input[name='status']:checked").value;

  if (!name || !position) {
    document.getElementById("preview").innerText = "Please enter all details.";
    return;
  }

  if (status === "selected") {
    previewText = `Dear ${name},

We are pleased to inform you that you have been selected for the ${position} role.

Please reply to confirm your acceptance.

Best regards,
HR Team`;
  } else {
    previewText = `Dear ${name},

Thank you for your interest in the ${position} role.

We regret to inform you that we are moving forward with other candidates.

Best regards,
HR Team`;
  }

  document.getElementById("preview").innerText = previewText;
}

async function sendEmail() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    status: document.querySelector("input[name='status']:checked").value
  };

  const res = await fetch("http://localhost:5000/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  document.getElementById("msg").innerText = json.message;
}
