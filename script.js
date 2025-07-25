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
    const imageElement = document.getElementById("activity-image");

    if (activities && activities.length > 0) {
        const firstActivity = activities.find(a => a.type === 0 || a.type === 2); // Playing or Listening

        if (firstActivity) {
            const name = firstActivity.name;
            const details = firstActivity.details || "";
            activityElement.innerText = ` ${name}: ${details}`;

            // Extract image
            if (firstActivity.assets && firstActivity.assets.large_image) {
                let imageUrl = "";
                const imageKey = firstActivity.assets.large_image;

                if (imageKey.startsWith("spotify:")) {
                    // Spotify album art
                    imageUrl = `https://i.scdn.co/image/${imageKey.split(":")[1]}`;
                } else {
                    // Discord CDN image
                    const appId = firstActivity.application_id;
                    imageUrl = `https://cdn.discordapp.com/app-assets/${appId}/${imageKey}.png`;
                }

                imageElement.innerHTML = `
                    <img src="${imageUrl}" alt="Activity Image" class="w-24 h-24 mx-auto mt-2 rounded-lg shadow-md" />
                `;
            } else {
                imageElement.innerHTML = "";
            }
        } else {
            activityElement.innerText = "Not doing anything special.";
            imageElement.innerHTML = "";
        }
    } else {
        activityElement.innerText = "Not doing anything special.";
        imageElement.innerHTML = "";
    }
}

getStatus();
setInterval(getStatus, 15000);
