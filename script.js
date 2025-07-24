const userId = '921810613552963604';

async function getStatus() {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();

    const status = data.data.discord_status;
    const activities = data.data.activities;

      
    const statusEmoji = {
        online: "🟢 Online",
        dnd: "⛔ Do Not Disturb",
        idle: "🌙 Idle",
        offline: "⚫ Offline"
    };

    document.getElementById("status").innerText = statusEmoji[status] || "Unknown";

    const activityElement = document.getElementById("activity");

    if (activities && activities.length > 0) {
        const firstActivity = activities[0];
        const name = firstActivity.name;
        const details = firstActivity.details || "";
        activityElement.innerText = `🎮 ${name} ${details}`;
    } else {
    activityElement.innerText = "Not doing anything special.";
    }
}

getStatus();
setInterval(getStatus, 15000);