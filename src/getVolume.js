export function getVolume() {
  const volumeControl = document.getElementById("volume-slider");
  volumeControl.addEventListener("change", () => {
    return parseInt(volumeControl.value) / 100;
  });
  return parseInt(volumeControl.value) / 100;
}
