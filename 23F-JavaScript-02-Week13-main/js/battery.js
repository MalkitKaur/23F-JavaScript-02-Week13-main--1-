const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

navigator.getBattery().then(battery => {
    console.log(battery);

    // Update the battery information when the promise resolves
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }

    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    const imageUrl = `https://robohash.org/${battery.level * 100}.png`;
    const imageElement = document.getElementById('robohashImage');
    if (imageElement) {
        imageElement.src = imageUrl;
    }

    // Event listeners for changes to the charging status and charge level
    battery.addEventListener("chargingchange", () => updateBatteryStatus());
    battery.addEventListener("levelchange", () => updateBatteryStatus());

    // Inline function to update the battery status
    function updateBatteryStatus() {
        if (battery.charging === true) {
            chargeStatus.textContent = "Charging...";
        } else {
            chargeStatus.textContent = "Discharging...";
        }

        chargeLevel.textContent = (battery.level * 100) + "%";
        chargeMeter.value = battery.level * 100;

        updateRobohashImage(battery.level * 100);
    }
});

function updateRobohashImage(batteryLevel) {
    const imageUrl = `https://robohash.org/${batteryLevel}.png`;
    const imageElement = document.getElementById('robohashImage');
    if (imageElement) {
        imageElement.src = imageUrl;
    }
}