// Initial State
let isSubscribed = false;
let eventSource = undefined;

// Attach event listeners
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.start-btn').addEventListener('click', () => {
    if (!isSubscribed) {
      isSubscribed = true;
      sub();
    }
  });

  document.querySelector('.stop-btn').addEventListener('click', () => {
    if (isSubscribed) {
      isSubscribed = false;
      unsub();
    }
  });

  document.querySelector('.clear-btn').addEventListener('click', () => {
    clearList();
  });
});

function sub() {
  eventSource = new EventSource('http://localhost:5000');

  // Handler for events without an event type
  // eventSource.onmessage = onEventSourceMessage;

  // Handler for "update" event type
  eventSource.addEventListener('update', onUpdateMessage);
}

function unsub() {
  eventSource.close();
}

function onUpdateMessage(e) {
  renderStreamItem(e.data);
}

function renderStreamItem(data) {
  const el = document.createElement('li');
  el.innerHTML = data.toString();
  document.querySelector('.stream-list').appendChild(el);
}

function clearList() {
  document.querySelector('.stream-list').innerHTML = null;
}
