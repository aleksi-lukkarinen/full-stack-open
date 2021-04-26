
function createSignalingPromise() {
  let signaler

  const promiseToWaitFor = new Promise((resolve) => {
    signaler = resolve
  })

  return [promiseToWaitFor, signaler]
}

function objectType(value) {
  const rawTypeString = Object.prototype.toString.call(value)
  const splitted = rawTypeString.split("\x20")[1]
  const lastPart = splitted.substring(0, splitted.length - 1)
  return lastPart.toLowerCase()
}

module.exports = {
  createSignalingPromise,
  objectType,
}
