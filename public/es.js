var evtSource = new EventSource('/v1/liveweight')

evtSource.onmessage = function (e) {
  console.warn('e', e)
  document.getElementById('data').innerHTML = e.data
}

evtSource.onopen = function (e) {
  document.getElementById('state').innerHTML = "Connected"
}

evtSource.onerror = function (e) {
  const id_state = document.getElementById('state')
  if (e.eventPhase == EventSource.CLOSED)
    evtSource.close()
  if (e.target.readyState == EventSource.CLOSED) {
    id_state.innerHTML = "Disconnected"
  }
  else if (e.target.readyState == EventSource.CONNECTING) {
    id_state.innerHTML = "Connecting..."
  }
}
