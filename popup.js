const KEY = 'vendorOnboarding.assessmentSummary.trust';

document.getElementById('btn').addEventListener('click', () => {
  const status = document.getElementById('status');
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (key) => {
        const existed = localStorage.getItem(key) !== null;
        localStorage.removeItem(key);
        return existed;
      },
      args: [KEY]
    }, (results) => {
      if (chrome.runtime.lastError) {
        status.textContent = 'Error: ' + chrome.runtime.lastError.message;
        status.className = 'err';
        return;
      }
      const existed = results?.[0]?.result;
      status.textContent = existed ? 'Deleted successfully.' : 'Key was not present.';
      status.className = 'ok';
    });
  });
});
